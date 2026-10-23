"use client";

import { useId, useState, type ReactNode, type CSSProperties } from "react";
import { useDictionary } from "@/providers/LanguageProvider";

/** Two equal groups include their trailing gap so the loop has no jump. */
export function Marquee({ items, label, seconds }: { items: ReactNode[]; label: string; seconds: number }) {
  const id = useId();
  const [paused, setPaused] = useState(false);
  const { landing } = useDictionary();
  return (
    <div className="landing-marquee relative" data-paused={paused} style={{ "--marquee-duration": seconds + "s" } as CSSProperties}>
      <div id={id} className="landing-marquee-window" role="region" aria-label={label} tabIndex={0}>
        <div className="landing-marquee-track">
          {[false, true].map((duplicate) => (
            <ul key={String(duplicate)} aria-hidden={duplicate || undefined} className="landing-marquee-group">
              {items.map((item, index) => <li key={index} className="landing-marquee-item">{item}</li>)}
            </ul>
          ))}
        </div>
      </div>
      <div className="absolute -top-7 right-0 motion-reduce:hidden">
        <button type="button" aria-controls={id} aria-pressed={paused} onClick={() => setPaused(!paused)}
          className="rounded px-2 py-1 text-xs text-content-muted hover:text-content">
          {paused ? landing.motion.resume : landing.motion.pause}
        </button>
      </div>
    </div>
  );
}
