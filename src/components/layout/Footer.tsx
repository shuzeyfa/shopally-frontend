"use client";

import { BackendStatus } from "./BackendStatus";

import { useDictionary } from "@/providers/LanguageProvider";

export function Footer() {
  const dict = useDictionary();
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-line bg-surface-raised">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-4 py-4 text-xs text-content-muted sm:flex-row">
        <p>
          &copy; {year} {dict.app.name}. {dict.footer.rights}
        </p>
        <BackendStatus />
      </div>
    </footer>
  );
}
