"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";

import { Card } from "@/components/ui/Card";
import { useGetAlertsQuery } from "@/lib/api/alertsApi";
import { useGetSavedItemsQuery } from "@/lib/api/savedApi";
import { useLanguage } from "@/providers/LanguageProvider";
import { useTheme } from "@/providers/ThemeProvider";

export default function ProfilePage() {
  const dict = useLanguage().dict;
  const { locale, setLocale } = useLanguage();
  const { theme, setTheme } = useTheme();
  const { data: session, status } = useSession();
  const {
    data: savedItems,
    isLoading: savedLoading,
    isError: savedError,
  } = useGetSavedItemsQuery();
  const {
    data: alerts,
    isLoading: alertsLoading,
    isError: alertsError,
  } = useGetAlertsQuery();

  const isLoading = status === "loading" || savedLoading || alertsLoading;
  const hasTotalsError = savedError || alertsError;
  const displayName = session?.user?.name || session?.user?.email || "ShopAlly shopper";
  const initials = displayName
    .split(/[\s@._-]+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");

  return (
    <main className="mx-auto w-full max-w-6xl space-y-6 px-4 py-8 sm:px-6 lg:px-8">
      <header>
        <h1 className="text-2xl font-bold text-content">{dict.nav.profile}</h1>
        <p className="mt-1 text-sm text-content-muted">{dict.profilePage.subtitle}</p>
      </header>

      <section aria-labelledby="profile-account-heading">
        <h2 id="profile-account-heading" className="mb-3 text-lg font-semibold text-content">
          {dict.profilePage.account}
        </h2>
        <Card className="flex items-center gap-4 p-5">
          <div
            aria-hidden="true"
            className="flex size-14 shrink-0 items-center justify-center rounded-full bg-accent text-lg font-semibold text-accent-content"
          >
            {initials || "S"}
          </div>
          <div className="min-w-0">
            <p className="truncate font-semibold text-content">{displayName}</p>
            {session?.user?.email && session.user.email !== displayName && (
              <p className="mt-0.5 truncate text-sm text-content-muted">{session.user.email}</p>
            )}
            <p className="mt-1 text-xs text-content-muted">
              {dict.profilePage.signedInAs} {session?.user?.email || displayName}
            </p>
          </div>
        </Card>
      </section>

      <section aria-label={dict.profilePage.savedCount + " & " + dict.profilePage.alertCount}>
        <div className="grid gap-4 sm:grid-cols-2">
          <Link href="/saved" className="rounded-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent">
            <Card className="h-full transition-colors hover:border-accent/50">
              <p className="text-sm text-content-muted">{dict.profilePage.savedCount}</p>
              <p className="mt-2 text-3xl font-bold text-content">
                {isLoading ? "—" : savedItems?.length ?? "—"}
              </p>
            </Card>
          </Link>
          <Link href="/alerts" className="rounded-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent">
            <Card className="h-full transition-colors hover:border-accent/50">
              <p className="text-sm text-content-muted">{dict.profilePage.alertCount}</p>
              <p className="mt-2 text-3xl font-bold text-content">
                {isLoading ? "—" : alerts?.length ?? "—"}
              </p>
            </Card>
          </Link>
        </div>
        {hasTotalsError && <p className="mt-2 text-sm text-content-muted" role="status">{dict.profilePage.unavailable}</p>}
      </section>

      <section aria-labelledby="profile-preferences-heading">
        <h2 id="profile-preferences-heading" className="mb-3 text-lg font-semibold text-content">
          {dict.profilePage.preferences}
        </h2>
        <Card className="grid gap-5 p-5 sm:grid-cols-2">
          <label className="block text-sm font-medium text-content">
            {dict.profilePage.appearance}
            <select
              className="mt-2 h-10 w-full rounded-md border border-line bg-surface-raised px-3 text-content"
              value={theme}
              onChange={(event) => setTheme(event.target.value as "light" | "dark")}
            >
              <option value="light">{dict.profilePage.light}</option>
              <option value="dark">{dict.profilePage.dark}</option>
            </select>
          </label>
          <label className="block text-sm font-medium text-content">
            {dict.profilePage.language}
            <select
              className="mt-2 h-10 w-full rounded-md border border-line bg-surface-raised px-3 text-content"
              value={locale}
              onChange={(event) => setLocale(event.target.value as "en" | "am")}
            >
              <option value="en">{dict.profilePage.english}</option>
              <option value="am">{dict.profilePage.amharic}</option>
            </select>
          </label>
        </Card>
      </section>
    </main>
  );
}
