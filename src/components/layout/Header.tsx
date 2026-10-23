"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { AuthEntryLink } from "@/components/auth/AuthEntryLink";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";

import { LanguageToggle } from "./LanguageToggle";
import { ThemeToggle } from "./ThemeToggle";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/cn";
import { useDictionary } from "@/providers/LanguageProvider";

/**
 * App-wide header matching shopally-ai:
 * - Left: Branded square logo + wordmark
 * - Center: Centered navigation with dynamic scroll-spy active state
 * - Right: Action buttons (Sign in, Get Started) & preference toggles
 * - Mobile: Sleek responsive hamburger menu & dropdown navigation drawer
 */
export function Header() {
  const dict = useDictionary();
  const pathname = usePathname();
  const { data: session, status } = useSession();

  const [rawActiveSection, setRawActiveSection] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [prevPathname, setPrevPathname] = useState(pathname);

  // Auto-close mobile menu on route change during render without effect cascading
  if (prevPathname !== pathname) {
    setPrevPathname(pathname);
    setIsMobileMenuOpen(false);
  }

  const isPublicLanding = pathname === "/" || pathname === "/landing";
  const activeSection = isPublicLanding ? rawActiveSection : null;

  const navItems = [
    { id: "features", label: dict.landing.nav.features },
    { id: "how-it-works", label: dict.landing.nav.howItWorks },
    { id: "demo", label: dict.landing.nav.demo },
    { id: "testimonials", label: dict.landing.nav.testimonials },
  ];

  // Scroll spy to highlight whichever section is currently in view
  useEffect(() => {
    if (!isPublicLanding) {
      return;
    }

    const sectionIds = ["features", "how-it-works", "demo", "testimonials"];

    const handleScroll = () => {
      // 140px offset to account for sticky header height
      const scrollPos = window.scrollY + 140;

      let current: string | null = null;
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            current = id;
            break;
          }
        }
      }
      setRawActiveSection((prev) => (prev !== current ? current : prev));
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [isPublicLanding]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  // Smooth scroll handler for anchor links
  const handleAnchorClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
      const target = document.getElementById(id);
      if (target) {
        e.preventDefault();
        setIsMobileMenuOpen(false);
        target.scrollIntoView({ behavior: "smooth" });
      }
    },
    [],
  );

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-surface/90 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-4 px-4 relative">
        {/* Left: Brand Logo */}
        <Link
          href="/"
          className="flex items-center gap-2.5 font-bold tracking-tight z-10"
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

        {/* Center: Desktop Navigation Links (Centered) */}
        {isPublicLanding && (
          <nav className="hidden md:flex items-center gap-7 text-sm font-medium absolute left-1/2 -translate-x-1/2">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={(e) => handleAnchorClick(e, item.id)}
                  className={cn(
                    "transition-all duration-150 py-1 relative hover:text-accent",
                    isActive
                      ? "text-accent font-bold"
                      : "text-content-muted font-medium hover:text-content",
                  )}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-accent rounded-full transition-all" />
                  )}
                </a>
              );
            })}
          </nav>
        )}

        {/* Right: Auth Actions, Preferences & Mobile Hamburger */}
        <div className="flex items-center gap-2 z-10">
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
                className="text-xs text-content-muted hover:text-content hidden sm:inline-flex"
              >
                {dict.auth.signOut}
              </Button>
            </div>
          ) : status === "unauthenticated" ? (
            <div className="flex items-center gap-2 mr-1">
              <AuthEntryLink
                className="text-xs font-medium text-content-muted hover:text-content px-2 py-1 hidden sm:inline-block"
              >
                {dict.auth.signIn}
              </AuthEntryLink>
              <AuthEntryLink
                className="hidden sm:inline-flex items-center justify-center rounded-md bg-accent px-3 py-1.5 text-xs font-bold text-accent-content shadow-xs transition-transform hover:scale-105"
              >
                {dict.landing.hero.startSearching}
              </AuthEntryLink>
            </div>
          ) : null}

          {/* Desktop Language & Theme Toggles */}
          <div className="hidden sm:flex items-center gap-1">
            <LanguageToggle />
            <ThemeToggle />
          </div>

          {/* Mobile Hamburger Toggle Button */}
          {isPublicLanding && (
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen((prev) => !prev)}
              className="md:hidden flex h-9 w-9 items-center justify-center rounded-md border border-line bg-surface text-content hover:bg-surface-muted transition-colors focus:outline-none"
              aria-label={dict.actions.openMenu}
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? (
                <svg
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          )}
        </div>
      </div>

      {/* Full-screen Backdrop overlay blur for mobile menu */}
      {isPublicLanding && isMobileMenuOpen && (
        <div
          aria-hidden="true"
          onClick={() => setIsMobileMenuOpen(false)}
          className="fixed inset-x-0 bottom-0 top-14 -z-10 bg-black/60 backdrop-blur-md md:hidden transition-opacity duration-200"
        />
      )}

      {/* Mobile Navigation Drawer */}
      {isPublicLanding && isMobileMenuOpen && (
        <div className="md:hidden relative z-20 border-b border-line bg-surface/98 px-5 py-6 shadow-2xl backdrop-blur-2xl animate-in slide-in-from-top-2 duration-200">
          <nav className="flex flex-col space-y-3">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={(e) => handleAnchorClick(e, item.id)}
                  className={cn(
                    "flex items-center justify-between rounded-lg px-3 py-2.5 text-base font-semibold transition-colors",
                    isActive
                      ? "bg-accent/15 text-accent"
                      : "text-content hover:bg-surface-muted",
                  )}
                >
                  <span>{item.label}</span>
                  {isActive && (
                    <span className="h-2 w-2 rounded-full bg-accent" />
                  )}
                </a>
              );
            })}
          </nav>

          <div className="mt-6 pt-5 border-t border-line space-y-4">
            {/* Primary Action Button */}
            <AuthEntryLink
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex w-full items-center justify-center rounded-lg bg-accent py-3 text-center text-sm font-bold text-accent-content shadow-md transition-transform active:scale-98"
            >
              {dict.landing.hero.startSearching}
            </AuthEntryLink>

            {/* Auth / Preferences Controls */}
            <div className="flex items-center justify-between pt-1 text-sm">
              <AuthEntryLink
                onClick={() => setIsMobileMenuOpen(false)}
                className="font-medium text-content-muted hover:text-content"
              >
                {dict.auth.signIn}
              </AuthEntryLink>

              <div className="flex items-center gap-2">
                <LanguageToggle />
                <ThemeToggle />
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
