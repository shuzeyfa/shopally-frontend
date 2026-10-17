"use client";

import { errorStatus } from "@/lib/api/errors";
import { useGetHealthQuery } from "@/lib/api/healthApi";
import { cn } from "@/lib/cn";
import { useDictionary } from "@/providers/LanguageProvider";

type Health = "checking" | "ok" | "degraded" | "unreachable";

const DOT_CLASSES: Record<Health, string> = {
  checking: "bg-content-muted animate-pulse",
  ok: "bg-positive",
  degraded: "bg-caution",
  unreachable: "bg-negative",
};

/**
 * Shows whether the API is reachable from the browser.
 *
 * Beyond being useful, this is the end-to-end proof that the two repos talk:
 * a green dot means the API is up, the envelope unwrapping works,
 * NEXT_PUBLIC_API_URL is correct, and this origin is in the backend's CORS
 * allowlist. A red dot during local development is almost always one of the
 * last two.
 */
export function BackendStatus() {
  const dict = useDictionary();
  const { data, error, isLoading } = useGetHealthQuery();

  let state: Health = "checking";
  if (!isLoading) {
    if (error) {
      // /healthz answers 503 with a valid body when a dependency is down, so
      // RTK Query reports it as an error. That is "degraded", not "down".
      state = errorStatus(error) === 503 ? "degraded" : "unreachable";
    } else if (data) {
      state = data.status === "ok" ? "ok" : "degraded";
    }
  }

  return (
    <span className="inline-flex items-center gap-2 text-xs text-content-muted">
      <span
        aria-hidden="true"
        className={cn("size-2 rounded-full", DOT_CLASSES[state])}
      />
      {/* aria-live so the state change is announced once resolved, not on every poll. */}
      <span aria-live="polite">
        {dict.api.label}: {dict.api[state]}
      </span>
    </span>
  );
}
