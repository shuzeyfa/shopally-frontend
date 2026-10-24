import assert from "node:assert/strict";
import { test } from "node:test";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { sourceLoader } from "./helpers/load-typescript.mjs";

const load = sourceLoader();
const { createEnvelopeBaseQuery, REQUEST_TIMEOUT_MS } = load("src/lib/api/transport.ts");
const { dictionaries } = load("src/lib/i18n/dictionaries.ts");
const { isApiError, localizedErrorMessage } = load("src/lib/api/errors.ts");

const api = () => ({
  signal: new AbortController().signal, dispatch: () => {}, getState: () => ({}),
  endpoint: "test", type: "query",
});
const respond = (body, status = 200) => async () =>
  new Response(JSON.stringify(body), { status, headers: { "Content-Type": "application/json" } });
const query = (fetchFn) => createEnvelopeBaseQuery({ baseUrl: "https://api.example.test", fetchFn, timeout: 100 });

test("API unwraps valid payloads and rejects malformed success responses", async () => {
  for (const data of [[], { products: [], total: 0 }, { productId: "p1" }]) {
    const result = await query(respond({ data, error: null }))("/search", api(), {});
    assert.deepEqual(result, { data });
  }
  for (const body of [null, [], {}, { products: [] }, { data: null, error: null },
    { data: [], error: { code: "BAD", message: "bad" } },
    { data: null, error: { code: 12, message: {} } }]) {
    const result = await query(respond(body))("/search", api(), {});
    assert.equal(result.error.code, "INVALID_RESPONSE");
    assert.equal(result.error.status, 200);
  }
});

test("API preserves typed errors on both successful and failed HTTP statuses", async () => {
  const error = { code: "UNAUTHORIZED", message: "authentication required" };
  for (const status of [200, 401]) {
    const result = await query(respond({ data: null, error }, status))("/saved", api(), {});
    assert.deepEqual(result.error, { ...error, status });
  }
  const degraded = await query(respond({ data: { status: "degraded" }, error: null }, 503))("/healthz", api(), {});
  assert.equal(degraded.error.status, 503);
  const html = await query(async () => new Response("<html>gateway failure</html>", { status: 502 }))("/search", api(), {});
  assert.equal(html.error.code, "INVALID_RESPONSE");
  assert.equal(html.error.status, 502);
});

test("network failures and hanging requests become actionable errors", { timeout: 5000 }, async () => {
  const offline = await query(async () => { throw new TypeError("Failed to fetch"); })("/search", api(), {});
  assert.equal(offline.error.code, "NETWORK_ERROR");
  assert.equal(REQUEST_TIMEOUT_MS, 30_000);
  const hanging = createEnvelopeBaseQuery({
    baseUrl: "https://api.example.test", timeout: 20,
    fetchFn: async (request) => new Promise((_, reject) => {
      // Unlike a real fetch, this mock has no socket keeping Node alive.
      // Keep it pending until the abort, and fail if that abort never arrives.
      const deadline = setTimeout(() => {
        request.signal.removeEventListener("abort", abort);
        reject(new Error("The hanging request did not receive a timeout abort"));
      }, 1000);
      const abort = () => {
        clearTimeout(deadline);
        reject(request.signal.reason);
      };
      if (request.signal.aborted) abort();
      else request.signal.addEventListener("abort", abort, { once: true });
    }),
  });
  const timedOut = await hanging("/search", api(), {});
  assert.equal(timedOut.error.code, "TIMEOUT");
});

test("error labels respect the selected language and reject invalid shapes", () => {
  assert.equal(isApiError({ code: 42, message: [] }), false);
  assert.equal(isApiError({ code: "BAD", message: "bad", status: "401" }), false);
  assert.equal(localizedErrorMessage({ code: "TIMEOUT", message: "English provider detail" },
    dictionaries.am, "fallback"), dictionaries.am.errors.TIMEOUT);
  assert.equal(localizedErrorMessage({ code: "NEW_CODE", message: "provider detail" },
    dictionaries.am, "fallback"), "fallback");
});

test("dictionaries have matching keys and interpolation placeholders", () => {
  function compare(en, am, path = "") {
    if (typeof en === "string") {
      assert.equal(typeof am, "string", path);
      assert.deepEqual(en.match(/\{\w+\}/g) ?? [], am.match(/\{\w+\}/g) ?? [], path);
      return;
    }
    if (typeof en !== "object") return;
    assert.deepEqual(Object.keys(en).sort(), Object.keys(am).sort(), path);
    for (const key of Object.keys(en)) compare(en[key], am[key], path + "." + key);
  }
  compare(dictionaries.en, dictionaries.am);
});

