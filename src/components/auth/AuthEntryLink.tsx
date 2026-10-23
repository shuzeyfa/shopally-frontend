"use client";

import { Suspense, type ComponentProps } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { loginHref } from "@/lib/auth-routing";

type Props = Omit<ComponentProps<typeof Link>, "href">;

function EntryLink(props: Props) {
  const params = useSearchParams();
  return <Link {...props} href={loginHref(params.get("callbackUrl"))} data-auth-entry="true" />;
}

/** All marketing entry points preserve the destination supplied by middleware. */
export function AuthEntryLink(props: Props) {
  return (
    <Suspense fallback={<Link {...props} href={loginHref()} data-auth-entry="true" />}>
      <EntryLink {...props} />
    </Suspense>
  );
}
