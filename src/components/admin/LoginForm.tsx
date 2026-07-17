"use client";

import Script from "next/script";
import { FormEvent, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

declare global {
  interface Window {
    grecaptcha?: {
      ready: (cb: () => void) => void;
      execute: (
        siteKey: string,
        options: { action: string },
      ) => Promise<string>;
    };
  }
}

/**
 * Admin login form.
 * Validates on the client, then posts to /api/auth/login
 * (reCAPTCHA v3 + IP rate limiting happen server-side).
 */
export default function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const nextPath = searchParams.get("next") || "/dashboard";
  const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || "";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(
    searchParams.get("error") === "unauthorized"
      ? "You do not have admin access."
      : "",
  );
  const [fieldErrors, setFieldErrors] = useState<{
    email?: string;
    password?: string;
  }>({});
  const [loading, setLoading] = useState(false);

  const getCaptchaToken = async (): Promise<string> => {
    if (!siteKey) return "";
    if (!window.grecaptcha) return "";

    return new Promise((resolve) => {
      window.grecaptcha!.ready(() => {
        window
          .grecaptcha!.execute(siteKey, { action: "login" })
          .then(resolve)
          .catch(() => resolve(""));
      });
    });
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setError("");

    const nextErrors: { email?: string; password?: string } = {};
    if (!email.trim()) nextErrors.email = "Email is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      nextErrors.email = "Enter a valid email address.";
    }
    if (!password) nextErrors.password = "Password is required.";
    else if (password.length < 6) {
      nextErrors.password = "Password must be at least 6 characters.";
    }

    setFieldErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setLoading(true);
    try {
      const captchaToken = await getCaptchaToken();

      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email.trim().toLowerCase(),
          password,
          captchaToken,
        }),
      });

      const data = (await response.json()) as { error?: string };

      if (!response.ok) {
        setError(
          data.error || "Invalid email or password. Please try again.",
        );
        return;
      }

      router.replace(nextPath);
      router.refresh();
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {siteKey ? (
        <Script
          src={`https://www.google.com/recaptcha/api.js?render=${siteKey}`}
          strategy="afterInteractive"
        />
      ) : null}

      <form onSubmit={handleSubmit} className="space-y-5" noValidate>
        <div>
          <label
            htmlFor="login-email"
            className="mb-1.5 block text-sm font-medium text-ink"
          >
            Email
          </label>
          <input
            id="login-email"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            aria-invalid={Boolean(fieldErrors.email)}
            className={`w-full rounded-md border bg-surface-elevated px-3.5 py-2.5 text-ink outline-none transition-colors ${
              fieldErrors.email
                ? "border-danger"
                : "border-line focus:border-sage"
            }`}
            placeholder="admin@example.com"
          />
          {fieldErrors.email && (
            <p className="mt-1.5 text-sm text-danger" role="alert">
              {fieldErrors.email}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="login-password"
            className="mb-1.5 block text-sm font-medium text-ink"
          >
            Password
          </label>
          <input
            id="login-password"
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            aria-invalid={Boolean(fieldErrors.password)}
            className={`w-full rounded-md border bg-surface-elevated px-3.5 py-2.5 text-ink outline-none transition-colors ${
              fieldErrors.password
                ? "border-danger"
                : "border-line focus:border-sage"
            }`}
            placeholder="••••••••"
          />
          {fieldErrors.password && (
            <p className="mt-1.5 text-sm text-danger" role="alert">
              {fieldErrors.password}
            </p>
          )}
        </div>

        {error && (
          <p
            className="rounded-md border border-danger/30 bg-danger/10 px-4 py-3 text-sm text-danger"
            role="alert"
          >
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="inline-flex min-h-11 w-full items-center justify-center rounded-md bg-sage px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-sage-dark disabled:cursor-not-allowed disabled:opacity-70"
        >
          {loading ? "Signing in…" : "Sign in"}
        </button>

        {siteKey ? (
          <p className="text-center text-[11px] text-ink-soft">
            Protected by reCAPTCHA
          </p>
        ) : null}
      </form>
    </>
  );
}
