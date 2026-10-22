import { SignJWT } from "jose";
import { createHash } from "crypto";
import type { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";

const TOKEN_ISSUER = "shopally-web";
const TOKEN_AUDIENCE = "shopally-api";

/**
 * Returns the secret used to sign the API JWT for the Go backend.
 * Must match the backend's AUTH_JWT_SECRET (at least 32 characters).
 *
 * Throws at startup if neither AUTH_JWT_SECRET nor NEXTAUTH_SECRET is set
 * so that a misconfigured deployment fails loudly rather than silently
 * using a public fallback that attackers could exploit.
 */
function getApiJwtSecret(): Uint8Array {
  const secret = process.env.AUTH_JWT_SECRET ?? process.env.NEXTAUTH_SECRET;
  if (!secret) {
    throw new Error(
      "AUTH_JWT_SECRET (or NEXTAUTH_SECRET) must be set. " +
        "Generate one with: openssl rand -base64 32"
    );
  }
  return new TextEncoder().encode(secret);
}

/**
 * Mints an HS256 API token for the Go backend using jose.
 */
async function mintApiToken(userId: string, email?: string | null, name?: string | null): Promise<string> {
  const secret = getApiJwtSecret();
  return await new SignJWT({
    email: email ?? "",
    name: name ?? "",
  })
    .setProtectedHeader({ alg: "HS256" })
    .setSubject(userId)
    .setIssuer(TOKEN_ISSUER)
    .setAudience(TOKEN_AUDIENCE)
    .setIssuedAt()
    .setExpirationTime("24h")
    .sign(secret);
}

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60, // 24 hours
  },
  pages: {
    signIn: "/login",
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    }),
    // Development fallback provider so developers can test authenticated flows
    // locally before Google OAuth client credentials are configured.
    CredentialsProvider({
      id: "credentials",
      name: "Demo Account",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "demo@shopally.ai" },
        name: { label: "Name", type: "text", placeholder: "Demo Shopper" },
      },
      async authorize(credentials) {
        if (!credentials?.email) {
          return null;
        }
        return {
          id: `demo-${createHash("sha256").update(credentials.email).digest("hex").slice(0, 24)}`,
          email: credentials.email,
          name: credentials.name || "Demo Shopper",
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.sub = user.id ?? token.sub;
        token.email = user.email ?? token.email;
        token.name = user.name ?? token.name;
        // Mint fresh HS256 API token for Go backend
        if (token.sub) {
          token.apiToken = await mintApiToken(token.sub, token.email, token.name);
        }
      } else if (!token.apiToken && token.sub) {
        token.apiToken = await mintApiToken(token.sub, token.email, token.name);
      }
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
