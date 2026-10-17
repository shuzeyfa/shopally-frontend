"use client";

import { Button } from "@/components/ui/Button";
import { LOCALE_LABELS, LOCALE_SHORT_LABELS, type Locale } from "@/lib/preferences";
import { useLanguage } from "@/providers/LanguageProvider";

export function LanguageToggle() {
  const { locale, dict, setLocale } = useLanguage();

  // With exactly two locales a toggle beats a dropdown. Revisit if a third
  // language is added.
  const next: Locale = locale === "en" ? "am" : "en";

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={() => setLocale(next)}
      // Name the destination language rather than just "switch language", so
      // the control says what it will do.
      aria-label={`${dict.actions.toggleLanguage}: ${LOCALE_LABELS[next]}`}
      title={LOCALE_LABELS[next]}
    >
      <span aria-hidden="true">{LOCALE_SHORT_LABELS[locale]}</span>
    </Button>
  );
}
