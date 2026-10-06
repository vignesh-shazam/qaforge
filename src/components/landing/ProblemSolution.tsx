const problems = [
  "Writing test cases manually takes hours",
  "Bug reports are inconsistent",
  "Creating test data is tedious",
  "Building automation frameworks is complex",
  "Keeping tests up to date is a constant challenge",
] as const;

const solutions = [
  "Generates comprehensive test cases in seconds",
  "Create detailed bug reports with AI assistance",
  "Generate realistic test data instantly",
  "Build Playwright automation from any URL",
  "Keep your tests up to date with AI intelligence",
] as const;

export function ProblemSolution(): React.JSX.Element {
  return (
    <section
      className="py-20 sm:py-24"
      aria-labelledby="problem-solution-heading"
      style={{ background: "#030712" }}
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Without QAForge */}
          <div
            className="rounded-2xl p-7"
            style={{
              background: "rgba(239,68,68,0.04)",
              border: "1px solid rgba(239,68,68,0.15)",
            }}
          >
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] font-bold uppercase tracking-wider" style={{ color: "#f87171" }}>
                QA without QAForge
              </span>
            </div>
            <h3 className="text-lg font-bold text-white mb-5">
              QA is repetitive, time-consuming and error-prone.
            </h3>
            <ul className="flex flex-col gap-3" role="list">
              {problems.map((p) => (
                <li key={p} className="flex items-start gap-3 text-sm" style={{ color: "rgba(255,255,255,0.6)" }}>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="mt-0.5 shrink-0" aria-hidden="true">
                    <circle cx="8" cy="8" r="7" fill="rgba(239,68,68,0.15)"/>
                    <path d="M5.5 5.5l5 5M10.5 5.5l-5 5" stroke="#f87171" strokeWidth="1.3" strokeLinecap="round"/>
                  </svg>
                  {p}
                </li>
              ))}
            </ul>
          </div>

          {/* With QAForge */}
          <div
            className="rounded-2xl p-7 relative overflow-hidden"
            style={{
              background: "rgba(34,197,94,0.04)",
              border: "1px solid rgba(34,197,94,0.15)",
            }}
          >
            <div className="flex items-center gap-2 mb-1">
              <span
                className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full"
                style={{ color: "#4ade80", background: "rgba(34,197,94,0.12)", border: "1px solid rgba(34,197,94,0.2)" }}
              >
                Live Action
              </span>
            </div>
            <h3 className="text-lg font-bold text-white mb-5">
              QAForge automates the QA lifecycle with AI.
            </h3>
            <ul className="flex flex-col gap-3" role="list">
              {solutions.map((s) => (
                <li key={s} className="flex items-start gap-3 text-sm" style={{ color: "rgba(255,255,255,0.6)" }}>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="mt-0.5 shrink-0" aria-hidden="true">
                    <circle cx="8" cy="8" r="7" fill="rgba(34,197,94,0.15)"/>
                    <path d="M5 8l2.5 2.5 3.5-3.5" stroke="#4ade80" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
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
