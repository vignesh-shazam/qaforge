"use client";

import { useState } from "react";
import Link from "next/link";
import { Logo } from "./Logo";

const columns = [
  {
    heading: "Product",
    links: [
      { label: "Features", href: "#features" },
      { label: "Pricing", href: "#pricing" },
      { label: "Changelog", href: "#" },
    ],
  },
  {
    heading: "Resources",
    links: [
      { label: "Documentation", href: "#" },
      { label: "API Reference", href: "#" },
      { label: "Tutorials", href: "#" },
      { label: "Blog", href: "#" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "About", href: "#" },
      { label: "Contact", href: "#" },
      { label: "Careers", href: "#" },
      { label: "Privacy", href: "#" },
      { label: "Terms", href: "#" },
    ],
  },
] as const;

export function MarketingFooter(): React.JSX.Element {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>): void {
    e.preventDefault();
    if (email.trim()) setSubmitted(true);
  }

  return (
    <footer style={{ background: "#020509", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Main grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 py-14">
          {/* Brand + newsletter */}
          <div className="lg:col-span-2 flex flex-col gap-5">
            <Logo />
            <p className="text-sm leading-relaxed max-w-xs" style={{ color: "rgba(255,255,255,0.35)" }}>
              QAForge turns your web application into a production-ready
              automation framework — powered by AI.
            </p>

            {/* Newsletter */}
            <div className="mt-1">
              <p className="text-[10px] font-bold uppercase tracking-widest mb-3" style={{ color: "rgba(255,255,255,0.35)" }}>
                Stay Updated
              </p>
              {submitted ? (
                <p className="text-xs" style={{ color: "#4ade80" }}>Thanks — you&apos;re on the list!</p>
              ) : (
                <form onSubmit={handleSubmit} className="flex gap-2" aria-label="Newsletter signup">
                  <label htmlFor="footer-email" className="sr-only">Email address</label>
                  <input
                    id="footer-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                    className="flex-1 min-w-0 h-9 rounded-lg px-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 transition-colors"
                    style={{
                      background: "rgba(255,255,255,0.04)",
                      border: "1px solid rgba(255,255,255,0.1)",
                      color: "rgba(255,255,255,0.8)",
                    }}
                  />
                  <button
                    type="submit"
                    className="h-9 px-4 rounded-lg text-sm font-medium text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 shrink-0 transition-colors"
                    style={{ background: "#6366f1" }}
                  >
                    Subscribe
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Link columns */}
          {columns.map((col) => (
            <div key={col.heading}>
              <h3 className="text-[10px] font-bold uppercase tracking-widest mb-5" style={{ color: "rgba(255,255,255,0.35)" }}>
                {col.heading}
              </h3>
              <ul className="flex flex-col gap-3 list-none">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 rounded"
                      style={{ color: "rgba(255,255,255,0.35)" }}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div
          className="flex flex-col sm:flex-row items-center justify-between gap-4 py-6"
          style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}
        >
          <p className="text-[11px]" style={{ color: "rgba(255,255,255,0.2)" }}>
            &copy; {new Date().getFullYear()} QAForge. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            {["Privacy", "Terms"].map((label) => (
              <Link
                key={label}
                href="#"
                className="text-[11px] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 rounded"
                style={{ color: "rgba(255,255,255,0.2)" }}
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
