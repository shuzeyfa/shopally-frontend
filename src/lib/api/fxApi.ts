import { baseApi } from "./baseApi";

export interface FXRatePayload {
  from: string;
  to: string;
  rate: number;
  amount: number;
  converted: number;
}

export interface FXParams {
  from?: string;
  to?: string;
  amount?: number;
}

/**
 * RTK Query endpoint for live foreign exchange rates.
 *
 * Calls GET /api/v1/fx?from=&to=&amount= (defaults to USD -> ETB).
 */
export const fxApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getFXRate: build.query<FXRatePayload, FXParams | void>({
      query: (params) => {
        const queryParams = new URLSearchParams();
        if (params?.from) queryParams.set("from", params.from);
        if (params?.to) queryParams.set("to", params.to);
        if (params?.amount !== undefined) queryParams.set("amount", String(params.amount));
        const qs = queryParams.toString();
        return `/api/v1/fx${qs ? `?${qs}` : ""}`;
      },
    }),
  }),
});

export const { useGetFXRateQuery } = fxApi;
