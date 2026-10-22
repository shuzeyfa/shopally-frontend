"use client";

import Link from "next/link";
import Image from "next/image";
import { buttonClasses } from "@/components/ui/Button";
import { useDictionary } from "@/providers/LanguageProvider";

export function Hero() {
  const dict = useDictionary();

  return (
    <section className="relative overflow-hidden pt-14 pb-20 md:pt-24 md:pb-28">
      {/* Studio Radial Lighting */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-0 right-1/4 -z-10 h-[500px] w-[500px] rounded-full bg-accent/15 blur-[120px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 left-10 -z-10 h-96 w-96 rounded-full bg-surface-muted/80 blur-3xl"
      />

      {/* Subtle Dot Grid Background Pattern */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-20 opacity-30 bg-[radial-gradient(var(--line)_1px,transparent_1px)] [background-size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_20%,#000_70%,transparent_100%)]"
      />

      <div className="mx-auto flex max-w-6xl flex-col items-center gap-14 px-4 text-center lg:flex-row lg:text-left">
        {/* Left Column: Headlines & Actions */}
        <div className="flex-1 space-y-6 lg:max-w-xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-line bg-surface/80 px-3.5 py-1.5 text-xs font-semibold text-content backdrop-blur-md shadow-xs">
            <span className="flex h-2 w-2 rounded-full bg-accent animate-pulse" />
            <span className="text-accent">{dict.landing.hero.badge}</span>
          </div>

          <h1 className="text-3xl font-extrabold tracking-tight text-content sm:text-5xl lg:text-6xl leading-[1.12]">
            {dict.landing.hero.headlinePrefix}{" "}
            <span className="text-accent underline decoration-accent/30 underline-offset-8">
              {dict.landing.hero.headlineHighlight}
            </span>
          </h1>

          <p className="max-w-lg text-base text-content-muted sm:text-lg leading-relaxed">
            {dict.landing.hero.subhead}
          </p>

          <p className="text-xs sm:text-sm font-medium text-content-muted flex items-center justify-center lg:justify-start gap-2 pt-1">
            <span className="flex h-6 w-6 items-center justify-center rounded-md bg-accent/15 text-accent text-xs">
              📸
            </span>
            <span>{dict.landing.hero.imageSearchBadge}</span>
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3.5 pt-3 lg:justify-start">
            <Link
              href="/search"
              className={buttonClasses({
                variant: "primary",
                size: "md",
                className: "px-8 py-3.5 text-base font-bold shadow-xl hover:scale-105 active:scale-95 transition-all duration-150",
              })}
            >
              {dict.landing.hero.startSearching} →
            </Link>
            <a
              href="#demo"
              className={buttonClasses({
                variant: "outline",
                size: "md",
                className: "px-6 py-3.5 text-base font-semibold border-line/80 hover:border-accent hover:text-accent transition-colors duration-150",
              })}
            >
              ▶ {dict.landing.hero.watchDemo}
            </a>
          </div>

          {/* Social Proof & Trust Badges */}
          <div className="flex flex-wrap items-center justify-center gap-6 pt-5 text-xs font-medium text-content-muted lg:justify-start border-t border-line/40">
            <div className="flex items-center gap-1.5">
              <span className="text-positive font-bold">✓</span>
              <span>Live ETB FX Engine</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-positive font-bold">✓</span>
              <span>AliExpress Verified Stores</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-positive font-bold">✓</span>
              <span>English & አማርኛ</span>
            </div>
          </div>
        </div>

        {/* Right Column: Layered 3D Studio Showcase */}
        <div className="w-full flex-1 max-w-md lg:max-w-lg flex items-center justify-center">
          <div className="relative w-full max-w-sm sm:max-w-md aspect-square flex items-center justify-center">
            {/* Ambient Radial Spotlight */}
            <div className="absolute inset-0 rounded-full bg-accent/20 blur-3xl -z-10 animate-glow" />

            {/* Floating Glass Chip 1: AI Match Counter */}
            <div className="absolute -top-2 left-0 sm:-left-4 z-20 flex items-center gap-2 rounded-xl border border-line bg-surface/90 px-3.5 py-2 shadow-xl backdrop-blur-md animate-float-delayed select-none">
              <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-ping" />
              <span className="text-xs font-bold text-content">
                AI Match 98.4%
              </span>
              <span className="text-[11px] text-content-muted font-mono">
                • 1 USD = 124.5 ETB
              </span>
            </div>

            {/* Floating Glass Chip 2: Verified Seller Badge */}
            <div className="absolute bottom-6 -left-2 sm:-left-6 z-20 flex items-center gap-2.5 rounded-xl border border-line bg-surface/90 px-3 py-2 shadow-xl backdrop-blur-md animate-float-reverse select-none">
              <span className="text-base">🛡️</span>
              <div className="text-left">
                <div className="text-[11px] font-bold text-content leading-tight">
                  Verified Seller
                </div>
                <div className="text-[10px] text-positive font-semibold">
                  99.2% Positive Feedback
                </div>
              </div>
            </div>

            {/* Floating Glass Chip 3: Savings Alert */}
            <div className="absolute -bottom-2 -right-2 sm:-right-4 z-20 flex items-center gap-2.5 rounded-xl border border-line bg-surface/90 px-3.5 py-2.5 shadow-xl backdrop-blur-md animate-float-delayed select-none">
              <span className="text-lg">🔥</span>
              <div className="text-left">
                <div className="text-[11px] font-bold text-accent leading-tight">
                  Price Drop Alert
                </div>
                <div className="text-xs font-extrabold text-content">
                  Save 42% in ETB
                </div>
              </div>
            </div>

            {/* Center: The 3D Cart with Organic Breathing Motion */}
            <div className="relative z-10 w-full h-full flex items-center justify-center animate-float">
              <Image
                src="/landing/cart.png"
                alt="ShopAlly 3D Shopping Cart"
                width={480}
                height={480}
                priority
                className="w-full h-auto object-contain drop-shadow-[0_25px_45px_rgba(255,211,0,0.28)] hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
