"use client";

import { Card } from "@/components/ui/Card";
import { useDictionary } from "@/providers/LanguageProvider";

export function Features() {
  const dict = useDictionary();

  const features = [
    {
      icon: (
        <svg className="h-6 w-6 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
        </svg>
      ),
      title: dict.landing.features.aiSearch.title,
      desc: dict.landing.features.aiSearch.desc,
    },
    {
      icon: (
        <svg className="h-6 w-6 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
      title: dict.landing.features.compare.title,
      desc: dict.landing.features.compare.desc,
    },
    {
      icon: (
        <svg className="h-6 w-6 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: dict.landing.features.fx.title,
      desc: dict.landing.features.fx.desc,
    },
    {
      icon: (
        <svg className="h-6 w-6 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
        </svg>
      ),
      title: dict.landing.features.alerts.title,
      desc: dict.landing.features.alerts.desc,
    },
    {
      icon: (
        <svg className="h-6 w-6 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
        </svg>
      ),
      title: dict.landing.features.saved.title,
      desc: dict.landing.features.saved.desc,
    },
    {
      icon: (
        <svg className="h-6 w-6 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
        </svg>
      ),
      title: dict.landing.features.i18n.title,
      desc: dict.landing.features.i18n.desc,
    },
  ];

  return (
    <section className="border-t border-line bg-surface-muted/50 py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-4">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-content sm:text-4xl">
            {dict.landing.features.title}
          </h2>
          <p className="mt-4 text-base text-content-muted">
            {dict.landing.features.subtitle}
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, i) => (
            <Card
              key={i}
              className="flex flex-col justify-between border border-line bg-surface-raised p-6 transition-all hover:border-accent/40 hover:shadow-md"
            >
              <div>
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold text-content">{feature.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-content-muted">
                  {feature.desc}
                </p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
