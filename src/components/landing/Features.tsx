"use client";

import { useDictionary } from "@/providers/LanguageProvider";
import { Marquee } from "./Marquee";

export function Features() {
  const { features } = useDictionary().landing;
  const items = [
    { icon: "🌍", ...features.i18n }, { icon: "💰", ...features.fx },
    { icon: "📊", ...features.compare }, { icon: "🔒", ...features.officialApi },
    { icon: "🖼️", ...features.imageSearch }, { icon: "🔔", ...features.alerts },
  ];
  return (
    <section id="features" aria-labelledby="features-title" className="bg-surface px-6 py-24">
      <div className="mx-auto max-w-7xl text-center">
        <h2 id="features-title" className="mb-6 text-3xl font-bold text-content lg:text-4xl">{features.title}</h2>
        <p className="mb-12 text-lg text-content">{features.subtitle}</p>
        <Marquee label={features.title} seconds={40} items={items.map(({ icon, title, desc }) => (
          <article key={title} className="h-full w-[280px] rounded-lg bg-surface-raised p-8 text-center text-content shadow-lg md:w-[300px]">
            <div aria-hidden="true" className="mb-4 text-5xl">{icon}</div>
            <h3 className="mb-2 text-lg font-semibold">{title}</h3>
            <p className="text-sm">{desc}</p>
          </article>
        ))} />
      </div>
    </section>
  );
}
