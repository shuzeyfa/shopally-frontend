import { AuthProvider } from "./AuthProvider";
import { LanguageProvider } from "./LanguageProvider";
import { StoreProvider } from "./StoreProvider";
import { ThemeProvider } from "./ThemeProvider";

import type { Locale, Theme } from "@/lib/preferences";

/**
 * Single composition point for every app-wide provider, so the root layout
 * stays readable and provider order lives in one place.
 *
 * Initial theme and locale are passed down from the server's cookie read.
 */
export function Providers({
  initialTheme,
  initialLocale,
  children,
}: {
  initialTheme: Theme;
  initialLocale: Locale;
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider initialTheme={initialTheme}>
      <LanguageProvider initialLocale={initialLocale}>
        <AuthProvider>
          <StoreProvider>{children}</StoreProvider>
        </AuthProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}
