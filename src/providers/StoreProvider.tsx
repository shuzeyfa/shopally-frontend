"use client";

import { useEffect, useState } from "react";
import { setupListeners } from "@reduxjs/toolkit/query";
import { Provider } from "react-redux";

import { makeStore } from "@/lib/store";

/**
 * Creates the Redux store once per client instance and provides it.
 *
 * `useState` with a lazy initialiser rather than a ref: the initialiser runs
 * exactly once, giving the same semantics without reading a ref during render,
 * which the react-hooks/refs rule correctly rejects.
 *
 * The store must not be created at module scope — on the server that instance
 * would be shared across every user's request.
 */
export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [store] = useState(makeStore);

  // Register browser listeners only after mount; dispose them on unmount.
  useEffect(() => setupListeners(store.dispatch), [store]);

  return <Provider store={store}>{children}</Provider>;
}
