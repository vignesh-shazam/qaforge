"use client";

interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
  comingSoon?: boolean;
  iconBg: string;
  iconGlow: string;
  iconColor: string;
}

const features: Feature[] = [
  {
    iconBg: "linear-gradient(135deg,#5b5ef4 0%,#6d46e8 100%)",
    iconGlow: "rgba(99,102,241,0.35)",
    iconColor: "#fff",
    icon: (
      /* Checklist / test case document */
      <svg width="26" height="26" viewBox="0 0 26 26" fill="none" aria-hidden="true">
        <rect x="4" y="2" width="18" height="22" rx="3" fill="rgba(255,255,255,0.12)" stroke="rgba(255,255,255,0.35)" strokeWidth="1.2"/>
        <rect x="7" y="6" width="12" height="2.5" rx="1.25" fill="white" opacity=".9"/>
        <rect x="7" y="10.5" width="8" height="2" rx="1" fill="white" opacity=".65"/>
        <rect x="7" y="14.5" width="10" height="2" rx="1" fill="white" opacity=".45"/>
        <path d="M7 18.5l1.5 1.5 2.5-2.5" stroke="white" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" opacity=".8"/>
      </svg>
    ),
    title: "Test Case Generator",
    description: "Create detailed test cases from requirements or URLs.",
  },
  {
    iconBg: "linear-gradient(135deg,#c0392b 0%,#e74c3c 100%)",
    iconGlow: "rgba(239,68,68,0.35)",
    iconColor: "#fff",
    icon: (
      /* Bug / gear with exclamation */
      <svg width="26" height="26" viewBox="0 0 26 26" fill="none" aria-hidden="true">
        <circle cx="13" cy="13" r="7" fill="rgba(255,255,255,0.12)" stroke="rgba(255,255,255,0.35)" strokeWidth="1.2"/>
        <path d="M8.5 8.5A6.5 6.5 0 0 1 19.5 8.5" stroke="white" strokeWidth="1.4" strokeLinecap="round" opacity=".5"/>
        <path d="M13 9.5v5" stroke="white" strokeWidth="1.8" strokeLinecap="round"/>
        <circle cx="13" cy="17" r="1" fill="white"/>
        <path d="M6 13H4M22 13h-2M10 7l-1.5-2M16 7l1.5-2" stroke="rgba(255,255,255,0.5)" strokeWidth="1.2" strokeLinecap="round"/>
      </svg>
    ),
    title: "Bug Report Generator",
    description: "Turn issues into structured, ready-to-use bug reports.",
  },
  {
    iconBg: "linear-gradient(135deg,#0e9e82 0%,#14b8a6 100%)",
    iconGlow: "rgba(20,184,166,0.35)",
    iconColor: "#fff",
    icon: (
      /* Stacked database / data layers */
      <svg width="26" height="26" viewBox="0 0 26 26" fill="none" aria-hidden="true">
        <ellipse cx="13" cy="8" rx="7" ry="2.8" fill="rgba(255,255,255,0.18)" stroke="rgba(255,255,255,0.45)" strokeWidth="1.2"/>
        <path d="M6 8v5c0 1.55 3.13 2.8 7 2.8s7-1.25 7-2.8V8" stroke="rgba(255,255,255,0.5)" strokeWidth="1.2"/>
        <path d="M6 13v5c0 1.55 3.13 2.8 7 2.8s7-1.25 7-2.8v-5" stroke="rgba(255,255,255,0.5)" strokeWidth="1.2"/>
        <path d="M10 8.5l1.5 1.5L14 7" stroke="white" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    title: "Test Data Generator",
    description: "Generate valid, invalid and edge case test data instantly.",
  },
  {
    iconBg: "linear-gradient(135deg,#7c5af0 0%,#5b8af7 100%)",
    iconGlow: "rgba(99,102,241,0.35)",
    iconColor: "#fff",
    icon: (
      /* API dots / grid */
      <svg width="26" height="26" viewBox="0 0 26 26" fill="none" aria-hidden="true">
        <circle cx="7" cy="7" r="2.8" fill="white" opacity=".9"/>
        <circle cx="19" cy="7" r="2.8" fill="white" opacity=".9"/>
        <circle cx="7" cy="19" r="2.8" fill="white" opacity=".6"/>
        <circle cx="19" cy="19" r="2.8" fill="white" opacity=".6"/>
        <circle cx="13" cy="13" r="2.8" fill="white" opacity=".75"/>
        <path d="M9.8 7h6.4M7 9.8v6.4M19 9.8v6.4M9.8 19h6.4" stroke="rgba(255,255,255,0.35)" strokeWidth="1"/>
      </svg>
    ),
    title: "API Test Generator",
    description: "Create API tests from endpoints or OpenAPI specs.",
  },
  {
    iconBg: "linear-gradient(135deg,#1a7f37 0%,#16a34a 100%)",
    iconGlow: "rgba(34,197,94,0.35)",
    iconColor: "#fff",
    icon: (
      /* Code brackets — Playwright */
      <svg width="26" height="26" viewBox="0 0 26 26" fill="none" aria-hidden="true">
        <path d="M9 7L4 13l5 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity=".9"/>
        <path d="M17 7l5 6-5 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity=".9"/>
        <path d="M15 5l-4 16" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    title: "Playwright Automation",
    description: "Generate Playwright tests and Page Objects.",
    comingSoon: true,
  },
  {
    iconBg: "linear-gradient(135deg,#1d4ed8 0%,#2563eb 100%)",
    iconGlow: "rgba(37,99,235,0.35)",
    iconColor: "#fff",
    icon: (
      /* Search / scan URL */
      <svg width="26" height="26" viewBox="0 0 26 26" fill="none" aria-hidden="true">
        <circle cx="11.5" cy="11.5" r="6.5" stroke="white" strokeWidth="1.8" opacity=".9"/>
        <path d="M16.5 16.5L22 22" stroke="white" strokeWidth="2" strokeLinecap="round" opacity=".9"/>
        <path d="M8.5 11.5h6M11.5 8.5v6" stroke="rgba(255,255,255,0.7)" strokeWidth="1.4" strokeLinecap="round"/>
      </svg>
    ),
    title: "URL → Automation",
    description: "Discover and generate tests from any web application.",
    comingSoon: true,
  },
  {
    iconBg: "linear-gradient(135deg,#b91c87 0%,#ec4899 100%)",
    iconGlow: "rgba(236,72,153,0.35)",
    iconColor: "#fff",
    icon: (
      /* Record / circle dot */
      <svg width="26" height="26" viewBox="0 0 26 26" fill="none" aria-hidden="true">
        <rect x="3" y="3" width="20" height="20" rx="5" fill="rgba(255,255,255,0.12)" stroke="rgba(255,255,255,0.35)" strokeWidth="1.2"/>
        <circle cx="13" cy="13" r="5" fill="white" opacity=".9"/>
        <circle cx="13" cy="13" r="2.5" fill="rgba(236,72,153,0.9)"/>
        <circle cx="19.5" cy="6.5" r="2.5" fill="#ef4444"/>
      </svg>
    ),
    title: "Test Flow Recorder",
    description: "Record user actions and convert to automation.",
    comingSoon: true,
  },
  {
    iconBg: "linear-gradient(135deg,#0f766e 0%,#14b8a6 100%)",
    iconGlow: "rgba(20,184,166,0.35)",
    iconColor: "#fff",
    icon: (
      /* AI sparkle / agent star */
      <svg width="26" height="26" viewBox="0 0 26 26" fill="none" aria-hidden="true">
        <path d="M13 3l2.2 6.2 6.3.5-4.8 4 1.7 6.3L13 16.5l-5.4 3.5 1.7-6.3L4.5 9.7l6.3-.5L13 3Z" fill="rgba(255,255,255,0.15)" stroke="white" strokeWidth="1.4" strokeLinejoin="round"/>
        <circle cx="19" cy="6" r="2" fill="white" opacity=".8"/>
        <circle cx="7" cy="20" r="1.5" fill="white" opacity=".5"/>
      </svg>
    ),
    title: "AI QA Agent",
    description: "Your intelligent QA assistant for end-to-end automation.",
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
        <div className="text-center mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-2 rounded-full px-3 py-1 mb-4"
            style={{ background: "rgba(99,102,241,0.12)", border: "1px solid rgba(99,102,241,0.25)" }}>
            <span className="text-[10px] font-bold uppercase tracking-widest" style={{ color: "#818cf8" }}>
              Powerful Features
            </span>
          </div>
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
              className="group relative rounded-2xl p-5 flex flex-col gap-4 transition-all duration-300 hover:-translate-y-0.5"
              style={{
                background: "rgba(255,255,255,0.025)",
                border: "1px solid rgba(255,255,255,0.07)",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLDivElement;
                el.style.border = `1px solid ${f.iconGlow.replace("0.35", "0.55")}`;
                el.style.boxShadow = `0 0 0 1px ${f.iconGlow.replace("0.35", "0.18")}, 0 0 22px ${f.iconGlow.replace("0.35", "0.35")}, 0 0 48px ${f.iconGlow.replace("0.35", "0.14")}`;
                el.style.background = "rgba(255,255,255,0.04)";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLDivElement;
                el.style.border = "1px solid rgba(255,255,255,0.07)";
                el.style.boxShadow = "none";
                el.style.background = "rgba(255,255,255,0.025)";
              }}
            >
              {/* Icon row: big icon left, Soon badge top-right (comingSoon only) */}
              <div className="flex items-start justify-between">
                {/* Large icon square */}
                <div
                  className="w-14 h-14 rounded-xl flex items-center justify-center shrink-0"
                  style={{
                    background: f.iconBg,
                    boxShadow: `0 4px 18px ${f.iconGlow}`,
                  }}
                >
                  {f.icon}
                </div>

                {/* Top-right: Soon badge only when coming soon */}
                {f.comingSoon && (
                  <span
                    className="text-[9px] font-semibold px-2 py-0.5 rounded-full mt-0.5"
                    style={{ color: "rgba(255,255,255,0.3)", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" }}
                  >
                    Soon
                  </span>
                )}
              </div>

              {/* Text */}
              <div className="flex-1">
                <h3 className="text-sm font-semibold text-white mb-1.5">{f.title}</h3>
                <p className="text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.4)" }}>
                  {f.description}
                </p>
              </div>

              {/* Bottom-right circle arrow */}
              <div className="mt-auto flex justify-end">
                <div
                  className="w-7 h-7 rounded-full flex items-center justify-center transition-all duration-200 group-hover:scale-110"
                  style={{
                    background: "rgba(99,102,241,0.15)",
                    border: "1px solid rgba(99,102,241,0.3)",
                  }}
                >
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                    <path d="M2 6h8M6.5 2.5L10 6l-3.5 3.5" stroke="#818cf8" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
