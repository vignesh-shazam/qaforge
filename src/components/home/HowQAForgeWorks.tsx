import { Globe, Cpu, Zap, CheckCircle2, Bot } from "lucide-react";

const steps = [
  { number: 1, icon: <Globe size={20} aria-hidden="true" />, title: "Add URL", description: "Enter your application URL", color: "#818cf8" },
  { number: 2, icon: <Cpu size={20} aria-hidden="true" />, title: "AI Analysis", description: "Discover pages, elements and flows", color: "#22d3ee" },
  { number: 3, icon: <Zap size={20} aria-hidden="true" />, title: "Generate QA", description: "Create test cases, bugs and test data", color: "#fbbf24" },
  { number: 4, icon: <CheckCircle2 size={20} aria-hidden="true" />, title: "Validate", description: "Review and refine results", color: "#4ade80" },
  { number: 5, icon: <Bot size={20} aria-hidden="true" />, title: "Automate", description: "Generate Playwright tests", color: "#f472b6" },
] as const;

export function HowQAForgeWorks(): React.JSX.Element {
  return (
    <section id="how-it-works" aria-labelledby="how-it-works-heading" className="py-2">
      <div className="text-center mb-10">
        <h2 id="how-it-works-heading" className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
          How QAForge Works
        </h2>
        <p className="mt-2 text-sm" style={{ color: "rgba(255,255,255,0.5)" }}>
          See it in action — from URL to automation.
        </p>
      </div>

      {/* Steps */}
      <div
        className="rounded-2xl px-6 py-8 sm:px-10"
        style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.07)" }}
      >
        {/* Desktop */}
        <div className="hidden sm:flex items-start justify-between gap-0">
          {steps.map((step, index) => (
            <div key={step.number} className="flex items-start" style={{ flex: index < steps.length - 1 ? "1 1 0" : "0 0 auto" }}>
              <div className="flex flex-col items-center text-center" style={{ minWidth: "110px" }}>
                {/* Number bubble */}
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center mb-3 relative"
                  style={{ background: "linear-gradient(135deg,#6366f1,#4f46e5)", boxShadow: "0 0 20px rgba(99,102,241,0.45)" }}
                >
                  <span className="text-sm font-bold text-white">{step.number}</span>
                  <div
                    className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full flex items-center justify-center"
                    style={{ background: "rgba(8,9,22,0.98)", border: `1px solid ${step.color}40` }}
                    aria-hidden="true"
                  >
                    <span style={{ color: step.color, display: "flex" }}>{step.icon}</span>
                  </div>
                </div>
                <h3 className="text-sm font-semibold text-white mb-1">{step.title}</h3>
                <p className="text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.4)", maxWidth: "110px" }}>
                  {step.description}
                </p>
              </div>

              {index < steps.length - 1 && (
                <div
                  className="flex items-center justify-center shrink-0"
                  aria-hidden="true"
                  style={{ flex: "1 1 0", paddingTop: "14px" }}
                >
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M3 10h14M12 5l5 5-5 5" stroke="rgba(255,255,255,0.2)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Mobile */}
        <div className="flex flex-col gap-5 sm:hidden">
          {steps.map((step, index) => (
            <div key={step.number} className="flex items-start gap-4">
              <div className="flex flex-col items-center">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center shrink-0"
                  style={{ background: "linear-gradient(135deg,#6366f1,#4f46e5)", boxShadow: "0 0 16px rgba(99,102,241,0.4)" }}
                >
                  <span className="text-sm font-bold text-white">{step.number}</span>
                </div>
                {index < steps.length - 1 && (
                  <div className="w-px h-8 mt-1" style={{ background: "rgba(99,102,241,0.25)" }} aria-hidden="true" />
                )}
              </div>
              <div className="pt-1.5">
                <div className="flex items-center gap-2 mb-1">
                  <span style={{ color: step.color }}>{step.icon}</span>
                  <h3 className="text-sm font-semibold text-white">{step.title}</h3>
                </div>
                <p className="text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.4)" }}>{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
