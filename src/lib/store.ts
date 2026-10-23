import { configureStore } from "@reduxjs/toolkit";

import { baseApi } from "./api/baseApi";
import compareReducer from "./slices/compareSlice";

/**
 * Builds a fresh store.
 *
 * Called per request rather than once at module scope: a module-level store on
 * the server would be shared across all users' requests, leaking one user's
 * cached data into another's render.
 */
export const makeStore = () => {
  const store = configureStore({
    reducer: {
      [baseApi.reducerPath]: baseApi.reducer,
      compare: compareReducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(baseApi.middleware),
  });

  return store;
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
