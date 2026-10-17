import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { BaseQueryFn, FetchArgs, FetchBaseQueryError } from "@reduxjs/toolkit/query";

import type { ApiErrorResponse, Envelope } from "@/types/api";

/**
 * Origin only — paths are composed per endpoint, because the API lives under
 * /api/v1 but /healthz sits at the root.
 */
const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8080";

const rawBaseQuery = fetchBaseQuery({ baseUrl: API_URL });

/** Codes this layer raises itself, for failures that never reached the API. */
export const TRANSPORT_ERROR_CODES = {
  network: "NETWORK_ERROR",
  parsing: "INVALID_RESPONSE",
  timeout: "TIMEOUT",
} as const;

/**
 * Normalizes an RTK Query transport/HTTP error into our envelope error shape.
 *
 * On an HTTP error the backend still returns an envelope, so the real code and
 * message live in `error.data.error`. Everything else is a failure that never
 * produced a response body.
 */
function toApiError(error: FetchBaseQueryError): ApiErrorResponse {
  const status = typeof error.status === "number" ? error.status : undefined;

  if ("data" in error && error.data && typeof error.data === "object") {
    const body = error.data as Partial<Envelope<unknown>>;
    if (body.error?.code) {
      return { ...body.error, status };
    }
  }

  switch (error.status) {
    case "FETCH_ERROR":
      // The request never completed. In the browser this is overwhelmingly
      // either the backend being down or its CORS allowlist not including
      // this origin — the two are indistinguishable from JS by design.
      return {
        code: TRANSPORT_ERROR_CODES.network,
        message:
          "Could not reach the API. Check that the backend is running and that this origin is in its CORS allowlist.",
      };
    case "PARSING_ERROR":
      return {
        code: TRANSPORT_ERROR_CODES.parsing,
        message: "The API returned a response that could not be parsed.",
      };
    case "TIMEOUT_ERROR":
      return {
        code: TRANSPORT_ERROR_CODES.timeout,
        message: "The API did not respond in time.",
      };
    default:
      return {
        code: "INTERNAL_SERVER_ERROR",
        message: "Unexpected API error.",
        status,
      };
  }
}

/**
 * Unwraps the backend envelope so endpoints declare their payload type
 * directly (`build.query<SearchResult, string>`) instead of
 * `Envelope<SearchResult>`.
 *
 * A non-null `error` is treated as a failure even when the HTTP status was
 * 200, which the backend does not currently do but the contract permits.
 */
const envelopeBaseQuery: BaseQueryFn<
  string | FetchArgs,
  unknown,
  ApiErrorResponse
> = async (args, api, extraOptions) => {
  const result = await rawBaseQuery(args, api, extraOptions);

  if (result.error) {
    return { error: toApiError(result.error) };
  }

  const body = result.data;
  const isEnvelope =
    body !== null && typeof body === "object" && "data" in body && "error" in body;

  if (!isEnvelope) {
    // Not enveloped. Nothing hits this today; passing through beats throwing
    // if an endpoint is ever added that returns a bare body.
    return { data: body };
  }

  const envelope = body as Envelope<unknown>;
  if (envelope.error) {
    return { error: { ...envelope.error } };
  }
  return { data: envelope.data };
};

/**
 * The single API slice. Feature endpoints attach via `injectEndpoints` so each
 * feature owns its own file and this module stays dependency-free.
 */
export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: envelopeBaseQuery,
  tagTypes: ["Alert", "Saved"],
  endpoints: () => ({}),
});
