import type { Metadata } from "next";
import Link from "next/link";
import { LoginForm } from "./LoginForm";

export const metadata: Metadata = {
  title: "Log in",
  description: "Log in to your QAForge account.",
};

export default function LoginPage(): React.JSX.Element {
  return (
    <div className="flex flex-col gap-6">
      {/* Heading */}
      <div className="text-center">
        <h1 className="text-2xl font-bold text-content-primary tracking-tight">
          Welcome back
        </h1>
        <p className="mt-2 text-sm text-content-secondary">
          Log in to your QAForge account
        </p>
      </div>

      {/* Card */}
      <div className="rounded-xl border border-surface-700 bg-surface-800 p-6 shadow-xl">
        <LoginForm />
      </div>

      {/* Footer link */}
      <p className="text-center text-sm text-content-secondary">
        Don&apos;t have an account?{" "}
        <Link
          href="/register"
          className="font-medium text-brand-400 hover:text-brand-400/80 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 rounded"
        >
          Create one free
        </Link>
      </p>
    </div>
  );
}
