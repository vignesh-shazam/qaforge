import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { RegisterForm } from "./RegisterForm";
import { GoogleButton } from "@/components/ui/GoogleButton";
import { OAuthErrorBanner } from "@/components/ui/OAuthErrorBanner";

export const metadata: Metadata = {
  title: "Create Account | QAForge",
  description: "Create your free QAForge account.",
  robots: { index: false, follow: false },
};

export default function RegisterPage(): React.JSX.Element {
  return (
    <div className="flex flex-col gap-5">
      {/* Heading */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-white">
          Build better software
        </h1>
        <p className="mt-1.5 text-sm" style={{ color: "#94A3B8" }}>
          Create your QAForge workspace and start testing smarter.
        </p>
      </div>

      {/* OAuth errors */}
      <Suspense fallback={null}>
        <OAuthErrorBanner />
      </Suspense>

      {/* Auth card */}
      <div
        className="rounded-2xl p-6 flex flex-col gap-4"
        style={{
          background: "rgba(17,23,42,0.8)",
          border: "1px solid rgba(139,92,246,0.2)",
          boxShadow: "0 0 40px rgba(139,92,246,0.06), 0 16px 48px rgba(0,0,0,0.5)",
          backdropFilter: "blur(16px)",
        }}
      >
        {/* Google */}
        <Suspense fallback={
          <div className="w-full h-11 rounded-xl animate-pulse" style={{ background: "rgba(255,255,255,0.06)" }}/>
        }>
          <GoogleButton label="Sign up with Google" mode="register" />
        </Suspense>

        {/* Divider */}
        <div className="flex items-center gap-3">
          <div className="flex-1 h-px" style={{ background: "rgba(255,255,255,0.08)" }} aria-hidden="true"/>
          <span className="text-xs" style={{ color: "rgba(255,255,255,0.35)" }}>or continue with email</span>
          <div className="flex-1 h-px" style={{ background: "rgba(255,255,255,0.08)" }} aria-hidden="true"/>
        </div>

        {/* Email form */}
        <RegisterForm />
      </div>

      {/* Navigation */}
      <p className="text-center text-sm" style={{ color: "rgba(255,255,255,0.45)" }}>
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