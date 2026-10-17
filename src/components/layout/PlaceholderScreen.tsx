"use client";

import { Card } from "@/components/ui/Card";
import { useDictionary } from "@/providers/LanguageProvider";

/**
 * Stand-in for screens whose real UI arrives in a later phase. Keeps the
 * route, navigation and layout shell verifiable now without implying the
 * feature exists.
 */
export function PlaceholderScreen({ title }: { title: string }) {
  const dict = useDictionary();

  return (
    <section className="space-y-4">
      <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
      <Card className="space-y-1">
        <p className="font-medium">{dict.placeholder.comingSoon}</p>
        <p className="text-sm text-content-muted">
          {dict.placeholder.description}
        </p>
      </Card>
    </section>
  );
}
