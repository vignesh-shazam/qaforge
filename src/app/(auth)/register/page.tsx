import type { Metadata } from "next";
import Link from "next/link";
import { RegisterForm } from "./RegisterForm";

export const metadata: Metadata = {
  title: "Create account",
  description: "Create your free QAForge account.",
};

export default function RegisterPage(): React.JSX.Element {
  return (
    <div className="flex flex-col gap-6">
      {/* Heading */}
      <div className="text-center">
        <h1 className="text-2xl font-bold text-content-primary tracking-tight">
          Create your account
        </h1>
        <p className="mt-2 text-sm text-content-secondary">
          Start building your automation framework for free
        </p>
      </div>

      {/* Card */}
      <div className="rounded-xl border border-surface-700 bg-surface-800 p-6 shadow-xl">
        <RegisterForm />
      </div>

      {/* Footer link */}
      <p className="text-center text-sm text-content-secondary">
        Already have an account?{" "}
        <Link
          href="/login"
          className="font-medium text-brand-400 hover:text-brand-400/80 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 rounded"
        >
          Log in
        </Link>
      </p>
    </div>
  );
}
