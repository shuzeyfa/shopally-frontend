"use client";

import Link from "next/link";

import { buttonClasses } from "@/components/ui/Button";
import { useDictionary } from "@/providers/LanguageProvider";

export default function NotFound() {
  const dict = useDictionary();

  return (
    <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col items-center justify-center gap-4 px-4 py-16 text-center">
      <p className="text-5xl font-semibold text-accent">404</p>
      <h1 className="text-2xl font-semibold tracking-tight">
        {dict.notFound.title}
      </h1>
      <p className="max-w-prose text-sm text-content-muted">
        {dict.notFound.description}
      </p>
      <Link href="/" className={buttonClasses({ variant: "primary" })}>
        {dict.actions.goHome}
      </Link>
    </main>
  );
}
