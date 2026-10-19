"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";

import { LanguageToggle } from "./LanguageToggle";
import { ThemeToggle } from "./ThemeToggle";
import { Button, buttonClasses } from "@/components/ui/Button";

import { useDictionary } from "@/providers/LanguageProvider";

/**
 * App-wide header: wordmark on the left, authentication state and preference
 * toggles on the right. Rendered on both public and authenticated routes.
 */
export function Header() {
  const dict = useDictionary();
  const { data: session, status } = useSession();

  return (
    <header className="border-b border-line bg-surface-raised">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-4 px-4">
        <Link
          href="/"
          className="flex items-baseline gap-2 font-semibold tracking-tight"
        >
          <span className="text-accent text-lg">{dict.app.name}</span>
        </Link>

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
            <Link
              href="/login"
              className={buttonClasses({
                variant: "outline",
                size: "sm",
                className: "mr-1 text-xs",
              })}
            >
              {dict.auth.signIn}
            </Link>
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
