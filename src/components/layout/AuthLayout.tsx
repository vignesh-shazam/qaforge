import Link from "next/link";
import { Logo } from "./Logo";

interface AuthLayoutProps {
  children: React.ReactNode;
}

/**
 * Shared layout for authentication pages (login, register, forgot-password).
 * Dark premium SaaS aesthetic with ambient glow.
 * No marketing header or footer — keeps auth screens focused.
 */
export function AuthLayout({ children }: AuthLayoutProps): React.JSX.Element {
  return (
    <div
      className="relative min-h-screen flex flex-col overflow-hidden"
      style={{ background: "#030712" }}
    >
      {/* ── Ambient background glows ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        {/* Top-left indigo glow */}
        <div
          className="absolute rounded-full"
          style={{
            top: "-20%",
            left: "-15%",
            width: "600px",
            height: "600px",
            background: "radial-gradient(circle, rgba(99,102,241,0.14) 0%, transparent 65%)",
            filter: "blur(40px)",
          }}
        />
        {/* Top-right blue glow */}
        <div
          className="absolute rounded-full"
          style={{
            top: "-10%",
            right: "-10%",
            width: "500px",
            height: "500px",
            background: "radial-gradient(circle, rgba(59,130,246,0.1) 0%, transparent 65%)",
            filter: "blur(50px)",
          }}
        />
        {/* Subtle grid */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(rgba(99,102,241,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(99,102,241,0.03) 1px,transparent 1px)",
            backgroundSize: "56px 56px",
          }}
        />
        {/* Bottom fade */}
        <div
          className="absolute bottom-0 left-0 right-0 h-40"
          style={{ background: "linear-gradient(to top,#030712,transparent)" }}
        />
      </div>

      {/* ── Top branding bar ── */}
      <header className="relative flex justify-center pt-8 pb-4">
        <Logo />
      </header>

      {/* ── Centered content ── */}
      <main className="relative flex flex-1 items-center justify-center px-4 py-8">
        <div className="w-full max-w-sm">{children}</div>
      </main>

      {/* ── Minimal footer ── */}
      <footer className="relative py-6 text-center">
        <p className="text-xs" style={{ color: "rgba(255,255,255,0.2)" }}>
          &copy; {new Date().getFullYear()} QAForge. &nbsp;
          <Link
            href="/login"
            className="hover:opacity-80 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 rounded"
            style={{ color: "rgba(255,255,255,0.3)" }}
          >
            Sign in
          </Link>
          {" · "}
          <Link
            href="/register"
            className="hover:opacity-80 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 rounded"
            style={{ color: "rgba(255,255,255,0.3)" }}
          >
            Create account
          </Link>
        </p>
      </footer>
    </div>
  );
}
