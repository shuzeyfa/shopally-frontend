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
    "code" in error &&
    "message" in error
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
