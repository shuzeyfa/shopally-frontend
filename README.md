# ShopAlly Frontend

Next.js app for ShopAlly — an AI shopping assistant for AliExpress. Pairs with
the Go API in [shopally-backend](https://github.com/shuzeyfa/shopally-backend).

Next 16 (App Router) · React 19 · TypeScript · Tailwind 4 · Redux Toolkit +
RTK Query.

## Quick start

```bash
cp .env.example .env.local     # adjust if the API is not on :8080
npm install
npm run dev                    # http://localhost:3000
```

The API must be running for the footer status indicator to turn green:

```bash
cd ../shopally-backend
docker compose up -d
go run ./cmd/api
```

## Architecture

```
src/
  app/
    (public)/landing/    public marketing route
    (app)/               signed-in area: search, compare, saved, alerts, profile
    layout.tsx           reads preference cookies, mounts providers
  components/
    layout/              Header, Sidebar, Footer, toggles, BackendStatus
    ui/                  Button, Card
  lib/
    api/                 RTK Query base + endpoints
    i18n/                translation dictionaries
    preferences.ts       locale/theme constants, shared server and client
    store.ts             per-request Redux store
  types/                 mirrors the backend's pkg/domain
```

### Theme and language live in cookies

Both preferences are cookies, not `localStorage`, so the **server** reads them
in `src/app/layout.tsx` and emits the correct `data-theme` and `lang` on
`<html>` in the first byte of HTML. There is no flash of the wrong theme or
language on reload, and no blocking inline script.

The trade-off: reading cookies in the root layout makes every route render per
request, and the layout opts out of Next 16's instant-navigation validation
(`export const instant = false`) to allow it. If the landing page later needs
static generation for SEO, move the theme read to a pre-paint client script and
the locale into URL segments, then remove that opt-out.

### Theming

Semantic tokens are defined once in `src/app/globals.css` — `--surface`,
`--content`, `--accent` and friends — under `:root` and `[data-theme="dark"]`,
then mapped into Tailwind's color namespace via `@theme inline`. Components use
`bg-surface` and `text-content` rather than raw colors, so a palette change
touches one file.

`dark:` utilities also work: the stylesheet registers a custom variant bound to
the `data-theme` attribute instead of `prefers-color-scheme`.

### Translations

`src/lib/i18n/dictionaries.ts` holds English as the source of truth and derives
`Dictionary` from it. Every other locale is annotated with that type, so a
missing or misspelled key fails the build instead of rendering blank.

Consumed as a typed object (`dict.nav.search`), not a `t("nav.search")` lookup —
real autocomplete, no runtime path resolver.

> The Amharic strings are machine-assisted and have **not** been reviewed by a
> native speaker. Worth a pass before this reaches users.

### API calls

All backend traffic goes through RTK Query. The base query in
`src/lib/api/baseApi.ts` unwraps the backend's `{ data, error }` envelope, so
endpoints declare their payload type directly and a non-null `error` surfaces
as a failure even on HTTP 200.

Transport failures get their own codes: `NETWORK_ERROR` (backend down or CORS
rejection — indistinguishable from JS by design), `TIMEOUT`,
`INVALID_RESPONSE`.

Feature endpoints attach with `injectEndpoints` so each feature owns its file.

## Scripts

```bash
npm run dev
npm run build
npm run lint
```

## Not built yet

Auth (NextAuth + Google), the full landing page, search, compare, saved items
and alerts. The `(app)` routes are placeholders and **nothing is access-gated**
— route protection arrives with auth.
