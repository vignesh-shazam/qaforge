"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { LayoutDashboard, FolderKanban, TestTube2, Bug, Database, Zap, Bot, Search, ChevronRight, FileCode2, Cpu, } from "lucide-react";

type ModuleKey = "dashboard" | "projects" | "test-cases" | "bug-reports" | "test-data" | "api-tests" | "automation";

// ── Floating card — SS2 style ─────────────────────────────────────────────*

function FloatingCard({ icon, label, value, accentColor, glowColor, style }: {
  icon: React.ReactNode; label: string; value?: string;
  accentColor: string; glowColor: string; style?: React.CSSProperties;
}): React.JSX.Element {
  return (
    // hidden on mobile — floating cards cause overflow at narrow viewports*
    <div className="hidden xl:flex absolute flex-col gap-1 px-3 py-2.5 rounded-xl" aria-hidden="true"
      style={{
        background: "rgba(8,10,22,0.94)",
        border: `1px solid ${accentColor}40`,
        boxShadow: `0 0 24px ${glowColor}28, 0 8px 24px rgba(0,0,0,0.5)`,
        backdropFilter: "blur(16px)",
        minWidth: "130px",
        ...style,
      }}>
      {/* Icon + label row */}
      <div className="flex items-center gap-2">
        <div className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0"
          style={{ background: `${accentColor}20`, border: `1px solid ${accentColor}35` }}>
          <span style={{ color: accentColor }}>{icon}</span>
        </div>
        <div className="text-[11px] font-bold text-white leading-none">{label}</div>
      </div>
      {/* Value sub-label */}
      {value && (
        <div className="text-[10px] font-medium pl-0.5" style={{ color: accentColor }}>
          {value}
        </div>
      )}
    </div>
  );
}

// ── Metric card ────────────────────────────────────────────────────────────*

function MetricCard({ value, label, icon, accentColor, bgColor }: {
  value: string; label: string; icon: React.ReactNode; accentColor: string; bgColor: string;
}): React.JSX.Element {
  return (
    <div className="rounded-xl p-3 flex flex-col gap-2"
      style={{ background: bgColor, border: `1px solid ${accentColor}22` }}>
      <div className="w-7 h-7 rounded-lg flex items-center justify-center"
        style={{ background: `${accentColor}18` }}>
        <span style={{ color: accentColor, display: "flex" }}>{icon}</span>
      </div>
      <div>
        <div className="text-xl font-bold leading-none mb-0.5" style={{ color: accentColor }}>{value}</div>
        <div className="text-[10px]" style={{ color: "rgba(255,255,255,0.38)" }}>{label}</div>
      </div>
    </div>
  );
}

// ── Activity chart ─────────────────────────────────────────────────────────*

const BARS = [25, 40, 32, 58, 44, 70, 52, 80, 62, 75, 55, 85, 65, 90, 72, 95];

function ActivityChart(): React.JSX.Element {
  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-center justify-between">
        <span className="text-[9px] font-semibold uppercase tracking-wider" style={{ color: "rgba(255,255,255,0.25)" }}>Testing Activity</span>
        <span className="text-[9px]" style={{ color: "#4ade80" }}>↑ 24% this week</span>
      </div>
      <div className="flex items-end gap-0.75" style={{ height: "32px" }}>
        {BARS.map((h, i) => (
          <div key={`bar-${i}`} className="flex-1 rounded-sm" style={{
            height: `${h}%`,
            background: i > BARS.length - 5 ? "linear-gradient(180deg,#818cf8,#6366f1)" : "rgba(99,102,241,0.25)",
          }} />
        ))}
      </div>
    </div>
  );
}

// ── Module previews ────────────────────────────────────────────────────────*

