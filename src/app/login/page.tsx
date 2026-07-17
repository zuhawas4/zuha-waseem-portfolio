import { Suspense } from "react";
import Link from "next/link";
import LoginForm from "@/components/admin/LoginForm";

export const metadata = {
  title: "Admin Login — Zuha Waseem",
  description: "Sign in to the portfolio admin dashboard.",
};

export default function LoginPage() {
  return (
    <main className="page-atmosphere flex min-h-[100svh] items-center justify-center px-5 py-16">
      <div className="w-full max-w-md">
        <Link
          href="/"
          className="font-display text-xl text-ink transition-colors hover:text-sage-dark"
        >
          Zuha Waseem
        </Link>
        <h1 className="mt-8 font-display text-3xl tracking-tight text-ink sm:text-4xl">
          Admin login
        </h1>
        <p className="mt-2 text-sm text-ink-soft">
          Sign in to manage contact submissions.
        </p>

        <div className="mt-8 rounded-lg border border-line bg-surface-elevated p-6 sm:p-8">
          <Suspense fallback={<p className="text-sm text-ink-soft">Loading…</p>}>
            <LoginForm />
          </Suspense>
        </div>
      </div>
    </main>
  );
}
