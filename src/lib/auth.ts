import { jwtVerify, SignJWT } from "jose";
import type { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

import { isAuthSubject, safeCallbackPath } from "./auth-routing";

const TOKEN_ISSUER = "shopally-web";
const TOKEN_AUDIENCE = "shopally-api";
const TOKEN_LIFETIME_SECONDS = 24 * 60 * 60;
const TOKEN_RENEWAL_WINDOW_SECONDS = 5 * 60;

/** Same UTF-8 bytes as the backend; NextAuth's encryption secret is separate. */
function getApiJwtSecret(): Uint8Array {
  const secret = new TextEncoder().encode(process.env.AUTH_JWT_SECRET ?? "");
  if (secret.byteLength < 32) {
    throw new Error("AUTH_JWT_SECRET must contain at least 32 bytes and match the backend");
  }
  return secret;
}

async function apiTokenFor(userId: string, email?: string | null, name?: string | null, existing?: string): Promise<string> {
  const secret = getApiJwtSecret();
  const now = Math.floor(Date.now() / 1000);
  if (existing) {
    try {
      const { payload } = await jwtVerify(existing, secret, {
        algorithms: ["HS256"], issuer: TOKEN_ISSUER, audience: TOKEN_AUDIENCE,
        subject: userId, requiredClaims: ["iat", "exp", "sub"],
      });
      if (typeof payload.iat === "number" && payload.iat <= now + 30 &&
          typeof payload.exp === "number" && payload.exp > payload.iat &&
          payload.exp > now + TOKEN_RENEWAL_WINDOW_SECONDS &&
          payload.email === (email ?? "") && payload.name === (name ?? "")) {
        return existing;
      }
    } catch {
      // Renew expired, legacy or rotated-key tokens from the authenticated
      // NextAuth identity. Never derive an identity from the old API token.
    }
  }
  return new SignJWT({ email: email ?? "", name: name ?? "" })
    .setProtectedHeader({ alg: "HS256" })
    .setSubject(userId)
    .setIssuer(TOKEN_ISSUER)
    .setAudience(TOKEN_AUDIENCE)
    .setIssuedAt(now)
    .setExpirationTime(now + TOKEN_LIFETIME_SECONDS)
    .sign(secret);
}

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  session: { strategy: "jwt", maxAge: TOKEN_LIFETIME_SECONDS },
  pages: { signIn: "/login", error: "/login" },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    }),
  ],
  callbacks: {
    async signIn({ account, profile }) {
      return account?.provider === "google" && !!profile &&
        "email_verified" in profile && profile.email_verified === true;
    },
    async redirect({ url, baseUrl }) {
      // Sign-out intentionally returns to the public landing page.
      if (url === "/landing" || url === new URL("/landing", baseUrl).href) {
        return new URL("/landing", baseUrl).href;
      }
      return new URL(safeCallbackPath(url, baseUrl), baseUrl).href;
    },
    async jwt({ token, user }) {
      if (user) {
        token.sub = user.id;
        token.email = user.email;
        token.name = user.name;
      }
      if (!isAuthSubject(token.sub)) {
        // NextAuth clears cookies when the callback rejects a retired or
        // malformed session. It cannot be used to mint a replacement token.
        throw new Error("Session has no supported identity");
      }
      // Do not read the client-supplied session/update payload here.
      token.apiToken = await apiTokenFor(token.sub, token.email, token.name, user ? undefined : token.apiToken);
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.sub;
        session.user.email = token.email;
        session.user.name = token.name;
      }
      session.apiToken = token.apiToken;
      return session;
    },
  },
};
