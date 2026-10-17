"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";

import { writePreferenceCookie } from "@/lib/cookies";
import { THEME_COOKIE, type Theme } from "@/lib/preferences";

interface ThemeContextValue {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

/**
 * Holds the active theme and keeps <html data-theme> in sync.
 *
 * `initialTheme` comes from the cookie the server already read, so the markup
 * arrives with the right theme applied and there is nothing to correct on
 * mount — no effect, no flash, no hydration mismatch. This provider only
 * reacts to user changes.
 */
export function ThemeProvider({
  initialTheme,
  children,
}: {
  initialTheme: Theme;
  children: React.ReactNode;
}) {
  const [theme, setThemeState] = useState<Theme>(initialTheme);

  const setTheme = useCallback((next: Theme) => {
    setThemeState(next);
    // The attribute drives every themed CSS custom property, so it must be
    // written directly rather than rendered — <html> is outside React's tree.
    document.documentElement.dataset.theme = next;
    document.documentElement.style.colorScheme = next;
    writePreferenceCookie(THEME_COOKIE, next);
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme(theme === "dark" ? "light" : "dark");
  }, [theme, setTheme]);

  const value = useMemo(
    () => ({ theme, setTheme, toggleTheme }),
    [theme, setTheme, toggleTheme],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme(): ThemeContextValue {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
