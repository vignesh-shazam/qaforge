import Link from "next/link";

// ---------------------------------------------------------------------------
// Dashboard mockup — faithful to the screenshot design
// ---------------------------------------------------------------------------

function DashboardMockup(): React.JSX.Element {
  return (
    <div className="relative w-full">
      {/* Outer glow */}
      <div
        className="absolute -inset-8 -z-10 rounded-[40px] opacity-60"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(ellipse 70% 70% at 50% 50%, rgba(99,102,241,0.35) 0%, rgba(139,92,246,0.2) 40%, transparent 75%)",
          filter: "blur(30px)",
        }}
      />

      {/* Browser chrome wrapper */}
      <div
        className="rounded-2xl overflow-hidden shadow-2xl"
        style={{
          border: "1px solid rgba(255,255,255,0.08)",
          background: "rgba(13,13,18,0.95)",
          backdropFilter: "blur(16px)",
        }}
      >
        {/* URL bar */}
        <div
          className="flex items-center gap-3 px-4 py-2.5"
          style={{ background: "rgba(8,8,12,0.9)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}
        >
          <div className="flex gap-1.5 shrink-0">
            <span className="w-2.5 h-2.5 rounded-full" style={{ background: "#ef4444" }} aria-hidden="true" />
            <span className="w-2.5 h-2.5 rounded-full" style={{ background: "#f59e0b" }} aria-hidden="true" />
            <span className="w-2.5 h-2.5 rounded-full" style={{ background: "#22c55e" }} aria-hidden="true" />
          </div>
          <div
            className="flex-1 flex items-center gap-2 rounded-md px-3 h-6 max-w-[200px]"
            style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.07)" }}
          >
            <svg width="8" height="8" viewBox="0 0 10 10" fill="none" aria-hidden="true">
              <circle cx="5" cy="5" r="4" stroke="rgba(255,255,255,0.25)" strokeWidth="1"/>
            </svg>
            <span className="text-[9px] font-mono" style={{ color: "rgba(255,255,255,0.3)" }}>app.qaforge.io</span>
          </div>
          <div className="ml-auto flex items-center gap-2">
            <div className="w-5 h-5 rounded-full bg-brand-500 flex items-center justify-center">
              <span className="text-[7px] font-bold text-white">V</span>
            </div>
            <span className="text-[10px] text-content-tertiary">Welcome back, Vignesw 👋</span>
          </div>
        </div>

        {/* App layout */}
        <div className="flex" style={{ height: "340px" }}>
          {/* Sidebar */}
          <div
            className="flex flex-col w-32 shrink-0 py-3"
            style={{ background: "rgba(8,8,14,0.8)", borderRight: "1px solid rgba(255,255,255,0.05)" }}
          >
            {/* Logo in sidebar */}
            <div className="flex items-center gap-1.5 px-3 mb-4">
              <div className="w-5 h-5 rounded bg-brand-500 flex items-center justify-center shrink-0">
                <svg width="10" height="10" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                  <path d="M2 6l3 3 5-5" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </div>
              <span className="text-[10px] font-bold text-white">QAForge</span>
            </div>

            {[
              { label: "Dashboard", active: true },
              { label: "Projects", active: false },
              { label: "Test Cases", active: false },
              { label: "Bug Reports", active: false },
              { label: "Test Data", active: false },
              { label: "API Tests", active: false },
              { label: "Automation", active: false },
            ].map((item) => (
              <div
                key={item.label}
                className="flex items-center gap-2 px-3 py-1.5 mx-1 rounded-md"
                style={{
                  background: item.active ? "rgba(99,102,241,0.15)" : "transparent",
                  borderLeft: item.active ? "2px solid rgba(99,102,241,0.6)" : "2px solid transparent",
                }}
              >
                <div
                  className="w-1.5 h-1.5 rounded-sm"
                  style={{ background: item.active ? "#818cf8" : "rgba(255,255,255,0.2)" }}
                  aria-hidden="true"
                />
                <span
                  className="text-[10px]"
                  style={{ color: item.active ? "#818cf8" : "rgba(255,255,255,0.35)" }}
                >
                  {item.label}
                </span>
              </div>
            ))}
          </div>

          {/* Main area */}
          <div className="flex-1 p-4 overflow-hidden flex flex-col gap-3">
            {/* Search bar row */}
            <div className="flex items-center gap-3">
              <div
                className="flex-1 flex items-center gap-2 rounded-lg h-7 px-3"
                style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}
              >
                <svg width="10" height="10" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                  <circle cx="5" cy="5" r="4" stroke="rgba(255,255,255,0.25)" strokeWidth="1.2"/>
                  <path d="M9 9l-2-2" stroke="rgba(255,255,255,0.25)" strokeWidth="1.2"/>
                </svg>
                <span className="text-[10px]" style={{ color: "rgba(255,255,255,0.2)" }}>Search…</span>
              </div>
              <div
                className="h-7 px-3 rounded-lg flex items-center text-[10px] font-medium text-white"
                style={{ background: "#6366f1" }}
              >
                + New
              </div>
            </div>

            {/* Stats row */}
            <div className="grid grid-cols-4 gap-2">
              {[
                { label: "Projects", value: "12", color: "#818cf8", bg: "rgba(99,102,241,0.1)" },
                { label: "Test Cases", value: "246", color: "#60a5fa", bg: "rgba(59,130,246,0.1)" },
                { label: "Bug Reports", value: "36", color: "#f87171", bg: "rgba(239,68,68,0.1)" },
                { label: "API Tests", value: "18", color: "#4ade80", bg: "rgba(34,197,94,0.1)" },
              ].map((s) => (
                <div
                  key={s.label}
                  className="rounded-xl p-2.5"
                  style={{ background: s.bg, border: `1px solid ${s.color}22` }}
                >
                  <div className="text-base font-bold mb-0.5" style={{ color: s.color }}>{s.value}</div>
                  <div className="text-[9px]" style={{ color: "rgba(255,255,255,0.4)" }}>{s.label}</div>
                </div>
              ))}
            </div>

            {/* Recent projects label */}
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-semibold uppercase tracking-wider" style={{ color: "rgba(255,255,255,0.3)" }}>
                Recent Projects
              </span>
              <span className="text-[9px]" style={{ color: "#818cf8" }}>View all →</span>
            </div>

            {/* Project rows */}
            <div className="flex flex-col gap-1.5">
              {[
                { name: "AIGAGA", tag: "Active", tagColor: "#22c55e", tagBg: "rgba(34,197,94,0.12)" },
                { name: "InviteDesign", tag: "Active", tagColor: "#22c55e", tagBg: "rgba(34,197,94,0.12)" },
                { name: "Driver Life Simulator", tag: "Active", tagColor: "#22c55e", tagBg: "rgba(34,197,94,0.12)" },
              ].map((p) => (
                <div
                  key={p.name}
                  className="flex items-center gap-3 rounded-lg px-3 py-2"
                  style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.05)" }}
                >
                  <div className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: p.tagColor }} aria-hidden="true" />
                  <span className="flex-1 text-[10px] truncate" style={{ color: "rgba(255,255,255,0.65)" }}>{p.name}</span>
                  <span
                    className="text-[9px] px-2 py-0.5 rounded-full font-medium"
                    style={{ color: p.tagColor, background: p.tagBg }}
                  >
                    {p.tag}
                  </span>
                </div>
              ))}
            </div>

            {/* Bar chart */}
            <div className="mt-auto flex items-end gap-1" style={{ height: "36px" }}>
              {[20, 35, 25, 55, 40, 65, 45, 75, 55, 70, 50, 80, 60, 85, 65, 90].map((h, i) => (
                <div
                  key={i}
                  className="flex-1 rounded-sm"
                  style={{
                    height: `${h}%`,
                    background: i % 2 === 0 ? "rgba(99,102,241,0.5)" : "rgba(139,92,246,0.35)",
                  }}
                  aria-hidden="true"
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Floating badge — test count */}
      <div
        className="absolute -bottom-5 -left-6 rounded-xl px-3 py-2.5 shadow-xl"
        style={{
          background: "rgba(13,13,20,0.95)",
          border: "1px solid rgba(99,102,241,0.3)",
          backdropFilter: "blur(12px)",
        }}
        aria-hidden="true"
      >
        <div className="flex items-center gap-2">
          <div
            className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0"
            style={{ background: "rgba(99,102,241,0.15)" }}
          >
            <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
              <path d="M2 3.5h10M2 7h7M2 10.5h8.5" stroke="#818cf8" strokeWidth="1.3" strokeLinecap="round"/>
            </svg>
          </div>
          <div>
            <div className="text-[11px] font-semibold text-white">248 Test Cases</div>
            <div className="text-[9px]" style={{ color: "#4ade80" }}>↑ 12 generated</div>
          </div>
        </div>
      </div>

      {/* Floating badge — AI */}
      <div
        className="absolute -top-5 -right-6 rounded-xl px-3 py-2.5 shadow-xl"
        style={{
          background: "rgba(13,13,20,0.95)",
          border: "1px solid rgba(139,92,246,0.3)",
          backdropFilter: "blur(12px)",
        }}
        aria-hidden="true"
      >
        <div className="flex items-center gap-2">
          <div
            className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0"
            style={{ background: "rgba(139,92,246,0.15)" }}
          >
            <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
              <path d="M7 1.5L8.3 5.2 12 6.5 8.3 7.8 7 11.5 5.7 7.8 2 6.5 5.7 5.2 7 1.5Z" stroke="#a78bfa" strokeWidth="1.1" strokeLinejoin="round"/>
            </svg>
          </div>
          <div>
            <div className="text-[11px] font-semibold text-white">AI Generating</div>
            <div className="text-[9px]" style={{ color: "rgba(255,255,255,0.4)" }}>Playwright tests…</div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Hero Section
// ---------------------------------------------------------------------------

export function HeroSection(): React.JSX.Element {
  return (
    <section
      className="relative overflow-hidden pt-12 pb-20 sm:pt-16 sm:pb-28 lg:pt-20 lg:pb-32"
      aria-labelledby="hero-heading"
      style={{ background: "#030712" }}
    >
      {/* Deep nebula background */}
      <div className="absolute inset-0 -z-10 overflow-hidden" aria-hidden="true">
        {/* Grid */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
        {/* Large blue-purple center glow */}
        <div
          className="absolute"
          style={{
            top: "-10%",
            left: "20%",
            width: "70%",
            height: "80%",
            background:
              "radial-gradient(ellipse at 50% 30%, rgba(99,102,241,0.4) 0%, rgba(139,92,246,0.25) 30%, rgba(59,130,246,0.1) 60%, transparent 80%)",
            filter: "blur(60px)",
          }}
        />
        {/* Extra deep blue bottom */}
        <div
          className="absolute bottom-0 left-0 right-0"
          style={{
            height: "50%",
            background:
              "linear-gradient(to top, rgba(3,7,18,0.9) 0%, transparent 100%)",
          }}
        />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* ---- LEFT ---- */}
          <div className="flex flex-col gap-5 lg:gap-6">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 self-start">
              <div
                className="flex items-center gap-2 rounded-full px-3 py-1"
                style={{
                  background: "rgba(99,102,241,0.12)",
                  border: "1px solid rgba(99,102,241,0.3)",
                }}
              >
                <span
                  className="text-[10px] font-bold tracking-[0.18em] uppercase"
                  style={{ color: "#818cf8" }}
                >
                  AI-Powered QA Engineering Platform
                </span>
                <span
                  className="text-[9px] font-semibold px-1.5 py-0.5 rounded-full"
                  style={{ background: "rgba(99,102,241,0.3)", color: "#c7d2fe" }}
                >
                  Platform
                </span>
              </div>
            </div>

            {/* Headline */}
            <h1
              id="hero-heading"
              className="font-bold tracking-tight leading-[1.05]"
              style={{ fontSize: "clamp(2rem, 4.5vw, 3.5rem)" }}
            >
              <span className="text-white">Turn any web application</span>
              <br />
              <span className="text-white">into a </span>
              <span
                style={{
                  background: "linear-gradient(135deg, #818cf8 0%, #a78bfa 45%, #60a5fa 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                production-ready QA
                <br />
                automation framework.
              </span>
            </h1>

            {/* Subtext */}
            <p className="text-sm sm:text-base leading-relaxed max-w-lg" style={{ color: "rgba(255,255,255,0.55)" }}>
              Generate test cases, bug reports, test data, API tests and
              Playwright automation — powered by AI.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3 pt-1">
              <Link
                href="/register"
                className="inline-flex items-center justify-center gap-2 h-11 px-7 rounded-lg text-sm font-semibold text-white transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2"
                style={{
                  background: "linear-gradient(135deg, #6366f1 0%, #7c3aed 100%)",
                  boxShadow: "0 0 24px rgba(99,102,241,0.35), 0 4px 12px rgba(0,0,0,0.3)",
                }}
              >
                Get Started Free
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                  <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </Link>
              <button
                type="button"
                className="inline-flex items-center justify-center gap-2 h-11 px-7 rounded-lg text-sm font-medium transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2"
                style={{
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.12)",
                  color: "rgba(255,255,255,0.75)",
                }}
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                  <circle cx="7" cy="7" r="6" stroke="currentColor" strokeWidth="1.2"/>
                  <path d="M5.5 4.5l4 2.5-4 2.5V4.5Z" fill="currentColor"/>
                </svg>
                Watch Demo
              </button>
            </div>

            {/* Trust row */}
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 pt-1">
              {[
                "No credit card required",
                "Get started in minutes",
                "Built for QA Engineers",
              ].map((item) => (
                <div key={item} className="flex items-center gap-1.5">
                  <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden="true">
                    <circle cx="6.5" cy="6.5" r="5.5" stroke="#4ade80" strokeWidth="1"/>
                    <path d="M4 6.5l2 2 3-3" stroke="#4ade80" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span className="text-[11px]" style={{ color: "rgba(255,255,255,0.4)" }}>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* ---- RIGHT ---- */}
          <div className="relative pt-6 pb-8 pr-4 lg:pr-0">
            <DashboardMockup />
          </div>
        </div>
      </div>
    </section>
  );
}
