"use client";

const problems = [
  "Writing test cases manually takes hours",
  "Bug reports are inconsistent",
  "Creating test data is tedious",
  "Building automation frameworks is complex",
  "Keeping tests updated is a constant challenge",
] as const;

const solutions = [
  "Generate comprehensive test cases in seconds",
  "Create detailed bug reports with evidence",
  "Generate realistic test data instantly",
  "Build Playwright automation from any URL",
  "Keep your tests up to date with AI intelligence",
] as const;

export function ProblemSolution(): React.JSX.Element {
  return (
    <section
      className="pt-20 sm:pt-24 pb-0"
      aria-labelledby="problem-solution-heading"
      style={{ background: "#030712" }}
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Two-column card layout with arrow divider */}
        <div className="flex flex-col lg:flex-row items-stretch gap-0">

          {/* ── Problem Card ────────────────────────────────────────── */}
          <div
            className="flex-1 rounded-2xl p-7 lg:rounded-r-none transition-all duration-300"
            style={{
              background: "rgba(10,11,24,0.95)",
              border: "1px solid rgba(239,68,68,0.18)",
              boxShadow: "0 0 40px rgba(239,68,68,0.06)",
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLDivElement;
              el.style.border = "1px solid rgba(239,68,68,0.5)";
              el.style.boxShadow = "0 0 0 1px rgba(239,68,68,0.18), 0 0 22px rgba(239,68,68,0.3), 0 0 48px rgba(239,68,68,0.12)";
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLDivElement;
              el.style.border = "1px solid rgba(239,68,68,0.18)";
              el.style.boxShadow = "0 0 40px rgba(239,68,68,0.06)";
            }}
          >
            {/* Badge */}
            <div className="flex items-center gap-2 mb-5">
              <div
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-full"
                style={{
                  background: "rgba(239,68,68,0.12)",
                  border: "1px solid rgba(239,68,68,0.25)",
                }}
              >
                {/* X in circle */}
                <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden="true">
                  <circle cx="6.5" cy="6.5" r="6" fill="rgba(239,68,68,0.2)" stroke="#f87171" strokeWidth="1" />
                  <path d="M4.5 4.5l4 4M8.5 4.5l-4 4" stroke="#f87171" strokeWidth="1.2" strokeLinecap="round" />
                </svg>
                <span
                  className="text-[10px] font-bold uppercase tracking-[0.14em]"
                  style={{ color: "#f87171" }}
                >
                  The Problem
                </span>
              </div>
            </div>

            {/* Heading */}
            <h3 className="text-xl sm:text-2xl font-bold text-white mb-6 leading-snug">
              QA is repetitive,<br />
              time-consuming and error-prone.
            </h3>

            {/* List */}
            <ul className="flex flex-col gap-3.5" role="list">
              {problems.map((p) => (
                <li
                  key={p}
                  className="flex items-center gap-3 text-sm"
                  style={{ color: "rgba(255,255,255,0.6)" }}
                >
                  {/* X circle icon */}
                  <span className="shrink-0">
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                      <circle cx="9" cy="9" r="8.25" fill="rgba(239,68,68,0.12)" stroke="rgba(239,68,68,0.3)" strokeWidth="0.9" />
                      <path d="M6 6l6 6M12 6l-6 6" stroke="#f87171" strokeWidth="1.4" strokeLinecap="round" />
                    </svg>
                  </span>
                  {p}
                </li>
              ))}
            </ul>
          </div>

          {/* ── Arrow Divider ────────────────────────────────────────── */}
          <div
            className="flex items-center justify-center shrink-0 py-4 lg:py-0 lg:px-0 z-10"
            aria-hidden="true"
          >
            {/* Vertical connector line on mobile, arrow on desktop */}
            <div
              className="hidden lg:flex items-center justify-center w-14 h-14 rounded-full"
              style={{
                background: "rgba(139,92,246,0.15)",
                border: "1px solid rgba(139,92,246,0.3)",
                boxShadow: "0 0 24px rgba(139,92,246,0.25)",
                flexShrink: 0,
                margin: "0 -1px",
              }}
            >
              <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
                <path d="M4 11h14M13 5l6 6-6 6" stroke="#a78bfa" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            {/* Mobile: down arrow */}
            <div
              className="flex lg:hidden items-center justify-center w-10 h-10 rounded-full"
              style={{
                background: "rgba(139,92,246,0.15)",
                border: "1px solid rgba(139,92,246,0.3)",
                boxShadow: "0 0 20px rgba(139,92,246,0.2)",
              }}
            >
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                <path d="M9 3v12M3 10l6 6 6-6" stroke="#a78bfa" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </div>

          {/* ── Solution Card ────────────────────────────────────────── */}
          <div
            className="flex-1 rounded-2xl p-7 lg:rounded-l-none relative overflow-hidden transition-all duration-300"
            style={{
              background: "rgba(6,10,26,0.98)",
              border: "1px solid rgba(34,197,94,0.18)",
              boxShadow: "0 0 40px rgba(34,197,94,0.06)",
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLDivElement;
              el.style.border = "1px solid rgba(34,197,94,0.5)";
              el.style.boxShadow = "0 0 0 1px rgba(34,197,94,0.18), 0 0 22px rgba(34,197,94,0.3), 0 0 48px rgba(34,197,94,0.12)";
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLDivElement;
              el.style.border = "1px solid rgba(34,197,94,0.18)";
              el.style.boxShadow = "0 0 40px rgba(34,197,94,0.06)";
            }}
          >
            {/* Subtle top-right glow */}
            <div
              className="absolute top-0 right-0 w-40 h-40 pointer-events-none"
              aria-hidden="true"
              style={{
                background: "radial-gradient(circle at 100% 0%,rgba(34,197,94,0.08) 0%,transparent 65%)",
              }}
            />

            {/* Badge */}
            <div className="flex items-center gap-2 mb-5">
              <div
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-full"
                style={{
                  background: "rgba(34,197,94,0.12)",
                  border: "1px solid rgba(34,197,94,0.25)",
                }}
              >
                {/* Checkmark in circle */}
                <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden="true">
                  <circle cx="6.5" cy="6.5" r="6" fill="rgba(34,197,94,0.2)" stroke="#4ade80" strokeWidth="1" />
                  <path d="M4 6.5l2 2 3-3" stroke="#4ade80" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span
                  className="text-[10px] font-bold uppercase tracking-[0.14em]"
                  style={{ color: "#4ade80" }}
                >
                  Our Solution
                </span>
              </div>
            </div>

            {/* Heading */}
            <h3 className="text-xl sm:text-2xl font-bold text-white mb-6 leading-snug">
              QAForge automates<br />
              the entire QA lifecycle with AI.
            </h3>

            {/* List */}
            <ul className="flex flex-col gap-3.5" role="list">
              {solutions.map((s) => (
                <li
                  key={s}
                  className="flex items-center gap-3 text-sm"
                  style={{ color: "rgba(255,255,255,0.6)" }}
                >
                  {/* Checkmark circle icon */}
                  <span className="shrink-0">
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                      <circle cx="9" cy="9" r="8.25" fill="rgba(34,197,94,0.12)" stroke="rgba(34,197,94,0.3)" strokeWidth="0.9" />
                      <path d="M5.5 9l2.5 2.5 4.5-4.5" stroke="#4ade80" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  {s}
                </li>
              ))}
            </ul>
          </div>

        </div>
      </div>
    </section>
  );
}
