import assert from "node:assert/strict";
import { before, after, test } from "node:test";
import { startProductionServer } from "./helpers/production-server.mjs";

let server;
before(async () => { server = await startProductionServer(); });
after(async () => { await server?.stop(); });

async function page(path, cookie = "") {
  const response = await fetch(server.origin + path, { headers: { cookie } });
  assert.equal(response.status, 200);
  return (await response.text()).replace(/<script\b[^>]*>[\s\S]*?<\/script>/g, "");
}

test("saved theme and language are present in the first server-rendered HTML", async () => {
  const cookie = "shopally_theme=dark; shopally_locale=am";
  for (let reload = 0; reload < 2; reload++) {
    const html = await page("/landing", cookie);
    assert.match(html, /<html[^>]*lang="am"[^>]*data-theme="dark"/);
    assert.match(html, /color-scheme:dark/);
    assert.match(html, /ፈጣን አገናኞች/);
    assert.match(html, /የተረጋገጠ ሻጭ/);
    assert.doesNotMatch(html, /Quick Links|Verified Seller|Price Drop Alert|Live ETB FX Engine/);
  }
});

test("invalid preferences fall back safely and requests do not share preferences", async () => {
  const invalid = await page("/landing", "shopally_theme=unexpected; shopally_locale=xx");
  assert.match(invalid, /<html[^>]*lang="en"[^>]*data-theme="light"/);
  await page("/landing", "shopally_theme=dark; shopally_locale=am");
  const nextVisitor = await page("/landing");
  assert.match(nextVisitor, /<html[^>]*lang="en"[^>]*data-theme="light"/);
});

test("login uses the selected language and footer links point to landing sections", async () => {
  const html = await page("/login", "shopally_locale=am");
  assert.match(html, /በ Google ይቀጥሉ/);
  assert.match(html, /aria-label="ገጽታ ይቀይሩ"/);
  for (const section of ["features", "how-it-works", "demo", "testimonials"]) {
    assert.ok(html.includes(`href="/landing#${section}"`), section);
  }
});
