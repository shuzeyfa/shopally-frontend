import assert from "node:assert/strict";
import { before, after, test } from "node:test";
import { jwtVerify, SignJWT } from "jose";
import { encode } from "next-auth/jwt";
import { startProductionServer } from "./helpers/production-server.mjs";

let server;
let origin;
let secret;
before(async () => {
  server = await startProductionServer();
  ({ origin, secret } = server);
});
after(async () => { await server?.stop(); });

async function sessionCookie(sub) {
  const token = await encode({ secret, token: { sub, apiToken: "test-api-token" }, maxAge: 3600 });
  return `next-auth.session-token=${token}`;
}

test("production offers only Google sign-in", async () => {
  const providers = await (await fetch(`${origin}/api/auth/providers`)).json();
  assert.deepEqual(Object.keys(providers), ["google"]);
  const page = await (await fetch(`${origin}/login`)).text();
  assert.match(page, /Continue with Google/);
  assert.doesNotMatch(page, /Sign in with Demo Account|name="email"/);
});

test("anonymous app requests preserve their intended destination", async () => {
  const response = await fetch(`${origin}/alerts?view=active`, { redirect: "manual" });
  assert.equal(response.status, 307);
  const target = new URL(response.headers.get("location"), origin);
  assert.equal(target.pathname, "/landing");
  assert.equal(target.searchParams.get("callbackUrl"), "/alerts?view=active");
});

test("landing CTAs enter login and carry the requested destination", async () => {
  const page = await (await fetch(`${origin}/landing?callbackUrl=${encodeURIComponent("/alerts?view=active")}`)).text();
  assert.match(page, /href="\/login\?callbackUrl=%2Falerts%3Fview%3Dactive"/);
  assert.ok((page.match(/data-auth-entry="true"/g) || []).length >= 2);
  assert.doesNotMatch(page, /href="\/search"/);
});

test("a signed-in shopper returns to the requested app page", async () => {
  const cookie = await sessionCookie("google-test-subject");
  const response = await fetch(`${origin}/login?callbackUrl=${encodeURIComponent("/saved?sort=recent")}`, {
    redirect: "manual", headers: { cookie },
  });
  assert.equal(response.status, 307);
  assert.equal(new URL(response.headers.get("location"), origin).href, `${origin}/saved?sort=recent`);
});

test("unsafe and looping callback URLs fall back to search", async () => {
  const cookie = await sessionCookie("google-test-subject");
  for (const target of ["https://example.com", "//example.com", "/\\example.com", "/login", "/landing", "/api/auth/signout", "/search/../../login"]) {
    const response = await fetch(`${origin}/login?callbackUrl=${encodeURIComponent(target)}`, {
      redirect: "manual", headers: { cookie },
    });
    assert.equal(response.status, 307);
    assert.equal(new URL(response.headers.get("location"), origin).href, `${origin}/search`, target);
  }
});

test("previously issued demo sessions cannot access app routes or expose API tokens", async () => {
  const cookie = await sessionCookie("demo-retired-account");
  const protectedPage = await fetch(`${origin}/saved`, { redirect: "manual", headers: { cookie } });
  assert.equal(protectedPage.status, 307);
  assert.equal(new URL(protectedPage.headers.get("location"), origin).pathname, "/landing");
  const session = await fetch(`${origin}/api/auth/session`, { headers: { cookie } });
  assert.deepEqual(await session.json(), {});
  assert.match(session.headers.get("set-cookie"), /next-auth\.session-token=;/);
});

const identity = { sub: "google-test-subject", email: "shopper@example.test", name: "Test Shopper" };
const now = () => Math.floor(Date.now() / 1000);
const apiKey = () => new TextEncoder().encode(server.apiSecret);
async function apiToken(overrides = {}, key = apiKey()) {
  return new SignJWT({ ...identity, iss: "shopally-web", aud: "shopally-api",
    iat: now() - 60, exp: now() + 3600, ...overrides })
    .setProtectedHeader({ alg: "HS256" }).sign(key);
}
async function fetchSession(apiToken, sub = identity.sub) {
  const token = await encode({ secret, token: { ...identity, sub, apiToken }, maxAge: 3600 });
  const response = await fetch(origin + "/api/auth/session", {
    headers: { cookie: "next-auth.session-token=" + token },
  });
  return { response, session: await response.json() };
}
async function verifiedApiClaims(token) {
  const { payload } = await jwtVerify(token, apiKey(), {
    algorithms: ["HS256"], issuer: "shopally-web", audience: "shopally-api",
    requiredClaims: ["iat", "exp", "sub"],
  });
  assert.equal(payload.sub, identity.sub);
  assert.equal(payload.email, identity.email);
  assert.equal(payload.name, identity.name);
  return payload;
}