test("shared product labels render in Amharic without inventing an FX date", () => {
  const { LanguageProvider } = load("src/providers/LanguageProvider.tsx");
  const { AIMatchBadge } = load("src/components/product/AIMatchBadge.tsx");
  const { PriceTag } = load("src/components/product/PriceTag.tsx");
  const markup = renderToStaticMarkup(createElement(LanguageProvider, { initialLocale: "am" },
    createElement(AIMatchBadge, { percentage: 94 }),
    createElement(PriceTag, { price: { etb: 100, usd: 1, fxTimestamp: "" } }),
  ));
  assert.match(markup, /ተዛማጅነት/);
  assert.ok(markup.includes(dictionaries.am.product.fxUnknownDate));
  assert.doesNotMatch(markup, /Live interbank rate|Invalid Date|FX Rate applied|94% Match/);
});

test("preference cookies persist at the site root and are secure over HTTPS", () => {
  const { writePreferenceCookie } = load("src/lib/cookies.ts");
  const { THEME_COOKIE, LOCALE_COOKIE } = load("src/lib/preferences.ts");
  const previousDocument = globalThis.document;
  const previousWindow = globalThis.window;
  const writes = [];
  try {
    globalThis.document = { set cookie(value) { writes.push(value); } };
    globalThis.window = { location: { protocol: "https:" } };
    writePreferenceCookie(THEME_COOKIE, "dark");
    writePreferenceCookie(LOCALE_COOKIE, "am");
    assert.deepEqual(writes.map((cookie) => cookie.split(";")[0]), ["shopally_theme=dark", "shopally_locale=am"]);
    for (const cookie of writes) assert.match(cookie, /; Path=\/; Max-Age=31536000; SameSite=Lax; Secure$/);
  } finally {
    if (previousDocument === undefined) delete globalThis.document;
    else globalThis.document = previousDocument;
    if (previousWindow === undefined) delete globalThis.window;
    else globalThis.window = previousWindow;
  }
});

test("Redux stores are isolated and store creation attaches no browser listeners", () => {
  const previousWindow = globalThis.window;
  let listeners = 0;
  try {
    globalThis.window = { addEventListener: () => { listeners++; } };
    const { makeStore } = load("src/lib/store.ts");
    const { toggleCompareProduct } = load("src/lib/slices/compareSlice.ts");
    const first = makeStore();
    const second = makeStore();
    first.dispatch(toggleCompareProduct("product-1"));
    assert.deepEqual(first.getState().compare.selectedProductIds, ["product-1"]);
    assert.deepEqual(second.getState().compare.selectedProductIds, []);
    assert.equal(listeners, 0);
  } finally {
    if (previousWindow === undefined) delete globalThis.window;
    else globalThis.window = previousWindow;
  }
});

test("only protected endpoints request a session and receive the bearer token", async () => {
  let options;
  let sessionReads = 0;
  const isolated = sourceLoader({
    "./transport": { createEnvelopeBaseQuery: (config) => {
      options = config;
      return async () => ({ data: {} });
    } },
    "next-auth/react": { getSession: async () => {
      sessionReads++;
      return { apiToken: "test-bearer-token" };
    } },
  });
  isolated("src/lib/api/baseApi.ts");
  const previousWindow = globalThis.window;
  try {
    globalThis.window = {};
    for (const arg of ["/healthz", "/api/v1/search?q=phone", "/api/v1/fx",
      { url: "/api/v1/compare", method: "POST" }]) {
      const headers = await options.prepareHeaders(new Headers(), { arg });
      assert.equal(headers.has("Authorization"), false);
    }
    assert.equal(sessionReads, 0);
    for (const arg of ["/api/v1/saved", "/api/v1/alerts/alert-1", "/api/v1/me",
      { url: "/api/v1/saved/product-1", method: "DELETE" }]) {
      const headers = await options.prepareHeaders(new Headers(), { arg });
      assert.equal(headers.get("Authorization"), "Bearer test-bearer-token");
    }
    assert.equal(sessionReads, 4);
  } finally {
    if (previousWindow === undefined) delete globalThis.window;
    else globalThis.window = previousWindow;
  }
});
