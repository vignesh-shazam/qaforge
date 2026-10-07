"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Logo } from "./Logo";

const navLinks = [
  { label: "Features", href: "#features" },
  { label: "Pricing",  href: "#pricing"  },
  { label: "How It Works", href: "#" },
  { label: "Docs",     href: "#"         },
] as const;

export function MarketingHeader(): React.JSX.Element {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header
      className="sticky top-0 z-40 w-full"
      style={{
        background: "rgba(3,7,18,0.82)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        borderBottom: "1px solid rgba(99,102,241,0.12)",
      }}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-6">
          {/* Logo */}
          <Logo />

          {/* Desktop nav */}
          <nav aria-label="Main navigation" className="hidden md:block">
            <ul className="flex items-center gap-0.5 list-none m-0 p-0">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="px-3.5 py-2 text-sm rounded-lg transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
                    style={{ color: "rgba(255,255,255,0.55)" }}
                    onMouseEnter={(e) =>
                      ((e.currentTarget as HTMLAnchorElement).style.color = "rgba(255,255,255,0.9)")
                    }
                    onMouseLeave={(e) =>
                      ((e.currentTarget as HTMLAnchorElement).style.color = "rgba(255,255,255,0.55)")
                    }
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
              className="px-4 py-2 text-sm rounded-lg transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
              style={{ color: "rgba(255,255,255,0.55)" }}
            >
              Sign In
            </Link>

            {/* Gradient CTA */}
            <Link
              href="/register"
              className="relative inline-flex items-center justify-center h-9 px-5 text-sm font-semibold text-white rounded-lg overflow-hidden transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent group"
              style={{
                background: "linear-gradient(135deg, #6366f1 0%, #4f46e5 50%, #3b82f6 100%)",
                boxShadow: "0 0 18px rgba(99,102,241,0.4), 0 2px 8px rgba(0,0,0,0.3)",
              }}
            >
              <span className="relative z-10">Get Started Free</span>
              {/* Hover shimmer */}
              <span
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                style={{
                  background:
                    "linear-gradient(135deg, #818cf8 0%, #6366f1 50%, #60a5fa 100%)",
                }}
                aria-hidden="true"
              />
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            type="button"
            className="md:hidden p-2 rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
            style={{ color: "rgba(255,255,255,0.6)" }}
            aria-label={mobileOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((v) => !v)}
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <div
        className={cn("md:hidden", mobileOpen ? "block" : "hidden")}
        style={{
          background: "rgba(3,7,18,0.97)",
          borderTop: "1px solid rgba(99,102,241,0.1)",
        }}
      >
        <nav aria-label="Mobile navigation">
          <ul className="flex flex-col py-2 list-none m-0 p-0">
            {navLinks.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="block px-6 py-3 text-sm transition-colors"
                  style={{ color: "rgba(255,255,255,0.55)" }}
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li
              className="mt-2 pt-3 pb-3 px-4 flex flex-col gap-2"
              style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
            >
              <Link
                href="/login"
                onClick={() => setMobileOpen(false)}
                className="block px-3 py-2.5 text-sm text-center rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
                style={{
                  color: "rgba(255,255,255,0.6)",
                  border: "1px solid rgba(255,255,255,0.08)",
                }}
              >
                Sign In
              </Link>
              <Link
                href="/register"
                onClick={() => setMobileOpen(false)}
                className="block px-3 py-2.5 text-sm text-center font-semibold text-white rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
                style={{
                  background: "linear-gradient(135deg, #6366f1, #3b82f6)",
                  boxShadow: "0 0 14px rgba(99,102,241,0.3)",
                }}
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
