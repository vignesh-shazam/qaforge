"use client";

import { Search, TestTube2, Bug, Database, Play, ArrowRight } from "lucide-react";

const actions = [
  {
    icon: <Search size={22} aria-hidden="true" />,
    iconColor: "#818cf8",
    iconBg: "linear-gradient(135deg,#5b5ef4,#6d46e8)",
    title: "Analyze URL",
    description: "Discover pages, elements and flows",
    cta: "Analyze Now",
  },
  {
    icon: <TestTube2 size={22} aria-hidden="true" />,
    iconColor: "#60a5fa",
    iconBg: "linear-gradient(135deg,#2563eb,#1d4ed8)",
    title: "Generate Test Cases",
    description: "Create functional test cases using AI",
    cta: "Generate",
  },
  {
    icon: <Bug size={22} aria-hidden="true" />,
    iconColor: "#f87171",
    iconBg: "linear-gradient(135deg,#dc2626,#b91c1c)",
    title: "Find Bugs",
    description: "Identify issues and generate reports",
    cta: "Find Bugs",
  },
  {
    icon: <Database size={22} aria-hidden="true" />,
    iconColor: "#22d3ee",
    iconBg: "linear-gradient(135deg,#0891b2,#0e7490)",
    title: "Create Test Data",
    description: "Generate realistic test data",
    cta: "Generate",
  },
  {
    icon: <Play size={22} aria-hidden="true" />,
    iconColor: "#4ade80",
    iconBg: "linear-gradient(135deg,#16a34a,#15803d)",
    title: "Playwright Automation",
    description: "Generate production-ready tests",
    cta: "Automate",
  },
] as const;

export function QuickActions(): React.JSX.Element {
  return (
    <section aria-labelledby="quick-actions-heading">
      <div className="text-center mb-8">
        <h2 id="quick-actions-heading" className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
          What do you want to do?
        </h2>
        <p className="mt-2 text-sm" style={{ color: "rgba(255,255,255,0.5)" }}>
          Get started quickly with AI-powered QA tools.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {actions.map((action) => (
          <div
            key={action.title}
            className="group flex flex-col gap-4 rounded-2xl p-5 transition-all duration-300"
            style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.07)" }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLDivElement;
              el.style.border = `1px solid ${action.iconColor}40`;
              el.style.boxShadow = `0 0 24px ${action.iconColor}18`;
              el.style.background = "rgba(255,255,255,0.04)";
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLDivElement;
              el.style.border = "1px solid rgba(255,255,255,0.07)";
              el.style.boxShadow = "none";
              el.style.background = "rgba(255,255,255,0.025)";
            }}
          >
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
              style={{ background: action.iconBg, boxShadow: `0 4px 16px ${action.iconColor}30`, color: "white" }}
            >
              {action.icon}
            </div>

            <div className="flex-1">
              <h3 className="text-sm font-semibold text-white mb-1">{action.title}</h3>
              <p className="text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.45)" }}>{action.description}</p>
            </div>

            <button
              type="button"
              disabled
              className="flex items-center gap-1.5 text-xs font-semibold disabled:opacity-40 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 rounded transition-opacity"
              style={{ color: action.iconColor }}
              title="Coming in a future release"
            >
              {action.cta}
              <ArrowRight size={12} aria-hidden="true" />
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
