import type { Metadata } from "next";
import Link from "next/link";
import { ForgotPasswordForm } from "./ForgotPasswordForm";

export const metadata: Metadata = {
  title: "Reset Password | QAForge",
  description: "Reset your QAForge account password.",
  robots: { index: false, follow: false },
};

export default function ForgotPasswordPage(): React.JSX.Element {
  return (
    <div className="flex flex-col gap-6">
      {/* Heading */}
      <div className="text-center">
        <h1 className="text-2xl font-bold tracking-tight" style={{ color: "rgba(255,255,255,0.95)" }}>
          Forgot your password?
        </h1>
        <p className="mt-2 text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.5)" }}>
          Enter your email address and we&apos;ll send you a password reset link.
        </p>
      </div>

      {/* Auth card */}
      <div
        className="rounded-2xl p-6"
        style={{
          background: "rgba(8,9,22,0.85)",
          border: "1px solid rgba(99,102,241,0.2)",
          boxShadow: "0 0 40px rgba(99,102,241,0.08), 0 16px 48px rgba(0,0,0,0.5)",
          backdropFilter: "blur(16px)",
        }}
      >
        <ForgotPasswordForm />
      </div>

      {/* Navigation */}
      <p className="text-center text-sm" style={{ color: "rgba(255,255,255,0.4)" }}>
        <Link
          href="/login"
          className="font-medium text-brand-400 hover:opacity-80 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 rounded"
        >
          ← Back to Sign In
        </Link>
      </p>
    </div>
  );
}
