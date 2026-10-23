import assert from "node:assert/strict";
import { randomBytes } from "node:crypto";
import { spawn } from "node:child_process";
import { createServer } from "node:net";
import { once } from "node:events";
import { setTimeout as delay } from "node:timers/promises";
import { before, after, test } from "node:test";
import { encode } from "next-auth/jwt";

const secret = randomBytes(32).toString("hex");
let server;
let origin;
let logs = "";

before(async () => {
  const portReservation = createServer();
  portReservation.listen(0, "127.0.0.1");
  await once(portReservation, "listening");
  const port = portReservation.address().port;
  await new Promise((resolve) => portReservation.close(resolve));
  origin = `http://127.0.0.1:${port}`;
  server = spawn(process.execPath, ["node_modules/next/dist/bin/next", "start", "--hostname", "127.0.0.1", "--port", String(port)], {
    windowsHide: true,
    stdio: ["ignore", "pipe", "pipe"],
    env: {
      ...process.env,
      NODE_ENV: "production",
      NEXTAUTH_URL: origin,
      NEXTAUTH_SECRET: secret,
      AUTH_JWT_SECRET: secret,
      GOOGLE_CLIENT_ID: "test-client-id",
      GOOGLE_CLIENT_SECRET: "test-client-secret",
    },
  });
  const capture = (chunk) => { logs = (logs + chunk).slice(-4000); };
  server.stdout.on("data", capture);
  server.stderr.on("data", capture);
  for (let attempt = 0; attempt < 120; attempt++) {
    if (server.exitCode !== null) throw new Error(`Test server exited: ${logs}`);
    try {
      const response = await fetch(`${origin}/api/auth/providers`, { signal: AbortSignal.timeout(1000) });
      if (response.ok) return;
    } catch { /* Server is still starting. */ }
    await delay(500);
  }
  throw new Error(`Test server did not become ready: ${logs}`);
});

after(async () => {
  if (server && server.exitCode === null) {
    const exited = once(server, "exit");
    server.kill();
    await exited;
  }
});

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
