"use client";

import { useDictionary } from "@/providers/LanguageProvider";

export function HowItWorks() {
  const { howItWorks } = useDictionary().landing;
  const steps = [
    { icon: "💬", ...howItWorks.step1 }, { icon: "💡", ...howItWorks.step2 },
    { icon: "📊", ...howItWorks.step3 },
  ];
  return (
    <section id="how-it-works" aria-labelledby="how-title" className="my-30 bg-surface-muted px-6 py-10 text-center dark:bg-surface">
      <div className="mx-auto max-w-4xl">
        <h2 id="how-title" className="mb-6 text-3xl font-bold text-content lg:text-4xl">{howItWorks.title}</h2>
        <p className="mb-16 text-lg text-content-muted">{howItWorks.subtitle}</p>
        <ol className="grid grid-cols-1 gap-12 md:grid-cols-3">
          {steps.map(({ icon, title, desc }) => (
            <li key={title} className="flex flex-col items-center">
              <div aria-hidden="true" className="mb-4 flex size-16 items-center justify-center rounded-lg bg-accent text-2xl">{icon}</div>
              <h3 className="mb-3 text-xl font-semibold text-content">{title}</h3>
              <p className="max-w-xs text-sm text-content-muted">{desc}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
