"use client";

import { Button } from "@/components/ui/Button";
import { useDictionary } from "@/providers/LanguageProvider";
import { useTheme } from "@/providers/ThemeProvider";

function SunIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="size-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    >
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M19.1 4.9l-1.4 1.4M6.3 17.7l-1.4 1.4" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="size-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    >
      <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
    </svg>
  );
}

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const dict = useDictionary();

  const isDark = theme === "dark";

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleTheme}
      // The icon alone carries no text, so the control needs an accessible
      // name. aria-pressed communicates the on/off state to screen readers.
      aria-label={dict.actions.toggleTheme}
      title={dict.actions.toggleTheme}
      aria-pressed={isDark}
    >
      {isDark ? <MoonIcon /> : <SunIcon />}
      <span className="sr-only sm:not-sr-only">
        {isDark ? dict.theme.dark : dict.theme.light}
      </span>
    </Button>
  );
}
