import { createApi } from "@reduxjs/toolkit/query/react";
import { getSession } from "next-auth/react";

import { createEnvelopeBaseQuery } from "./transport";

const API_URL = process.env.NEXT_PUBLIC_API_URL?.trim().replace(/\/+$/, "") || "http://localhost:8080";

const envelopeBaseQuery = createEnvelopeBaseQuery({
  baseUrl: API_URL,
  prepareHeaders: async (headers, { arg }) => {
    const path = typeof arg === "string" ? arg : arg.url;
    // Public search, comparison, FX and health requests do not need a session.
    if (typeof window !== "undefined" && /^\/api\/v1\/(saved|alerts|me)(\/|\?|$)/.test(path)) {
      try {
        const session = await getSession();
        if (session?.apiToken) headers.set("Authorization", `Bearer ${session.apiToken}`);
      } catch {
        // The protected endpoint will return a normal unauthorized response.
      }
    }
    return headers;
  },
});

export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: envelopeBaseQuery,
  tagTypes: ["Alert", "Saved"],
  endpoints: () => ({}),
});
