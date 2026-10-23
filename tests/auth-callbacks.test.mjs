import assert from "node:assert/strict";
import { test } from "node:test";
import * as jose from "jose";
import { sourceLoader } from "./helpers/load-typescript.mjs";

// Pass the actual ESM jose module to the TypeScript loader for Node 20 CI.
const { authOptions } = sourceLoader({ jose })("src/lib/auth.ts");
const { jwt, signIn, redirect } = authOptions.callbacks;

test("Google sign-in requires a verified profile", async () => {
  assert.equal(await signIn({ account: { provider: "google" }, profile: { email_verified: true } }), true);
  for (const input of [{}, { account: { provider: "demo" }, profile: { email_verified: true } },
    { account: { provider: "google" }, profile: {} },
    { account: { provider: "google" }, profile: { email_verified: false } },
    { account: { provider: "google" }, profile: { email_verified: "true" } }]) {
    assert.equal(await signIn(input), false);
  }
});

test("API signing rejects missing/short dedicated secrets without using the session secret", async () => {
  const original = process.env.AUTH_JWT_SECRET;
  const sessionSecret = process.env.NEXTAUTH_SECRET;
  try {
    process.env.NEXTAUTH_SECRET = "strong-but-unrelated-session-secret-32-bytes";
    for (const value of [undefined, "", "short-key"]) {
      if (value === undefined) delete process.env.AUTH_JWT_SECRET;
      else process.env.AUTH_JWT_SECRET = value;
      await assert.rejects(jwt({ token: { sub: "google-user" } }), /at least 32 bytes/);
    }
  } finally {
    if (original === undefined) delete process.env.AUTH_JWT_SECRET;
    else process.env.AUTH_JWT_SECRET = original;
    if (sessionSecret === undefined) delete process.env.NEXTAUTH_SECRET;
    else process.env.NEXTAUTH_SECRET = sessionSecret;
  }
});

test("initial Google identity is authoritative and malformed subjects fail closed", async () => {
  const original = process.env.AUTH_JWT_SECRET;
  try {
    process.env.AUTH_JWT_SECRET = "test-api-key-at-least-thirty-two-bytes";
    const token = await jwt({ token: { sub: "stale", apiToken: "stale" },
      user: { id: "google-new", email: "new@example.test", name: "New Shopper" },
      session: { sub: "attacker" } });
    const { payload } = await jose.jwtVerify(token.apiToken, new TextEncoder().encode(process.env.AUTH_JWT_SECRET));
    assert.equal(payload.sub, "google-new");
    assert.equal(payload.email, "new@example.test");
    for (const sub of [undefined, "", "  ", 123, "demo-retired"]) {
      await assert.rejects(jwt({ token: { sub } }), /supported identity/);
    }
  } finally {
    if (original === undefined) delete process.env.AUTH_JWT_SECRET;
    else process.env.AUTH_JWT_SECRET = original;
  }
});

test("OAuth redirects allow app destinations and landing sign-out only", async () => {
  const baseUrl = "https://shopally.example.test";
  for (const url of ["/saved?sort=recent", baseUrl + "/alerts", "/landing"]) {
    assert.equal(await redirect({ url, baseUrl }), new URL(url, baseUrl).href);
  }
  for (const url of ["https://elsewhere.example", "//elsewhere.example", "/login", "/api/auth/signout", "/search/../../login"]) {
    assert.equal(await redirect({ url, baseUrl }), baseUrl + "/search");
  }
});

test("changing accounts remounts the Redux store but token renewal keeps it", () => {
  let session = null;
  const { StoreProvider } = sourceLoader({ "next-auth/react": {
    useSession: () => ({ data: session }),
  } })("src/providers/StoreProvider.tsx");
  const anonymous = StoreProvider({ children: null });
  session = { user: { id: "google-1" }, apiToken: "one" };
  const first = StoreProvider({ children: null });
  session.apiToken = "renewed";
  assert.equal(StoreProvider({ children: null }).key, first.key);
  session = { user: { id: "google-2" }, apiToken: "two" };
  const second = StoreProvider({ children: null });
  assert.notEqual(first.key, anonymous.key);
  assert.notEqual(first.key, second.key);
  session = null;
  assert.equal(StoreProvider({ children: null }).key, anonymous.key);
});
