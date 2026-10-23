"use client";

import { AuthEntryLink } from "@/components/auth/AuthEntryLink";
import { useDictionary } from "@/providers/LanguageProvider";

export function CTA() {
  const { cta } = useDictionary().landing;
  return (
    <section aria-labelledby="cta-title" className="bg-accent px-4 py-20 text-center text-[#262b32]">
      <h2 id="cta-title" className="mb-4 text-3xl font-bold md:text-5xl">{cta.title}</h2>
      <p className="mb-8 text-lg md:text-xl">{cta.subtitle}</p>
      <AuthEntryLink className="inline-flex rounded bg-[#262b32] px-6 py-3 font-semibold text-white shadow-lg motion-safe:transition-transform motion-safe:hover:scale-105">
        {cta.button}
      </AuthEntryLink>
    </section>
  );
}
