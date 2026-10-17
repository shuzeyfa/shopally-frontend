import type { Locale } from "@/lib/preferences";

/**
 * English is the source of truth. `Dictionary` is derived from it, and every
 * other locale is annotated with that type — so omitting or misspelling a key
 * in a translation is a compile error rather than a missing string at runtime.
 *
 * The dictionary is consumed as a plain nested object (`dict.nav.search`)
 * rather than through a `t("nav.search")` lookup. That gives real autocomplete
 * and type checking, and needs no runtime path resolver.
 *
 * Scope is deliberately limited to what the app shell renders. Landing and
 * search copy arrives with those features.
 */
const en = {
  app: {
    name: "ShopAlly",
    tagline: "Your smart AI assistant for AliExpress shopping",
  },
  nav: {
    primary: "Main navigation",
    search: "Search",
    compare: "Compare",
    saved: "Saved",
    alerts: "Alerts",
    profile: "Profile",
  },
  actions: {
    toggleTheme: "Switch theme",
    toggleLanguage: "Switch language",
    goHome: "Back to home",
    openMenu: "Open menu",
  },
  theme: {
    light: "Light",
    dark: "Dark",
  },
  language: {
    label: "Language",
  },
  api: {
    label: "API",
    checking: "Checking",
    ok: "Connected",
    degraded: "Degraded",
    unreachable: "Unreachable",
  },
  notFound: {
    title: "Page not found",
    description: "The page you are looking for does not exist or has moved.",
  },
  placeholder: {
    comingSoon: "Coming soon",
    description: "This screen is not built yet.",
  },
  footer: {
    rights: "All rights reserved.",
  },
};

/**
 * The shape every locale must provide.
 *
 * `en` is deliberately not `as const`: that would make each value a literal
 * type, and `Dictionary` would then demand the exact English strings rather
 * than just the same set of keys.
 */
export type Dictionary = typeof en;

/**
 * Amharic. Machine-assisted and not reviewed by a native speaker — worth a
 * pass from someone fluent before this ships to users.
 */
const am: Dictionary = {
  app: {
    name: "ሾፓሊ",
    tagline: "ለአሊኤክስፕረስ ግዢዎ ብልጥ የ AI አጋዥ",
  },
  nav: {
    primary: "ዋና ዳሰሳ",
    search: "ፍለጋ",
    compare: "ማወዳደሪያ",
    saved: "የተቀመጡ",
    alerts: "ማሳወቂያዎች",
    profile: "መገለጫ",
  },
  actions: {
    toggleTheme: "ገጽታ ይቀይሩ",
    toggleLanguage: "ቋንቋ ይቀይሩ",
    goHome: "ወደ መነሻ ይመለሱ",
    openMenu: "ምናሌ ይክፈቱ",
  },
  theme: {
    light: "ብርሃን",
    dark: "ጨለማ",
  },
  language: {
    label: "ቋንቋ",
  },
  api: {
    label: "ኤ ፒ አይ",
    checking: "በመፈተሽ ላይ",
    ok: "ተገናኝቷል",
    degraded: "በከፊል ይሰራል",
    unreachable: "አይገኝም",
  },
  notFound: {
    title: "ገጹ አልተገኘም",
    description: "የሚፈልጉት ገጽ የለም ወይም ተዛውሯል።",
  },
  placeholder: {
    comingSoon: "በቅርቡ ይመጣል",
    description: "ይህ ገጽ እስካሁን አልተዘጋጀም።",
  },
  footer: {
    rights: "መብቱ በሕግ የተጠበቀ ነው።",
  },
};

export const dictionaries: Record<Locale, Dictionary> = { en, am };

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}
