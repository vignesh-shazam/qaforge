"use client";

interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
  comingSoon?: boolean;
  iconBg: string;
  iconColor: string;
}

const features: Feature[] = [
  {
    iconBg: "rgba(99,102,241,0.15)",
    iconColor: "#818cf8",
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
        <rect x="2" y="2.5" width="14" height="3" rx="1.5" fill="#818cf8" opacity=".9"/>
        <rect x="2" y="7.5" width="10" height="2.5" rx="1.25" fill="#818cf8" opacity=".6"/>
        <rect x="2" y="12" width="12" height="2.5" rx="1.25" fill="#818cf8" opacity=".35"/>
      </svg>
    ),
    title: "Test Case Generator",
    description: "Create detailed test cases structured and ready for use in requirements URLs.",
  },
  {
    iconBg: "rgba(239,68,68,0.15)",
    iconColor: "#f87171",
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
        <path d="M3 5h12l-1 9H4L3 5Z" stroke="#f87171" strokeWidth="1.2" strokeLinejoin="round"/>
        <circle cx="9" cy="2.5" r="1.5" fill="#f87171" opacity=".6"/>
        <path d="M9 8v3M9 13h.01" stroke="#f87171" strokeWidth="1.2" strokeLinecap="round"/>
      </svg>
    ),
    title: "Bug Report Generator",
    description: "Turn observations into structured, ready-to-use bug reports.",
  },
  {
    iconBg: "rgba(59,130,246,0.15)",
    iconColor: "#60a5fa",
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
        <rect x="2" y="2" width="14" height="14" rx="2.5" stroke="#60a5fa" strokeWidth="1.2"/>
        <path d="M5.5 6h7M5.5 9h5M5.5 12h6" stroke="#60a5fa" strokeWidth="1.1" strokeLinecap="round"/>
      </svg>
    ),
    title: "Test Data Generator",
    description: "Generate realistic, valid and edge-case test data instantly.",
  },
  {
    iconBg: "rgba(245,158,11,0.15)",
    iconColor: "#fbbf24",
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
        <path d="M3 5h12M5 2h8M6 5v10M12 5v10M3 15h12" stroke="#fbbf24" strokeWidth="1.2" strokeLinecap="round"/>
        <circle cx="9" cy="10" r="2" stroke="#fbbf24" strokeWidth="1.1"/>
      </svg>
    ),
    title: "API Test Generator",
    description: "Generate API tests from endpoints or OpenAPI specs directly.",
  },
  {
    iconBg: "rgba(139,92,246,0.15)",
    iconColor: "#a78bfa",
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
        <rect x="2" y="4" width="14" height="10" rx="2" stroke="#a78bfa" strokeWidth="1.2"/>
        <path d="M7 7.5l2.5 1.5-2.5 1.5V7.5Z" fill="#a78bfa"/>
        <path d="M12 7.5v3" stroke="#a78bfa" strokeWidth="1.1" strokeLinecap="round"/>
      </svg>
    ),
    title: "Playwright Automation",
    description: "Generate Playwright tests with Page Objects from your web application.",
    comingSoon: true,
  },
  {
    iconBg: "rgba(34,211,238,0.15)",
    iconColor: "#22d3ee",
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
        <circle cx="5" cy="9" r="2.5" stroke="#22d3ee" strokeWidth="1.2"/>
        <circle cx="13" cy="9" r="2.5" stroke="#22d3ee" strokeWidth="1.2"/>
        <path d="M7.5 9h3" stroke="#22d3ee" strokeWidth="1.2"/>
        <path d="M13 6.5l2.5 2.5-2.5 2.5" stroke="#22d3ee" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    title: "URL → Automation",
    description: "Discover and generate tests from any web application URL.",
    comingSoon: true,
  },
  {
    iconBg: "rgba(244,114,182,0.15)",
    iconColor: "#f472b6",
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
        <circle cx="9" cy="9" r="3" stroke="#f472b6" strokeWidth="1.2"/>
        <circle cx="9" cy="9" r="7" stroke="#f472b6" strokeWidth="1" strokeDasharray="2.5 2"/>
      </svg>
    ),
    title: "Test Flow Recorder",
    description: "Record user actions and convert to reusable automation scripts.",
    comingSoon: true,
  },
  {
    iconBg: "rgba(52,211,153,0.15)",
    iconColor: "#34d399",
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
        <path d="M9 2L11 6.5H16L12 9.5 13.5 14.5 9 11.5 4.5 14.5 6 9.5 2 6.5H7L9 2Z" stroke="#34d399" strokeWidth="1.1" strokeLinejoin="round"/>
      </svg>
    ),
    title: "AI QA Agent",
    description: "Your AI-powered QA assistant for end-to-end automation.",
    comingSoon: true,
  },
];

export function FeaturesSection(): React.JSX.Element {
  return (
    <section
      id="features"
      className="py-20 sm:py-24"
      aria-labelledby="features-heading"
      style={{ background: "#040810" }}
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center mb-12">
          <p className="text-[10px] font-bold text-brand-400 uppercase tracking-[0.2em] mb-3">
            Powerful Features
          </p>
          <h2 id="features-heading" className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Everything you need for modern QA.
          </h2>
          <p className="mt-3 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed" style={{ color: "rgba(255,255,255,0.45)" }}>
            From test planning to automation, QAForge covers the complete QA lifecycle.
          </p>
        </div>

        {/* 4-column × 2-row grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {features.map((f) => (
            <div
              key={f.title}
              className="group relative rounded-xl p-5 flex flex-col gap-3 transition-all duration-200 hover:-translate-y-0.5"
              style={{
                background: "rgba(255,255,255,0.02)",
                border: "1px solid rgba(255,255,255,0.07)",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLDivElement).style.border = `1px solid ${f.iconColor}33`;
                (e.currentTarget as HTMLDivElement).style.background = "rgba(255,255,255,0.04)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLDivElement).style.border = "1px solid rgba(255,255,255,0.07)";
                (e.currentTarget as HTMLDivElement).style.background = "rgba(255,255,255,0.02)";
              }}
            >
              {/* Icon + soon */}
              <div className="flex items-start justify-between">
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                  style={{ background: f.iconBg }}
                >
                  {f.icon}
                </div>
                {f.comingSoon && (
                  <span
                    className="text-[9px] font-semibold px-2 py-0.5 rounded-full"
                    style={{ color: "rgba(255,255,255,0.3)", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" }}
                  >
                    Soon
                  </span>
                )}
              </div>

              <div>
                <h3 className="text-sm font-semibold text-white mb-1">{f.title}</h3>
                <p className="text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.4)" }}>
                  {f.description}
                </p>
              </div>

              {/* Arrow link */}
              <div className="mt-auto flex items-center gap-1 text-[11px]" style={{ color: "rgba(255,255,255,0.25)" }}>
                <span>Learn more</span>
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
                  <path d="M2 5h6M5.5 2.5l2.5 2.5-2.5 2.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
