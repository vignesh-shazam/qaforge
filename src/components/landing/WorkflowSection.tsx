const steps = [
  {
    number: "01",
    title: "Provide Input",
    description: "URL, requirements or manual steps.",
    iconColor: "#818cf8",
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <rect x="3" y="3" width="14" height="14" rx="2.5" stroke="#818cf8" strokeWidth="1.3"/>
        <path d="M6.5 7h7M6.5 10h5" stroke="#818cf8" strokeWidth="1.1" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    number: "02",
    title: "AI Analysis",
    description: "AI analyses your application.",
    iconColor: "#a78bfa",
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <path d="M10 2L12 7H17L13 10 14.5 15.5 10 12.5 5.5 15.5 7 10 3 7H8L10 2Z" stroke="#a78bfa" strokeWidth="1.1" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    number: "03",
    title: "Generate",
    description: "Test cases, data, bugs or automation.",
    iconColor: "#60a5fa",
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <path d="M4 10h12M13 6l4 4-4 4" stroke="#60a5fa" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    number: "04",
    title: "Validate",
    description: "Test cases, data, bugs and suggestions.",
    iconColor: "#4ade80",
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <circle cx="10" cy="10" r="7.5" stroke="#4ade80" strokeWidth="1.3"/>
        <path d="M6.5 10l2.5 2.5 4.5-4.5" stroke="#4ade80" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    number: "05",
    title: "Export & Use",
    description: "Export and integrate with your workflow.",
    iconColor: "#fbbf24",
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <path d="M10 3v10M6.5 9.5l3.5 3.5 3.5-3.5" stroke="#fbbf24" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M4 17h12" stroke="#fbbf24" strokeWidth="1.4" strokeLinecap="round"/>
      </svg>
    ),
  },
] as const;

export function WorkflowSection(): React.JSX.Element {
  return (
    <section
      className="py-20 sm:py-24"
      aria-labelledby="workflow-heading"
      style={{ background: "#030712" }}
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <p className="text-[10px] font-bold text-brand-400 uppercase tracking-[0.2em] mb-3">
            How It Works
          </p>
          <h2 id="workflow-heading" className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            From a simple input to a complete automation framework.
          </h2>
          <p className="mt-3 text-sm" style={{ color: "rgba(255,255,255,0.4)" }}>
            Get production-ready tests in just a few steps.
          </p>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Connector line desktop */}
          <div
            className="hidden lg:block absolute top-10 left-[10%] right-[10%] h-px"
            aria-hidden="true"
            style={{ background: "linear-gradient(90deg, transparent, rgba(99,102,241,0.3) 15%, rgba(99,102,241,0.3) 85%, transparent)" }}
          />

          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-8 lg:gap-4">
            {steps.map((step) => (
              <div key={step.number} className="flex flex-col items-center text-center relative">
                {/* Circle */}
                <div className="relative mb-4 z-10">
                  <div
                    className="w-20 h-20 rounded-2xl flex items-center justify-center"
                    style={{
                      background: "rgba(255,255,255,0.03)",
                      border: "1px solid rgba(255,255,255,0.08)",
                    }}
                  >
                    {step.icon}
                  </div>
                  {/* Number */}
                  <div
                    className="absolute -top-2.5 -right-2.5 w-6 h-6 rounded-full flex items-center justify-center"
                    style={{ background: "rgba(99,102,241,0.25)", border: "1px solid rgba(99,102,241,0.4)" }}
                  >
                    <span className="text-[9px] font-bold" style={{ color: "#818cf8" }}>{step.number}</span>
                  </div>
                </div>

                <h3 className="text-sm font-semibold text-white mb-1.5">{step.title}</h3>
                <p className="text-xs leading-relaxed max-w-[140px]" style={{ color: "rgba(255,255,255,0.35)" }}>
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
