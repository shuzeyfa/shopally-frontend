/**
 * Mirrors the backend's response envelope from
 * internal/adapter/handler/response.go.
 *
 * Every endpoint returns this shape. Exactly one of `data` and `error` is
 * populated, so a non-null `error` is the single signal for failure —
 * including on HTTP 200.
 */
export interface Envelope<T> {
  data: T | null;
  error: ApiError | null;
}

/** Error codes defined by the backend. Kept in sync with response.go. */
export const API_ERROR_CODES = [
  "INVALID_INPUT",
  "UNAUTHORIZED",
  "FORBIDDEN",
  "NOT_FOUND",
  "FX_UNAVAILABLE",
  "SERVICE_UNAVAILABLE",
  "INTERNAL_SERVER_ERROR",
] as const;

export type ApiErrorCode = (typeof API_ERROR_CODES)[number];

export interface ApiError {
  /** A known ApiErrorCode, or any string if the backend adds a new one. */
  code: ApiErrorCode | string;
  message: string;
}

/**
 * What RTK Query surfaces to components as `error`.
 *
 * `status` is the HTTP status when there was one. It is absent for transport
 * failures — backend down, DNS failure, or a CORS rejection — which is the
 * case worth distinguishing in the UI.
 */
export interface ApiErrorResponse extends ApiError {
  status?: number;
}
