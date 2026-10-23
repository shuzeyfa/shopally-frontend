"use client";

import { cn } from "@/lib/cn";
import { formatMessage } from "@/lib/i18n/format";
import { useLanguage } from "@/providers/LanguageProvider";
import type { Price } from "@/types/product";

interface PriceTagProps {
  price: Price;
  className?: string;
  size?: "sm" | "md" | "lg";
}

/**
 * Dual currency price display showing ETB as the primary shopper currency
 * and USD as the secondary international reference, with the FX timestamp
 * accessible via a tooltip.
 */
export function PriceTag({ price, className, size = "md" }: PriceTagProps) {
  const { locale, dict } = useLanguage();
  const numberLocale = locale === "am" ? "am-ET" : "en-ET";
  const formatETB = (amount: number) =>
    new Intl.NumberFormat(numberLocale, {
      style: "currency",
      currency: "ETB",
      maximumFractionDigits: 2,
    }).format(amount);

  const formatUSD = (amount: number) =>
    new Intl.NumberFormat(locale === "am" ? "am-ET" : "en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 2,
    }).format(amount);

  const date = new Date(price.fxTimestamp);
  const formattedDate = Number.isFinite(date.getTime())
    ? new Intl.DateTimeFormat(numberLocale, {
        year: "numeric", month: "short", day: "numeric",
        hour: "2-digit", minute: "2-digit", timeZone: "UTC", timeZoneName: "short",
      }).format(date)
    : dict.product.fxUnknownDate;
  const ratio = price.usd > 0 ? price.etb / price.usd : NaN;
  const tooltipText = formatMessage(dict.product.fxApplied, {
    rate: Number.isFinite(ratio) ? ratio.toFixed(2) : "?",
    date: formattedDate,
  });

  return (
    <div
      className={cn("flex flex-col group relative cursor-help", className)}
      title={tooltipText}
    >
      <div className="flex items-baseline gap-2">
        <span
          className={cn(
            "font-bold text-content tracking-tight",
            size === "sm" && "text-base",
            size === "md" && "text-lg",
            size === "lg" && "text-2xl",
          )}
        >
          {formatETB(price.etb)}
        </span>
        <span className="text-xs text-content-muted font-medium">
          ({formatUSD(price.usd)})
        </span>
      </div>

      <span className="text-[10px] text-content-muted flex items-center gap-1 font-mono">
        <svg className="h-2.5 w-2.5 text-positive inline shrink-0" fill="currentColor" viewBox="0 0 20 20">
          <circle cx="10" cy="10" r="8" />
        </svg>
        <span className="truncate">{tooltipText}</span>
      </span>
    </div>
  );
}
