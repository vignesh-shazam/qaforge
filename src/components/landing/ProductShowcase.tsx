function TestCaseGeneratorUI(): React.JSX.Element {
  return (
    <div
      className="rounded-2xl overflow-hidden shadow-2xl"
      style={{
        background: "rgba(10,10,16,0.95)",
        border: "1px solid rgba(255,255,255,0.07)",
      }}
    >
      {/* Window bar */}
      <div
        className="flex items-center gap-3 px-4 py-2.5"
        style={{ background: "rgba(6,6,10,0.95)", borderBottom: "1px solid rgba(255,255,255,0.05)" }}
      >
        <div className="flex gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full" style={{ background: "#ef4444" }} aria-hidden="true"/>
          <span className="w-2.5 h-2.5 rounded-full" style={{ background: "#f59e0b" }} aria-hidden="true"/>
          <span className="w-2.5 h-2.5 rounded-full" style={{ background: "#22c55e" }} aria-hidden="true"/>
        </div>
        <span className="text-[10px] font-medium ml-2" style={{ color: "rgba(255,255,255,0.35)" }}>
          QAForge — Test Case Generator
        </span>
      </div>

      <div className="flex" style={{ minHeight: "360px" }}>
        {/* Left panel — sidebar */}
        <div
          className="w-28 shrink-0 flex flex-col py-3 gap-0.5"
          style={{ borderRight: "1px solid rgba(255,255,255,0.05)", background: "rgba(6,6,10,0.8)" }}
        >
          {/* Logo */}
          <div className="flex items-center gap-1.5 px-3 mb-3">
            <div className="w-4 h-4 rounded bg-brand-500 flex items-center justify-center">
              <svg width="8" height="8" viewBox="0 0 10 10" fill="none" aria-hidden="true">
                <path d="M2 5l2.5 2.5 3.5-3.5" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </div>
            <span className="text-[9px] font-bold text-white">QAForge</span>
          </div>

          {[
            { label: "Dashboard", active: false },
            { label: "Projects", active: false },
            { label: "Test Cases", active: true },
            { label: "Bug Reports", active: false },
            { label: "Test Data", active: false },
            { label: "API Tests", active: false },
            { label: "Automation", active: false },
          ].map((item) => (
            <div
              key={item.label}
              className="px-3 py-1.5 mx-1 rounded-md text-[9px]"
              style={{
                background: item.active ? "rgba(99,102,241,0.15)" : "transparent",
                color: item.active ? "#818cf8" : "rgba(255,255,255,0.3)",
                fontWeight: item.active ? 600 : 400,
              }}
            >
              {item.label}
            </div>
          ))}
        </div>

        {/* Center — main content */}
        <div className="flex-1 flex flex-col p-4 gap-3 overflow-hidden">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-[9px]" style={{ color: "rgba(255,255,255,0.3)" }}>
            <span>Projects</span><span>/</span><span style={{ color: "#818cf8" }}>Test Case Generator</span>
          </div>

          {/* Tabs */}
          <div className="flex gap-1">
            {["From URL", "From Requirements", "Manual"].map((tab, i) => (
              <div
                key={tab}
                className="px-2.5 py-1 rounded-md text-[9px] font-medium"
                style={{
                  background: i === 0 ? "rgba(99,102,241,0.2)" : "rgba(255,255,255,0.04)",
                  color: i === 0 ? "#818cf8" : "rgba(255,255,255,0.3)",
                  border: i === 0 ? "1px solid rgba(99,102,241,0.3)" : "1px solid rgba(255,255,255,0.06)",
                }}
              >
                {tab}
              </div>
            ))}
          </div>

          {/* URL input */}
          <div
            className="flex items-center gap-2 rounded-lg px-3 h-8"
            style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)" }}
          >
            <svg width="10" height="10" viewBox="0 0 12 12" fill="none" aria-hidden="true">
              <circle cx="5" cy="5" r="4" stroke="rgba(255,255,255,0.25)" strokeWidth="1.2"/>
              <path d="M9.5 9.5l-2-2" stroke="rgba(255,255,255,0.25)" strokeWidth="1.2"/>
            </svg>
            <span className="text-[10px] font-mono flex-1" style={{ color: "rgba(255,255,255,0.4)" }}>
              https://app.example.com/login
            </span>
            <div
              className="h-5 px-2 rounded text-[9px] font-semibold flex items-center"
              style={{ background: "#6366f1", color: "white" }}
            >
              Analyze
            </div>
          </div>

          {/* Generation Options */}
          <div>
            <p className="text-[9px] font-semibold uppercase tracking-wider mb-2" style={{ color: "rgba(255,255,255,0.25)" }}>
              Generation Options
            </p>
            <div className="grid grid-cols-2 gap-1.5">
              {[
                { label: "Functional tests", checked: true },
                { label: "Negative tests", checked: true },
                { label: "Include accessibility", checked: false },
                { label: "Include UI/UX tests", checked: false },
              ].map((opt) => (
                <div key={opt.label} className="flex items-center gap-2">
                  <div
                    className="w-3.5 h-3.5 rounded flex items-center justify-center shrink-0"
                    style={{
                      background: opt.checked ? "#6366f1" : "rgba(255,255,255,0.06)",
                      border: opt.checked ? "none" : "1px solid rgba(255,255,255,0.12)",
                    }}
                  >
                    {opt.checked && (
                      <svg width="8" height="8" viewBox="0 0 8 8" fill="none" aria-hidden="true">
                        <path d="M1.5 4l2 2 3-3" stroke="white" strokeWidth="1.2" strokeLinecap="round"/>
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
            className="h-8 rounded-lg flex items-center justify-center text-[11px] font-semibold text-white"
            style={{ background: "linear-gradient(135deg, #6366f1, #7c3aed)" }}
          >
            Generate Test Cases
          </div>
        </div>

        {/* Right panel — results */}
        <div
          className="w-52 shrink-0 flex flex-col p-3 gap-2 overflow-hidden"
          style={{ borderLeft: "1px solid rgba(255,255,255,0.05)" }}
        >
          <div className="flex items-center justify-between">
            <span className="text-[9px] font-semibold uppercase tracking-wider" style={{ color: "rgba(255,255,255,0.25)" }}>Results</span>
            <span className="text-[9px] px-1.5 py-0.5 rounded-full" style={{ color: "#4ade80", background: "rgba(34,197,94,0.12)" }}>
              12 cases
            </span>
          </div>

          {[
            { id: "TC-001", title: "Valid login with correct credentials", type: "Func", pass: true },
            { id: "TC-002", title: "Login fails with wrong password", type: "Neg", pass: true },
            { id: "TC-003", title: "Empty email shows validation error", type: "Neg", pass: true },
            { id: "TC-004", title: "Forgot password link is visible", type: "UI", pass: false },
            { id: "TC-005", title: "Session persists after page refresh", type: "Func", pass: true },
          ].map((tc) => (
            <div
              key={tc.id}
              className="rounded-lg p-2 flex flex-col gap-1"
              style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)" }}
            >
              <div className="flex items-center gap-1.5">
                <div
                  className="w-1.5 h-1.5 rounded-full shrink-0"
                  style={{ background: tc.pass ? "#4ade80" : "#fbbf24" }}
                  aria-hidden="true"
                />
                <span className="text-[8px] font-mono" style={{ color: "rgba(255,255,255,0.3)" }}>{tc.id}</span>
                <span
                  className="ml-auto text-[8px] px-1 py-0.5 rounded"
                  style={{ color: "rgba(255,255,255,0.3)", background: "rgba(255,255,255,0.06)" }}
                >
                  {tc.type}
                </span>
              </div>
              <p className="text-[9px] leading-tight" style={{ color: "rgba(255,255,255,0.5)" }}>{tc.title}</p>
            </div>
          ))}

          <div className="text-center text-[8px] mt-1" style={{ color: "rgba(255,255,255,0.2)" }}>
            + 7 more test cases
          </div>
        </div>
      </div>
    </div>
  );
}

const bullets = [
  "Multiple input methods — URL, Requirements, Manual",
  "Functional, Negative, UI/UX & Accessibility cases",
  "Edit, filter and export to your preferred format",
  "Save directly to your projects",
] as const;

export function ProductShowcase(): React.JSX.Element {
  return (
    <section
      className="py-20 sm:py-24 overflow-hidden"
      aria-labelledby="showcase-heading"
      style={{ background: "#040810" }}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left — UI mockup */}
          <div className="relative order-2 lg:order-1">
            {/* Glow */}
            <div
              className="absolute -inset-6 -z-10 rounded-3xl opacity-50"
              aria-hidden="true"
              style={{
                background: "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(99,102,241,0.2) 0%, transparent 70%)",
                filter: "blur(30px)",
              }}
            />
            <TestCaseGeneratorUI />
          </div>

          {/* Right — copy */}
          <div className="flex flex-col gap-6 order-1 lg:order-2">
            <div
              className="inline-flex items-center gap-2 self-start rounded-full px-3 py-1"
              style={{ background: "rgba(99,102,241,0.12)", border: "1px solid rgba(99,102,241,0.25)" }}
            >
              <span className="text-[10px] font-bold uppercase tracking-widest" style={{ color: "#818cf8" }}>
                See It In Action
              </span>
            </div>

            <h2 id="showcase-heading" className="text-3xl sm:text-4xl font-bold text-white tracking-tight leading-tight">
              Generate comprehensive test cases in seconds.
            </h2>

            <p className="text-sm sm:text-base leading-relaxed" style={{ color: "rgba(255,255,255,0.5)" }}>
              Just enter your application URL or requirements, and let QAForge
              generate structured test cases with scenarios, steps and expected
              results.
            </p>

            <ul className="flex flex-col gap-3" role="list">
              {bullets.map((b) => (
                <li key={b} className="flex items-start gap-3 text-sm" style={{ color: "rgba(255,255,255,0.6)" }}>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="mt-0.5 shrink-0" aria-hidden="true">
                    <circle cx="8" cy="8" r="7" fill="rgba(34,197,94,0.15)"/>
                    <path d="M5 8l2.5 2.5 3.5-3.5" stroke="#4ade80" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  {b}
                </li>
              ))}
            </ul>

            <button
              type="button"
              className="inline-flex items-center gap-2 h-11 px-7 rounded-lg text-sm font-medium self-start transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
              style={{
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.12)",
                color: "rgba(255,255,255,0.7)",
              }}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.2"/>
                <path d="M6.5 5.5l4 2.5-4 2.5V5.5Z" fill="currentColor"/>
              </svg>
              Watch Demo
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
