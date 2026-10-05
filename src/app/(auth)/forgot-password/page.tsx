import type { Metadata } from "next";
import Link from "next/link";
import { ForgotPasswordForm } from "./ForgotPasswordForm";

export const metadata: Metadata = {
  title: "Reset password",
  description: "Reset your QAForge account password.",
};

export default function ForgotPasswordPage(): React.JSX.Element {
  return (
    <div className="flex flex-col gap-6">
      {/* Heading */}
      <div className="text-center">
        <h1 className="text-2xl font-bold text-content-primary tracking-tight">
          Reset your password
        </h1>
        <p className="mt-2 text-sm text-content-secondary">
          Enter your email and we&apos;ll send you a reset link
        </p>
      </div>

      {/* Card */}
      <div className="rounded-xl border border-surface-700 bg-surface-800 p-6 shadow-xl">
        <ForgotPasswordForm />
      </div>

      {/* Footer link */}
      <p className="text-center text-sm text-content-secondary">
        Remember your password?{" "}
        <Link
          href="/login"
          className="font-medium text-brand-400 hover:text-brand-400/80 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 rounded"
        >
          Back to log in
        </Link>
      </p>
    </div>
  );
}
