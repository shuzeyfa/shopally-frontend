import { Suspense } from "react";
import { SigninForm } from "@/components/auth/SigninForm";

/**
 * Public authentication page rendering the SigninForm.
 *
 * Wrapped in Suspense as required by Next.js App Router when client components
 * consume useSearchParams.
 */
export default function LoginPage() {
  return (
    <main className="mx-auto flex min-h-[calc(100vh-7rem)] w-full max-w-6xl flex-1 items-center justify-center px-4 py-12">
      <Suspense fallback={<div className="h-96 w-full max-w-md animate-pulse rounded-lg bg-surface-raised" />}>
        <SigninForm />
      </Suspense>
    </main>
  );
}
