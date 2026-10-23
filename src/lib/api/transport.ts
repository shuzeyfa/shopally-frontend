import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { BaseQueryFn, FetchArgs, FetchBaseQueryError } from "@reduxjs/toolkit/query";

import { isApiError } from "./errors";
import type { ApiErrorResponse } from "@/types/api";

export const REQUEST_TIMEOUT_MS = 30_000;
export const TRANSPORT_ERROR_CODES = {
  network: "NETWORK_ERROR",
  parsing: "INVALID_RESPONSE",
  timeout: "TIMEOUT",
} as const;

function invalidResponse(status?: number): ApiErrorResponse {
  return {
    code: TRANSPORT_ERROR_CODES.parsing,
    message: "Could not read the server response. Please try again.",
    ...(status === undefined ? {} : { status }),
  };
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}

function toApiError(error: FetchBaseQueryError): ApiErrorResponse {
  const status = typeof error.status === "number"
    ? error.status
    : error.status === "PARSING_ERROR" ? error.originalStatus : undefined;
  if ("data" in error && isRecord(error.data) &&
      error.data.data === null && isApiError(error.data.error)) {
    return { code: error.data.error.code, message: error.data.error.message, status };
  }
  switch (error.status) {
    case "FETCH_ERROR":
      return { code: TRANSPORT_ERROR_CODES.network, message: "Could not connect. Please try again." };
    case "TIMEOUT_ERROR":
      return { code: TRANSPORT_ERROR_CODES.timeout, message: "The request took too long. Please try again." };
    default:
      // Includes /healthz's 503 data envelope. Preserve its HTTP status so
      // the status indicator can distinguish a degraded service from offline.
      return invalidResponse(status);
  }
}

/** Every backend endpoint must follow the agreed { data, error } contract. */
export function createEnvelopeBaseQuery(
  options: Parameters<typeof fetchBaseQuery>[0] = {},
): BaseQueryFn<string | FetchArgs, unknown, ApiErrorResponse> {
  const rawBaseQuery = fetchBaseQuery({ ...options, timeout: options.timeout ?? REQUEST_TIMEOUT_MS });
  return async (args, api, extraOptions) => {
    const result = await rawBaseQuery(args, api, extraOptions);
    if (result.error) return { error: toApiError(result.error) };

    const body = result.data;
    const status = result.meta?.response?.status;
    if (!isRecord(body) || !("data" in body) || !("error" in body)) {
      return { error: invalidResponse(status) };
    }
    if (body.error === null && body.data !== null && body.data !== undefined) {
      return { data: body.data };
    }
    if (body.data === null && isApiError(body.error)) {
      return { error: { code: body.error.code, message: body.error.message, status } };
    }
    return { error: invalidResponse(status) };
  };
}
