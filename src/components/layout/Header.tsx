"use client";

import Link from "next/link";

import { LanguageToggle } from "./LanguageToggle";
import { ThemeToggle } from "./ThemeToggle";

import { useDictionary } from "@/providers/LanguageProvider";

/**
 * App-wide header: wordmark on the left, preference toggles on the right.
 * Rendered on both public and authenticated routes.
 */
export function Header() {
  const dict = useDictionary();

  return (
    <header className="border-b border-line bg-surface-raised">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-4 px-4">
        <Link
          href="/"
          className="flex items-baseline gap-2 font-semibold tracking-tight"
        >
          <span className="text-accent">{dict.app.name}</span>
        </Link>

        <div className="flex items-center gap-1">
          <LanguageToggle />
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
