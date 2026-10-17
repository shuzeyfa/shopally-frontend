/**
 * Joins class names, dropping falsy entries so conditionals read inline:
 *
 *   cn("p-2", isActive && "bg-accent")
 *
 * Deliberately not `clsx` + `tailwind-merge`: nothing here needs conflicting
 * utilities resolved, and two dependencies for a three-line function is a poor
 * trade. Reach for tailwind-merge if components start overriding each other's
 * utilities via className.
 */
export function cn(
  ...classes: Array<string | false | null | undefined>
): string {
  return classes.filter(Boolean).join(" ");
}
