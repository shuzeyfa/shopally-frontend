"use client";

import { useEffect } from "react";
import Link from "next/link";

import { Button, buttonClasses } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { useCompareProductsMutation } from "@/lib/api/compareApi";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { clearCompare, removeCompareProduct } from "@/lib/slices/compareSlice";
import { localizedErrorMessage } from "@/lib/api/errors";
import { useDictionary } from "@/providers/LanguageProvider";

export default function ComparePage() {
  const dict = useDictionary();
  const dispatch = useAppDispatch();
  const selectedProductIds = useAppSelector(
    (state) => state.compare.selectedProductIds,
  );
  const [compareProducts, { data, isLoading, isError, error }] =
    useCompareProductsMutation();

  useEffect(() => {
    if (selectedProductIds.length >= 2 && selectedProductIds.length <= 4) {
      void compareProducts(selectedProductIds);
    }
  }, [compareProducts, selectedProductIds]);

  const errorMessage = localizedErrorMessage(error, dict, dict.search.errorMessage);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-content sm:text-3xl">
            {dict.nav.compare}
          </h1>
          <p className="mt-1 max-w-2xl text-sm text-content-muted">
            {dict.compare.subtitle}
          </p>
        </div>
        {selectedProductIds.length > 0 && (
          <Button
            type="button"
            variant="outline"
            onClick={() => dispatch(clearCompare())}
          >
            {dict.compare.clear}
          </Button>
        )}
      </div>

      {selectedProductIds.length < 2 ? (
        <Card className="flex flex-col items-center gap-3 border-dashed p-10 text-center sm:p-14">
          <h2 className="text-lg font-semibold text-content">
            {dict.compare.noProductsTitle}
          </h2>
          <p className="max-w-lg text-sm text-content-muted">
            {dict.compare.noProductsSubtitle}
          </p>
          <Link
            href="/search"
            className={buttonClasses({
              variant: "primary",
              className: "mt-2 font-semibold",
            })}
          >
            {dict.nav.search}
          </Link>
        </Card>
      ) : isLoading ? (
        <div className="overflow-hidden rounded-lg border border-line">
          <div className="grid grid-cols-2 gap-4 bg-surface-raised p-5 sm:grid-cols-3">
            {selectedProductIds.map((id) => (
              <div key={id} className="space-y-3">
                <div className="aspect-video animate-pulse rounded-md bg-surface-muted" />
                <div className="h-4 animate-pulse rounded bg-surface-muted" />
              </div>
            ))}
          </div>
          <div className="h-48 animate-pulse border-t border-line bg-surface-muted/50" />
        </div>
      ) : isError ? (
        <Card className="flex flex-col items-center gap-3 border-dashed p-10 text-center">
          <h2 className="text-lg font-semibold text-content">
            {dict.search.errorTitle}
          </h2>
          <p className="max-w-lg text-sm text-content-muted">{errorMessage}</p>
          <Button
            type="button"
            variant="outline"
            onClick={() => void compareProducts(selectedProductIds)}
          >
            {dict.search.retry}
          </Button>
        </Card>
      ) : data ? (
        <div className="overflow-x-auto rounded-lg border border-line bg-surface-raised">
          <table className="w-full min-w-[720px] border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-line">
                <th className="w-44 p-4 align-top text-xs font-semibold uppercase tracking-wide text-content-muted">
                  {dict.nav.compare}
                </th>
                {data.products.map((product) => (
                  <th key={product.id} className="min-w-56 p-4 align-top">
                    <div className="flex h-full flex-col gap-3">
                      <div className="relative aspect-video overflow-hidden rounded-md bg-surface-muted">
                        {product.imageUrl ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={product.imageUrl}
                            alt={product.title}
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <div className="flex h-full items-center justify-center text-xs text-content-muted">
                            {product.id}
                          </div>
                        )}
                      </div>
                      <a
                        href={product.deeplinkUrl || "#"}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="line-clamp-2 font-semibold text-content hover:text-accent"
                      >
                        {product.title}
                      </a>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="self-start text-content-muted"
                        onClick={() => dispatch(removeCompareProduct(product.id))}
                      >
                        {dict.compare.remove}
                      </Button>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.attributes.map((attribute) => (
                <tr
                  key={attribute.key}
                  className="border-b border-line last:border-b-0 odd:bg-surface-muted/40"
                >
                  <th className="p-4 align-top font-medium text-content-muted">
                    {Object.hasOwn(dict.compare.attributes, attribute.key)
                      ? dict.compare.attributes[attribute.key as keyof typeof dict.compare.attributes]
                      : attribute.label}
                  </th>
                  {data.products.map((product) => (
                    <td
                      key={product.id}
                      className="p-4 align-top font-medium text-content"
                    >
                      {attribute.values[product.id] || "—"}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : null}
    </div>
  );
}
