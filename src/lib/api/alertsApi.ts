import { baseApi } from "./baseApi";
import type { Alert, CreateAlertPayload } from "@/types/alert";

export const alertsApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getAlerts: build.query<Alert[], void>({
      query: () => "/api/v1/alerts",
      providesTags: [{ type: "Alert", id: "LIST" }],
    }),
    createAlert: build.mutation<{ alertId: string }, CreateAlertPayload>({
      query: (body) => ({ url: "/api/v1/alerts", method: "POST", body }),
      invalidatesTags: [{ type: "Alert", id: "LIST" }],
    }),
    deleteAlert: build.mutation<{ alertId: string }, string>({
      query: (id) => ({ url: `/api/v1/alerts/${encodeURIComponent(id)}`, method: "DELETE" }),
      invalidatesTags: [{ type: "Alert", id: "LIST" }],
    }),
  }),
});

export const { useGetAlertsQuery, useCreateAlertMutation, useDeleteAlertMutation } = alertsApi;
