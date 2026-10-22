"use client";

import Link from "next/link";
import Image from "next/image";
import { buttonClasses } from "@/components/ui/Button";
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

          <h1 className="text-3xl font-extrabold tracking-tight text-content sm:text-5xl lg:text-6xl">
            {dict.landing.hero.headlinePrefix}{" "}
            <span className="text-accent">
              {dict.landing.hero.headlineHighlight}
            </span>
          </h1>

          <p className="max-w-xl text-base text-content-muted sm:text-lg">
            {dict.landing.hero.subhead}
          </p>

          <p className="text-xs sm:text-sm font-medium text-content-muted flex items-center justify-center lg:justify-start gap-1.5">
            <span>📸</span>
            <span>{dict.landing.hero.imageSearchBadge}</span>
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2 lg:justify-start">
            <Link
              href="/search"
              className={buttonClasses({
                variant: "primary",
                size: "md",
                className: "px-7 py-3 text-base font-bold shadow-lg hover:scale-105 transition-transform",
              })}
            >
              {dict.landing.hero.startSearching}
            </Link>
            <a
              href="#demo"
              className={buttonClasses({
                variant: "outline",
                size: "md",
                className: "px-6 py-3 text-base font-semibold",
              })}
            >
              {dict.landing.hero.watchDemo}
            </a>
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

        {/* Right Column: 3D Yellow Shopping Cart from Live Site */}
        <div className="w-full flex-1 max-w-md lg:max-w-lg flex items-center justify-center">
          <div className="relative w-full max-w-xs sm:max-w-md aspect-square flex items-center justify-center">
            {/* Ambient accent glow */}
            <div className="absolute inset-0 rounded-full bg-accent/15 blur-3xl -z-10 animate-pulse" />

            <Image
              src="/landing/cart.png"
              alt="ShopAlly 3D Shopping Cart"
              width={480}
              height={480}
              priority
              className="w-full h-auto object-contain drop-shadow-[0_20px_35px_rgba(255,211,0,0.25)] hover:scale-105 transition-transform duration-500"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