test("session reads renew missing, expired, near-expiry and mismatched API tokens", async () => {
  const previous = [undefined, "legacy-invalid-token", await apiToken({ exp: now() - 60, iat: now() - 3600 }),
    await apiToken({ exp: now() + 60 }), await apiToken({ sub: "another-user" }),
    await apiToken({}, new TextEncoder().encode("old-signing-key-at-least-thirty-two-bytes"))];
  for (const oldToken of previous) {
    const { session, response } = await fetchSession(oldToken);
    assert.equal(session.user.id, identity.sub);
    assert.notEqual(session.apiToken, oldToken);
    const payload = await verifiedApiClaims(session.apiToken);
    assert.equal(payload.exp - payload.iat, 86400);
    assert.ok(payload.iat >= now() - 5);
    assert.match(response.headers.get("cache-control"), /no-store/);
    const cookies = response.headers.getSetCookie();
    const renewed = cookies.find(value => value.startsWith("next-auth.session-token="));
    assert.ok(renewed);
    assert.match(renewed, /HttpOnly/);
    const again = await fetch(origin + "/api/auth/session", { headers: { cookie: renewed.split(";")[0] } });
    assert.equal((await again.json()).apiToken, session.apiToken);
  }
});

test("a valid API token is reused and signed with the dedicated API secret", async () => {
  const token = await apiToken();
  const { session } = await fetchSession(token);
  assert.equal(session.apiToken, token);
  await verifiedApiClaims(token);
  await assert.rejects(jwtVerify(token, new TextEncoder().encode(secret)));
});

test("anonymous, forged and expired session cookies cannot obtain an API token", async () => {
  const forged = await encode({ secret: "unrelated-secret", token: identity, maxAge: 3600 });
  const expired = await encode({ secret, token: identity, maxAge: -3600 });
  const missingSubject = await encode({ secret, token: { email: identity.email }, maxAge: 3600 });
  for (const cookie of ["", "next-auth.session-token=" + forged,
    "next-auth.session-token=" + expired, "next-auth.session-token=" + missingSubject]) {
    const response = await fetch(origin + "/api/auth/session", { headers: { cookie } });
    assert.deepEqual(await response.json(), {});
    for (const page of ["/search", "/compare", "/saved", "/alerts", "/profile"]) {
      const protectedPage = await fetch(origin + page, { redirect: "manual", headers: { cookie } });
      assert.equal(protectedPage.status, 307, page);
    }
  }
});

test("session updates cannot replace the authenticated identity or API token", async () => {
  const token = await encode({ secret, token: identity, maxAge: 3600 });
  const csrfResponse = await fetch(origin + "/api/auth/csrf");
  const { csrfToken } = await csrfResponse.json();
  const csrfCookies = csrfResponse.headers.getSetCookie().map(value => value.split(";")[0]);
  const response = await fetch(origin + "/api/auth/session", {
    method: "POST", headers: { "Content-Type": "application/json",
      cookie: ["next-auth.session-token=" + token, ...csrfCookies].join("; ") },
    body: JSON.stringify({ csrfToken, data: { sub: "attacker", user: { id: "attacker" }, apiToken: "forged" } }),
  });
  const session = await response.json();
  assert.equal(session.user.id, identity.sub);
  await verifiedApiClaims(session.apiToken);
});

test("OAuth failures return to the translated login page without raw error details", async () => {
  const failed = await fetch(origin + "/api/auth/error?error=OAuthCallback");
  assert.equal(new URL(failed.url).pathname, "/login");
  assert.equal(new URL(failed.url).searchParams.get("error"), "OAuthCallback");
  for (const [locale, message] of [["en", "Google sign-in did not complete"], ["am", "በ Google መግባት አልተሳካም"]]) {
    const response = await fetch(origin + "/login?error=untrusted-provider-detail", { headers: { cookie: "shopally_locale=" + locale } });
    const html = (await response.text()).replace(/<script\b[^>]*>[\s\S]*?<\/script>/g, "");
    assert.match(html, /role="alert"/);
    assert.ok(html.includes(message));
    assert.ok(!html.includes("untrusted-provider-detail"));
  }
});

test("sign-out validates its destination and expires the session cookie", async () => {
  const csrfResponse = await fetch(origin + "/api/auth/csrf");
  const { csrfToken } = await csrfResponse.json();
  const csrfCookies = csrfResponse.headers.getSetCookie().map(value => value.split(";")[0]);
  const cookie = [await sessionCookie(identity.sub), ...csrfCookies].join("; ");
  for (const [callbackUrl, expected] of [["/landing", "/landing"], ["https://example.com", "/search"], ["/api/auth/signout", "/search"]]) {
    const response = await fetch(origin + "/api/auth/signout", {
      method: "POST", headers: { cookie, "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({ csrfToken, callbackUrl, json: "true" }),
    });
    assert.equal((await response.json()).url, origin + expected);
    assert.match(response.headers.get("set-cookie"), /next-auth\.session-token=;/);
  }
});
