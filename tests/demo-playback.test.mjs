import assert from "node:assert/strict";
import { test } from "node:test";
import { sourceLoader } from "./helpers/load-typescript.mjs";

const { observeDemoPlayback } = sourceLoader()("src/lib/demo-playback.ts");

function setup(t, { reduced = false, blocked = false, observerAvailable = true } = {}) {
  const previous = { window: globalThis.window, document: globalThis.document, IntersectionObserver: globalThis.IntersectionObserver };
  const motion = Object.assign(new EventTarget(), { matches: reduced });
  const document = Object.assign(new EventTarget(), { hidden: false });
  const video = Object.assign(new EventTarget(), { muted: false, paused: true });
  let attempts = 0, pauses = 0, callback, connected = false;
  video.play = () => {
    attempts++;
    if (blocked) return Promise.reject(new Error("Autoplay blocked"));
    video.paused = false;
    video.dispatchEvent(new Event("play"));
    return Promise.resolve();
  };
  video.pause = () => { pauses++; video.paused = true; };
  globalThis.window = { matchMedia: () => motion };
  globalThis.document = document;
  globalThis.IntersectionObserver = observerAvailable ? class {
    constructor(fn) { callback = fn; }
    observe() { connected = true; }
    disconnect() { connected = false; }
  } : undefined;
  const stop = observeDemoPlayback(video);
  t.after(() => {
    stop();
    for (const [key, value] of Object.entries(previous)) {
      if (value === undefined) delete globalThis[key];
      else globalThis[key] = value;
    }
  });
  return {
    video, document, motion, stop,
    visible: (ratio) => { if (connected) callback([{ target: video, intersectionRatio: ratio, isIntersecting: ratio > 0 }]); },
    unblock: () => { blocked = false; },
    attempts: () => attempts, pauses: () => pauses,
  };
}

test("demo waits for half visibility, starts muted and preserves a later pause", async (t) => {
  const demo = setup(t);
  assert.equal(demo.attempts(), 0);
  demo.visible(0.49);
  assert.equal(demo.attempts(), 0);
  demo.visible(0.5);
  assert.equal(demo.attempts(), 1);
  assert.equal(demo.video.muted, true);
  demo.video.pause();
  demo.visible(0.9);
  assert.equal(demo.attempts(), 1);
  demo.visible(0);
  assert.equal(demo.video.paused, true);
  demo.visible(0.8);
  assert.equal(demo.attempts(), 1);
});

test("reduced motion and hidden tabs prevent automatic playback", async (t) => {
  const demo = setup(t, { reduced: true });
  demo.visible(1);
  assert.equal(demo.attempts(), 0);
  await demo.video.play(); // Explicit playback remains available.
  assert.equal(demo.attempts(), 1);
  demo.document.hidden = true;
  demo.document.dispatchEvent(new Event("visibilitychange"));
  assert.equal(demo.video.paused, true);
  demo.visible(1);
  assert.equal(demo.attempts(), 1);
});

test("autoplay rejection is handled and does not prevent manual retry", async (t) => {
  const demo = setup(t, { blocked: true });
  demo.visible(1);
  await Promise.resolve();
  assert.equal(demo.video.paused, true);
  demo.visible(0);
  demo.visible(1);
  assert.equal(demo.attempts(), 1);
  demo.unblock();
  await demo.video.play();
  assert.equal(demo.video.paused, false);
});

test("unmount removes playback listeners and stops the video", (t) => {
  const demo = setup(t);
  demo.visible(1);
  demo.stop();
  const pauses = demo.pauses();
  demo.visible(1);
  demo.document.hidden = true;
  demo.document.dispatchEvent(new Event("visibilitychange"));
  demo.motion.matches = true;
  demo.motion.dispatchEvent(new Event("change"));
  assert.equal(demo.pauses(), pauses);
  assert.equal(demo.attempts(), 1);
  assert.equal(demo.video.paused, true);
});

test("browsers without IntersectionObserver retain manual video playback", async (t) => {
  const demo = setup(t, { observerAvailable: false });
  assert.equal(demo.attempts(), 0);
  await demo.video.play();
  assert.equal(demo.video.paused, false);
});
