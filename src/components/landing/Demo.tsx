"use client";

import { useDictionary } from "@/providers/LanguageProvider";

export function Demo() {
  const dict = useDictionary();

  return (
    <section id="demo" className="py-20 px-6 text-center bg-surface text-content">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl md:text-4xl font-bold mb-2">
          {dict.app.name} <span className="text-accent">{dict.landing.demo.titleHighlight}</span>
        </h2>
        <p className="mb-8 text-content-muted text-base sm:text-lg">
          {dict.landing.demo.subtitle}
        </p>

        <div className="max-w-5xl mx-auto p-6 sm:p-12 rounded-xl shadow-lg relative bg-surface-muted border border-line">
          <div className="text-xl sm:text-3xl font-semibold mb-6 text-content">
            {dict.landing.demo.title}
          </div>
          <div className="relative w-full aspect-video rounded-lg overflow-hidden bg-black/90 shadow-2xl">
            <video
              className="absolute inset-0 w-full h-full object-contain rounded-lg"
              src="/media/shop.mp4"
              aria-label={dict.landing.demo.videoLabel}
              loop
              controls
              autoPlay
              muted
              playsInline
            />
          </div>
        </div>
      </div>
    </section>
  );
}
