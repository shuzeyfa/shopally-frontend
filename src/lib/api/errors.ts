import type { Dictionary } from "@/lib/i18n/dictionaries";
import type { ApiErrorResponse } from "@/types/api";

/**
 * Narrows an RTK Query error to our envelope error shape.
 *
 * Needed because RTK Query types a query's `error` as
 * `BaseQueryError | SerializedError` — the second being a thrown JS error,
 * which has no `code` or `status`. Reading those fields without narrowing
 * first does not type-check.
 */
export function isApiError(error: unknown): error is ApiErrorResponse {
  return (
    typeof error === "object" &&
    error !== null &&
    "code" in error && typeof error.code === "string" && error.code.length > 0 &&
    "message" in error && typeof error.message === "string" &&
    (!("status" in error) || error.status === undefined || typeof error.status === "number")
  );
}

/** HTTP status of an error, or undefined for transport and thrown errors. */
export function errorStatus(error: unknown): number | undefined {
  return isApiError(error) ? error.status : undefined;
}

/** A displayable message for any error RTK Query can produce. */
export function errorMessage(error: unknown, fallback = "Something went wrong."): string {
  if (isApiError(error)) return error.message;
  if (error instanceof Error) return error.message;
  return fallback;
}

/** Translate known error codes; provider messages never override the UI locale. */
export function localizedErrorMessage(error: unknown, dict: Dictionary, fallback: string): string {
  if (isApiError(error) && Object.hasOwn(dict.errors, error.code)) {
    return dict.errors[error.code as keyof Dictionary["errors"]];
  }
  return fallback;
}
