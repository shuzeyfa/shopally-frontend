"use client";

import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { loginHref } from "@/lib/auth-routing";
import { useDictionary } from "@/providers/LanguageProvider";

/** Middleware covers navigation; this covers expiry/sign-out in an open tab. */
export function RequireSession({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const dict = useDictionary();
  const authenticated = status === "authenticated" && !!session?.user?.id;
  useEffect(() => {
    if (status !== "loading" && !authenticated) {
      const { pathname, search, hash } = window.location;
      router.replace(loginHref(pathname + search + hash));
    }
  }, [status, authenticated, router]);
  if (!authenticated) {
    return <p role="status" className="p-6 text-content-muted">{dict.auth.checkingSession}</p>;
  }
  return children;
}
