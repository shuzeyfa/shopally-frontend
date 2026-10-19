"use client";

import Link from "next/link";

import { Button, buttonClasses } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { ProductGrid } from "@/components/product/ProductGrid";
import { useGetSavedItemsQuery } from "@/lib/api/savedApi";
import { useDictionary } from "@/providers/LanguageProvider";

export default function SavedPage() {
  const dict = useDictionary();
  const { data: items, isLoading, isError, error, refetch } = useGetSavedItemsQuery();
  const errorMessage =
    error && "message" in error ? error.message : dict.savedItems.errorMessage;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-content sm:text-3xl">
          {dict.nav.saved}
        </h1>
        <p className="mt-1 text-sm text-content-muted">{dict.savedItems.subtitle}</p>
      </div>

      {isLoading ? (
        <ProductGrid isLoading />
      ) : isError ? (
        <Card className="flex flex-col items-center justify-center border-dashed p-10 text-center">
          <h2 className="text-lg font-semibold text-content">{dict.savedItems.errorTitle}</h2>
          <p className="mt-1 max-w-md text-sm text-content-muted">{errorMessage}</p>
          <Button type="button" variant="outline" size="sm" className="mt-4" onClick={() => refetch()}>
            {dict.search.retry}
          </Button>
        </Card>
      ) : items && items.length > 0 ? (
        <ProductGrid products={items.map((item) => item.product)} />
      ) : (
        <Card className="flex flex-col items-center justify-center border-dashed p-10 text-center">
          <h2 className="text-lg font-semibold text-content">{dict.savedItems.emptyTitle}</h2>
          <p className="mt-1 max-w-md text-sm text-content-muted">{dict.savedItems.emptySubtitle}</p>
          <Link
            href="/search"
            className={buttonClasses({ variant: "primary", className: "mt-4 font-semibold" })}
          >
            {dict.nav.search}
          </Link>
        </Card>
      )}
    </div>
  );
}
