/**
 * Locale and theme constants shared by the server (root layout, reading
 * cookies) and the client (providers and toggles).
 *
 * This module must stay free of React and of browser-only APIs so both
 * environments can import it.
 */

export const LOCALES = ["en", "am"] as const;
export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = "en";

/** Each locale's name in its own language, for the switcher. */
export const LOCALE_LABELS: Record<Locale, string> = {
  en: "English",
  am: "አማርኛ",
};

/** Short code shown in the compact toggle. */
export const LOCALE_SHORT_LABELS: Record<Locale, string> = {
  en: "EN",
  am: "አማ",
};

export const THEMES = ["light", "dark"] as const;
export type Theme = (typeof THEMES)[number];

export const DEFAULT_THEME: Theme = "light";

/**
 * Cookie names. Cookies rather than localStorage so the root layout can read
 * them during SSR and emit the correct `data-theme` and `lang` on <html>,
 * which avoids a flash of the wrong theme or language on reload.
 */
export const THEME_COOKIE = "shopally_theme";
export const LOCALE_COOKIE = "shopally_locale";

/** One year, in seconds. */
export const PREFERENCE_COOKIE_MAX_AGE = 60 * 60 * 24 * 365;

export function isLocale(value: unknown): value is Locale {
  return typeof value === "string" && (LOCALES as readonly string[]).includes(value);
}

export function isTheme(value: unknown): value is Theme {
  return typeof value === "string" && (THEMES as readonly string[]).includes(value);
}
