"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";

import { writePreferenceCookie } from "@/lib/cookies";
import { getDictionary, type Dictionary } from "@/lib/i18n/dictionaries";
import { LOCALE_COOKIE, type Locale } from "@/lib/preferences";

interface LanguageContextValue {
  locale: Locale;
  /** Strings for the active locale. Access as `dict.nav.search`. */
  dict: Dictionary;
  setLocale: (locale: Locale) => void;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

/**
 * Holds the active locale and the matching dictionary.
 *
 * As with the theme, `initialLocale` comes from the cookie the server read, so
 * the first paint is already in the right language — no flash of English
 * before Amharic loads.
 */
export function LanguageProvider({
  initialLocale,
  children,
}: {
  initialLocale: Locale;
  children: React.ReactNode;
}) {
  const [locale, setLocaleState] = useState<Locale>(initialLocale);

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next);
    // Keep <html lang> accurate: screen readers and the browser's own
    // translation prompt both key off it.
    document.documentElement.lang = next;
    writePreferenceCookie(LOCALE_COOKIE, next);
  }, []);

  const value = useMemo(
    () => ({ locale, dict: getDictionary(locale), setLocale }),
    [locale, setLocale],
  );

  return (
    <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
  );
}

export function useLanguage(): LanguageContextValue {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}

/** Convenience for components that only need strings. */
export function useDictionary(): Dictionary {
  return useLanguage().dict;
}
