"use client";

import Link from "next/link";
import Image from "next/image";

interface AuthLayoutProps {
  children: React.ReactNode;
}

// Decorative test node visualization
function QAVisualization(): React.JSX.Element {
  const nodes = [
    { x: 15, y: 20, r: 5, color: "#8B5CF6", label: "Unit Tests" },
    { x: 50, y: 12, r: 4, color: "#6366F1", label: "Integration" },
    { x: 82, y: 25, r: 5, color: "#22D3EE", label: "E2E Tests" },
    { x: 25, y: 55, r: 4, color: "#22D3EE", label: "API Tests" },
    { x: 65, y: 48, r: 6, color: "#8B5CF6", label: "AI Gen" },
    { x: 85, y: 65, r: 4, color: "#6366F1", label: "Reports" },
    { x: 40, y: 80, r: 5, color: "#22D3EE", label: "Automation" },
    { x: 10, y: 75, r: 3, color: "#8B5CF6", label: "Coverage" },
    { x: 70, y: 82, r: 4, color: "#6366F1", label: "Quality" },
  ];

  const connections = [
    [0, 1], [1, 2], [0, 3], [3, 4], [1, 4],
    [4, 5], [4, 6], [3, 7], [6, 8], [2, 5],
  ] as [number, number][];

  return (
    <div className="relative w-full" style={{ height: "260px" }} aria-hidden="true">
      <svg viewBox="0 0 100 100" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
        {/* Connection lines */}
        {connections.map(([a, b], i) => {
          const na = nodes[a]!; const nb = nodes[b]!;
          return (
            <line key={i} x1={na.x} y1={na.y} x2={nb.x} y2={nb.y}
              stroke="rgba(139,92,246,0.2)" strokeWidth="0.5" strokeDasharray="2 2" />
          );
        })}
        {/* Nodes */}
        {nodes.map((node, i) => (
          <g key={i}>
            <circle cx={node.x} cy={node.y} r={node.r + 2} fill={`${node.color}18`} />
            <circle cx={node.x} cy={node.y} r={node.r} fill={`${node.color}30`} stroke={node.color} strokeWidth="0.8" />
            <circle cx={node.x} cy={node.y} r={node.r * 0.5} fill={node.color} opacity="0.8" />
          </g>
        ))}
        {/* Labels */}
        {nodes.slice(0, 5).map((node, i) => (
          <text key={i} x={node.x + node.r + 1.5} y={node.y + 1}
            fontSize="3.5" fill="rgba(255,255,255,0.45)" fontFamily="system-ui">
            {node.label}
          </text>
        ))}
      </svg>
    </div>
  );
}

export function AuthLayout({ children }: AuthLayoutProps): React.JSX.Element {
  return (
    <div
      className="min-h-screen flex flex-col lg:flex-row"
      style={{ background: "#080B16" }}
    >
      {/* ── Left panel: brand experience ── */}
      <div
        className="hidden lg:flex lg:flex-col lg:w-[58%] xl:w-[60%] relative overflow-hidden"
        style={{
          background: "linear-gradient(135deg, #0D1129 0%, #080B16 50%, #0A0D1F 100%)",
        }}
      >
        {/* Background grid */}
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true"
          style={{
            backgroundImage: "linear-gradient(rgba(139,92,246,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(139,92,246,0.04) 1px,transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />

        {/* Ambient glows */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
          <div className="absolute rounded-full" style={{ top: "-15%", left: "10%", width: "500px", height: "500px", background: "radial-gradient(circle, rgba(139,92,246,0.12) 0%, transparent 65%)", filter: "blur(60px)" }} />
          <div className="absolute rounded-full" style={{ bottom: "-10%", right: "5%", width: "400px", height: "400px", background: "radial-gradient(circle, rgba(34,211,238,0.08) 0%, transparent 65%)", filter: "blur(60px)" }} />
          <div className="absolute rounded-full" style={{ top: "40%", left: "40%", width: "300px", height: "300px", background: "radial-gradient(circle, rgba(99,102,241,0.1) 0%, transparent 65%)", filter: "blur(40px)" }} />
        </div>

        {/* Content */}
        <div className="relative flex flex-col h-full px-12 xl:px-16 py-10">
          {/* Logo */}
          <div className="shrink-0">
            <Image src="/branding/qaforge-logo-dark.svg" width={140} height={32} alt="QAForge" priority />
          </div>

          {/* Main content */}
          <div className="flex-1 flex flex-col justify-center gap-8 py-8">
            <div className="flex flex-col gap-4">
              <div
                className="self-start inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-[10px] font-bold tracking-[0.18em] uppercase"
                style={{ color: "#a5b4fc", background: "rgba(99,102,241,0.1)", border: "1px solid rgba(99,102,241,0.28)" }}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" aria-hidden="true" />
                AI-Powered QA Platform
              </div>

              <h1 className="font-bold tracking-tight leading-[1.1] text-white" style={{ fontSize: "clamp(2.2rem,3.2vw,3.2rem)" }}>
                Ship Quality.
                <br />
                <span style={{
                  background: "linear-gradient(135deg,#8B5CF6 0%,#6366F1 40%,#22D3EE 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}>
                  Faster.
                </span>
              </h1>

              <p className="text-base leading-relaxed max-w-md" style={{ color: "#94A3B8" }}>
                Your AI-powered workspace for smarter, faster, more reliable software testing.
              </p>
            </div>

            {/* Visualization */}
            <div
              className="rounded-2xl p-6 max-w-md"
              style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(139,92,246,0.15)" }}
            >
              <QAVisualization />
              <div className="flex items-center justify-between mt-2 flex-wrap gap-2">
                {["AI Test Generation", "Automation", "Quality Insights"].map(label => (
                  <span key={label}
                    className="text-[10px] font-medium px-2.5 py-1 rounded-full"
                    style={{ color: "rgba(255,255,255,0.5)", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}
                  >
                    {label}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Footer */}
          <footer className="shrink-0 pb-2">
            <p className="text-xs" style={{ color: "rgba(255,255,255,0.25)" }}>
              &copy; {new Date().getFullYear()} QAForge. Built for QA engineers who ship quality software.
            </p>
          </footer>
        </div>
      </div>

      {/* ── Right panel: auth card ── */}
      <div
        className="flex-1 flex flex-col items-center justify-center px-4 py-10 min-h-screen lg:min-h-0 relative"
        style={{ background: "#080B16" }}
      >
        {/* Mobile logo */}
        <div className="lg:hidden mb-8">
          <Image src="/branding/qaforge-logo-dark.svg" width={120} height={28} alt="QAForge" priority />
        </div>

        {/* Card */}
        <div
          className="w-full max-w-100"
          style={{
            animation: "authCardIn 0.35s ease-out",
          }}
        >
          <style>{`
            @keyframes authCardIn {
              from { opacity: 0; transform: translateY(12px); }
              to   { opacity: 1; transform: translateY(0); }
            }
            @media (prefers-reduced-motion: reduce) {
              div[style*="authCardIn"] { animation: none !important; }
            }
          `}</style>
          {children}
        </div>

        {/* Footer links */}
        <div className="mt-8 flex items-center gap-4 text-xs" style={{ color: "rgba(255,255,255,0.25)" }}>
          <Link href="/privacy" className="hover:opacity-70 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 rounded">Privacy</Link>
          <span aria-hidden="true">·</span>
          <Link href="/terms" className="hover:opacity-70 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 rounded">Terms</Link>
          <span aria-hidden="true">·</span>
          <Link href="/" className="hover:opacity-70 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 rounded">Back to site</Link>
        </div>
      </div>
    </div>
  );
}