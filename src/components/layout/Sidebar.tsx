"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/cn";
import { useDictionary } from "@/providers/LanguageProvider";

/**
 * The authenticated app's primary navigation.
 *
 * Labels come from the dictionary so the sidebar translates; hrefs match the
 * route folders under src/app/(app).
 */
export function Sidebar() {
  const dict = useDictionary();
  const pathname = usePathname();

  const items = [
    { href: "/search", label: dict.nav.search },
    { href: "/compare", label: dict.nav.compare },
    { href: "/saved", label: dict.nav.saved },
    { href: "/alerts", label: dict.nav.alerts },
    { href: "/profile", label: dict.nav.profile },
  ];

  return (
    <nav
      aria-label={dict.nav.primary}
      className="w-full shrink-0 border-b border-line bg-surface-muted p-3 md:w-56 md:border-r md:border-b-0"
    >
      <ul className="flex gap-1 overflow-x-auto md:flex-col md:overflow-visible">
        {items.map((item) => {
          const isActive = pathname === item.href;
          return (
            <li key={item.href}>
              <Link
                href={item.href}
                // aria-current is how assistive tech announces "you are here";
                // colour alone would not convey it.
                aria-current={isActive ? "page" : undefined}
                className={cn(
                  "block rounded-md px-3 py-2 text-sm whitespace-nowrap transition-colors",
                  isActive
                    ? "bg-accent text-accent-content font-medium"
                    : "text-content hover:bg-surface-raised",
                )}
              >
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
