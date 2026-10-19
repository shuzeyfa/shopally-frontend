"use client";

import Link from "next/link";
import { BackendStatus } from "./BackendStatus";
import { useDictionary } from "@/providers/LanguageProvider";

export function Footer() {
  const dict = useDictionary();
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-line bg-surface-raised">
      <div className="mx-auto max-w-6xl px-4 py-8">
        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
          {/* Brand & Tagline */}
          <div className="text-center sm:text-left">
            <Link href="/" className="text-lg font-bold tracking-tight text-accent">
              {dict.app.name}
            </Link>
            <p className="mt-1 text-xs text-content-muted max-w-sm">
              {dict.app.tagline}
            </p>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            {/* Twitter / X */}
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Twitter"
              className="text-content-muted hover:text-accent transition-colors"
            >
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>

            {/* LinkedIn */}
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="text-content-muted hover:text-accent transition-colors"
            >
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
              </svg>
            </a>

            {/* Facebook */}
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="text-content-muted hover:text-accent transition-colors"
            >
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
              </svg>
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-8 flex flex-col items-center justify-between gap-4 border-t border-line pt-4 text-xs text-content-muted sm:flex-row">
          <p>
            &copy; {year} {dict.app.name}. {dict.footer.rights}
          </p>
          <BackendStatus />
        </div>
      </div>
    </footer>
  );
}
