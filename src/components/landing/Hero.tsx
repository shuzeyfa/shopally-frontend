"use client";

import Link from "next/link";
import { buttonClasses } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { useDictionary } from "@/providers/LanguageProvider";

export function Hero() {
  const dict = useDictionary();

  return (
    <section className="relative overflow-hidden pt-12 pb-16 md:pt-20 md:pb-24">
      {/* Background glow effect */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 left-1/2 -z-10 h-96 w-96 -translate-x-1/2 rounded-full bg-accent/10 blur-3xl"
      />

      <div className="mx-auto flex max-w-6xl flex-col items-center gap-12 px-4 text-center lg:flex-row lg:text-left">
        {/* Left Column: Headlines & Actions */}
        <div className="flex-1 space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-line bg-surface-raised px-3.5 py-1 text-xs font-medium text-accent shadow-xs">
            <span className="flex h-2 w-2 rounded-full bg-accent animate-pulse" />
            <span>{dict.landing.hero.badge}</span>
          </div>

          <h1 className="text-4xl font-extrabold tracking-tight text-content sm:text-5xl lg:text-6xl">
            {dict.landing.hero.headline}
          </h1>

          <p className="max-w-xl text-base text-content-muted sm:text-lg">
            {dict.landing.hero.subhead}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2 lg:justify-start">
            <Link
              href="/search"
              className={buttonClasses({
                variant: "primary",
                size: "md",
                className: "px-6 py-3 text-base shadow-sm",
              })}
            >
              {dict.landing.hero.startSearching}
            </Link>
            <Link
              href="/login"
              className={buttonClasses({
                variant: "outline",
                size: "md",
                className: "px-6 py-3 text-base",
              })}
            >
              {dict.landing.hero.exploreDeals}
            </Link>
          </div>

          {/* Trust badges */}
          <div className="flex flex-wrap items-center justify-center gap-6 pt-4 text-xs text-content-muted lg:justify-start">
            <div className="flex items-center gap-1.5">
              <span className="text-positive font-bold">✓</span>
              <span>Live ETB Conversion</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-positive font-bold">✓</span>
              <span>AliExpress Verified Sellers</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-positive font-bold">✓</span>
              <span>English & አማርኛ</span>
            </div>
          </div>
        </div>

        {/* Right Column: Interactive Mock Card */}
        <div className="w-full flex-1 max-w-md lg:max-w-none">
          <div className="relative mx-auto max-w-md">
            {/* Ambient accent card highlight */}
            <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-accent/20 to-surface-muted blur-md -z-10" />

            <Card className="border border-line bg-surface-raised p-6 shadow-xl">
              <div className="flex items-center justify-between border-b border-line pb-4">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-accent/15 px-3 py-1 text-xs font-semibold text-accent">
                  ★ {dict.landing.hero.mockCard.matchScore}
                </span>
                <span className="text-xs text-content-muted font-mono">
                  Live FX: 1 USD = ~121.5 ETB
                </span>
              </div>

              <div className="mt-4 space-y-4 text-left">
                <div className="aspect-video w-full rounded-md bg-surface-muted flex items-center justify-center text-content-muted border border-line">
                  <div className="flex flex-col items-center gap-1">
                    <span className="text-3xl">🎧</span>
                    <span className="text-xs">AliExpress Product Preview</span>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-content text-base leading-snug">
                    {dict.landing.hero.mockCard.title}
                  </h3>
                  <div className="mt-1 flex items-center gap-2 text-xs text-content-muted">
                    <span className="text-positive font-medium">
                      ✓ {dict.landing.hero.mockCard.sellerScore}
                    </span>
                    <span>•</span>
                    <span>{dict.landing.hero.mockCard.delivery}</span>
                  </div>
                </div>

                <div className="flex items-baseline justify-between rounded-md bg-surface-muted p-3 border border-line">
                  <div>
                    <div className="text-xs text-content-muted uppercase tracking-wider font-semibold">
                      Estimated Total
                    </div>
                    <div className="text-xl font-bold text-content">
                      {dict.landing.hero.mockCard.etbPrice}
                    </div>
                  </div>
                  <div className="text-sm font-medium text-content-muted">
                    {dict.landing.hero.mockCard.usdPrice}
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
