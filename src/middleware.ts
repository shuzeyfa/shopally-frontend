import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";
import { isAppPath, safeCallbackPath } from "@/lib/auth-routing";

/**
 * Middleware that guards protected application routes.
 *
 * Anonymous visitors attempting to access (app)/* are redirected to /landing with
 * their destination preserved in the `callbackUrl` query parameter.
 *
 * The root route `/` also branches: signed-in users proceed to `/search`,
 * while unauthenticated visitors land on `/landing`.
 */
export async function middleware(req: NextRequest) {
  const { pathname, search } = req.nextUrl;
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const isAuthenticated = Boolean(token?.sub && !token.sub.startsWith("demo-"));

  // Root redirect
  if (pathname === "/") {
    const target = isAuthenticated ? "/search" : "/landing";
    return NextResponse.redirect(new URL(target, req.url));
  }

  // Prevent authenticated users from getting stuck on the login page
  if (pathname === "/login") {
    if (isAuthenticated) {
      const callbackUrl = safeCallbackPath(req.nextUrl.searchParams.get("callbackUrl"), req.nextUrl.origin);
      return NextResponse.redirect(new URL(callbackUrl, req.url));
    }
    return NextResponse.next();
  }

  // Guard protected routes under (app)/*
  const isProtected = isAppPath(pathname);

  if (isProtected && !isAuthenticated) {
    const callbackUrl = `${pathname}${search}`;
    const redirectUrl = new URL("/landing", req.url);
    redirectUrl.searchParams.set("callbackUrl", callbackUrl);
    return NextResponse.redirect(redirectUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/",
    "/login",
    "/search/:path*",
    "/compare/:path*",
    "/saved/:path*",
    "/alerts/:path*",
    "/profile/:path*",
  ],
};
