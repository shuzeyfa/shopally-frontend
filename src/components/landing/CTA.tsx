"use client";

import { AuthEntryLink } from "@/components/auth/AuthEntryLink";
import { useDictionary } from "@/providers/LanguageProvider";

export function CTA() {
  const dict = useDictionary();

  return (
    <section className="relative w-full overflow-hidden bg-accent py-20 sm:py-28 text-center text-accent-content">
      <div className="mx-auto max-w-4xl px-4">
        <h2 className="text-3xl sm:text-5xl font-black tracking-tight mb-4 text-[#111827]">
          {dict.landing.cta.title}
        </h2>
        <p className="mx-auto max-w-2xl text-base sm:text-lg font-medium text-[#111827]/80 mb-8">
          {dict.landing.cta.subtitle}
        </p>
        <div className="flex justify-center">
          <AuthEntryLink
            className="inline-flex items-center justify-center rounded-lg bg-[#111827] px-8 py-4 text-base font-bold text-white shadow-2xl transition-all duration-200 hover:bg-black hover:scale-105 active:scale-95"
          >
            {dict.landing.cta.button}
          </AuthEntryLink>
        </div>
      </div>
    </section>
  );
}
