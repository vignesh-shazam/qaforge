"use client";

import Image from "next/image";

// ── Sidebar nav items ──────────────────────────────────────────────────────

const sidebarItems = [
  {
    label: "Dashboard",
    active: false,
    icon: (
      <svg width="11" height="11" viewBox="0 0 12 12" fill="none" aria-hidden="true">
        <rect x="1" y="1" width="4.5" height="4.5" rx="1" fill="currentColor" opacity=".7"/>
        <rect x="6.5" y="1" width="4.5" height="4.5" rx="1" fill="currentColor" opacity=".4"/>
        <rect x="1" y="6.5" width="4.5" height="4.5" rx="1" fill="currentColor" opacity=".4"/>
        <rect x="6.5" y="6.5" width="4.5" height="4.5" rx="1" fill="currentColor" opacity=".4"/>
      </svg>
    ),
  },
  {
    label: "Projects",
    active: false,
    icon: (
      <svg width="11" height="11" viewBox="0 0 12 12" fill="none" aria-hidden="true">
        <path d="M1 4h10M1 4V9.5a1 1 0 001 1h8a1 1 0 001-1V4M1 4l1.5-2.5h7L11 4" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    label: "Test Cases",
    active: true,
    icon: (
      <svg width="11" height="11" viewBox="0 0 12 12" fill="none" aria-hidden="true">
        <rect x="1.5" y="1" width="9" height="10" rx="1.5" stroke="currentColor" strokeWidth="1.1"/>
        <path d="M3.5 4h5M3.5 6.5h3.5M3.5 9h4" stroke="currentColor" strokeWidth="1" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    label: "Bug Reports",
    active: false,
    icon: (
      <svg width="11" height="11" viewBox="0 0 12 12" fill="none" aria-hidden="true">
        <circle cx="6" cy="6" r="3" stroke="currentColor" strokeWidth="1.1"/>
        <path d="M6 3V1.5M6 10.5V9M3 6H1.5M10.5 6H9" stroke="currentColor" strokeWidth="1" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    label: "Test Data",
    active: false,
    icon: (
      <svg width="11" height="11" viewBox="0 0 12 12" fill="none" aria-hidden="true">
        <ellipse cx="6" cy="4" rx="4" ry="1.8" stroke="currentColor" strokeWidth="1.1"/>
        <path d="M2 4v4c0 1 1.8 1.8 4 1.8s4-.8 4-1.8V4" stroke="currentColor" strokeWidth="1.1"/>
      </svg>
    ),
  },
  {
    label: "API Tests",
    active: false,
    icon: (
      <svg width="11" height="11" viewBox="0 0 12 12" fill="none" aria-hidden="true">
        <path d="M1.5 6h9M7 2.5l4 3.5-4 3.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    label: "Automation",
    active: false,
    icon: (
      <svg width="11" height="11" viewBox="0 0 12 12" fill="none" aria-hidden="true">
        <circle cx="6" cy="6" r="2" stroke="currentColor" strokeWidth="1.1"/>
        <path d="M6 1v1.5M6 9.5V11M1 6h1.5M9.5 6H11M2.6 2.6l1.1 1.1M8.3 8.3l1.1 1.1M2.6 9.4l1.1-1.1M8.3 3.7l1.1-1.1" stroke="currentColor" strokeWidth="1" strokeLinecap="round"/>
      </svg>
    ),
  },
] as const;

// ── Mock UI ────────────────────────────────────────────────────────────────

function TestCaseGeneratorUI(): React.JSX.Element {
  return (
    <div
      className="showcase-mockup rounded-2xl overflow-hidden transition-all duration-300"
      style={{
        background: "rgba(8,9,20,0.97)",
        border: "1px solid rgba(99,102,241,0.2)",
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLDivElement;
        el.style.border = "1px solid rgba(99,102,241,0.6)";
        el.style.boxShadow = "0 0 0 1px rgba(99,102,241,0.22), 0 0 28px rgba(99,102,241,0.45), 0 0 60px rgba(99,102,241,0.18)";
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLDivElement;
        el.style.border = "1px solid rgba(99,102,241,0.2)";
        el.style.boxShadow = "none";
      }}
    >
      {/* ── Top nav bar ── */}
      <div
        className="flex items-center gap-3 px-4 py-2.5"
        style={{ background: "rgba(5,6,16,0.98)", borderBottom: "1px solid rgba(255,255,255,0.05)" }}
      >
        {/* Logo */}
        <div className="flex items-center gap-1.5 shrink-0">
          <Image src="/branding/qaforge-icon.png" width={16} height={16} alt="QAForge" style={{ borderRadius: "4px" }} />
          <span className="text-[10px] font-bold text-white tracking-tight">QAForge</span>
        </div>

        {/* Search bar */}
        <div
          className="flex-1 flex items-center gap-2 h-6 rounded-md px-2.5 mx-2"
          style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}
        >
          <svg width="9" height="9" viewBox="0 0 10 10" fill="none" aria-hidden="true">
            <circle cx="4.3" cy="4.3" r="3.3" stroke="rgba(255,255,255,0.25)" strokeWidth="1.1"/>
            <path d="M7 7l1.5 1.5" stroke="rgba(255,255,255,0.25)" strokeWidth="1.1" strokeLinecap="round"/>
          </svg>
          <span className="text-[9px] flex-1" style={{ color: "rgba(255,255,255,0.2)" }}>Search projects, tests…</span>
        </div>

        {/* Avatar */}
        <div
          className="w-6 h-6 rounded-full flex items-center justify-center shrink-0"
          style={{ background: "linear-gradient(135deg,#6366f1,#4f46e5)" }}
        >
          <span className="text-[8px] font-bold text-white">V</span>
        </div>
      </div>

      {/* ── App shell ── */}
      <div className="flex" style={{ minHeight: "320px" }}>

        {/* ── Sidebar ── */}
        <div
          className="hidden sm:flex w-28 shrink-0 flex-col py-2 gap-0.5"
          style={{ background: "rgba(4,5,14,0.95)", borderRight: "1px solid rgba(255,255,255,0.04)" }}
        >
          {sidebarItems.map((item) => (
            <div
              key={item.label}
              className="flex items-center gap-2 mx-1.5 px-2 py-1.5 rounded-lg"
              style={{
                background: item.active ? "rgba(99,102,241,0.18)" : "transparent",
                color: item.active ? "#818cf8" : "rgba(255,255,255,0.3)",
              }}
            >
              <span style={{ color: item.active ? "#818cf8" : "rgba(255,255,255,0.3)", display: "flex" }}>
                {item.icon}
              </span>
              <span className="text-[9px]" style={{ fontWeight: item.active ? 600 : 400 }}>
                {item.label}
              </span>
            </div>
          ))}
        </div>

        {/* ── Main panel ── */}
        <div className="flex-1 flex flex-col p-4 gap-3 min-w-0">
          {/* Heading */}
          <h3 className="text-[13px] font-bold text-white">Test Case Generator</h3>

          {/* Tabs */}
          <div className="flex gap-1.5">
            {["From URL", "From Requirements", "Manual Input"].map((tab, i) => (
              <div
                key={tab}
                className="px-2.5 py-1 rounded-md text-[9px] font-medium"
                style={{
                  background: i === 0 ? "rgba(99,102,241,0.25)" : "rgba(255,255,255,0.04)",
                  color: i === 0 ? "#a5b4fc" : "rgba(255,255,255,0.3)",
                  border: i === 0 ? "1px solid rgba(99,102,241,0.35)" : "1px solid rgba(255,255,255,0.06)",
                }}
              >
                {tab}
              </div>
            ))}
          </div>

          {/* Application URL label + input */}
          <div>
            <p className="text-[9px] font-semibold mb-1.5" style={{ color: "rgba(255,255,255,0.5)" }}>Application URL</p>
            <div
              className="flex items-center gap-2 rounded-lg px-3 h-7"
              style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.09)" }}
            >
              <svg width="9" height="9" viewBox="0 0 10 10" fill="none" aria-hidden="true">
                <circle cx="4.3" cy="4.3" r="3.3" stroke="rgba(255,255,255,0.2)" strokeWidth="1.1"/>
                <path d="M7 7l1.5 1.5" stroke="rgba(255,255,255,0.2)" strokeWidth="1.1" strokeLinecap="round"/>
              </svg>
              <span className="text-[9px] font-mono" style={{ color: "rgba(255,255,255,0.35)" }}>
                https://example.com
              </span>
            </div>
          </div>

          {/* Generation Options */}
          <div>
            <p className="text-[9px] font-semibold uppercase tracking-wider mb-2" style={{ color: "rgba(255,255,255,0.3)" }}>
              Generation Options
            </p>
            <div className="flex flex-col gap-1.5">
              {[
                { label: "Include functional test cases", checked: true },
                { label: "Include negative test cases", checked: true },
                { label: "Include UI/UX test cases", checked: true },
                { label: "Include accessibility test cases", checked: true },
              ].map((opt) => (
                <div key={opt.label} className="flex items-center gap-2">
                  <div
                    className="w-3.5 h-3.5 rounded flex items-center justify-center shrink-0"
                    style={{
                      background: opt.checked ? "#6366f1" : "rgba(255,255,255,0.05)",
                      border: opt.checked ? "none" : "1px solid rgba(255,255,255,0.1)",
                    }}
                  >
                    {opt.checked && (
                      <svg width="8" height="8" viewBox="0 0 8 8" fill="none" aria-hidden="true">
                        <path d="M1.5 4l2 2 3-3" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    )}
                  </div>
                  <span className="text-[9px]" style={{ color: "rgba(255,255,255,0.45)" }}>{opt.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Generate button */}
          <div
            className="h-8 rounded-lg flex items-center justify-center text-[11px] font-semibold text-white mt-auto"
            style={{ background: "linear-gradient(135deg,#6366f1,#4f46e5)", boxShadow: "0 0 16px rgba(99,102,241,0.4)" }}
          >
            Generate Test Cases
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Bullet list ────────────────────────────────────────────────────────────

const bullets = [
  "Multiple input methods (URL, Requirements, Manual)",
  "Functional, Negative, UI/UX & Accessibility cases",
  "Edit, filter and export to multiple formats",
  "Save directly to your projects",
] as const;

// ── Section ────────────────────────────────────────────────────────────────

export function ProductShowcase(): React.JSX.Element {
  return (
    <section
      className="py-20 sm:py-24 overflow-hidden"
      aria-labelledby="showcase-heading"
      style={{ background: "#040810" }}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 xl:gap-20 items-center">

          {/* ── Left — UI mockup ── */}
          <div className="relative order-2 lg:order-1">
            {/* Keyframes injected inline */}
            <style>{`
              @keyframes showcaseGlowPulse {
                0%, 100% { opacity: 0.85; transform: scale(1); }
                50%       { opacity: 1;    transform: scale(1.06); }
              }
              @keyframes showcaseGlowDrift {
                0%, 100% { opacity: 0.7; transform: scale(1) translate(0, 0); }
                33%       { opacity: 1;   transform: scale(1.08) translate(4%, -3%); }
                66%       { opacity: 0.8; transform: scale(1.04) translate(-3%, 4%); }
              }
              @media (prefers-reduced-motion: reduce) {
                .showcase-glow { animation: none !important; }
              }
            `}</style>

            {/* Strong inner glow — pulsing */}
            <div
              className="showcase-glow absolute -z-10"
              aria-hidden="true"
              style={{
                inset: "-60px -40px -60px -40px",
                background: "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(99,102,241,0.38) 0%, rgba(79,70,229,0.2) 40%, transparent 70%)",
                filter: "blur(32px)",
                animation: "showcaseGlowPulse 3.5s ease-in-out infinite",
              }}
            />
            {/* Outer violet glow — slow drift */}
            <div
              className="showcase-glow absolute -z-10"
              aria-hidden="true"
              style={{
                inset: "-100px -80px",
                background: "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(139,92,246,0.16) 0%, transparent 65%)",
                filter: "blur(50px)",
                animation: "showcaseGlowDrift 6s ease-in-out infinite",
              }}
            />
            <TestCaseGeneratorUI />
          </div>

          {/* ── Right — copy ── */}
          <div className="flex flex-col gap-6 order-1 lg:order-2">
            {/* Badge */}
            <div
              className="inline-flex items-center gap-2 self-start rounded-full px-3 py-1"
              style={{ background: "rgba(99,102,241,0.12)", border: "1px solid rgba(99,102,241,0.25)" }}
            >
              <span className="text-[10px] font-bold uppercase tracking-widest" style={{ color: "#818cf8" }}>
                See It In Action
              </span>
            </div>

            <h2
              id="showcase-heading"
              className="text-3xl sm:text-4xl font-bold text-white tracking-tight leading-tight"
            >
              Generate comprehensive<br />test cases in seconds.
            </h2>

            <p className="text-sm sm:text-base leading-relaxed" style={{ color: "rgba(255,255,255,0.5)" }}>
              Just enter your application URL or requirements, and let AI create
              detailed, well-structured test cases with scenarios, steps and
              expected results.
            </p>

            {/* Bullet list */}
            <ul className="flex flex-col gap-3" role="list">
              {bullets.map((b) => (
                <li key={b} className="flex items-center gap-3 text-sm" style={{ color: "rgba(255,255,255,0.65)" }}>
                  <span className="shrink-0">
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                      <circle cx="9" cy="9" r="8" fill="rgba(34,197,94,0.12)" stroke="rgba(34,197,94,0.3)" strokeWidth="0.9"/>
                      <path d="M5.5 9l2.5 2.5 4.5-4.5" stroke="#4ade80" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </span>
                  {b}
                </li>
              ))}
            </ul>

            {/* Watch Demo button */}
            <button
              type="button"
              className="inline-flex items-center gap-2.5 h-11 px-6 rounded-xl text-sm font-semibold self-start transition-all duration-150 hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
              style={{
                background: "linear-gradient(135deg,#6366f1,#4f46e5)",
                color: "white",
                boxShadow: "0 0 20px rgba(99,102,241,0.4)",
              }}
            >
              {/* Play circle */}
              <span
                className="w-6 h-6 rounded-full flex items-center justify-center shrink-0"
                style={{ background: "rgba(255,255,255,0.2)" }}
              >
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
                  <path d="M3.5 2.5l4 2.5-4 2.5V2.5Z" fill="white"/>
                </svg>
              </span>
              Watch Demo
            </button>
          </div>

        </div>
      </div>
    </section>
  );
}
