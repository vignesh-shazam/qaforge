import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { LoginForm } from "./LoginForm";

export const metadata: Metadata = {
  title: "Sign In | QAForge",
  description: "Sign in to your QAForge account.",
  robots: { index: false, follow: false },
};

export default function LoginPage(): React.JSX.Element {
  return (
    <div className="flex flex-col gap-6">
      <div className="text-center">
        <h1 className="text-2xl font-bold tracking-tight" style={{ color: "rgba(255,255,255,0.95)" }}>
          Welcome back
        </h1>
        <p className="mt-2 text-sm" style={{ color: "rgba(255,255,255,0.5)" }}>
          Sign in to continue to QAForge.
        </p>
      </div>

      <div
        className="rounded-2xl p-6"
        style={{
          background: "rgba(8,9,22,0.85)",
          border: "1px solid rgba(99,102,241,0.2)",
          boxShadow: "0 0 40px rgba(99,102,241,0.08), 0 16px 48px rgba(0,0,0,0.5)",
          backdropFilter: "blur(16px)",
        }}
      >
        {/* Suspense required for useSearchParams in LoginForm */}
        <Suspense fallback={<div className="text-sm text-center" style={{ color: "rgba(255,255,255,0.4)" }}>Loading…</div>}>
          <LoginForm />
        </Suspense>
      </div>

      <p className="text-center text-sm" style={{ color: "rgba(255,255,255,0.4)" }}>
        Don&apos;t have an account?{" "}
        <Link
          href="/register"
          className="font-medium text-brand-400 hover:opacity-80 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 rounded"
        >
          Sign up
        </Link>
      </p>
    </div>
  );
}
