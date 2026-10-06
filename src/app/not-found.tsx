import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "404 — Page not found",
};

export default function NotFound(): React.JSX.Element {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-surface-900 px-4">
      <div className="flex flex-col items-center gap-6 text-center max-w-md">
        {/* Error code */}
        <div className="text-8xl font-bold text-surface-700 select-none" aria-hidden="true">
          404
        </div>

        {/* Icon */}
        <div className="flex items-center justify-center w-16 h-16 rounded-full bg-surface-800 border border-surface-700">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-content-tertiary"
            aria-hidden="true"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.3-4.3" />
          </svg>
        </div>

        {/* Message */}
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-bold text-content-primary tracking-tight">
            Page not found
          </h1>
          <p className="text-sm text-content-secondary leading-relaxed">
            The page you&apos;re looking for doesn&apos;t exist or has been
            moved. Double-check the URL or head back to safety.
          </p>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <Link
            href="/"
            className="inline-flex items-center justify-center h-9 px-5 rounded-md bg-brand-500 text-white text-sm font-medium hover:bg-brand-600 transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 focus-visible:ring-offset-surface-900"
          >
            Go home
          </Link>
          <Link
            href="/dashboard"
            className="inline-flex items-center justify-center h-9 px-5 rounded-md border border-surface-600 text-content-secondary text-sm font-medium hover:bg-surface-700 hover:text-content-primary transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 focus-visible:ring-offset-surface-900"
          >
            Go to dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}
