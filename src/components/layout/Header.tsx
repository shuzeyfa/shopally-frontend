"use client";

import { useState, useEffect, useRef } from "react";
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
  const headerRef = useRef<HTMLElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

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

  useEffect(() => {
    if (!isPublicLanding) return;
    let frame = 0;
    const update = () => {
      const offset = (headerRef.current?.offsetHeight ?? 68) + 24;
      const ids = ["features", "how-it-works", "demo", "testimonials"];
      const current = ids.find((id) => {
        const rect = document.getElementById(id)?.getBoundingClientRect();
        return rect && rect.top <= offset && rect.bottom > offset;
      }) ?? null;
      setRawActiveSection((previous) => previous === current ? previous : current);
    };
    const schedule = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(update);
    };
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    schedule();
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [isPublicLanding]);

  useEffect(() => {
    if (!isMobileMenuOpen) return;
    const menu = menuRef.current;
    const toggle = toggleRef.current;
    const previousOverflow = document.body.style.overflow;
    const desktop = window.matchMedia("(min-width: 1024px)");
    const closeAtDesktop = () => { if (desktop.matches) setIsMobileMenuOpen(false); };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setIsMobileMenuOpen(false);
        toggle?.focus();
      }
      if (event.key === "Tab" && menu && toggle) {
        const controls = [toggle, ...menu.querySelectorAll<HTMLElement>("a[href], button:not(:disabled)")];
        const first = controls[0];
        const last = controls[controls.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault(); last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault(); first.focus();
        }
      }
    };
    document.body.style.overflow = "hidden";
    menu?.querySelector<HTMLElement>("a[href]")?.focus();
    document.addEventListener("keydown", onKeyDown);
    desktop.addEventListener("change", closeAtDesktop);
    closeAtDesktop();
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
      desktop.removeEventListener("change", closeAtDesktop);
    };
  }, [isMobileMenuOpen]);

  // Native anchors preserve hash navigation; CSS supplies motion and offset.
  const handleAnchorClick = () => setIsMobileMenuOpen(false);

  return (
    <header ref={headerRef} className="site-header sticky top-0 z-50 border-b border-line bg-surface">
      <div className="relative z-20 mx-auto flex h-17 items-center justify-between gap-3 bg-surface px-6">
        {/* Left: Brand Logo */}
        <Link
          href="/"
          aria-label={dict.app.name}
          className="flex items-center gap-2.5 font-bold tracking-tight z-10"
        >
          <div className="flex h-6 w-6 lg:h-8 lg:w-8 items-center justify-center rounded-md bg-accent p-1 shadow-xs">
            <Image
              src="/WebsiteLogo/Frame.png"
              alt=""
              width={28}
              height={28}
              className="h-full w-full object-contain"
            />
          </div>
          <span className="hidden text-content text-xl font-bold lg:inline">
            {dict.app.name}
          </span>
        </Link>

        {/* Center: Desktop Navigation Links (Centered) */}
        {isPublicLanding && (
          <nav aria-label={dict.nav.primary} className="hidden lg:flex items-center gap-6 text-sm font-medium absolute left-1/2 -translate-x-1/2">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  aria-current={isActive ? "location" : undefined}
                  onClick={handleAnchorClick}
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
                className="text-xs text-content-muted hover:text-content"
              >
                {dict.auth.signOut}
              </Button>
            </div>
          ) : status === "unauthenticated" ? (
            <div className="flex items-center gap-2 mr-1">
              <AuthEntryLink
                className={cn("text-xs font-medium text-content-muted hover:text-content px-2 py-1", isPublicLanding ? "hidden" : "hidden sm:inline-block")}
              >
                {dict.auth.signIn}
              </AuthEntryLink>
              <AuthEntryLink
                className="inline-flex items-center justify-center rounded bg-accent px-4 py-2 text-sm font-semibold text-accent-content shadow-lg motion-safe:hover:scale-105"
              >
                {dict.landing.hero.startSearching}
              </AuthEntryLink>
            </div>
          ) : null}

          {/* Desktop Language & Theme Toggles */}
          <div className={cn("items-center gap-1", isPublicLanding ? "hidden sm:flex" : "flex")}>
            <LanguageToggle />
            <ThemeToggle compact={isPublicLanding} />
          </div>

          {/* Mobile Hamburger Toggle Button */}
          {isPublicLanding && (
            <button
              type="button"
              ref={toggleRef}
              onClick={() => setIsMobileMenuOpen((prev) => !prev)}
              className="lg:hidden flex h-9 w-9 items-center justify-center rounded-md border border-line bg-surface text-content hover:bg-surface-muted transition-colors"
              aria-label={isMobileMenuOpen ? dict.actions.closeMenu : dict.actions.openMenu}
              aria-controls="mobile-navigation"
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
          onClick={() => { setIsMobileMenuOpen(false); toggleRef.current?.focus(); }}
          className="fixed inset-x-0 bottom-0 top-17 z-10 bg-black/60 backdrop-blur-md lg:hidden"
        />
      )}

      {/* Mobile Navigation Drawer */}
      {isPublicLanding && isMobileMenuOpen && (
        <div ref={menuRef} id="mobile-navigation" className="absolute inset-x-0 top-full z-20 max-h-[calc(100dvh-4.25rem)] overflow-y-auto border-b border-line bg-surface px-5 py-6 shadow-2xl lg:hidden">
          <nav aria-label={dict.nav.primary} className="flex flex-col space-y-3">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  aria-current={isActive ? "location" : undefined}
                  onClick={handleAnchorClick}
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
              {status === "authenticated" ? (
                <button type="button" onClick={() => void signOut({ callbackUrl: "/landing" })}
                  className="font-medium text-content-muted hover:text-content">
                  {dict.auth.signOut}
                </button>
              ) : (
                <AuthEntryLink onClick={() => setIsMobileMenuOpen(false)}
                  className="font-medium text-content-muted hover:text-content">
                  {dict.auth.signIn}
                </AuthEntryLink>
              )}

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
