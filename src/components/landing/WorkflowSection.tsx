"use client";

const steps = [
  {
    number: 1,
    title: "Provide Input",
    description: "URL, requirements or manual steps",
  },
  {
    number: 2,
    title: "AI Analysis",
    description: "AI understands your application",
  },
  {
    number: 3,
    title: "Generate",
    description: "Test cases, data, bugs or automation",
  },
  {
    number: 4,
    title: "Validate",
    description: "Quality checks and suggestions",
  },
  {
    number: 5,
    title: "Export & Use",
    description: "Download or integrate with your workflow",
  },
] as const;

export function WorkflowSection(): React.JSX.Element {
  return (
    <section
      className="pt-20 sm:pt-24 pb-0"
      aria-labelledby="workflow-heading"
      style={{ background: "#030712" }}
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center mb-10 sm:mb-14">
          <div
            className="inline-flex items-center gap-2 rounded-full px-3 py-1 mb-4"
            style={{ background: "rgba(99,102,241,0.12)", border: "1px solid rgba(99,102,241,0.25)" }}
          >
            <span className="text-[10px] font-bold uppercase tracking-widest" style={{ color: "#818cf8" }}>
              How It Works
            </span>
          </div>
          <h2 id="workflow-heading" className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-tight">
            From a simple input to a complete automation framework.
          </h2>
          <p className="mt-3 text-sm" style={{ color: "rgba(255,255,255,0.4)" }}>
            Get production-ready tests in just a few steps.
          </p>
        </div>

        {/* Steps strip */}
        <div
          className="rounded-2xl px-6 py-8 sm:px-8 sm:py-10 transition-all duration-300"
          style={{
            background: "rgba(255,255,255,0.025)",
            border: "1px solid rgba(255,255,255,0.07)",
          }}
          onMouseEnter={(e) => {
            const el = e.currentTarget as HTMLDivElement;
            el.style.border = "1px solid rgba(99,102,241,0.55)";
            el.style.boxShadow = "0 0 0 1px rgba(99,102,241,0.18), 0 0 22px rgba(99,102,241,0.35), 0 0 48px rgba(99,102,241,0.14)";
          }}
          onMouseLeave={(e) => {
            const el = e.currentTarget as HTMLDivElement;
            el.style.border = "1px solid rgba(255,255,255,0.07)";
            el.style.boxShadow = "none";
          }}
        >
          {/* Desktop: single row with inline arrows */}
          <div className="hidden sm:flex items-start justify-between gap-0">
            {steps.map((step, index) => (
              <div key={step.number} className="flex items-start" style={{ flex: index < steps.length - 1 ? "1 1 0" : "0 0 auto" }}>
                {/* Step */}
                <div className="flex flex-col items-center text-center" style={{ minWidth: "100px" }}>
                  {/* Purple circle number */}
                  <div
                    className="w-11 h-11 rounded-full flex items-center justify-center mb-5"
                    style={{
                      background: "linear-gradient(135deg,#6366f1,#4f46e5)",
                      boxShadow: "0 0 20px rgba(99,102,241,0.45)",
                      flexShrink: 0,
                    }}
                  >
                    <span className="text-sm font-bold text-white">{step.number}</span>
                  </div>
                  <h3 className="text-sm font-semibold text-white mb-1.5">{step.title}</h3>
                  <p className="text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.38)", maxWidth: "110px" }}>
                    {step.description}
                  </p>
                </div>

                {/* Arrow between steps */}
                {index < steps.length - 1 && (
                  <div
                    className="flex items-center justify-center shrink-0"
                    aria-hidden="true"
                    style={{ flex: "1 1 0", paddingTop: "11px" }}
                  >
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <path d="M3 10h14M12 5l5 5-5 5" stroke="rgba(255,255,255,0.25)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Mobile: vertical stack */}
          <div className="flex flex-col gap-6 sm:hidden">
            {steps.map((step, index) => (
              <div key={step.number} className="flex items-start gap-4">
                {/* Left: circle + connecting line */}
                <div className="flex flex-col items-center">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center shrink-0"
                    style={{
                      background: "linear-gradient(135deg,#6366f1,#4f46e5)",
                      boxShadow: "0 0 16px rgba(99,102,241,0.4)",
                    }}
                  >
                    <span className="text-sm font-bold text-white">{step.number}</span>
                  </div>
                  {index < steps.length - 1 && (
                    <div className="w-px h-10 mt-1" style={{ background: "rgba(99,102,241,0.25)" }} aria-hidden="true" />
                  )}
                </div>
                {/* Right: text */}
                <div className="pt-1.5">
                  <h3 className="text-sm font-semibold text-white mb-1">{step.title}</h3>
                  <p className="text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.38)" }}>
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
