import { Card } from "@/components/ui/Card";

export function ProductCardSkeleton() {
  return (
    <Card className="flex flex-col justify-between overflow-hidden border border-line bg-surface-raised p-0 animate-pulse">
      {/* Image Skeleton */}
      <div className="aspect-video w-full bg-surface-muted border-b border-line" />

      {/* Content Skeleton */}
      <div className="flex flex-1 flex-col p-4 space-y-3">
        <div className="h-4 w-3/4 rounded-sm bg-surface-muted" />
        <div className="h-3 w-1/2 rounded-sm bg-surface-muted" />

        <div className="space-y-1.5 pt-2">
          <div className="h-2.5 w-full rounded-sm bg-surface-muted" />
          <div className="h-2.5 w-4/5 rounded-sm bg-surface-muted" />
        </div>

        <div className="mt-4 pt-3 border-t border-line flex items-center justify-between">
          <div className="h-6 w-24 rounded-sm bg-surface-muted" />
          <div className="h-8 w-28 rounded-md bg-surface-muted" />
        </div>
      </div>
    </Card>
  );
}
