"use client";

import Link from "next/link";
import { Button, buttonClasses } from "@/components/ui/Button";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { clearCompare, removeCompareProduct } from "@/lib/slices/compareSlice";
import { useDictionary } from "@/providers/LanguageProvider";

export function CompareBar() {
  const dict = useDictionary();
  const dispatch = useAppDispatch();
  const selectedProductIds = useAppSelector((state) => state.compare.selectedProductIds);

  if (selectedProductIds.length === 0) {
    return null;
  }

  const canCompare = selectedProductIds.length >= 2;

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 w-full max-w-2xl px-4 animate-in fade-in slide-in-from-bottom-4 duration-200">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 rounded-xl border border-line bg-surface-raised p-3.5 shadow-2xl backdrop-blur-md">
        <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto">
          <span className="text-xs font-semibold text-content whitespace-nowrap">
            {selectedProductIds.length} {dict.compare.barSelected}
          </span>

          <div className="flex items-center gap-1.5 overflow-x-auto py-1">
            {selectedProductIds.map((id) => (
              <span
                key={id}
                className="inline-flex items-center gap-1 rounded-full border border-line bg-surface-muted px-2.5 py-0.5 text-[11px] font-mono text-content"
              >
                <span>{id}</span>
                <button
                  type="button"
                  onClick={() => dispatch(removeCompareProduct(id))}
                  className="text-content-muted hover:text-negative ml-0.5 cursor-pointer"
                  aria-label={`Remove ${id}`}
                >
                  ✕
                </button>
              </span>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => dispatch(clearCompare())}
            className="text-xs text-content-muted hover:text-content"
          >
            {dict.compare.clear}
          </Button>

          <Link
            href="/compare"
            className={buttonClasses({
              variant: canCompare ? "primary" : "outline",
              size: "sm",
              className: canCompare ? "font-semibold shadow-xs" : "opacity-50 pointer-events-none",
            })}
          >
            {dict.compare.compareNow} ({selectedProductIds.length})
          </Link>
        </div>
      </div>
    </div>
  );
}
