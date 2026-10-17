import { PREFERENCE_COOKIE_MAX_AGE } from "./preferences";

/**
 * Writes a preference cookie from the browser.
 *
 * Not HttpOnly by design — these are display preferences the client needs to
 * set, and they hold nothing sensitive. SameSite=Lax keeps them off
 * cross-site requests while surviving normal navigation.
 */
export function writePreferenceCookie(name: string, value: string): void {
  if (typeof document === "undefined") return;

  const secure = window.location.protocol === "https:" ? "; Secure" : "";
  document.cookie =
    `${name}=${encodeURIComponent(value)}` +
    `; Path=/; Max-Age=${PREFERENCE_COOKIE_MAX_AGE}; SameSite=Lax${secure}`;
}
