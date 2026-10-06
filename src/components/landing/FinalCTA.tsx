"use client";

import Link from "next/link";

// Floating icon tiles shown on the right side of the banner
function IconTile({ bg, children }: { bg: string; children: React.ReactNode }): React.JSX.Element {
  return (
    <div
      className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0"
      style={{
        background: bg,
        boxShadow: "0 4px 16px rgba(0,0,0,0.35)",
      }}
      aria-hidden="true"
    >
      {children}
    </div>
  );
}

export function FinalCTA(): React.JSX.Element {
  return (
    <section
      className="py-20 sm:py-24"
      aria-labelledby="final-cta-heading"
      style={{ background: "#030712" }}
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Banner card */}
        <div
          className="relative rounded-2xl overflow-hidden px-8 py-10 sm:px-12 sm:py-12"
          style={{
            background: "linear-gradient(135deg, #1e1b4b 0%, #312e81 35%, #4c1d95 65%, #1e1b4b 100%)",
            border: "1px solid rgba(139,92,246,0.3)",
          }}
        >
          {/* Subtle grid overlay */}
          <div
            className="absolute inset-0 pointer-events-none"
            aria-hidden="true"
            style={{
              backgroundImage: "linear-gradient(rgba(255,255,255,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.03) 1px,transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          />
          {/* Glow orb */}
          <div
            className="absolute -top-20 -left-20 w-64 h-64 rounded-full pointer-events-none"
            aria-hidden="true"
            style={{
              background: "radial-gradient(circle, rgba(139,92,246,0.35) 0%, transparent 70%)",
              filter: "blur(40px)",
            }}
          />

          <div className="relative flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
            {/* Left — text */}
            <div className="flex-1 min-w-0">
              <h2
                id="final-cta-heading"
                className="text-2xl sm:text-3xl font-bold text-white leading-snug mb-3"
              >
                Ready to transform your QA process?
              </h2>
              <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.6)" }}>
                Join thousands of QA engineers who are already saving time
                and building better automation with QAForge.
              </p>
            </div>

            {/* Center — buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
              <Link
                href="/register"
                className="inline-flex items-center justify-center gap-2 h-11 px-6 rounded-xl text-sm font-semibold text-white transition-all duration-150 hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 whitespace-nowrap"
                style={{
                  background: "linear-gradient(135deg,#6366f1,#4f46e5)",
                  boxShadow: "0 0 20px rgba(99,102,241,0.5)",
                }}
              >
                Get Started Free
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                  <path d="M2 7h10M8 3l4 4-4 4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </Link>

              <button
                type="button"
                className="inline-flex items-center justify-center gap-2 h-11 px-6 rounded-xl text-sm font-semibold transition-all duration-150 hover:scale-[1.01] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 whitespace-nowrap"
                style={{
                  background: "rgba(0,0,0,0.35)",
                  border: "1px solid rgba(255,255,255,0.2)",
                  color: "white",
                }}
              >
                {/* Play circle */}
                <span
                  className="w-6 h-6 rounded-full flex items-center justify-center shrink-0"
                  style={{ background: "rgba(255,255,255,0.15)" }}
                >
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
                    <path d="M3.5 2.5l4 2.5-4 2.5V2.5Z" fill="white"/>
                  </svg>
                </span>
                Watch Demo
              </button>
            </div>

            {/* Right — floating icon tiles */}
            <div className="hidden lg:flex items-center gap-3 shrink-0" aria-hidden="true">
              {/* Column 1 */}
              <div className="flex flex-col gap-3">
                <IconTile bg="linear-gradient(135deg,#6366f1,#4f46e5)">
                  {/* Test cases doc */}
                  <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                    <rect x="4" y="2" width="14" height="18" rx="2.5" fill="rgba(255,255,255,0.15)" stroke="rgba(255,255,255,0.4)" strokeWidth="1"/>
                    <rect x="6.5" y="5.5" width="9" height="1.8" rx="0.9" fill="white" opacity=".9"/>
                    <rect x="6.5" y="9" width="6" height="1.5" rx="0.75" fill="white" opacity=".6"/>
                    <rect x="6.5" y="12" width="7.5" height="1.5" rx="0.75" fill="white" opacity=".45"/>
                    <path d="M6.5 15.5l1.5 1.5 2.5-2.5" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" opacity=".8"/>
                  </svg>
                </IconTile>
                <IconTile bg="linear-gradient(135deg,#dc2626,#ef4444)">
                  {/* Bug */}
                  <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                    <circle cx="11" cy="11" r="5.5" fill="rgba(255,255,255,0.15)" stroke="rgba(255,255,255,0.5)" strokeWidth="1.1"/>
                    <path d="M11 7.5v5" stroke="white" strokeWidth="1.8" strokeLinecap="round"/>
                    <circle cx="11" cy="15" r="1" fill="white"/>
                    <path d="M5 11H3M19 11h-2M8.5 7L7 5M13.5 7l1.5-2" stroke="rgba(255,255,255,0.5)" strokeWidth="1" strokeLinecap="round"/>
                  </svg>
                </IconTile>
              </div>
              {/* Column 2 — offset */}
              <div className="flex flex-col gap-3 mt-6">
                <IconTile bg="linear-gradient(135deg,#0e9e82,#14b8a6)">
                  {/* Database */}
                  <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                    <ellipse cx="11" cy="7" rx="6" ry="2.5" fill="rgba(255,255,255,0.18)" stroke="rgba(255,255,255,0.45)" strokeWidth="1.1"/>
                    <path d="M5 7v4c0 1.38 2.69 2.5 6 2.5s6-1.12 6-2.5V7" stroke="rgba(255,255,255,0.5)" strokeWidth="1.1"/>
                    <path d="M5 11v4c0 1.38 2.69 2.5 6 2.5s6-1.12 6-2.5v-4" stroke="rgba(255,255,255,0.5)" strokeWidth="1.1"/>
                  </svg>
                </IconTile>
                <IconTile bg="linear-gradient(135deg,#7c3aed,#6366f1)">
                  {/* AI sparkle */}
                  <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                    <path d="M11 3l2 5.5 5.5.5-4 3.5 1.5 5.5L11 15l-5 3 1.5-5.5L3.5 9l5.5-.5L11 3Z" fill="rgba(255,255,255,0.15)" stroke="white" strokeWidth="1.2" strokeLinejoin="round"/>
                    <circle cx="17" cy="5" r="1.8" fill="white" opacity=".8"/>
                  </svg>
                </IconTile>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
