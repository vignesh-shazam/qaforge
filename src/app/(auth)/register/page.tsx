import type { Metadata } from "next";
import Link from "next/link";
import { RegisterForm } from "./RegisterForm";

export const metadata: Metadata = {
  title: "Create Account | QAForge",
  description: "Create your free QAForge account and start building production-ready QA automation.",
  robots: { index: false, follow: false },
};

export default function RegisterPage(): React.JSX.Element {
  return (
    <div className="flex flex-col gap-6">
      {/* Heading */}
      <div className="text-center">
        <h1 className="text-2xl font-bold tracking-tight" style={{ color: "rgba(255,255,255,0.95)" }}>
          Create your account
        </h1>
        <p className="mt-2 text-sm" style={{ color: "rgba(255,255,255,0.5)" }}>
          Start building production-ready QA automation with QAForge.
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
        <RegisterForm />
      </div>

      {/* Navigation */}
      <p className="text-center text-sm" style={{ color: "rgba(255,255,255,0.4)" }}>
        Already have an account?{" "}
        <Link
          href="/login"
          className="font-medium text-brand-400 hover:opacity-80 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 rounded"
        >
          Sign in
        </Link>
      </p>
    </div>
  );
}
