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
    {
      icon: "🔒",
      title: dict.landing.features.officialApi.title,
      desc: dict.landing.features.officialApi.desc,
    },
    {
      icon: "🖼️",
      title: dict.landing.features.imageSearch.title,
      desc: dict.landing.features.imageSearch.desc,
    },
    {
      icon: "🔔",
      title: dict.landing.features.alerts.title,
      desc: dict.landing.features.alerts.desc,
    },
  ];

  // Duplicate for seamless infinite loop
  const marqueeItems = [...features, ...features];

  return (
    <section id="features" className="py-24 sm:py-32 bg-surface overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 text-center">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="text-3xl font-extrabold tracking-tight text-content sm:text-4xl">
            {dict.landing.features.title}
          </h2>
          <p className="mt-4 text-sm sm:text-base text-content-muted max-w-xl mx-auto">
            {dict.landing.features.subtitle}
          </p>
        </div>

        {/* Continuous Right-to-Left Marquee Carousel */}
        <div className="relative w-full overflow-hidden py-4">
          {/* Subtle edge fade gradient */}
          <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-16 sm:w-24 bg-gradient-to-r from-surface to-transparent z-10" />
          <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-16 sm:w-24 bg-gradient-to-l from-surface to-transparent z-10" />

          <div className="animate-marquee gap-6 flex">
            {marqueeItems.map((feature, i) => (
              <div
                key={i}
                className="min-w-[280px] sm:min-w-[320px] max-w-[340px] flex-shrink-0 flex flex-col items-center bg-surface-muted/70 border border-line p-8 rounded-xl text-center shadow-lg transition-transform duration-300 hover:scale-[1.03] hover:border-accent select-none"
              >
                <div className="text-5xl mb-5 select-none filter drop-shadow-[0_10px_20px_rgba(255,211,0,0.2)]">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-bold text-content mb-2">{feature.title}</h3>
                <p className="text-xs sm:text-sm leading-relaxed text-content-muted">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
