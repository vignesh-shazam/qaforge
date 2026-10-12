import type { ReactElement } from "react";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default function AdminLoginPage(): ReactElement {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-950 px-4">
      <section className="w-full max-w-md rounded-2xl border border-slate-800 bg-slate-900 p-8 text-white shadow-2xl">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-violet-600 text-2xl font-bold">
            Q
          </div>
          <h1 className="text-2xl font-bold">QAForge Admin</h1>
          <p className="mt-2 text-sm text-slate-400">
            Sign in with your configured owner Google account.
          </p>
        </div>

        <a
          href="/api/auth/google?next=%2Fadmin%2Fdashboard"
          className="flex w-full items-center justify-center rounded-xl bg-white px-4 py-3 font-semibold text-slate-900 transition hover:bg-slate-100"
        >
          Continue with Google
        </a>

        <p className="mt-5 text-center text-xs leading-5 text-slate-400">
          Only the configured admin owner can access the admin dashboard.
        </p>

        <div className="mt-6 text-center">
          <Link
            href="/login"
            className="text-sm text-violet-400 hover:text-violet-300"
          >
            Go to regular login
          </Link>
        </div>
      </section>
    </main>
  );
}