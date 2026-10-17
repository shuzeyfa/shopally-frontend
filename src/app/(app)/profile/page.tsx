"use client";

import { PlaceholderScreen } from "@/components/layout/PlaceholderScreen";
import { useDictionary } from "@/providers/LanguageProvider";

export default function ProfilePage() {
  const dict = useDictionary();
  return <PlaceholderScreen title={dict.nav.profile} />;
}
