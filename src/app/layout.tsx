import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { cookies } from "next/headers";
import "./globals.css";

import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import {
  DEFAULT_LOCALE,
  DEFAULT_THEME,
  LOCALE_COOKIE,
  THEME_COOKIE,
  isLocale,
  isTheme,
} from "@/lib/preferences";
import { Providers } from "@/providers/Providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ShopAlly — Your smart AI assistant for AliExpress shopping",
  description:
    "Find the right products on AliExpress with AI-powered matching, prices in ETB and USD, side-by-side comparison and price alerts.",
};

/**
 * Opt the root layout out of instant-navigation validation.
 *
 * `cookies()` below is request-bound data read at the document root, and Next
 * 16's Cache Components cannot prerender a tree that depends on it. The other
 * two documented fixes do not apply here: `<Suspense>` cannot wrap <html>, and
 * `"use cache"` cannot wrap a function that calls `cookies()`.
 *
 * This is the case the escape hatch exists for — request-time data high in the
 * tree with no meaningful static shell beneath it. Only this segment is opted
 * out; descendants are still validated.
 *
 * Revisit in Phase 3: if the landing page needs static generation for SEO, move
 * the theme read to a pre-paint client script (Next's documented fix for
 * `<html data-theme>`) and the locale into URL segments, then drop this.
 */
export const instant = false;

/**
 * Reads the theme and locale cookies on the server so `data-theme` and `lang`
 * are already correct in the first byte of HTML. That is what prevents a flash
 * of the wrong theme or language on reload, and it means no blocking inline
 * script is needed.
 */
export default async function RootLayout({ children }: LayoutProps<"/">) {
  const cookieStore = await cookies();

  const themeCookie = cookieStore.get(THEME_COOKIE)?.value;
  const localeCookie = cookieStore.get(LOCALE_COOKIE)?.value;

  const theme = isTheme(themeCookie) ? themeCookie : DEFAULT_THEME;
  const locale = isLocale(localeCookie) ? localeCookie : DEFAULT_LOCALE;

  return (
    <html
      lang={locale}
      data-theme={theme}
      // Tells the browser which scheme to use for its own UI: scrollbars,
      // form controls and the like.
      style={{ colorScheme: theme }}
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col font-sans">
        <Providers initialTheme={theme} initialLocale={locale}>
          <Header />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
