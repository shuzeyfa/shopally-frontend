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

## Deploy

Connect this repository to Vercel and keep the project root at the repository
root; Vercel detects the Next.js app automatically. Set these Production
environment variables in the Vercel project settings before deploying:

| Variable | Value |
|---|---|
| `NEXT_PUBLIC_API_URL` | The backend origin, such as `https://shopally-api.onrender.com` (no path or trailing slash) |
| `NEXTAUTH_URL` | The production Vercel origin, such as `https://shopally.example.com` |
| `NEXTAUTH_SECRET` | A new random secret; generate with `openssl rand -base64 32` |
| `AUTH_JWT_SECRET` | The same dedicated token-signing secret configured on the backend |
| `GOOGLE_CLIENT_ID` / `GOOGLE_CLIENT_SECRET` | Google OAuth web client credentials |

Add `https://<your-production-domain>/api/auth/callback/google` as an
authorized redirect URI in the Google OAuth client. Configure the backend's
`CORS_ALLOWED_ORIGINS` to the exact frontend origin. Preview domains must also
be explicitly allowlisted before they can call the API.

The backend repository includes a Render Blueprint and multi-target Docker
image. Create its web service and worker, then provide the MongoDB Atlas URI,
Upstash Redis host/port/password, and the matching JWT signing secret when the
Blueprint prompts for them. The worker uses a paid Render Starter plan in the
Blueprint; review the selected plan and account billing before provisioning.
Deployment is not triggered by this repository configuration.

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

## Current status

The app includes Google auth, landing, search, compare, saved items, price
alerts, and a profile page with account totals and persisted theme/language
preferences. The real AliExpress and LLM integrations remain mock-first. The
backend's `render.yaml` prepares the hosted API and worker services, but you
must connect accounts, enter provider credentials, and initiate each deploy.

### Authentication regression checks

Google OAuth is the only sign-in provider. The former passwordless demo provider
has been removed; its existing session cookies and API tokens are rejected.
Deploy the backend and frontend changes together to enforce that retirement.

After `npm run build`, run `npm run test:auth`. These HTTP integration tests start
an isolated production server with temporary signing secrets and check provider
availability, legacy-session rejection, protected routes, callback destinations,
and landing-page entry links. They do not use Google credentials or production data.

### Foundation regression checks

After `npm run build`, run `npm run test:foundations`. These checks cover
strict API envelopes, request timeouts, localized errors and product labels,
preference cookie attributes, per-request Redux isolation, and EN/Amharic
server-rendered HTML across reloads and separate visitors.

The API transport rejects malformed envelopes with `INVALID_RESPONSE` and
bounds backend requests to 30 seconds. Shared UI errors are selected by code
from the active dictionary; provider messages do not override the UI language.
Redux browser listeners are attached after mount and removed on unmount.
