"use client";

import { useState } from "react";
import { useCreateAlertMutation } from "@/lib/api/alertsApi";
import { buttonClasses } from "@/components/ui/Button";
import { useDictionary } from "@/providers/LanguageProvider";
import type { Product } from "@/types/product";

export function PriceAlertControl({ product }: { product: Product }) {
  const dict = useDictionary();
  const [open, setOpen] = useState(false);
  const [currency, setCurrency] = useState<"ETB" | "USD">("ETB");
  const [target, setTarget] = useState(String(Math.ceil(product.price.etb * 0.9)));
  const [createAlert, { isLoading, isSuccess, isError }] = useCreateAlertMutation();

  return (
    <div className="mt-3">
      {isSuccess ? (
        <p className="text-xs font-medium text-positive" role="status">{dict.priceAlerts.created}</p>
      ) : !open ? (
        <button type="button" className="text-xs font-semibold text-accent hover:underline" onClick={() => setOpen(true)}>
          {dict.priceAlerts.set}
        </button>
      ) : (
        <form
          className="flex flex-wrap items-end gap-2 rounded-md border border-line bg-surface-muted p-3"
          onSubmit={async (event) => {
            event.preventDefault();
            try {
              await createAlert({ productId: product.id, targetPrice: Number(target), currency }).unwrap();
            } catch {
              // RTK Query exposes the failure state below.
            }
          }}
        >
          <label className="flex-1 text-xs text-content-muted">
            {dict.priceAlerts.target}
            <input
              aria-label={dict.priceAlerts.target}
              className="mt-1 h-9 w-full rounded-md border border-line bg-surface-raised px-2 text-sm text-content"
              type="number"
              min="0.01"
              step="0.01"
              required
              value={target}
              onChange={(event) => setTarget(event.target.value)}
            />
          </label>
          <select
            aria-label="Currency"
            className="h-9 rounded-md border border-line bg-surface-raised px-2 text-sm text-content"
            value={currency}
            onChange={(event) => {
              const nextCurrency = event.target.value as "ETB" | "USD";
              setCurrency(nextCurrency);
              setTarget(String(Math.ceil(nextCurrency === "ETB" ? product.price.etb * 0.9 : product.price.usd * 0.9)));
            }}
          >
            <option value="ETB">ETB</option>
            <option value="USD">USD</option>
          </select>
          <button type="submit" disabled={isLoading} className={buttonClasses({ variant: "primary", size: "sm" })}>
            {dict.priceAlerts.create}
          </button>
          <button type="button" className={buttonClasses({ size: "sm" })} onClick={() => setOpen(false)}>
            {dict.priceAlerts.cancel}
          </button>
          {isError && <p className="w-full text-xs text-danger" role="alert">{dict.priceAlerts.errorMessage}</p>}
        </form>
      )}
    </div>
  );
}
