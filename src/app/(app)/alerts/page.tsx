"use client";

import { PlaceholderScreen } from "@/components/layout/PlaceholderScreen";
import { useDictionary } from "@/providers/LanguageProvider";

export default function AlertsPage() {
  const dict = useDictionary();
  return <PlaceholderScreen title={dict.nav.alerts} />;
}
