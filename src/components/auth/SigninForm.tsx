"use client";

import { useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";

import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { useDictionary } from "@/providers/LanguageProvider";

/**
 * Google brand icon rendered inside the primary OAuth action.
 */
function GoogleIcon() {
  return (
    <svg className="h-5 w-5 shrink-0" viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
      />
    </svg>
  );
}

/**
 * Signin form component referencing the clean layout from the design reference.
 *
 * Supports Google OAuth as the primary authentication provider and includes a demo
 * account option for local development when Google OAuth secrets are not yet provisioned.
 */
export function SigninForm() {
  const dict = useDictionary();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/search";

  const [isLoading, setIsLoading] = useState(false);
  const [demoEmail, setDemoEmail] = useState("shopper@shopally.ai");
  const [demoName, setDemoName] = useState("Demo Shopper");

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    await signIn("google", { callbackUrl });
  };

  const handleDemoSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!demoEmail) return;
    setIsLoading(true);
    await signIn("credentials", {
      email: demoEmail,
      name: demoName,
      callbackUrl,
    });
  };

  return (
    <Card className="w-full max-w-md p-6 sm:p-8">
      <div className="mb-6 text-center">
        <Link href="/" className="inline-block text-2xl font-bold tracking-tight text-accent">
          {dict.app.name}
        </Link>
        <h1 className="mt-3 text-xl font-semibold tracking-tight text-content">
          {dict.auth.welcomeTitle}
        </h1>
        <p className="mt-1 text-sm text-content-muted">
          {dict.auth.welcomeSubtitle}
        </p>
      </div>

      <div className="space-y-4">
        <Button
          type="button"
          variant="outline"
          className="w-full py-5 text-base font-medium shadow-sm hover:border-accent"
          onClick={handleGoogleSignIn}
          disabled={isLoading}
        >
          <GoogleIcon />
          <span>{dict.auth.signInWithGoogle}</span>
        </Button>

        <div className="relative my-6 flex items-center justify-center">
          <div className="w-full border-t border-line" />
          <span className="absolute bg-surface-raised px-3 text-xs uppercase tracking-wider text-content-muted">
            {dict.auth.orDemo}
          </span>
        </div>

        <form onSubmit={handleDemoSignIn} className="space-y-3">
          <div>
            <label htmlFor="email" className="block text-xs font-medium text-content-muted mb-1">
              {dict.auth.emailPlaceholder}
            </label>
            <input
              id="email"
              type="email"
              required
              value={demoEmail}
              onChange={(e) => setDemoEmail(e.target.value)}
              className="w-full rounded-md border border-line bg-surface-muted px-3 py-2 text-sm text-content outline-none focus:border-accent"
              placeholder={dict.auth.emailPlaceholder}
              disabled={isLoading}
            />
          </div>

          <div>
            <label htmlFor="name" className="block text-xs font-medium text-content-muted mb-1">
              {dict.auth.namePlaceholder}
            </label>
            <input
              id="name"
              type="text"
              value={demoName}
              onChange={(e) => setDemoName(e.target.value)}
              className="w-full rounded-md border border-line bg-surface-muted px-3 py-2 text-sm text-content outline-none focus:border-accent"
              placeholder={dict.auth.namePlaceholder}
              disabled={isLoading}
            />
          </div>

          <Button
            type="submit"
            variant="primary"
            className="w-full mt-2"
            disabled={isLoading}
          >
            {isLoading ? dict.api.checking : dict.auth.demoSignInButton}
          </Button>
        </form>
      </div>

      <div className="mt-6 text-center text-xs text-content-muted">
        <Link href="/landing" className="hover:text-accent hover:underline">
          {dict.auth.backToHome}
        </Link>
      </div>
    </Card>
  );
}
