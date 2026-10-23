"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { ProductGrid } from "@/components/product/ProductGrid";
import { CompareBar } from "@/components/product/CompareBar";
import { useSearchProductsQuery } from "@/lib/api/searchApi";
import { useGetFXRateQuery } from "@/lib/api/fxApi";
import { localizedErrorMessage } from "@/lib/api/errors";
import { useDictionary } from "@/providers/LanguageProvider";

const POPULAR_SUGGESTIONS = [
  "smartphone",
  "wireless headphones",
  "smartwatch",
  "mechanical keyboard",
  "usb c hub",
];

export default function SearchPage() {
  const dict = useDictionary();
  const [inputValue, setInputValue] = useState("");
  const [activeQuery, setActiveQuery] = useState("smartphone");

  // Fetch products based on active query
  const { data, isLoading, isError, error, refetch } = useSearchProductsQuery(
    { q: activeQuery },
    { skip: !activeQuery },
  );

  // Live FX rate ticker
  const { data: fxData } = useGetFXRateQuery({ from: "USD", to: "ETB" });

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = inputValue.trim();
    if (trimmed) {
      setActiveQuery(trimmed);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInputValue(suggestion);
    setActiveQuery(suggestion);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner: FX Ticker & Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-content sm:text-3xl">
            {dict.nav.search}
          </h1>
          <p className="text-xs text-content-muted mt-0.5">
            {dict.app.tagline}
          </p>
        </div>

        {/* Live FX Rate Indicator */}
        {fxData && (
          <div
            className="inline-flex items-center gap-2 rounded-full border border-line bg-surface-raised px-3.5 py-1.5 text-xs text-content shadow-xs"
            title={dict.search.liveFx}
          >
            <span className="flex h-2 w-2 rounded-full bg-positive animate-pulse" />
            <span className="font-semibold text-accent">{dict.search.liveFx}:</span>
            <span className="font-mono font-medium">
              1 USD = {fxData.rate.toFixed(2)} ETB
            </span>
          </div>
        )}
      </div>

      {/* Search Input Bar */}
      <Card className="border border-line bg-surface-raised p-4 sm:p-5 shadow-xs">
        <form onSubmit={handleSearchSubmit} className="flex gap-2">
          <div className="relative flex-1">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-content-muted">
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </span>
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder={dict.search.placeholder}
              aria-label={dict.search.button}
              className="w-full rounded-md border border-line bg-surface-muted pl-10 pr-4 py-2.5 text-sm text-content outline-none focus:border-accent transition-colors"
            />
            {inputValue && (
              <button
                type="button"
                onClick={() => setInputValue("")}
                className="absolute inset-y-0 right-0 flex items-center pr-3 text-content-muted hover:text-content"
                aria-label={dict.search.clear}
              >
                ✕
              </button>
            )}
          </div>
          <Button type="submit" variant="primary" className="px-5 font-semibold">
            {dict.search.button}
          </Button>
        </form>

        {/* Popular Searches */}
        <div className="mt-3 flex flex-wrap items-center gap-1.5 text-xs">
          <span className="text-content-muted">{dict.search.popularQueries}</span>
          {POPULAR_SUGGESTIONS.map((term, index) => (
            <button
              key={term}
              type="button"
              onClick={() => handleSuggestionClick(term)}
              className="rounded-md border border-line bg-surface-muted px-2 py-0.5 text-content-muted hover:border-accent hover:text-accent transition-colors cursor-pointer"
            >
              {dict.search.suggestions[index]}
            </button>
          ))}
        </div>
      </Card>

      {/* Results Header */}
      {data && !isLoading && !isError && (
        <div className="flex items-center justify-between text-xs text-content-muted">
          <span>
            <strong className="text-content font-semibold">{data.products.length}</strong>{" "}
            {dict.search.results} {activeQuery ? `"${activeQuery}"` : ""}
          </span>
        </div>
      )}

      {/* Main Content Areas: Loading / Error / Empty / Grid */}
      {isLoading ? (
        <ProductGrid isLoading={true} />
      ) : isError ? (
        <Card className="flex flex-col items-center justify-center p-12 text-center border-dashed border-line">
          <div className="rounded-full bg-negative/10 p-3 text-negative mb-3">
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h2 className="text-lg font-semibold text-content">{dict.search.errorTitle}</h2>
          <p className="mt-1 text-sm text-content-muted max-w-md">
            {localizedErrorMessage(error, dict, dict.search.errorMessage)}
          </p>
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="mt-4"
            onClick={() => refetch()}
          >
            {dict.search.retry}
          </Button>
        </Card>
      ) : data && data.products.length === 0 ? (
        <Card className="flex flex-col items-center justify-center p-12 text-center border-dashed border-line">
          <div className="rounded-full bg-surface-muted p-3 text-content-muted mb-3">
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h2 className="text-lg font-semibold text-content">{dict.search.emptyTitle}</h2>
          <p className="mt-1 text-sm text-content-muted max-w-md">
            {dict.search.emptySubtitle}
          </p>
        </Card>
      ) : (
        <ProductGrid products={data?.products} />
      )}

      {/* Floating comparison bar */}
      <CompareBar />
    </div>
  );
}
