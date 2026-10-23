"use client";

import { useEffect, useRef, useState } from "react";
import { useDictionary } from "@/providers/LanguageProvider";
import { observeDemoPlayback } from "@/lib/demo-playback";

export function Demo() {
  const { demo } = useDictionary().landing;
  const videoRef = useRef<HTMLVideoElement>(null);
  const [started, setStarted] = useState(false);
  const [failed, setFailed] = useState(false);
  useEffect(() => {
    const video = videoRef.current;
    if (video) return observeDemoPlayback(video);
  }, []);
  const play = async () => {
    const video = videoRef.current;
    if (!video) return;
    setFailed(false);
    if (video.error) video.load();
    video.muted = false;
    try { await video.play(); } catch { setFailed(true); }
  };
  return (
    <section id="demo" aria-labelledby="demo-title" className="bg-surface px-6 py-20 text-center text-content">
      <h2 id="demo-title" className="mb-2 text-2xl font-bold md:text-3xl">{demo.title}</h2>
      <p className="mb-8 text-content-muted">{demo.subtitle}</p>
      <div className="mx-auto max-w-5xl rounded-xl bg-surface-muted p-4 shadow-lg sm:p-8 md:p-12 dark:bg-surface-raised">
        <h3 className="mb-4 text-2xl font-semibold md:text-3xl">{demo.videoTitle}</h3>
        <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-gray-300 dark:bg-gray-700">
          <video ref={videoRef} src="/media/shop.mp4" aria-label={demo.videoLabel}
            className="absolute inset-0 size-full object-contain" controls={started} preload="metadata"
            loop muted playsInline
            onPlay={() => { setStarted(true); setFailed(false); }}
            onError={() => { setStarted(false); setFailed(true); }} />
          {(!started || failed) && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-300 dark:bg-gray-700">
              <button type="button" onClick={() => void play()} aria-label={demo.play}
                className="flex size-16 items-center justify-center rounded-full bg-accent text-2xl text-accent-content shadow-lg motion-safe:transition-transform motion-safe:hover:scale-110 md:size-20">
                <span aria-hidden="true">▶</span>
              </button>
            </div>
          )}
        </div>
        {failed && <p role="alert" className="mt-3 text-sm text-content-muted">{demo.unavailable}</p>}
      </div>
    </section>
  );
}
