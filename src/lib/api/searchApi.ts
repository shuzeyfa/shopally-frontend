import { baseApi } from "./baseApi";
import type { SearchResult } from "@/types/product";

export interface SearchParams {
  q: string;
  limit?: number;
}

/**
 * RTK Query endpoints for product search.
 *
 * Calls GET /api/v1/search?q=&limit= and unwraps the response envelope.
 */
export const searchApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    searchProducts: build.query<SearchResult, SearchParams | string>({
      query: (arg) => {
        const params = typeof arg === "string" ? { q: arg } : arg;
        const queryParams = new URLSearchParams();
        queryParams.set("q", params.q);
        if (params.limit) {
          queryParams.set("limit", String(params.limit));
        }
        return `/api/v1/search?${queryParams.toString()}`;
      },
    }),
  }),
});

export const { useSearchProductsQuery, useLazySearchProductsQuery } = searchApi;
