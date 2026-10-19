import { baseApi } from "./baseApi";
import type { Product, SavedItem } from "@/types/product";

const savedItemsApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getSavedItems: build.query<SavedItem[], void>({
      query: () => "/api/v1/saved",
      providesTags: [{ type: "Saved", id: "LIST" }],
    }),
  }),
});

export const savedApi = savedItemsApi.injectEndpoints({
  endpoints: (build) => ({
    saveProduct: build.mutation<SavedItem, Product>({
      query: (product) => ({
        url: "/api/v1/saved",
        method: "POST",
        body: { product },
      }),
      invalidatesTags: [{ type: "Saved", id: "LIST" }],
      async onQueryStarted(product, { dispatch, queryFulfilled }) {
        const patch = dispatch(
          savedItemsApi.util.updateQueryData("getSavedItems", undefined, (items) => {
            const index = items.findIndex((item) => item.product.id === product.id);
            const optimisticItem = { product, savedAt: new Date().toISOString() };
            if (index === -1) items.unshift(optimisticItem);
            else items[index] = optimisticItem;
          }),
        );
        try {
          await queryFulfilled;
        } catch {
          patch.undo();
        }
      },
    }),
    removeSavedProduct: build.mutation<{ productId: string }, string>({
      query: (productId) => ({
        url: `/api/v1/saved/${encodeURIComponent(productId)}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "Saved", id: "LIST" }],
      async onQueryStarted(productId, { dispatch, queryFulfilled }) {
        const patch = dispatch(
          savedItemsApi.util.updateQueryData("getSavedItems", undefined, (items) => {
            return items.filter((item) => item.product.id !== productId);
          }),
        );
        try {
          await queryFulfilled;
        } catch {
          patch.undo();
        }
      },
    }),
  }),
});

export const {
  useGetSavedItemsQuery,
  useSaveProductMutation,
  useRemoveSavedProductMutation,
} = savedApi;
