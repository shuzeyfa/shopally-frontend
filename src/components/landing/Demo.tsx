"use client";

import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { buttonClasses } from "@/components/ui/Button";
import { useDictionary } from "@/providers/LanguageProvider";

export function Demo() {
  const dict = useDictionary();

  return (
    <section id="demo" className="border-t border-line bg-surface-muted/30 py-20 sm:py-28">
      <div className="mx-auto max-w-5xl px-4 text-center">
        <div className="mx-auto max-w-2xl mb-12">
          <h2 className="text-3xl font-extrabold tracking-tight text-content sm:text-4xl">
            <span className="text-accent">ShopAlly</span>{" "}
            {dict.landing.demo.title.replace("ShopAlly", "").replace("ሾፓሊ", "").trim() || "in Action"}
          </h2>
          <p className="mt-3 text-base text-content-muted sm:text-lg">
            {dict.landing.demo.subtitle}
          </p>
        </div>

        {/* Interactive App Mockup Window */}
        <Card className="overflow-hidden border border-line bg-surface shadow-2xl rounded-2xl text-left">
          {/* Mock Browser Header */}
          <div className="flex items-center justify-between border-b border-line bg-surface-muted/80 px-4 py-3">
            <div className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-full bg-red-400/80 inline-block" />
              <span className="h-3 w-3 rounded-full bg-yellow-400/80 inline-block" />
              <span className="h-3 w-3 rounded-full bg-green-400/80 inline-block" />
            </div>
            <div className="flex-1 max-w-md mx-4">
              <div className="rounded-md border border-line bg-surface px-3 py-1 text-xs text-content-muted text-center font-mono truncate">
                https://shopally.ai/search?q=smartwatch
              </div>
            </div>
            <div className="text-xs font-semibold text-accent flex items-center gap-1">
              <span>●</span> Live AI
            </div>
          </div>

          {/* Mock Content Body */}
          <div className="p-6 sm:p-8 space-y-6">
            {/* Search Input Simulation */}
            <div className="flex items-center gap-3 rounded-xl border-2 border-accent bg-surface p-2 shadow-sm">
              <span className="text-lg pl-2">🔍</span>
              <input
                type="text"
                readOnly
                value="Smart Watch with AMOLED display and heart rate monitor"
                aria-label="Demo search prompt"
                className="w-full bg-transparent text-sm sm:text-base font-medium text-content outline-none cursor-default"
              />
              <span className="rounded-lg bg-accent px-4 py-2 text-xs sm:text-sm font-bold text-accent-content shrink-0">
                AI Match 98%
              </span>
            </div>

            {/* Comparison Cards Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              <div className="rounded-xl border border-line bg-surface-muted/50 p-4 transition-all">
                <div className="flex items-start justify-between gap-3">
                  <div className="h-16 w-16 rounded-lg bg-surface flex items-center justify-center text-3xl border border-line shrink-0">
                    ⌚
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="inline-block rounded-full bg-accent/20 px-2 py-0.5 text-[11px] font-bold text-accent mb-1">
                      Top Recommendation
                    </span>
                    <h4 className="text-sm font-bold text-content truncate">
                      AMOLED Smart Watch Pro Series 9
                    </h4>
                    <p className="text-xs text-positive font-semibold mt-0.5">
                      ✓ 99.1% Positive Feedback • 1,400+ Sold
                    </p>
                  </div>
                </div>
                <div className="mt-4 flex items-baseline justify-between border-t border-line/60 pt-3">
                  <div>
                    <span className="text-xs text-content-muted">ETB Total (Estimated)</span>
                    <div className="text-lg font-extrabold text-content">ETB 3,850</div>
                  </div>
                  <span className="text-xs font-semibold text-content-muted">$31.50 USD</span>
                </div>
              </div>

              <div className="rounded-xl border border-line bg-surface-muted/50 p-4 transition-all">
                <div className="flex items-start justify-between gap-3">
                  <div className="h-16 w-16 rounded-lg bg-surface flex items-center justify-center text-3xl border border-line shrink-0">
                    ⌚
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="inline-block rounded-full bg-surface-raised px-2 py-0.5 text-[11px] font-semibold text-content-muted mb-1 border border-line">
                      Budget Alternative
                    </span>
                    <h4 className="text-sm font-bold text-content truncate">
                      Sport Waterproof Smartwatch V8
                    </h4>
                    <p className="text-xs text-content-muted font-medium mt-0.5">
                      ✓ 95.8% Positive Feedback • 850+ Sold
                    </p>
                  </div>
                </div>
                <div className="mt-4 flex items-baseline justify-between border-t border-line/60 pt-3">
                  <div>
                    <span className="text-xs text-content-muted">ETB Total (Estimated)</span>
                    <div className="text-lg font-extrabold text-content">ETB 2,420</div>
                  </div>
                  <span className="text-xs font-semibold text-content-muted">$19.80 USD</span>
                </div>
              </div>
            </div>

            <div className="pt-2 text-center">
              <Link
                href="/search"
                className={buttonClasses({
                  variant: "primary",
                  size: "md",
                  className: "px-8 py-3 text-sm font-bold shadow-md hover:scale-105 transition-all",
                })}
              >
                {dict.landing.hero.startSearching} →
              </Link>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
}
