import { baseApi } from "./baseApi";
import type { CompareResult } from "@/types/product";

/**
 * RTK Query mutation for comparing multiple products side-by-side.
 *
 * Calls POST /api/v1/compare with { productIds: string[] }.
 */
export const compareApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    compareProducts: build.mutation<CompareResult, string[]>({
      query: (productIds) => ({
        url: "/api/v1/compare",
        method: "POST",
        body: { productIds },
      }),
    }),
  }),
});

export const { useCompareProductsMutation } = compareApi;