function PreviewDashboard(): React.JSX.Element {
  return (
    <div className="flex flex-col gap-2.5 h-full">
      {/* Metric cards — matches SS2: 12, 248, 36, AI Generating */}
      <div className="grid grid-cols-4 gap-1.5 shrink-0">
        <MetricCard value="12" label="Total Projects" icon={<FolderKanban size={12} />} accentColor="#818cf8" bgColor="rgba(99,102,241,0.08)" />
        <MetricCard value="248" label="Test Cases" icon={<TestTube2 size={12} />} accentColor="#22d3ee" bgColor="rgba(34,211,238,0.08)" />
        <MetricCard value="36" label="Bug Reports" icon={<Bug size={12} />} accentColor="#f87171" bgColor="rgba(239,68,68,0.08)" />
        {/* AI Generating card — matches SS2 */}
        <div className="rounded-xl p-2.5 flex flex-col gap-1.5"
          style={{ background: "rgba(99,102,241,0.08)", border: "1px solid rgba(99,102,241,0.2)" }}>
          <div className="w-6 h-6 rounded-lg flex items-center justify-center"
            style={{ background: "rgba(99,102,241,0.2)" }}>
            <Cpu size={11} style={{ color: "#818cf8" }} />
          </div>
          <div className="text-[9px] font-bold leading-none text-white">AI Generating</div>
          <div className="text-[8px]" style={{ color: "#818cf8" }}>Test Cases</div>
          {/* Progress bar */}
          <div className="w-full h-0.5 rounded-full overflow-hidden"
            style={{ background: "rgba(99,102,241,0.15)" }}>
            <div className="h-full rounded-full" style={{ width: "65%", background: "linear-gradient(90deg,#6366f1,#818cf8)" }} />
          </div>
        </div>
      </div>

      {/* Recent Activity — SS2 shows activity list */}
      <div className="flex flex-col gap-1 flex-1">
        <div className="flex items-center justify-between shrink-0">
          <span className="text-[9px] font-semibold uppercase tracking-wider" style={{ color: "rgba(255,255,255,0.25)" }}>
            Recent Activity
          </span>
          <span className="text-[9px] flex items-center gap-0.5" style={{ color: "#818cf8" }}>
            View All <ChevronRight size={8} />
          </span>
        </div>
        {[
          { text: "Generated test cases for login module", time: "Just now", dot: "#4ade80" },
          { text: "API tests completed", time: "2 mins ago", dot: "#22d3ee" },
          { text: "Bug reports updated", time: "5 mins ago", dot: "#f87171" },
        ].map((a) => (
          <div key={a.text} className="flex items-center gap-2.5 rounded-lg px-2.5 py-1.5"
            style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.04)" }}>
            <div className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: a.dot }} />
            <span className="flex-1 text-[9px] truncate" style={{ color: "rgba(255,255,255,0.6)" }}>{a.text}</span>
            <span className="text-[8px] shrink-0" style={{ color: "rgba(255,255,255,0.25)" }}>{a.time}</span>
          </div>
        ))}
      </div>

      {/* Bottom floating cards row — Playwright + API Tests matching SS2 */}
      <div className="grid grid-cols-2 gap-1.5 shrink-0">
        <div className="rounded-xl p-2.5 flex items-center gap-2"
          style={{ background: "rgba(99,102,241,0.12)", border: "1px solid rgba(99,102,241,0.25)" }}>
          <div className="w-6 h-6 rounded-lg flex items-center justify-center shrink-0"
            style={{ background: "rgba(99,102,241,0.25)" }}>
            <FileCode2 size={11} style={{ color: "#818cf8" }} />
          </div>
          <div>
            <div className="text-[9px] font-bold text-white">Playwright</div>
            <div className="text-[8px]" style={{ color: "#818cf8" }}>AI Ready</div>
          </div>
        </div>
        <div className="rounded-xl p-2.5 flex items-center gap-2"
          style={{ background: "rgba(74,222,128,0.08)", border: "1px solid rgba(74,222,128,0.2)" }}>
          <div className="w-6 h-6 rounded-lg flex items-center justify-center shrink-0"
            style={{ background: "rgba(74,222,128,0.2)" }}>
            <Zap size={11} style={{ color: "#4ade80" }} />
          </div>
          <div>
            <div className="text-[9px] font-bold text-white">API Tests</div>
            <div className="text-[8px]" style={{ color: "#4ade80" }}>No code</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function PreviewProjects(): React.JSX.Element {
  const items = [
    { name: "AIGAGA", status: "Active", c: "#4ade80" },
    { name: "InviteDesign", status: "Active", c: "#4ade80" },
    { name: "Driver Life Simulator", status: "Active", c: "#4ade80" },
    { name: "QAForge Demo App", status: "In Review", c: "#fbbf24" },
  ];
  return (
    <div className="flex flex-col gap-3 h-full">
      <div className="flex items-center justify-between shrink-0">
        <div>
          <div className="text-[11px] font-semibold text-white">Projects</div>
          <div className="text-[9px]" style={{ color: "rgba(255,255,255,0.3)" }}>12 total projects</div>
        </div>
        <div className="text-[9px] px-2 py-1 rounded-lg font-semibold text-white"
          style={{ background: "linear-gradient(135deg,#6366f1,#4f46e5)" }}>+ New</div>
      </div>
      <div className="flex flex-col gap-1.5 flex-1">
        {items.map((p) => (
          <div key={p.name} className="flex items-center gap-2.5 rounded-lg px-3 py-2"
            style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)" }}>
            <FolderKanban size={11} style={{ color: "#818cf8", flexShrink: 0 }} />
            <span className="flex-1 text-[10px] truncate" style={{ color: "rgba(255,255,255,0.65)" }}>{p.name}</span>
            <span className="text-[9px] px-2 py-0.5 rounded-full font-medium shrink-0"
              style={{ color: p.c, background: `${p.c}15`, border: `1px solid ${p.c}30` }}>{p.status}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function PreviewTestCases(): React.JSX.Element {
  const cases = [
    { id: "TC-001", name: "Login with valid credentials", status: "Passed", c: "#4ade80" },
    { id: "TC-002", name: "Invalid login validation", status: "Passed", c: "#4ade80" },
    { id: "TC-003", name: "User registration flow", status: "Failed", c: "#f87171" },
    { id: "TC-004", name: "Password reset email", status: "Pending", c: "#fbbf24" },
  ];
  return (
    <div className="flex flex-col gap-3 h-full">
      <div className="shrink-0">
        <div className="text-[11px] font-semibold text-white">Test Cases</div>
        <div className="flex items-center gap-3 mt-1">
          {[["#4ade80", "198 Passed"], ["#f87171", "24 Failed"], ["#fbbf24", "24 Pending"]].map(([c, l]) => (
            <div key={l} className="flex items-center gap-1">
              <div className="w-1.5 h-1.5 rounded-full" style={{ background: c }} />
              <span className="text-[9px]" style={{ color: "rgba(255,255,255,0.45)" }}>{l}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-1.5 flex-1">
        {cases.map((tc) => (
          <div key={tc.id} className="flex items-center gap-2.5 rounded-lg px-3 py-2"
            style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)" }}>
            <span className="text-[9px] font-mono shrink-0" style={{ color: "rgba(255,255,255,0.28)" }}>{tc.id}</span>
            <span className="flex-1 text-[10px] truncate" style={{ color: "rgba(255,255,255,0.65)" }}>{tc.name}</span>
            <span className="text-[9px] px-2 py-0.5 rounded-full font-medium shrink-0"
              style={{ color: tc.c, background: `${tc.c}15`, border: `1px solid ${tc.c}30` }}>{tc.status}</span>
          </div>
        ))}
      </div>
      <div className="mt-auto"><ActivityChart /></div>
    </div>
  );
}

function PreviewBugReports(): React.JSX.Element {
  const bugs = [
    { id: "BUG-102", name: "Login button not responding", severity: "Critical", c: "#f87171" },
    { id: "BUG-101", name: "Incorrect validation message", severity: "High", c: "#fbbf24" },
    { id: "BUG-099", name: "UI misalignment on mobile", severity: "Medium", c: "#818cf8" },
    { id: "BUG-098", name: "Tooltip text truncated", severity: "Low", c: "#4ade80" },
  ];
  return (
    <div className="flex flex-col gap-3 h-full">
      <div className="shrink-0">
        <div className="text-[11px] font-semibold text-white">Bug Reports</div>
        <div className="flex items-center gap-2 mt-1 flex-wrap">
          {[["#f87171", "4 Critical"], ["#fbbf24", "12 High"], ["#818cf8", "15 Medium"], ["#4ade80", "5 Low"]].map(([c, l]) => (
            <div key={l} className="flex items-center gap-1">
              <div className="w-1.5 h-1.5 rounded-full" style={{ background: c }} />
              <span className="text-[9px]" style={{ color: "rgba(255,255,255,0.45)" }}>{l}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-1.5 flex-1">
        {bugs.map((b) => (
          <div key={b.id} className="flex items-center gap-2.5 rounded-lg px-3 py-2"
            style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)" }}>
            <span className="text-[9px] font-mono shrink-0" style={{ color: "rgba(255,255,255,0.28)" }}>{b.id}</span>
            <span className="flex-1 text-[10px] truncate" style={{ color: "rgba(255,255,255,0.65)" }}>{b.name}</span>
            <span className="text-[9px] px-2 py-0.5 rounded-full font-medium shrink-0"
              style={{ color: b.c, background: `${b.c}15`, border: `1px solid ${b.c}30` }}>{b.severity}</span>
          </div>
        ))}
      </div>
    </div>
  );

}

function PreviewTestData(): React.JSX.Element {
  const rows = [
    { field: "Name", value: "Sarah Johnson", c: "#818cf8" },
    { field: "Email", value: "s.johnson@example.com", c: "#22d3ee" },
    { field: "Address", value: "42 Oak St, Austin TX", c: "#4ade80" },
    { field: "Payment", value: "•••• •••• •••• 4242", c: "#fbbf24" },
  ];
  return (
    <div className="flex flex-col gap-3 h-full">
      <div className="shrink-0">
        <div className="text-[11px] font-semibold text-white">Test Data</div>
        <div className="text-[9px] mt-0.5" style={{ color: "rgba(255,255,255,0.3)" }}>AI-generated realistic test data</div>
      </div>
      <div className="rounded-xl overflow-hidden flex-1" style={{ border: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="grid grid-cols-2 px-3 py-1.5" style={{ background: "rgba(99,102,241,0.08)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
          <span className="text-[9px] font-semibold uppercase tracking-wider" style={{ color: "rgba(255,255,255,0.3)" }}>Field</span>
          <span className="text-[9px] font-semibold uppercase tracking-wider" style={{ color: "rgba(255,255,255,0.3)" }}>Value</span>
        </div>
        {rows.map((r) => (
          <div key={r.field} className="grid grid-cols-2 px-3 py-2" style={{ borderBottom: "1px solid rgba(255,255,255,0.03)" }}>
            <span className="text-[9px]" style={{ color: "rgba(255,255,255,0.35)" }}>{r.field}</span>
            <span className="text-[9px] font-mono truncate" style={{ color: r.c }}>{r.value}</span>
          </div>
        ))}
      </div>
      <div className="shrink-0 text-[9px]" style={{ color: "rgba(255,255,255,0.3)" }}>1,240 records generated</div>
    </div>
  );
}

function PreviewApiTests(): React.JSX.Element {
  const endpoints = [
    { method: "GET", path: "/users", status: 200, time: "48ms", ok: true },
    { method: "POST", path: "/login", status: 200, time: "62ms", ok: true },
    { method: "GET", path: "/projects", status: 200, time: "35ms", ok: true },
    { method: "POST", path: "/test-cases", status: 201, time: "71ms", ok: true },
    { method: "DELETE", path: "/users/404", status: 404, time: "28ms", ok: false },
  ];
  const mc: Record<string, string> = { GET: "#4ade80", POST: "#818cf8", DELETE: "#f87171" };
  return (
    <div className="flex flex-col gap-3 h-full">
      <div className="shrink-0">
        <div className="text-[11px] font-semibold text-white">API Tests</div>
        <div className="flex items-center gap-2 mt-1">
          <span className="text-[9px]" style={{ color: "#4ade80" }}>124 passing</span>
          <span className="text-[9px]" style={{ color: "rgba(255,255,255,0.25)" }}>·</span>
          <span className="text-[9px]" style={{ color: "#f87171" }}>3 failing</span>
        </div>
      </div>
      <div className="flex flex-col gap-1 flex-1">
        {endpoints.map((e) => (
          <div key={e.path} className="flex items-center gap-2 rounded-lg px-3 py-1.5"
            style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.04)" }}>
            <span className="text-[8px] font-bold w-10 shrink-0 text-center px-1 py-0.5 rounded"
              style={{ color: mc[e.method] ?? "#818cf8", background: `${mc[e.method] ?? "#818cf8"}15` }}>{e.method}</span>
            <span className="flex-1 text-[9px] font-mono truncate" style={{ color: "rgba(255,255,255,0.55)" }}>{e.path}</span>
            <span className="text-[9px] font-mono shrink-0" style={{ color: "rgba(255,255,255,0.3)" }}>{e.time}</span>
            <span className="text-[8px] font-bold shrink-0 px-1.5 py-0.5 rounded"
              style={{ color: e.ok ? "#4ade80" : "#f87171", background: e.ok ? "rgba(74,222,128,0.1)" : "rgba(239,68,68,0.1)" }}>{e.status}</span>
          </div>
        ))}
      </div>
    </div>
  );
}


function PreviewAutomation(): React.JSX.Element {

  const scripts = [

    { name: "login.spec.ts", status: "Passed", time: "2.4s", c: "#4ade80" },

    { name: "projects.spec.ts", status: "Passed", time: "3.1s", c: "#4ade80" },

    { name: "test-cases.spec.ts", status: "Failed", time: "1.8s", c: "#f87171" },

    { name: "bug-reports.spec.ts", status: "Passed", time: "2.9s", c: "#4ade80" },

  ];

  return (

    <div className="flex flex-col gap-3 h-full">

      <div className="shrink-0">

        <div className="text-[11px] font-semibold text-white">Playwright Automation</div>

        <div className="flex items-center gap-2 mt-1">

          <span className="text-[9px]" style={{ color: "#4ade80" }}>17 passing</span>

          <span className="text-[9px]" style={{ color: "rgba(255,255,255,0.25)" }}>·</span>

          <span className="text-[9px]" style={{ color: "#f87171" }}>1 failing</span>

          <span className="text-[9px]" style={{ color: "rgba(255,255,255,0.25)" }}>·</span>

          <span className="text-[9px]" style={{ color: "rgba(255,255,255,0.35)" }}>18 scripts</span>

        </div>

      </div>

      <div className="flex flex-col gap-1.5 flex-1">

        {scripts.map((s) => (

          <div key={s.name} className="flex items-center gap-2.5 rounded-lg px-3 py-2"

            style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)" }}>

            <FileCode2 size={11} style={{ color: "#818cf8", flexShrink: 0 }} />

            <span className="flex-1 text-[9px] font-mono truncate" style={{ color: "rgba(255,255,255,0.6)" }}>{s.name}</span>

            <span className="text-[9px] font-mono shrink-0" style={{ color: "rgba(255,255,255,0.3)" }}>{s.time}</span>

            <span className="text-[9px] px-1.5 py-0.5 rounded font-medium shrink-0"

              style={{ color: s.c, background: `${s.c}15` }}>{s.status}</span>

          </div>

        ))}

      </div>

      <div className="shrink-0 rounded-xl p-2.5" style={{ background: "rgba(99,102,241,0.08)", border: "1px solid rgba(99,102,241,0.15)" }}>

        <div className="text-[9px]" style={{ color: "rgba(255,255,255,0.4)" }}>Generated by QAForge AI · Page Object Model pattern</div>

      </div>

    </div>

  );

}



function ModulePreview({ module }: { module: ModuleKey }): React.JSX.Element {

  switch (module) {

    case "projects": return <PreviewProjects />;

    case "test-cases": return <PreviewTestCases />;

    case "bug-reports": return <PreviewBugReports />;

    case "test-data": return <PreviewTestData />;

    case "api-tests": return <PreviewApiTests />;

    case "automation": return <PreviewAutomation />;

    default: return <PreviewDashboard />;

  }

}



// ── Dashboard mockup — SS2 design ─────────────────────────────────────────*



function DashboardMockup(): React.JSX.Element {

  const [hovered, setHovered] = useState<ModuleKey | null>(null);

  const active: ModuleKey = hovered ?? "dashboard";



  // Sidebar items with colored icon backgrounds matching SS2*

  const sidebarItems: Array<{

    key: ModuleKey; label: string; icon: React.ReactNode;

    iconBg: string; iconColor: string;

  }> = [

      { key: "dashboard", label: "Dashboard", icon: <LayoutDashboard size={12} />, iconBg: "rgba(99,102,241,0.25)", iconColor: "#818cf8" },

      { key: "projects", label: "Projects", icon: <FolderKanban size={12} />, iconBg: "rgba(255,255,255,0.08)", iconColor: "rgba(255,255,255,0.45)" },

      { key: "test-cases", label: "Test Cases", icon: <TestTube2 size={12} />, iconBg: "rgba(255,255,255,0.08)", iconColor: "rgba(255,255,255,0.45)" },

      { key: "bug-reports", label: "Bug Reports", icon: <Bug size={12} />, iconBg: "rgba(255,255,255,0.08)", iconColor: "rgba(255,255,255,0.45)" },

      { key: "test-data", label: "Test Data", icon: <Database size={12} />, iconBg: "rgba(255,255,255,0.08)", iconColor: "rgba(255,255,255,0.45)" },

      { key: "api-tests", label: "API Tests", icon: <Zap size={12} />, iconBg: "rgba(255,255,255,0.08)", iconColor: "rgba(255,255,255,0.45)" },

      { key: "automation", label: "Automation", icon: <Bot size={12} />, iconBg: "rgba(255,255,255,0.08)", iconColor: "rgba(255,255,255,0.45)" },

    ];



  return (

    <div

      className="relative rounded-2xl overflow-hidden transition-all duration-300"

      role="presentation"

      aria-hidden="true"

      style={{

        background: "rgba(8,9,22,0.97)",

        border: "1px solid rgba(99,102,241,0.2)",

        boxShadow: "0 0 80px rgba(99,102,241,0.2), 0 0 160px rgba(99,102,241,0.06), 0 32px 80px rgba(0,0,0,0.7)",

      }}

      onMouseEnter={(e) => {

        const el = e.currentTarget as HTMLDivElement;

        el.style.border = "1px solid rgba(99,102,241,0.6)";

        el.style.boxShadow = "0 0 0 1px rgba(99,102,241,0.22), 0 0 32px rgba(99,102,241,0.45), 0 0 80px rgba(99,102,241,0.2), 0 32px 80px rgba(0,0,0,0.7)";

      }}

      onMouseLeave={(e) => {

        setHovered(null);

        const el = e.currentTarget as HTMLDivElement;

        el.style.border = "1px solid rgba(99,102,241,0.2)";

        el.style.boxShadow = "0 0 80px rgba(99,102,241,0.2), 0 0 160px rgba(99,102,241,0.06), 0 32px 80px rgba(0,0,0,0.7)";

      }}

    >

      {/* ── Browser chrome ── */}

      <div

        className="flex items-center gap-3 px-4 py-2.5"

        style={{ background: "rgba(4,5,16,0.99)", borderBottom: "1px solid rgba(255,255,255,0.05)" }}

      >

        <div className="flex gap-1.5 shrink-0">

          <span className="w-2.5 h-2.5 rounded-full" style={{ background: "#ef4444" }} />

          <span className="w-2.5 h-2.5 rounded-full" style={{ background: "#f59e0b" }} />

          <span className="w-2.5 h-2.5 rounded-full" style={{ background: "#22c55e" }} />

        </div>

        {/* QA-FORGE AI badge matching SS2 */}

        <div className="flex items-center gap-1.5 ml-1">

          <div className="w-4 h-4 rounded flex items-center justify-center shrink-0"

            style={{ background: "rgba(99,102,241,0.3)" }}>

            <TestTube2 size={9} style={{ color: "#818cf8" }} />

          </div>

          <span className="text-[9px] font-bold tracking-wider" style={{ color: "#818cf8" }}>QA-FORGE AI</span>

        </div>

        {/* URL bar */}

        <div className="flex-1 flex items-center gap-2 h-6 rounded-md px-3 max-w-45 mx-auto"

          style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}>

          <span className="text-[9px] font-mono truncate" style={{ color: "rgba(255,255,255,0.25)" }}>

            Search web application...

          </span>

        </div>

        <div className="ml-auto flex items-center gap-2">

          <Search size={11} style={{ color: "rgba(255,255,255,0.2)" }} />

          <div className="w-6 h-6 rounded-full flex items-center justify-center"

            style={{ background: "linear-gradient(135deg,#6366f1,#4f46e5)" }}>

            <span className="text-[8px] font-bold text-white">V</span>

          </div>

        </div>

      </div>



      {/* ── App shell ── */}

      <div className="flex" style={{ height: "340px" }}>

        {/* ── Sidebar ── */}

        <div

          className="hidden sm:flex flex-col w-32 shrink-0 py-2"

          style={{ background: "rgba(5,6,18,0.95)", borderRight: "1px solid rgba(255,255,255,0.04)" }}

        >

          {/* Logo */}

          <div className="flex items-center gap-2 px-3 py-2 mb-1">

            <Image src="/branding/qaforge-icon.png" width={20} height={20} alt="QAForge"

              style={{ borderRadius: "5px" }} />

            <span className="text-[10px] font-bold text-white tracking-tight">QAForge</span>

          </div>



          {/* Nav items */}

          {sidebarItems.map((item) => {

            const isActive = item.key === active;

            return (

              <div

                key={item.key}

                className="flex items-center gap-2 mx-1.5 px-2 py-1.5 rounded-lg mb-0.5 select-none"

                style={{

                  cursor: "default",

                  background: isActive ? "rgba(99,102,241,0.18)" : "transparent",

                  transition: "background 220ms ease",

                }}

                onMouseEnter={() => setHovered(item.key)}

              >

                {/* Colored icon box */}

                <div

                  className="w-5 h-5 rounded-md flex items-center justify-center shrink-0"

                  style={{

                    background: isActive ? "rgba(99,102,241,0.35)" : item.iconBg,

                    transition: "background 220ms ease",

                  }}

                >

                  <span style={{ color: isActive ? "#a5b4fc" : item.iconColor, display: "flex" }}>

                    {item.icon}

                  </span>

                </div>

                <span

                  className="text-[9.5px]"

                  style={{

                    color: isActive ? "#a5b4fc" : "rgba(255,255,255,0.38)",

                    fontWeight: isActive ? 600 : 400,

                    transition: "color 220ms ease",

                  }}

                >

                  {item.label}

                </span>

              </div>

            );

          })}



          {/* Bottom Test Cases floating card — matches SS2 bottom-left */}

          <div className="mx-2 mt-auto mb-2 rounded-xl p-2.5"

            style={{ background: "rgba(99,102,241,0.15)", border: "1px solid rgba(99,102,241,0.3)" }}>

            <div className="flex items-center gap-1.5 mb-0.5">

              <div className="w-4 h-4 rounded flex items-center justify-center shrink-0"

                style={{ background: "rgba(99,102,241,0.3)" }}>

                <TestTube2 size={9} style={{ color: "#818cf8" }} />

              </div>

              <span className="text-[9px] font-bold text-white">Test Cases</span>

            </div>

            <div className="text-[8px]" style={{ color: "#818cf8" }}>248 generated</div>

          </div>

        </div>



        {/* ── Main content ── */}

        <div className="flex-1 flex flex-col p-3 gap-2.5 overflow-hidden min-w-0">

          {/* Search + New button */}

          <div className="flex items-center gap-2 shrink-0">

            <div className="flex-1 flex items-center gap-2 h-7 rounded-lg px-2.5"

              style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}>

              <Search size={9} style={{ color: "rgba(255,255,255,0.2)" }} />

              <span className="text-[9px]" style={{ color: "rgba(255,255,255,0.2)" }}>Search projects, tests…</span>

            </div>

            <div className="h-7 px-3 rounded-lg flex items-center text-[9px] font-semibold text-white shrink-0"

              style={{ background: "linear-gradient(135deg,#6366f1,#4f46e5)", boxShadow: "0 0 10px rgba(99,102,241,0.35)" }}>

              + New

            </div>

          </div>



          {/* Welcome + activity arrow */}

          <div className="flex items-start justify-between shrink-0">

            <div>

              <div className="text-[11px] font-bold text-white">Welcome back, Vignesh! 👋</div>

              <div className="text-[9px]" style={{ color: "rgba(255,255,255,0.3)" }}>

                Here&apos;s your QA automation progress for this project.

              </div>

            </div>

            <ChevronRight size={13} style={{ color: "rgba(255,255,255,0.2)", marginTop: "2px", flexShrink: 0 }} />

          </div>



          {/* Module preview — animated */}

          <div className="flex-1 overflow-hidden" key={active}

            style={{ animation: "qaFadeIn 220ms ease" }}>

            <ModulePreview module={active} />

          </div>

        </div>

      </div>

    </div>

  );

}



// ── Hero section ───────────────────────────────────────────────────────────*



export function HeroSection(): React.JSX.Element {

  const featureItems = [

    {

      text: "Built for QA Engineers",

      color: "#a855f7",

      glow: "rgba(168,85,247,0.28)",

      icon: (

        <svg

          width="22"

          height="22"

          viewBox="0 0 24 24"

          fill="none"

          aria-hidden="true"

        >

          <path

            d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"

            stroke="currentColor"

            strokeWidth="1.8"

            strokeLinecap="round"

          />

          <circle

            cx="9"

            cy="7"

            r="4"

            stroke="currentColor"

            strokeWidth="1.8"

          />

          <path

            d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"

            stroke="currentColor"

            strokeWidth="1.8"

            strokeLinecap="round"

          />

        </svg>

      ),

    },

    {

      text: "No credit card required",

      color: "#10b981",

      glow: "rgba(16,185,129,0.28)",

      icon: (

        <svg

          width="22"

          height="22"

          viewBox="0 0 24 24"

          fill="none"

          aria-hidden="true"

        >

          <path

            d="M12 3l7 3v5c0 4.8-2.9 8.8-7 10-4.1-1.2-7-5.2-7-10V6l7-3Z"

            stroke="currentColor"

            strokeWidth="1.8"

            strokeLinejoin="round"

          />

          <path

            d="m9 12 2 2 4-4"

            stroke="currentColor"

            strokeWidth="1.8"

            strokeLinecap="round"

            strokeLinejoin="round"

          />

        </svg>

      ),

    },

    {

      text: "Get started in minutes",

      color: "#fbbf24",

      glow: "rgba(251,191,36,0.28)",

      icon: (

        <svg

          width="22"

          height="22"

          viewBox="0 0 24 24"

          fill="none"

          aria-hidden="true"

        >

          <path

            d="m13 2-9 12h7l-1 8 9-12h-7l1-8Z"

            stroke="currentColor"

            strokeWidth="1.8"

            strokeLinejoin="round"

          />

        </svg>

      ),

    },

    {

      text: "Don't waste time for manual",

      color: "#ec4899",

      glow: "rgba(236,72,153,0.28)",

      icon: (

        <svg

          width="22"

          height="22"

          viewBox="0 0 24 24"

          fill="none"

          aria-hidden="true"

        >

          <circle

            cx="12"

            cy="12"

            r="9"

            stroke="currentColor"

            strokeWidth="1.8"

          />

          <path

            d="M12 7v5l3 2"

            stroke="currentColor"

            strokeWidth="1.8"

            strokeLinecap="round"

          />

        </svg>

      ),

    },

    {

      text: "Built by QA Engineer",

      color: "#06b6d4",

      glow: "rgba(6,182,212,0.28)",

      icon: (

        <svg

          width="22"

          height="22"

          viewBox="0 0 24 24"

          fill="none"

          aria-hidden="true"

        >

          <path

            d="m12 3 2.78 5.63L21 9.54l-4.5 4.38 1.06 6.18L12 17.19l-5.56 2.91 1.06-6.18L3 9.54l6.22-.91L12 3Z"

            stroke="currentColor"

            strokeWidth="1.8"

            strokeLinejoin="round"

          />

        </svg>

      ),

    },

  ];



  return (

    <>

      {/* Inline keyframe for panel fade */}

      <style>{`

        @media (prefers-reduced-motion: no-preference) {

          @keyframes qaFadeIn {

            from {

              opacity: 0.6;

              transform: translateY(4px);

            }

            to {

              opacity: 1;

              transform: translateY(0);

            }

          }

        }

      `}</style>



      <section

        className="relative overflow-hidden"

        style={{

          background: "#030712",

          minHeight: "720px",

        }}

        aria-labelledby="hero-heading"

      >

        {/* ── Animated Background ── */}
        <div
          className="absolute inset-0 overflow-hidden pointer-events-none"
          aria-hidden="true"
        >
          {/* Optional image layer: requires public/images/qaforge-hero-bg.png */}
          <div className="hero-background">
            <div className="hero-background__image" />
            <div className="hero-background__overlay" />
          </div>


          {/* Purple ambient glow */}
          <div
            className="absolute rounded-full"
            style={{
              top: "-15%",
              left: "-10%",
              width: "700px",
              height: "700px",
              background:
                "radial-gradient(circle,rgba(99,102,241,0.22) 0%,transparent 65%)",
              filter: "blur(40px)",
              animation: "qaforge-glow-float 14s ease-in-out infinite alternate",
            }}
          />

          {/* Blue ambient glow */}
          <div
            className="absolute rounded-full"
            style={{
              top: "-10%",
              right: "-5%",
              width: "500px",
              height: "500px",
              background:
                "radial-gradient(circle,rgba(59,130,246,0.17) 0%,transparent 65%)",
              filter: "blur(50px)",
              animation: "qaforge-glow-float 18s ease-in-out infinite alternate-reverse",
            }}
          />

          {/* Cyan accent glow */}
          <div
            className="absolute rounded-full"
            style={{
              top: "30%",
              right: "10%",
              width: "300px",
              height: "300px",
              background:
                "radial-gradient(circle,rgba(34,211,238,0.12) 0%,transparent 65%)",
              filter: "blur(40px)",
              animation: "qaforge-glow-float 12s ease-in-out infinite alternate",
            }}
          />

          {/* Bottom fade */}
          <div
            className="absolute bottom-0 left-0 right-0"
            style={{
              height: "200px",
              background: "linear-gradient(to top,#030712 0%,transparent 100%)",
            }}
          />
        </div>

        {/* ── Main Content ── */}

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 sm:py-14 lg:py-20">



          {/* ============================================================

              MAIN HERO GRID

              LEFT CONTENT + RIGHT DASHBOARD

          ============================================================ */}

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 xl:gap-16 items-center">



            {/* ── LEFT CONTENT ── */}

            <div className="flex flex-col gap-6 order-1">



              {/* Badge */}

              <div

                className="self-start inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-[10px] font-bold tracking-[0.18em] uppercase"

                style={{

                  color: "#a5b4fc",

                  background: "rgba(99,102,241,0.1)",

                  border: "1px solid rgba(99,102,241,0.28)",

                  boxShadow: "0 0 12px rgba(99,102,241,0.12)",

                }}

              >

                <span

                  className="w-1.5 h-1.5 rounded-full shrink-0"

                  style={{

                    background: "#818cf8",

                  }}

                />



                AI-Powered QA Engineering Platform



                <span

                  className="px-1.5 py-0.5 rounded-full text-[8px] font-bold"

                  style={{

                    background: "rgba(99,102,241,0.3)",

                    color: "#c7d2fe",

                    border: "1px solid rgba(99,102,241,0.35)",

                  }}

                >

                  Platform

                </span>

              </div>



              {/* Headline */}

              <h1

                id="hero-heading"

                className="font-bold tracking-tight leading-[1.08] text-white"

                style={{

                  fontSize: "clamp(2rem,3vw,3.5rem)",

                }}

              >

                Turn any web application

                <br />

                into{" "}

                <span

                  style={{

                    background:

                      "linear-gradient(135deg,#818cf8 0%,#a78bfa 40%,#60a5fa 100%)",

                    WebkitBackgroundClip: "text",

                    WebkitTextFillColor: "transparent",

                    backgroundClip: "text",

                  }}

                >

                  a production-ready

                  <br />

                  QA automation framework.

                </span>

              </h1>



              {/* Description */}

              <p

                className="text-base sm:text-lg leading-relaxed max-w-lg"

                style={{

                  color: "rgba(255,255,255,0.5)",

                }}

              >

                Generate test cases, bug reports, test data, API tests and

                Playwright automation — powered by AI.

              </p>



              {/* CTA Buttons */}

              <div className="flex flex-col sm:flex-row gap-3 pt-1">



                {/* Get Started */}
                <Link
                  href="/login"
                  className="relative inline-flex items-center justify-center gap-2 h-12 px-7 rounded-xl text-sm font-semibold text-white overflow-hidden transition-transform duration-150 hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 group"
                  style={{
                    background:
                      "linear-gradient(135deg,#6366f1 0%,#4f46e5 50%,#3b82f6 100%)",
                    boxShadow:
                      "0 0 28px rgba(99,102,241,0.45),0 4px 16px rgba(0,0,0,0.35)",
                  }}
                >
                  <span className="relative z-10 flex items-center gap-2">
                    Let&apos;s Started
                    <ChevronRight size={16} />
                  </span>
                  <span
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                    style={{
                      background:
                        "linear-gradient(135deg,#818cf8 0%,#6366f1 50%,#60a5fa 100%)",
                    }}
                    aria-hidden="true"
                  />
                </Link>
                {/* Watch Demo */}
                <button
                  type="button"
                  className="inline-flex items-center justify-center gap-2.5 h-12 px-7 rounded-xl text-sm font-medium transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 hover:scale-[1.01]"
                  style={{ background: "rgba(169, 169, 169)" }}
                >
                  {/* Play circle */}
                  <span
                    className="w-6 h-6 rounded-full flex items-center justify-center shrink-0"
                    style={{ background: "rgba(0,0,0)" }}
                  >
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
                      <path d="M3.5 2.5l4 2.5-4 2.5V2.5Z" fill="white" />
                    </svg>
                  </span>
                  <Link
                    href="/login"
                    className="relative inline-flex items-center justify-center gap-2 h-12 px-7 rounded-xl text-sm font-semibold text-black overflow-hidden transition-transform duration-150 hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 group"
                  >
                    Watch Demo
                  </Link>
                </button>

              </div>
            </div>
            {/* ============================================================
                RIGHT DASHBOARD
            ============================================================ */}
            <div className="relative order-2 flex items-center justify-center">
              {/* Dashboard glow */}
              <div
                className="absolute inset-0 -z-10 rounded-3xl"
                aria-hidden="true"
                style={{
                  background:
                    "radial-gradient(ellipse 75% 75% at 50% 45%,rgba(99,102,241,0.22) 0%,rgba(59,130,246,0.1) 50%,transparent 75%)",
                  filter: "blur(30px)",
                  transform: "scale(1.15)",
                }}
              />
              <div className="relative w-full max-w-2xl mx-auto px-2 sm:px-4 lg:px-2 xl:px-0 pt-6 pb-6 xl:pt-8 xl:pb-8 overflow-hidden">
                <DashboardMockup />
                {/* Test Cases */}
                <FloatingCard
                  icon={<TestTube2 size={15} />}
                  label="Test Cases"
                  value="248 generated"
                  accentColor="#22d3ee"
                  glowColor="#22d3ee"
                  style={{
                    top: "0px",
                    left: "-4px",
                    zIndex: 10,
                  }}
                />
                {/* Bug Reports */}
                <FloatingCard
                  icon={<Bug size={15} />}
                  label="Bug Reports"
                  value="36 found"
                  accentColor="#f87171"
                  glowColor="#ef4444"
                  style={{
                    top: "0px",
                    right: "-4px",
                    zIndex: 10,
                  }}
                />
                {/* Playwright */}
                <FloatingCard
                  icon={<FileCode2 size={15} />}
                  label="Playwright"
                  value="18 scripts"
                  accentColor="#818cf8"
                  glowColor="#6366f1"
                  style={{
                    bottom: "0px",
                    left: "-4px",
                    zIndex: 10,
                  }}
                />

                {/* API Tests */}
                <FloatingCard
                  icon={<Zap size={15} />}
                  label="API Tests"
                  value="124 passing"
                  accentColor="#4ade80"
                  glowColor="#22c55e"
                  style={{
                    bottom: "0px",
                    right: "-4px",
                    zIndex: 10,
                  }}
                />

                {/* AI Generating */}
                <FloatingCard
                  icon={<Cpu size={15} />}
                  label="AI Generating"
                  value="Test data…"
                  accentColor="#a78bfa"
                  glowColor="#7c3aed"
                  style={{
                    top: "50%",
                    right: "-4px",
                    transform: "translateY(-50%)",
                    zIndex: 10,
                  }}
                />
              </div>
            </div>
          </div>

          {/* ============================================================

              FEATURE STRIP

              IMPORTANT:

              This is OUTSIDE the main two-column grid.

          ============================================================ */}

          <div className="mt-8 w-full">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
              {featureItems.map((item) => (
                <div
                  key={item.text}
                  className="group relative flex min-h-17 items-center gap-3 rounded-full border px-4 py-2.5 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1"
                  style={{
                    borderColor: `${item.color}55`,
                    background:
                      "linear-gradient(135deg,rgba(15,23,42,0.82),rgba(8,15,35,0.68))",
                    boxShadow: `
                      0 0 22px ${item.glow},
                      inset 0 1px 0 rgba(255,255,255,0.08)
                    `,
                  }}
                >
                  {/* Icon glow */}
                  <span
                    className="absolute left-3 h-10 w-10 rounded-full opacity-30 blur-xl transition-opacity duration-300 group-hover:opacity-60"
                    style={{
                      backgroundColor: item.color,
                    }}
                  />

                  {/* Icon */}
                  <span
                    className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-full border"
                    style={{
                      color: item.color,
                      borderColor: `${item.color}88`,
                      backgroundColor: `${item.color}12`,
                      boxShadow: `0 0 18px ${item.glow}`,
                    }}
                  >
                    {item.icon}
                  </span>

                  {/* Text */}
                  <span className="text-[12px] font-medium leading-tight text-white/75 transition-colors duration-300 group-hover:text-white">
                    {item.text}
                  </span>

                  {/* Top shine */}
                  <span
                    className="pointer-events-none absolute inset-x-6 top-0 h-px opacity-40"
                    style={{
                      background: `linear-gradient(
                        90deg,
                        transparent,
                        ${item.color},
                        transparent
                      )`,
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section >
    </>
  );
}