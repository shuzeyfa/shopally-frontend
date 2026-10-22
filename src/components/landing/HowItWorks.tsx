"use client";

import { useDictionary } from "@/providers/LanguageProvider";

export function HowItWorks() {
  const dict = useDictionary();

  const steps = [
    {
      icon: "💬",
      title: dict.landing.howItWorks.step1.title,
      desc: dict.landing.howItWorks.step1.desc,
    },
    {
      icon: "💡",
      title: dict.landing.howItWorks.step2.title,
      desc: dict.landing.howItWorks.step2.desc,
    },
    {
      icon: "📊",
      title: dict.landing.howItWorks.step3.title,
      desc: dict.landing.howItWorks.step3.desc,
    },
  ];

  return (
    <section id="how-it-works" className="py-24 sm:py-32 bg-surface">
      <div className="mx-auto max-w-5xl px-4">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="text-3xl font-extrabold tracking-tight text-content sm:text-4xl">
            {dict.landing.howItWorks.title}
          </h2>
          <p className="mt-4 text-sm sm:text-base text-content-muted max-w-xl mx-auto">
            {dict.landing.howItWorks.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-12 text-center">
          {steps.map((step, idx) => (
            <div
              key={idx}
              className="flex flex-col items-center p-4 transition-transform duration-300 hover:scale-105"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-accent text-accent-content font-bold text-2xl mb-6 shadow-lg shadow-accent/20">
                {step.icon}
              </div>
              <h3 className="text-lg font-bold text-content mb-3">{step.title}</h3>
              <p className="text-xs sm:text-sm text-content-muted leading-relaxed max-w-xs">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
