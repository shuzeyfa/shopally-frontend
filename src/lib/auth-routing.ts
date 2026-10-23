const APP_PATHS = ["/search", "/compare", "/saved", "/alerts", "/profile"];
const FALLBACK_PATH = "/search";

export function isAppPath(pathname: string): boolean {
  return APP_PATHS.some((path) => pathname === path || pathname.startsWith(`${path}/`));
}

/** Only return a local application destination, never a login loop or external URL. */
export function safeCallbackPath(value: string | null | undefined, origin = "https://shopally.invalid"): string {
  if (!value || [...value].some((character) => character === "\\" || character.charCodeAt(0) <= 32)) {
    return FALLBACK_PATH;
  }
  try {
    const destination = new URL(value, origin);
    if (destination.origin !== new URL(origin).origin || !isAppPath(destination.pathname)) {
      return FALLBACK_PATH;
    }
    return `${destination.pathname}${destination.search}${destination.hash}`;
  } catch {
    return FALLBACK_PATH;
  }
}

export function loginHref(callbackUrl?: string | null): string {
  return `/login?${new URLSearchParams({ callbackUrl: safeCallbackPath(callbackUrl) })}`;
}
