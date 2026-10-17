import { cn } from "@/lib/cn";

type ButtonVariant = "primary" | "outline" | "ghost";
type ButtonSize = "sm" | "md";

const VARIANT_CLASSES: Record<ButtonVariant, string> = {
  primary: "bg-accent text-accent-content hover:opacity-90",
  outline: "border border-line text-content hover:bg-surface-muted",
  ghost: "text-content hover:bg-surface-muted",
};

const SIZE_CLASSES: Record<ButtonSize, string> = {
  sm: "h-8 px-3 text-sm",
  md: "h-10 px-4 text-sm",
};

/**
 * The button's visual classes, exported so an anchor or next/link can look
 * like a button without nesting one inside the other — a <Link> inside a
 * <button> is invalid HTML and breaks keyboard and screen-reader behaviour.
 */
export function buttonClasses({
  variant = "outline",
  size = "md",
  className,
}: {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
} = {}): string {
  return cn(
    "inline-flex items-center justify-center gap-2 rounded-md font-medium",
    "transition-colors disabled:pointer-events-none disabled:opacity-50",
    VARIANT_CLASSES[variant],
    SIZE_CLASSES[size],
    className,
  );
}

/**
 * Base button. `ref` is accepted as a plain prop — React 19 removed the need
 * for forwardRef.
 */
export function Button({
  variant = "outline",
  size = "md",
  className,
  ...props
}: React.ComponentPropsWithRef<"button"> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
}) {
  return (
    <button className={buttonClasses({ variant, size, className })} {...props} />
  );
}
