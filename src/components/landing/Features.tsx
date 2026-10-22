"use client";

import { useDictionary } from "@/providers/LanguageProvider";

export function Features() {
  const dict = useDictionary();

  const features = [
    {
      icon: "🌐",
      title: dict.landing.features.i18n.title,
      desc: dict.landing.features.i18n.desc,
    },
    {
      icon: "💰",
      title: dict.landing.features.fx.title,
      desc: dict.landing.features.fx.desc,
    },
    {
      icon: "📊",
      title: dict.landing.features.compare.title,
      desc: dict.landing.features.compare.desc,
    },
  ];

  return (
    <section id="features" className="py-24 sm:py-32 bg-surface">
      <div className="mx-auto max-w-5xl px-4">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="text-3xl font-extrabold tracking-tight text-content sm:text-4xl">
            {dict.landing.features.title}
          </h2>
          <p className="mt-4 text-sm sm:text-base text-content-muted max-w-xl mx-auto">
            {dict.landing.features.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-12 text-center">
          {features.map((feature, i) => (
            <div
              key={i}
              className="flex flex-col items-center p-4 transition-transform duration-300 hover:scale-105"
            >
              <div className="text-5xl mb-6 select-none filter drop-shadow-[0_10px_20px_rgba(255,211,0,0.2)]">
                {feature.icon}
              </div>
              <h3 className="text-lg font-bold text-content mb-3">{feature.title}</h3>
              <p className="text-xs sm:text-sm leading-relaxed text-content-muted max-w-xs">
                {feature.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
