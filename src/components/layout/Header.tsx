"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";

import { LanguageToggle } from "./LanguageToggle";
import { ThemeToggle } from "./ThemeToggle";
import { Button } from "@/components/ui/Button";

import { useDictionary } from "@/providers/LanguageProvider";

/**
 * App-wide header matching the live ShopAlly reference:
 * - Yellow branded square logo + wordmark
 * - Anchor navigation links when on public landing page
 * - Preference toggles (Language + Theme)
 * - Sign in / Get Started actions
 */
export function Header() {
  const dict = useDictionary();
  const pathname = usePathname();
  const { data: session, status } = useSession();

  const isPublicLanding = pathname === "/" || pathname === "/landing";

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-surface/90 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-4 px-4">
        <div className="flex items-center gap-6">
          <Link
            href="/"
            className="flex items-center gap-2.5 font-bold tracking-tight"
          >
            <div className="flex h-7 w-7 items-center justify-center rounded-md bg-accent p-1 shadow-xs">
              <Image
                src="/WebsiteLogo/Frame.png"
                alt="ShopAlly Logo"
                width={28}
                height={28}
                className="h-full w-full object-contain"
              />
            </div>
            <span className="text-content text-lg font-bold">
              {dict.app.name}
            </span>
          </Link>

          {isPublicLanding && (
            <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
              <a
                href="#features"
                className="text-accent hover:underline transition-colors font-semibold"
              >
                {dict.landing.nav.features}
              </a>
              <a
                href="#how-it-works"
                className="text-content-muted hover:text-accent transition-colors"
              >
                {dict.landing.nav.howItWorks}
              </a>
              <a
                href="#demo"
                className="text-content-muted hover:text-accent transition-colors"
              >
                {dict.landing.nav.demo}
              </a>
              <a
                href="#testimonials"
                className="text-content-muted hover:text-accent transition-colors"
              >
                {dict.landing.nav.testimonials}
              </a>
            </nav>
          )}
        </div>

        <div className="flex items-center gap-2">
          {status === "authenticated" ? (
            <div className="flex items-center gap-2 mr-1">
              <Link
                href="/profile"
                className="text-xs font-medium text-content hover:text-accent hidden sm:inline-block max-w-[150px] truncate"
                title={session.user?.email || session.user?.name || ""}
              >
                {session.user?.name || session.user?.email}
              </Link>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => signOut({ callbackUrl: "/landing" })}
                className="text-xs text-content-muted hover:text-content"
              >
                {dict.auth.signOut}
              </Button>
            </div>
          ) : status === "unauthenticated" ? (
            <div className="flex items-center gap-2 mr-1">
              <Link
                href="/login"
                className="text-xs font-medium text-content-muted hover:text-content px-2 py-1"
              >
                {dict.auth.signIn}
              </Link>
              <Link
                href="/login"
                className="hidden sm:inline-flex items-center justify-center rounded-md bg-accent px-3 py-1.5 text-xs font-bold text-accent-content shadow-xs transition-transform hover:scale-105"
              >
                {dict.landing.hero.startSearching}
              </Link>
            </div>
          ) : null}

          <div className="flex items-center gap-1">
            <LanguageToggle />
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  );
}
