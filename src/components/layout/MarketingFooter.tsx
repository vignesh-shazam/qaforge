"use client";

import { useState } from "react";
import Link from "next/link";
import { Logo } from "./Logo";

const navColumns = [
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
      { label: "Blog", href: "#" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "About", href: "#" },
      { label: "Careers", href: "#" },
      { label: "Contact", href: "#" },
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

        {/* Main grid: logo+desc | Product | Resources | Company | Newsletter */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10 py-12">

          {/* Brand column */}
          <div className="lg:col-span-1 flex flex-col gap-4">
            <Logo />
            <p className="text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.35)" }}>
              AI-powered QA engineering platform for modern teams.
            </p>
          </div>

          {/* Nav columns */}
          {navColumns.map((col) => (
            <div key={col.heading}>
              <h3 className="text-[10px] font-bold uppercase tracking-widest mb-4" style={{ color: "rgba(255,255,255,0.4)" }}>
                {col.heading}
              </h3>
              <ul className="flex flex-col gap-2.5 list-none">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-xs transition-colors duration-150 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 rounded"
                      style={{ color: "rgba(255,255,255,0.4)" }}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Newsletter column */}
          <div>
            <h3 className="text-[10px] font-bold uppercase tracking-widest mb-1" style={{ color: "rgba(255,255,255,0.4)" }}>
              Stay Updated
            </h3>
            <p className="text-xs mb-4" style={{ color: "rgba(255,255,255,0.28)" }}>
              Get the latest updates and new features.
            </p>
            {submitted ? (
              <p className="text-xs" style={{ color: "#4ade80" }}>Thanks — you&apos;re on the list!</p>
            ) : (
              <form onSubmit={handleSubmit} className="flex gap-0" aria-label="Newsletter signup">
                <label htmlFor="footer-email" className="sr-only">Email address</label>
                <input
                  id="footer-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="flex-1 min-w-0 h-9 rounded-l-lg px-3 text-xs focus:outline-none focus:ring-2 focus:ring-brand-500 transition-colors"
                  style={{
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    borderRight: "none",
                    color: "rgba(255,255,255,0.8)",
                  }}
                />
                <button
                  type="submit"
                  aria-label="Subscribe"
                  className="h-9 w-9 rounded-r-lg flex items-center justify-center shrink-0 transition-colors hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
                  style={{ background: "#6366f1" }}
                >
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                    <path d="M2 7h10M8 3l4 4-4 4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="flex flex-col sm:flex-row items-center justify-between gap-3 py-5"
          style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}
        >
          <p className="text-[11px]" style={{ color: "rgba(255,255,255,0.2)" }}>
            &copy; 2026 QAForge. All rights reserved.
          </p>
          <div className="flex items-center gap-5">
            {["Privacy", "Terms", "Cookies"].map((label) => (
              <Link
                key={label}
                href="#"
                className="text-[11px] transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 rounded"
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
