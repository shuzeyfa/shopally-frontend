"use client";

import Image from "next/image";
import { AuthEntryLink } from "@/components/auth/AuthEntryLink";
import { useDictionary } from "@/providers/LanguageProvider";

export function Hero() {
  const { landing } = useDictionary();
  const hero = landing.hero;
  return (
    <section aria-labelledby="hero-title" className="overflow-clip bg-surface">
      <div className="mx-auto flex max-w-7xl flex-col-reverse items-center px-6 py-16 md:flex-row md:gap-0">
        <div className="w-full space-y-4 md:w-1/2">
          <h1 id="hero-title" className="text-3xl font-bold text-content md:text-5xl">
            {hero.headlinePrefix}{" "}<span className="text-accent">{hero.headlineHighlight}</span>
          </h1>
          <p className="text-base text-content">{hero.subhead}</p>
          <p className="text-sm text-content-muted">{hero.imageSearchBadge}</p>
          <div className="flex flex-wrap items-center gap-4 pt-0">
            <AuthEntryLink className="landing-start inline-flex rounded bg-accent px-6 py-3 font-semibold text-accent-content shadow-lg motion-safe:hover:scale-105">
              {hero.startSearching}
            </AuthEntryLink>
            <a href="#demo" className="inline-flex rounded border border-content px-6 py-3 font-semibold text-content transition-colors hover:bg-surface-muted">
              {hero.watchDemo}
            </a>
          </div>
        </div>
        <div className="w-full md:w-1/2">
          <Image src="/landing/cart.png" alt={hero.cartAlt} width={400} height={400}
            sizes="(min-width: 1024px) 400px, (min-width: 768px) 50vw, (max-width: 447px) calc(100vw - 48px), 400px"
            priority className="landing-cart mx-auto h-auto w-full max-w-[400px] md:mx-0" />
        </div>
      </div>
    </section>
  );
}
