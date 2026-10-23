import { Suspense } from "react";
import { cookies } from "next/headers";
import { safeCallbackPath } from "@/lib/auth-routing";
import { SigninForm } from "@/components/auth/SigninForm";

/**
 * Public authentication page rendering the SigninForm.
 *
 * Wrapped in Suspense as required by Next.js App Router when client components
 * consume useSearchParams.
 */
export default async function LoginPage() {
  const cookieStore = await cookies();
  // OAuth failures may return only ?error=. Recover the original destination
  // from NextAuth's cookie, validating it before it reaches the form.
  const storedCallback = cookieStore.get("__Secure-next-auth.callback-url")?.value
    ?? cookieStore.get("next-auth.callback-url")?.value;
  const initialCallbackUrl = safeCallbackPath(storedCallback, process.env.NEXTAUTH_URL);
  return (
    <main className="mx-auto flex min-h-[calc(100vh-7rem)] w-full max-w-6xl flex-1 items-center justify-center px-4 py-12">
      <Suspense fallback={<div className="h-96 w-full max-w-md animate-pulse rounded-lg bg-surface-raised" />}>
        <SigninForm initialCallbackUrl={initialCallbackUrl} />
      </Suspense>
    </main>
  );
}
