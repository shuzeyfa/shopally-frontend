"use client";

import Link from "next/link";
import Image from "next/image";
import { useDictionary } from "@/providers/LanguageProvider";

export function Footer() {
  const dict = useDictionary();
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer mt-auto bg-[#090c11] text-white dark:bg-[#111827]">
      <div className="mx-auto max-w-7xl px-6 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand, Tagline & Socials */}
          <div className="space-y-4">
            <Link href="/" className="inline-flex items-center gap-2 font-bold tracking-tight">
              <div className="flex h-7 w-7 items-center justify-center rounded-md bg-accent p-1 shadow-xs">
                <Image
                  src="/WebsiteLogo/Frame.png"
                  alt=""
                  width={28}
                  height={28}
                  className="h-full w-full object-contain"
                />
              </div>
              <span className="text-white text-lg font-bold">
                {dict.app.name}
              </span>
            </Link>
            <p className="text-xs sm:text-sm text-gray-300 max-w-sm leading-relaxed">
              {dict.footer.description}
            </p>
            <div className="flex items-center gap-3 pt-2">
              {/* Twitter / X */}
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter"
                className="flex h-8 w-8 items-center justify-center rounded-md bg-accent text-accent-content hover:opacity-85 transition shadow-xs"
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
                className="flex h-8 w-8 items-center justify-center rounded-md bg-accent text-accent-content hover:opacity-85 transition shadow-xs"
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
                className="flex h-8 w-8 items-center justify-center rounded-md bg-accent text-accent-content hover:opacity-85 transition shadow-xs"
              >
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h3 className="font-bold text-base text-white">
              {dict.footer.quickLinks}
            </h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>
                <a href="/landing#features" className="hover:text-accent transition-colors">
                  {dict.landing.nav.features}
                </a>
              </li>
              <li>
                <a href="/landing#how-it-works" className="hover:text-accent transition-colors">
                  {dict.landing.nav.howItWorks}
                </a>
              </li>
              <li>
                <a href="/landing#demo" className="hover:text-accent transition-colors">
                  {dict.landing.nav.demo}
                </a>
              </li>
              <li>
                <a href="/landing#testimonials" className="hover:text-accent transition-colors">
                  {dict.landing.nav.testimonials}
                </a>
              </li>
            </ul>
          </div>

          {/* Overview */}
          <div className="space-y-3">
            <h3 className="font-bold text-base text-white">
              {dict.footer.followUs}
            </h3>
            <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
              {dict.footer.followDescription}
            </p>
            <div className="flex size-8 items-center justify-center rounded bg-accent">
              <Image src="/WebsiteLogo/Frame.png" alt="" width={20} height={20} />
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-8 text-center text-xs text-gray-400">
          <p>
            &copy; {year} {dict.app.name}. {dict.footer.rights}
          </p>
        </div>
      </div>
    </footer>
  );
}
