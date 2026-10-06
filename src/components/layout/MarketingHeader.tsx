"use client";

import { useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Logo } from "./Logo";

const navLinks = [
  { label: "Product", href: "#features" },
  { label: "Features", href: "#features" },
  { label: "Pricing", href: "#pricing" },
  { label: "Docs", href: "#" },
  { label: "About", href: "#" },
] as const;

export function MarketingHeader(): React.JSX.Element {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full" style={{ background: "rgba(3,7,18,0.85)", backdropFilter: "blur(16px)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-6">
          <Logo />

          {/* Desktop nav */}
          <nav aria-label="Main navigation" className="hidden md:block">
            <ul className="flex items-center gap-0.5 list-none">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="px-3 py-2 text-sm text-content-secondary hover:text-content-primary transition-colors duration-150 rounded-md hover:bg-surface-700/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Desktop auth */}
          <div className="hidden md:flex items-center gap-2 shrink-0">
            <Link
              href="/login"
              className="px-3 py-2 text-sm text-content-secondary hover:text-content-primary transition-colors duration-150 rounded-md hover:bg-surface-700/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
            >
              Sign In
            </Link>
            <Link
              href="/register"
              className="inline-flex items-center justify-center h-8 px-4 text-sm font-semibold rounded-lg bg-brand-500 text-white hover:bg-brand-600 active:bg-brand-700 transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 focus-visible:ring-offset-surface-900 shadow-sm shadow-brand-500/20"
            >
              Get Started Free
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            type="button"
            className="md:hidden p-2 rounded-md text-content-secondary hover:text-content-primary hover:bg-surface-700/50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
            aria-label={mobileOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((v) => !v)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              {mobileOpen ? (
                <>
                  <path d="M18 6 6 18" />
                  <path d="m6 6 12 12" />
                </>
              ) : (
                <>
                  <line x1="4" x2="20" y1="6" y2="6" />
                  <line x1="4" x2="20" y1="12" y2="12" />
                  <line x1="4" x2="20" y1="18" y2="18" />
                </>
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <div
        className={cn(
          "md:hidden backdrop-blur-md",
          mobileOpen ? "block" : "hidden",
        )}
        style={{ background: "rgba(3,7,18,0.97)", borderTop: "1px solid rgba(255,255,255,0.06)" }}
      >
        <nav aria-label="Mobile navigation">
          <ul className="flex flex-col py-2 list-none">
            {navLinks.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="block px-6 py-3 text-sm text-content-secondary hover:text-content-primary hover:bg-surface-700/50 transition-colors"
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li className="border-t border-surface-700/50 mt-2 pt-3 px-4 pb-3 flex flex-col gap-2">
              <Link
                href="/login"
                onClick={() => setMobileOpen(false)}
                className="block px-3 py-2.5 text-sm text-center text-content-secondary hover:text-content-primary hover:bg-surface-700/50 rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
              >
                Sign In
              </Link>
              <Link
                href="/register"
                onClick={() => setMobileOpen(false)}
                className="block px-3 py-2.5 text-sm text-center font-semibold rounded-lg bg-brand-500 text-white hover:bg-brand-600 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
              >
                Get Started Free
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
