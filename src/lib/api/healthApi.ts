import { baseApi } from "./baseApi";

/** Payload of GET /healthz — see internal/adapter/handler/health_handler.go. */
export interface HealthPayload {
  status: "ok" | "degraded";
  /** Dependency name to "ok" | "unavailable". */
  dependencies: Record<string, string>;
}

/**
 * The health endpoint doubles as the app's connectivity check: a successful
 * call from the browser proves the API is up, the envelope unwrapping works,
 * NEXT_PUBLIC_API_URL is right, and this origin is in the backend's CORS
 * allowlist.
 *
 * Note /healthz answers 503 when a dependency is down, so RTK Query reports
 * that as an error even though the body is a valid envelope. Callers should
 * read `error.status === 503` as "degraded" rather than "unreachable".
 */
export const healthApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getHealth: build.query<HealthPayload, void>({
      query: () => "/healthz",
    }),
  }),
});

export const { useGetHealthQuery } = healthApi;
