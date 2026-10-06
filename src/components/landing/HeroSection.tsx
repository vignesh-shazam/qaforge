"use client";

import Image from "next/image";
import Link from "next/link";
import {
  LayoutDashboard,
  FolderKanban,
  TestTube2,
  Bug,
  Database,
  Zap,
  Bot,
  Search,
  Bell,
  Play,
  ChevronRight,
  FileCode2,
  Cpu,
} from "lucide-react";

// ─────────────────────────────────────────────────────────────────────────────
// Floating feature cards around the dashboard
// ─────────────────────────────────────────────────────────────────────────────

interface FloatingCardProps {
  icon: React.ReactNode;
  label: string;
  value?: string;
  accentColor: string;
  glowColor: string;
  className?: string;
  style?: React.CSSProperties;
}

function FloatingCard({
  icon,
  label,
  value,
  accentColor,
  glowColor,
  className = "",
  style,
}: FloatingCardProps): React.JSX.Element {
  return (
    <div
      className={`absolute flex items-center gap-2.5 px-3 py-2.5 rounded-xl ${className}`}
      style={{
        background: "rgba(8,10,20,0.92)",
        border: `1px solid ${accentColor}33`,
        boxShadow: `0 0 20px ${glowColor}22, 0 4px 16px rgba(0,0,0,0.4)`,
        backdropFilter: "blur(12px)",
        ...style,
      }}
      aria-hidden="true"
    >
      <div
        className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
        style={{ background: `${accentColor}18` }}
      >
        <span style={{ color: accentColor }}>{icon}</span>
      </div>
      <div>
        <div className="text-[11px] font-semibold text-white leading-none mb-0.5">
          {label}
        </div>
        {value && (
          <div className="text-[10px]" style={{ color: accentColor }}>
            {value}
          </div>
        )}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Metric card inside dashboard
// ─────────────────────────────────────────────────────────────────────────────

interface MetricCardProps {
  value: string;
  label: string;
  icon: React.ReactNode;
  accentColor: string;
  bgColor: string;
}

function MetricCard({
  value,
  label,
  icon,
  accentColor,
  bgColor,
}: MetricCardProps): React.JSX.Element {
  return (
    <div
      className="rounded-xl p-3 flex flex-col gap-2"
      style={{
        background: bgColor,
        border: `1px solid ${accentColor}22`,
      }}
    >
      <div
        className="w-7 h-7 rounded-lg flex items-center justify-center"
        style={{ background: `${accentColor}18` }}
      >
        <span style={{ color: accentColor, display: "flex" }}>{icon}</span>
      </div>
      <div>
        <div
          className="text-xl font-bold leading-none mb-0.5"
          style={{ color: accentColor }}
        >
          {value}
        </div>
        <div className="text-[10px]" style={{ color: "rgba(255,255,255,0.38)" }}>
          {label}
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Activity bar chart
// ─────────────────────────────────────────────────────────────────────────────

const barHeights = [25, 40, 32, 58, 44, 70, 52, 80, 62, 75, 55, 85, 65, 90, 72, 95];

function ActivityChart(): React.JSX.Element {
  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-center justify-between">
        <span className="text-[9px] font-semibold uppercase tracking-wider" style={{ color: "rgba(255,255,255,0.25)" }}>
          Testing Activity
        </span>
        <span className="text-[9px]" style={{ color: "#4ade80" }}>
          ↑ 24% this week
        </span>
      </div>
      <div className="flex items-end gap-[3px]" style={{ height: "32px" }}>
        {barHeights.map((h, i) => (
          <div
            key={i}
            className="flex-1 rounded-sm"
            style={{
              height: `${h}%`,
              background:
                i > barHeights.length - 5
                  ? "linear-gradient(180deg, #818cf8, #6366f1)"
                  : "rgba(99,102,241,0.25)",
            }}
          />
        ))}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Full dashboard mockup
// ─────────────────────────────────────────────────────────────────────────────

function DashboardMockup(): React.JSX.Element {
  const projects = [
    { name: "AIGAGA",               status: "Active",   dot: "#4ade80" },
    { name: "InviteDesign",         status: "Active",   dot: "#4ade80" },
    { name: "Driver Life Simulator",status: "Active",   dot: "#4ade80" },
  ];

  const sidebarItems = [
    { label: "Dashboard",   icon: <LayoutDashboard size={13} />,  active: true  },
    { label: "Projects",    icon: <FolderKanban    size={13} />,  active: false },
    { label: "Test Cases",  icon: <TestTube2       size={13} />,  active: false },
    { label: "Bug Reports", icon: <Bug             size={13} />,  active: false },
    { label: "Test Data",   icon: <Database        size={13} />,  active: false },
    { label: "API Tests",   icon: <Zap             size={13} />,  active: false },
    { label: "Automation",  icon: <Bot             size={13} />,  active: false },
  ];

  return (
    <div
      className="relative rounded-2xl overflow-hidden"
      style={{
        background: "rgba(8,9,20,0.96)",
        border: "1px solid rgba(99,102,241,0.18)",
        boxShadow:
          "0 0 60px rgba(99,102,241,0.18), 0 0 120px rgba(99,102,241,0.08), 0 24px 64px rgba(0,0,0,0.6)",
      }}
    >
      {/* ── Browser chrome ── */}
      <div
        className="flex items-center gap-3 px-4 py-2.5"
        style={{
          background: "rgba(4,5,14,0.98)",
          borderBottom: "1px solid rgba(255,255,255,0.05)",
        }}
      >
        {/* Traffic lights */}
        <div className="flex gap-1.5 shrink-0">
          <span className="w-2.5 h-2.5 rounded-full" style={{ background: "#ef4444" }} />
          <span className="w-2.5 h-2.5 rounded-full" style={{ background: "#f59e0b" }} />
          <span className="w-2.5 h-2.5 rounded-full" style={{ background: "#22c55e" }} />
        </div>
        {/* URL bar */}
        <div
          className="flex-1 flex items-center gap-2 h-6 rounded-md px-3 max-w-[210px]"
          style={{
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.07)",
          }}
        >
          <div className="w-2 h-2 rounded-full shrink-0" style={{ background: "#4ade80" }} />
          <span className="text-[9px] font-mono truncate" style={{ color: "rgba(255,255,255,0.3)" }}>
            app.qaforge.io
          </span>
        </div>
        {/* Right icons */}
        <div className="ml-auto flex items-center gap-2">
          <Bell size={11} style={{ color: "rgba(255,255,255,0.2)" }} />
          <div className="flex items-center gap-1.5">
            <div
              className="w-6 h-6 rounded-full flex items-center justify-center"
              style={{ background: "linear-gradient(135deg,#6366f1,#4f46e5)" }}
            >
              <span className="text-[8px] font-bold text-white">V</span>
            </div>
            <span className="text-[9px] hidden sm:block" style={{ color: "rgba(255,255,255,0.28)" }}>
              Vignesh
            </span>
          </div>
        </div>
      </div>

      {/* ── App shell ── */}
      <div className="flex" style={{ height: "330px" }}>
        {/* Sidebar */}
        <div
          className="flex flex-col w-28 shrink-0 py-3"
          style={{
            background: "rgba(4,5,16,0.9)",
            borderRight: "1px solid rgba(255,255,255,0.04)",
          }}
        >
          {/* Sidebar logo */}
          <div className="flex items-center gap-1.5 px-3 mb-4 shrink-0">
            <Image
              src="/branding/qaforge-icon.png"
              width={18}
              height={18}
              alt="QAForge"
              style={{ borderRadius: "4px" }}
            />
            <span className="text-[10px] font-bold text-white">QAForge</span>
          </div>

          {sidebarItems.map((item) => (
            <div
              key={item.label}
              className="flex items-center gap-2 mx-1.5 px-2.5 py-1.5 rounded-lg mb-0.5"
              style={{
                background: item.active ? "rgba(99,102,241,0.15)" : "transparent",
                borderLeft: item.active
                  ? "2px solid rgba(99,102,241,0.7)"
                  : "2px solid transparent",
              }}
            >
              <span
                style={{
                  color: item.active ? "#818cf8" : "rgba(255,255,255,0.28)",
                  display: "flex",
                }}
              >
                {item.icon}
              </span>
              <span
                className="text-[9.5px]"
                style={{
                  color: item.active ? "#a5b4fc" : "rgba(255,255,255,0.28)",
                  fontWeight: item.active ? 600 : 400,
                }}
              >
                {item.label}
              </span>
            </div>
          ))}
        </div>

        {/* Main content */}
        <div className="flex-1 flex flex-col p-4 gap-3 overflow-hidden min-w-0">
          {/* Top bar */}
          <div className="flex items-center gap-2 shrink-0">
            <div
              className="flex-1 flex items-center gap-2 h-7 rounded-lg px-3"
              style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.06)",
              }}
            >
              <Search size={10} style={{ color: "rgba(255,255,255,0.2)" }} />
              <span className="text-[10px]" style={{ color: "rgba(255,255,255,0.2)" }}>
                Search projects, tests…
              </span>
            </div>
            <div
              className="h-7 px-3 rounded-lg flex items-center gap-1.5 text-[10px] font-semibold text-white shrink-0 cursor-pointer"
              style={{
                background: "linear-gradient(135deg, #6366f1, #4f46e5)",
                boxShadow: "0 0 12px rgba(99,102,241,0.3)",
              }}
            >
              <span>+ New</span>
            </div>
          </div>

          {/* Welcome */}
          <div className="shrink-0">
            <div className="text-[11px] font-semibold text-white">
              Welcome back, Vignesh! 👋
            </div>
            <div className="text-[9px]" style={{ color: "rgba(255,255,255,0.3)" }}>
              Here&apos;s what&apos;s happening with your QA projects today.
            </div>
          </div>

          {/* Metric cards */}
          <div className="grid grid-cols-4 gap-2 shrink-0">
            <MetricCard
              value="12"
              label="Projects"
              icon={<FolderKanban size={13} />}
              accentColor="#818cf8"
              bgColor="rgba(99,102,241,0.07)"
            />
            <MetricCard
              value="246"
              label="Test Cases"
              icon={<TestTube2 size={13} />}
              accentColor="#22d3ee"
              bgColor="rgba(34,211,238,0.07)"
            />
            <MetricCard
              value="36"
              label="Bug Reports"
              icon={<Bug size={13} />}
              accentColor="#f87171"
              bgColor="rgba(239,68,68,0.07)"
            />
            <MetricCard
              value="18"
              label="API Tests"
              icon={<Zap size={13} />}
              accentColor="#4ade80"
              bgColor="rgba(74,222,128,0.07)"
            />
          </div>

          {/* Recent projects */}
          <div className="flex flex-col gap-1.5 shrink-0">
            <div className="flex items-center justify-between">
              <span
                className="text-[9px] font-semibold uppercase tracking-wider"
                style={{ color: "rgba(255,255,255,0.25)" }}
              >
                Recent Projects
              </span>
              <span
                className="text-[9px] flex items-center gap-0.5"
                style={{ color: "#818cf8" }}
              >
                View all <ChevronRight size={9} />
              </span>
            </div>
            {projects.map((p) => (
              <div
                key={p.name}
                className="flex items-center gap-2.5 rounded-lg px-3 py-1.5"
                style={{
                  background: "rgba(255,255,255,0.02)",
                  border: "1px solid rgba(255,255,255,0.04)",
                }}
              >
                <div
                  className="w-1.5 h-1.5 rounded-full shrink-0"
                  style={{ background: p.dot }}
                />
                <span
                  className="flex-1 text-[10px] truncate"
                  style={{ color: "rgba(255,255,255,0.6)" }}
                >
                  {p.name}
                </span>
                <span
                  className="text-[9px] px-2 py-0.5 rounded-full font-medium shrink-0"
                  style={{
                    color: "#4ade80",
                    background: "rgba(74,222,128,0.1)",
                    border: "1px solid rgba(74,222,128,0.18)",
                  }}
                >
                  {p.status}
                </span>
              </div>
            ))}
          </div>

          {/* Activity chart */}
          <div className="mt-auto">
            <ActivityChart />
          </div>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Hero Section
// ─────────────────────────────────────────────────────────────────────────────

export function HeroSection(): React.JSX.Element {
  return (
    <section
      className="relative overflow-hidden"
      style={{ background: "#030712", minHeight: "720px" }}
      aria-labelledby="hero-heading"
    >
      {/* ── Background effects ── */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        {/* Subtle grid */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(rgba(99,102,241,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,0.04) 1px, transparent 1px)",
            backgroundSize: "56px 56px",
          }}
        />
        {/* Primary violet glow — top-left */}
        <div
          className="absolute rounded-full"
          style={{
            top: "-15%",
            left: "-10%",
            width: "700px",
            height: "700px",
            background: "radial-gradient(circle, rgba(99,102,241,0.18) 0%, transparent 65%)",
            filter: "blur(40px)",
          }}
        />
        {/* Blue glow — top-right */}
        <div
          className="absolute rounded-full"
          style={{
            top: "-10%",
            right: "-5%",
            width: "500px",
            height: "500px",
            background: "radial-gradient(circle, rgba(59,130,246,0.12) 0%, transparent 65%)",
            filter: "blur(50px)",
          }}
        />
        {/* Cyan accent — mid-right */}
        <div
          className="absolute rounded-full"
          style={{
            top: "30%",
            right: "10%",
            width: "300px",
            height: "300px",
            background: "radial-gradient(circle, rgba(34,211,238,0.07) 0%, transparent 65%)",
            filter: "blur(40px)",
          }}
        />
        {/* Bottom fade */}
        <div
          className="absolute bottom-0 left-0 right-0"
          style={{
            height: "200px",
            background: "linear-gradient(to top, #030712 0%, transparent 100%)",
          }}
        />
      </div>

      {/* ── Content ── */}
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 xl:gap-16 items-center">

          {/* ─── LEFT — Hero copy ─── */}
          <div className="flex flex-col gap-6 order-1">

            {/* Badge */}
            <div className="self-start">
              <div
                className="inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-[10px] font-bold tracking-[0.18em] uppercase"
                style={{
                  color: "#a5b4fc",
                  background: "rgba(99,102,241,0.1)",
                  border: "1px solid rgba(99,102,241,0.28)",
                  boxShadow: "0 0 12px rgba(99,102,241,0.12)",
                }}
              >
                <span
                  className="w-1.5 h-1.5 rounded-full shrink-0"
                  style={{ background: "#818cf8" }}
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
            </div>

            {/* Headline */}
            <h1
              id="hero-heading"
              className="font-bold tracking-tight leading-[1.08] text-white"
              style={{ fontSize: "clamp(2.25rem, 4.5vw, 3.5rem)" }}
            >
              Turn any web application
              <br />
              into a{" "}
              <span
                style={{
                  background:
                    "linear-gradient(135deg, #818cf8 0%, #a78bfa 40%, #60a5fa 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                production-ready
                <br />
                QA automation framework.
              </span>
            </h1>

            {/* Description */}
            <p
              className="text-base sm:text-lg leading-relaxed max-w-lg"
              style={{ color: "rgba(255,255,255,0.5)" }}
            >
              Generate test cases, bug reports, test data, API tests and
              Playwright automation — powered by AI.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3 pt-1">
              {/* Primary */}
              <Link
                href="/register"
                className="relative inline-flex items-center justify-center gap-2 h-12 px-7 rounded-xl text-sm font-semibold text-white overflow-hidden transition-transform duration-150 hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent group"
                style={{
                  background:
                    "linear-gradient(135deg, #6366f1 0%, #4f46e5 50%, #3b82f6 100%)",
                  boxShadow:
                    "0 0 28px rgba(99,102,241,0.45), 0 4px 16px rgba(0,0,0,0.35)",
                }}
              >
                <span className="relative z-10 flex items-center gap-2">
                  Get Started Free
                  <ChevronRight size={16} />
                </span>
                <span
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                  style={{
                    background:
                      "linear-gradient(135deg, #818cf8 0%, #6366f1 50%, #60a5fa 100%)",
                  }}
                  aria-hidden="true"
                />
              </Link>

              {/* Secondary */}
              <button
                type="button"
                className="inline-flex items-center justify-center gap-2.5 h-12 px-7 rounded-xl text-sm font-medium transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent group hover:scale-[1.01]"
                style={{
                  color: "rgba(255,255,255,0.7)",
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.1)",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.border =
                    "1px solid rgba(99,102,241,0.4)";
                  (e.currentTarget as HTMLButtonElement).style.boxShadow =
                    "0 0 16px rgba(99,102,241,0.15)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.border =
                    "1px solid rgba(255,255,255,0.1)";
                  (e.currentTarget as HTMLButtonElement).style.boxShadow = "none";
                }}
              >
                <Play
                  size={14}
                  className="text-brand-400"
                  fill="currentColor"
                  aria-hidden="true"
                />
                Watch Demo
              </button>
            </div>

            {/* Trust micro-benefits */}
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 pt-1">
              {[
                "No credit card required",
                "Get started in minutes",
                "Built for QA Engineers",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-1.5 text-[11px]"
                  style={{ color: "rgba(255,255,255,0.38)" }}
                >
                  <svg
                    width="13"
                    height="13"
                    viewBox="0 0 13 13"
                    fill="none"
                    aria-hidden="true"
                  >
                    <circle cx="6.5" cy="6.5" r="5.8" stroke="#4ade80" strokeWidth="1"/>
                    <path
                      d="M4 6.5l2 2 3-3"
                      stroke="#4ade80"
                      strokeWidth="1.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  {item}
                </div>
              ))}
            </div>
          </div>

          {/* ─── RIGHT — Dashboard ─── */}
          <div className="relative order-2 flex items-center justify-center">
            {/* Outer ambient glow */}
            <div
              className="absolute inset-0 -z-10 rounded-3xl"
              aria-hidden="true"
              style={{
                background:
                  "radial-gradient(ellipse 75% 75% at 50% 45%, rgba(99,102,241,0.22) 0%, rgba(59,130,246,0.1) 50%, transparent 75%)",
                filter: "blur(30px)",
                transform: "scale(1.15)",
              }}
            />

            {/* Dashboard + floating cards wrapper */}
            <div className="relative w-full max-w-2xl mx-auto px-6 lg:px-2 xl:px-0 pt-8 pb-8">
              <DashboardMockup />

              {/* ── Floating cards — positioned relative to the wrapper ── */}

              {/* Test Cases — top-left */}
              <FloatingCard
                icon={<TestTube2 size={15} />}
                label="Test Cases"
                value="248 generated"
                accentColor="#22d3ee"
                glowColor="#22d3ee"
                style={{ top: "0px", left: "-4px", zIndex: 10 }}
              />

              {/* Bug Reports — top-right */}
              <FloatingCard
                icon={<Bug size={15} />}
                label="Bug Reports"
                value="36 found"
                accentColor="#f87171"
                glowColor="#ef4444"
                style={{ top: "0px", right: "-4px", zIndex: 10 }}
              />

              {/* Playwright — bottom-left */}
              <FloatingCard
                icon={<FileCode2 size={15} />}
                label="Playwright Automation"
                value="18 scripts"
                accentColor="#818cf8"
                glowColor="#6366f1"
                style={{ bottom: "0px", left: "-4px", zIndex: 10 }}
              />

              {/* API Tests — bottom-right */}
              <FloatingCard
                icon={<Zap size={15} />}
                label="API Tests"
                value="124 passing"
                accentColor="#4ade80"
                glowColor="#22c55e"
                style={{ bottom: "0px", right: "-4px", zIndex: 10 }}
              />

              {/* Test Data — right-center */}
              <FloatingCard
                icon={<Cpu size={15} />}
                label="AI Generating"
                value="Test data…"
                accentColor="#a78bfa"
                glowColor="#7c3aed"
                style={{ top: "50%", right: "-4px", transform: "translateY(-50%)", zIndex: 10 }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
