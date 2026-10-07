"use client";

const useCases = [
  {
    iconBg: "rgba(99,102,241,0.15)",
    icon: (
      <svg width="26" height="26" viewBox="0 0 26 26" fill="none" aria-hidden="true">
        <rect x="2" y="4" width="22" height="18" rx="3" stroke="#818cf8" strokeWidth="1.3"/>
        <path d="M2 9h22" stroke="#818cf8" strokeWidth="1.1"/>
        <circle cx="6" cy="6.5" r="1" fill="#818cf8"/>
        <circle cx="9.5" cy="6.5" r="1" fill="#818cf8" opacity=".5"/>
        <circle cx="13" cy="6.5" r="1" fill="#818cf8" opacity=".25"/>
      </svg>
    ),
    title: "Web Applications",
    description: "Test SPAs, multi-page apps, e-commerce and SaaS dashboards.",
    stat: "100% web support",
    statColor: "#818cf8",
  },
  {
    iconBg: "rgba(59,130,246,0.15)",
    icon: (
      <svg width="26" height="26" viewBox="0 0 26 26" fill="none" aria-hidden="true">
        <rect x="8" y="2" width="10" height="22" rx="3" stroke="#60a5fa" strokeWidth="1.3"/>
        <path d="M11 20h4" stroke="#60a5fa" strokeWidth="1.3" strokeLinecap="round"/>
      </svg>
    ),
    title: "Mobile Applications",
    description: "Generate test cases for iOS and Android mobile apps.",
    stat: "iOS & Android",
    statColor: "#60a5fa",
  },
  {
    iconBg: "rgba(34,211,238,0.15)",
    icon: (
      <svg width="26" height="26" viewBox="0 0 26 26" fill="none" aria-hidden="true">
        <circle cx="6" cy="13" r="4" stroke="#22d3ee" strokeWidth="1.3"/>
        <circle cx="20" cy="6" r="4" stroke="#22d3ee" strokeWidth="1.3"/>
        <circle cx="20" cy="20" r="4" stroke="#22d3ee" strokeWidth="1.3"/>
        <path d="M10 13h6M16.5 8.5L12 12M16.5 17.5L12 14" stroke="#22d3ee" strokeWidth="1.1"/>
      </svg>
    ),
    title: "APIs & Microservices",
    description: "Generate API tests from OpenAPI specs or raw endpoints.",
    stat: "REST · GraphQL",
    statColor: "#22d3ee",
  },
  {
    iconBg: "rgba(251,191,36,0.15)",
    icon: (
      <svg width="26" height="26" viewBox="0 0 26 26" fill="none" aria-hidden="true">
        <rect x="2" y="2" width="10" height="10" rx="2" stroke="#fbbf24" strokeWidth="1.3"/>
        <rect x="14" y="2" width="10" height="10" rx="2" stroke="#fbbf24" strokeWidth="1.3" opacity=".7"/>
        <rect x="2" y="14" width="10" height="10" rx="2" stroke="#fbbf24" strokeWidth="1.3" opacity=".5"/>
        <rect x="14" y="14" width="10" height="10" rx="2" stroke="#fbbf24" strokeWidth="1.3" opacity=".3"/>
      </svg>
    ),
    title: "Enterprise QA Teams",
    description: "Scale QA across multiple projects and teams.",
    stat: "Unlimited projects",
    statColor: "#fbbf24",
  },
] as const;

export function UseCasesSection(): React.JSX.Element {
  return (
    <section
      className="py-20 sm:py-24"
      aria-labelledby="usecases-heading"
      style={{ background: "#030712" }}
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 rounded-full px-3 py-1 mb-4"
            style={{ background: "rgba(99,102,241,0.12)", border: "1px solid rgba(99,102,241,0.25)" }}>
            <span className="text-[10px] font-bold uppercase tracking-widest" style={{ color: "#818cf8" }}>
              Built For Every QA Scenario
            </span>
          </div>
          <h2 id="usecases-heading" className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Works across industries and use cases.
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {useCases.map((uc) => (
            <div
              key={uc.title}
              className="flex flex-col gap-4 rounded-xl p-6 transition-all duration-300"
              style={{
                background: "rgba(255,255,255,0.02)",
                border: "1px solid rgba(255,255,255,0.07)",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLDivElement;
                el.style.border = "1px solid rgba(99,102,241,0.55)";
                el.style.boxShadow = "0 0 0 1px rgba(99,102,241,0.18), 0 0 22px rgba(99,102,241,0.35), 0 0 48px rgba(99,102,241,0.14)";
                el.style.background = "rgba(99,102,241,0.04)";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLDivElement;
                el.style.border = "1px solid rgba(255,255,255,0.07)";
                el.style.boxShadow = "none";
                el.style.background = "rgba(255,255,255,0.02)";
              }}
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                style={{ background: uc.iconBg }}
              >
                {uc.icon}
              </div>
              <div>
                <h3 className="text-sm font-semibold text-white mb-1.5">{uc.title}</h3>
                <p className="text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.4)" }}>{uc.description}</p>
              </div>
              <div className="mt-auto pt-3" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                <span className="text-xs font-semibold" style={{ color: uc.statColor }}>{uc.stat}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
