"use client";

import { cn } from "@/lib/cn";
import { formatMessage } from "@/lib/i18n/format";
import { useDictionary } from "@/providers/LanguageProvider";

export function AIMatchBadge({
  percentage,
  className,
}: {
  percentage: number;
  className?: string;
}) {
  const dict = useDictionary();
  const isHighMatch = percentage >= 90;
  const isGoodMatch = percentage >= 80;

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold tracking-wide",
        isHighMatch
          ? "bg-accent/15 text-accent border border-accent/20"
          : isGoodMatch
          ? "bg-positive/15 text-positive border border-positive/20"
          : "bg-surface-muted text-content-muted border border-line",
        className,
      )}
      title={formatMessage(dict.product.aiMatch, { percentage })}
    >
      <svg className="h-3 w-3 shrink-0" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
      </svg>
      <span>{percentage}% {dict.search.match}</span>
    </span>
  );
}
