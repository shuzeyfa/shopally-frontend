import { cn } from "@/lib/cn";

/**
 * Surface container used for cards and panels throughout the app.
 */
export function Card({
  className,
  ...props
}: React.ComponentPropsWithRef<"div">) {
  return (
    <div
      className={cn(
        "rounded-lg border border-line bg-surface-raised p-4",
        className,
      )}
      {...props}
    />
  );
}
