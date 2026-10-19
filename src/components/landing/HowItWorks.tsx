"use client";

import { useDictionary } from "@/providers/LanguageProvider";

export function HowItWorks() {
  const dict = useDictionary();

  const steps = [
    {
      num: dict.landing.howItWorks.step1.number,
      title: dict.landing.howItWorks.step1.title,
      desc: dict.landing.howItWorks.step1.desc,
    },
    {
      num: dict.landing.howItWorks.step2.number,
      title: dict.landing.howItWorks.step2.title,
      desc: dict.landing.howItWorks.step2.desc,
    },
    {
      num: dict.landing.howItWorks.step3.number,
      title: dict.landing.howItWorks.step3.title,
      desc: dict.landing.howItWorks.step3.desc,
    },
  ];

  return (
    <section className="py-16 sm:py-24 border-t border-line">
      <div className="mx-auto max-w-6xl px-4">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-content sm:text-4xl">
            {dict.landing.howItWorks.title}
          </h2>
          <p className="mt-4 text-base text-content-muted">
            {dict.landing.howItWorks.subtitle}
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3">
          {steps.map((step, idx) => (
            <div
              key={idx}
              className="relative flex flex-col items-center text-center p-6 rounded-lg border border-line bg-surface-raised shadow-xs"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-accent text-accent-content font-bold text-lg mb-4">
                {step.num}
              </div>
              <h3 className="text-lg font-semibold text-content">{step.title}</h3>
              <p className="mt-2 text-sm text-content-muted leading-relaxed">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
