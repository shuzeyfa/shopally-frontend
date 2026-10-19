"use client";

import { useState } from "react";
import { Card } from "@/components/ui/Card";
import { buttonClasses } from "@/components/ui/Button";
import { AIMatchBadge } from "./AIMatchBadge";
import { PriceTag } from "./PriceTag";
import { PriceAlertControl } from "./PriceAlertControl";
import { useDictionary } from "@/providers/LanguageProvider";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { toggleCompareProduct } from "@/lib/slices/compareSlice";
import {
  useGetSavedItemsQuery,
  useRemoveSavedProductMutation,
  useSaveProductMutation,
} from "@/lib/api/savedApi";
import { cn } from "@/lib/cn";
import type { Product } from "@/types/product";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const dict = useDictionary();
  const [imageError, setImageError] = useState(false);

  const dispatch = useAppDispatch();
  const selectedProductIds = useAppSelector((state) => state.compare.selectedProductIds);
  const isCompared = selectedProductIds.includes(product.id);
  const isMaxReached = selectedProductIds.length >= 4 && !isCompared;
  const { data: savedItems = [] } = useGetSavedItemsQuery();
  const [saveProduct, { isLoading: isSaving }] = useSaveProductMutation();
  const [removeSavedProduct, { isLoading: isRemoving }] = useRemoveSavedProductMutation();
  const isSaved = savedItems.some((item) => item.product.id === product.id);

  const handleCompareClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isMaxReached) {
      dispatch(toggleCompareProduct(product.id));
    }
  };

  return (
    <Card className="flex flex-col justify-between overflow-hidden border border-line bg-surface-raised p-0 transition-all hover:border-accent/40 hover:shadow-md">
      {/* Product Image Header with AI Match Badge & Compare Button */}
      <div className="relative aspect-video w-full overflow-hidden bg-surface-muted border-b border-line">
        {!imageError && product.imageUrl ? (
          // Standard img used to support arbitrary external AliExpress CDN hosts without next.config domain restrictions
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={product.imageUrl}
            alt={product.title}
            className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
            onError={() => setImageError(true)}
            loading="lazy"
          />
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center text-content-muted">
            <svg className="h-10 w-10 stroke-current opacity-40" fill="none" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span className="mt-1 text-xs font-medium">AliExpress Product</span>
          </div>
        )}

        {/* Top-Left: Compare Selector */}
        <div className="absolute top-2.5 left-2.5 z-10">
          <button
            type="button"
            onClick={handleCompareClick}
            disabled={isMaxReached}
            className={cn(
              "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium transition-all shadow-xs cursor-pointer",
              isCompared
                ? "bg-accent text-accent-content font-semibold"
                : isMaxReached
                ? "bg-surface-raised/80 text-content-muted opacity-60 cursor-not-allowed"
                : "bg-surface-raised/90 text-content border border-line hover:border-accent hover:text-accent backdrop-blur-xs",
            )}
            title={isMaxReached ? dict.compare.maxReached : dict.compare.addToCompare}
          >
            <span>{isCompared ? "✓" : "+"}</span>
            <span>{isCompared ? dict.compare.compared : dict.compare.addToCompare}</span>
          </button>
        </div>

        {/* Top-Right: AI Match Badge */}
        <div className="absolute top-2.5 right-2.5 z-10">
          <AIMatchBadge percentage={product.aiMatchPercentage} />
        </div>

        <button
          type="button"
          aria-label={isSaved ? dict.savedItems.remove : dict.savedItems.save}
          aria-pressed={isSaved}
          title={isSaved ? dict.savedItems.remove : dict.savedItems.save}
          disabled={isSaving || isRemoving}
          onClick={() => {
            if (isSaved) void removeSavedProduct(product.id);
            else void saveProduct(product);
          }}
          className={cn(
            "absolute right-2.5 top-11 z-10 flex h-9 w-9 items-center justify-center rounded-full border shadow-sm backdrop-blur-xs transition-colors disabled:opacity-60",
            isSaved
              ? "border-accent bg-accent text-accent-content"
              : "border-line bg-surface-raised/90 text-content hover:border-accent hover:text-accent",
          )}
        >
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill={isSaved ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M20.8 4.6a5.5 5.5 0 00-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 00-7.8 7.8l1.1 1.1L12 21l7.8-7.5 1.1-1.1a5.5 5.5 0 00-.1-7.8z" />
          </svg>
        </button>
      </div>

      {/* Card Content */}
      <div className="flex flex-1 flex-col p-4">
        {/* Title */}
        <h3
          className="line-clamp-2 text-sm font-semibold text-content leading-snug"
          title={product.title}
        >
          {product.title}
        </h3>

        {/* Rating and Seller Score */}
        <div className="mt-2 flex flex-wrap items-center gap-2 text-xs text-content-muted">
          <span className="flex items-center text-accent font-semibold">
            ★ {product.productRating.toFixed(1)}
          </span>
          <span>•</span>
          <span className="text-positive font-medium">
            {product.sellerScore}% {dict.search.sellerScore}
          </span>
        </div>

        {/* Delivery estimate */}
        {product.deliveryEstimate && (
          <div className="mt-1.5 flex items-center gap-1.5 text-xs text-content-muted">
            <svg className="h-3.5 w-3.5 shrink-0 text-content-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
            </svg>
            <span className="truncate">{dict.search.delivery}: {product.deliveryEstimate}</span>
          </div>
        )}

        {/* Summary Bullets */}
        {product.summaryBullets && product.summaryBullets.length > 0 && (
          <ul className="mt-3 space-y-1 border-t border-line/60 pt-2 text-xs text-content-muted">
            {product.summaryBullets.slice(0, 2).map((bullet, idx) => (
              <li key={idx} className="flex items-start gap-1.5">
                <span className="text-accent mt-0.5">•</span>
                <span className="line-clamp-1">{bullet}</span>
              </li>
            ))}
          </ul>
        )}

        {/* Price & Action */}
        <div className="mt-4 pt-3 border-t border-line flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
          <PriceTag price={product.price} size="sm" />

          <a
            href={product.deeplinkUrl || "#"}
            target="_blank"
            rel="noopener noreferrer"
            className={buttonClasses({
              variant: "outline",
              size: "sm",
              className: "w-full sm:w-auto text-xs font-semibold hover:border-accent hover:text-accent gap-1.5",
            })}
          >
            <span>{dict.search.viewOnAliExpress}</span>
            <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </div>
        <PriceAlertControl product={product} />
      </div>
    </Card>
  );
}
