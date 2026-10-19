"use client";

import Link from "next/link";
import { buttonClasses } from "@/components/ui/Button";
import { useDictionary } from "@/providers/LanguageProvider";

export function CTA() {
  const dict = useDictionary();

  return (
    <section className="relative overflow-hidden border-t border-line bg-gradient-to-b from-surface to-surface-muted/60 py-16 sm:py-20">
      <div className="mx-auto max-w-4xl px-4 text-center">
        <h2 className="text-3xl font-bold tracking-tight text-content sm:text-4xl">
          {dict.landing.cta.title}
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-base text-content-muted sm:text-lg">
          {dict.landing.cta.subtitle}
        </p>
        <div className="mt-8 flex justify-center gap-4">
          <Link
            href="/search"
            className={buttonClasses({
              variant: "primary",
              size: "md",
              className: "px-8 py-3.5 text-base shadow-md font-semibold",
            })}
          >
            {dict.landing.cta.button}
          </Link>
        </div>
      </div>
    </section>
  );
}
