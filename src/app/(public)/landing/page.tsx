"use client";

import Link from "next/link";

import { buttonClasses } from "@/components/ui/Button";
import { useDictionary } from "@/providers/LanguageProvider";

/**
 * Minimal public entry point.
 *
 * Intentionally sparse: the full landing page — hero, feature grid,
 * how-it-works, CTA and social footer — is built in Phase 3. This exists so
 * the (public) route group, theming and translation are verifiable now.
 */
export default function LandingPage() {
  const dict = useDictionary();

  return (
    <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col items-center justify-center gap-6 px-4 py-20 text-center">
      <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
        {dict.app.name}
      </h1>
      <p className="max-w-prose text-lg text-content-muted">
        {dict.app.tagline}
      </p>
      <Link
        href="/search"
        className={buttonClasses({ variant: "primary", className: "mt-2" })}
      >
        {dict.nav.search}
      </Link>
    </main>
  );
}
