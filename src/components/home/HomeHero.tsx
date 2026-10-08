"use client";

import { useState } from "react";
import { ArrowRight, Globe, ChevronRight } from "lucide-react";
import Image from "next/image";

interface HomeHeroProps {
  firstName: string;
}

const workflowCards = [
  { label: "Analyze Application", desc: "Discover pages, elements and flows", color: "#818cf8", bg: "rgba(99,102,241,0.15)" },
  { label: "Generate Test Cases", desc: "AI-powered test scenarios", color: "#22d3ee", bg: "rgba(34,211,238,0.12)" },
  { label: "Find Bugs", desc: "Identify issues automatically", color: "#f87171", bg: "rgba(239,68,68,0.12)" },
  { label: "Create Test Data", desc: "Generate realistic test data", color: "#4ade80", bg: "rgba(74,222,128,0.12)" },
  { label: "Build Automation", desc: "Production-ready Playwright tests", color: "#fbbf24", bg: "rgba(251,191,36,0.12)" },
] as const;

export function HomeHero({ firstName }: HomeHeroProps): React.JSX.Element {
  const [url, setUrl] = useState("");

  return (
    <section aria-labelledby="home-hero-heading" className="relative">
      <style>{`
        @keyframes qaFloat {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        @media (prefers-reduced-motion: reduce) {
          .qa-float { animation: none !important; }
        }
      `}</style>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
        {/* Left */}
        <div className="flex flex-col gap-6">
          {/* Badge */}
          <div
            className="self-start inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-[10px] font-bold tracking-[0.18em] uppercase"
            style={{ color: "#a5b4fc", background: "rgba(99,102,241,0.1)", border: "1px solid rgba(99,102,241,0.28)" }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-brand-400 animate-pulse" aria-hidden="true" />
            AI-Powered QA Engineering Platform
          </div>

          {/* Heading */}
          <h1
            id="home-hero-heading"
            className="font-bold tracking-tight leading-[1.1] text-white"
            style={{ fontSize: "clamp(2rem,3.5vw,3.5rem)" }}
          >
            Build Better Software
            <br />
            <span
              style={{
                background: "linear-gradient(135deg,#818cf8 0%,#a78bfa 40%,#60a5fa 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              with AI-Powered QA
            </span>
          </h1>

          <p className="text-base sm:text-lg leading-relaxed max-w-lg" style={{ color: "rgba(255,255,255,0.5)" }}>
            Analyze your application, generate test cases, find bugs, create test data, and build automation — all in one place.
          </p>

          {/* URL input */}
          <div className="flex flex-col gap-3">
            <div
              className="flex items-center gap-2 rounded-xl overflow-hidden"
              style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(99,102,241,0.25)" }}
            >
              <Globe size={16} className="ml-3 shrink-0" style={{ color: "rgba(255,255,255,0.3)" }} aria-hidden="true" />
              <input
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="Enter your application URL (e.g. https://example.com)"
                className="flex-1 h-12 bg-transparent text-sm outline-none"
                style={{ color: "rgba(255,255,255,0.8)" }}
                aria-label="Application URL"
              />
              <button
                type="button"
                disabled
                className="flex items-center gap-1.5 h-8 px-4 rounded-lg text-sm font-semibold text-white mr-2 shrink-0 disabled:opacity-50 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
                style={{ background: "linear-gradient(135deg,#6366f1,#4f46e5)" }}
                title="URL analysis coming in a future release"
              >
                Analyze
                <ArrowRight size={14} aria-hidden="true" />
              </button>
            </div>

            <div className="flex items-center gap-4 text-xs" style={{ color: "rgba(255,255,255,0.35)" }}>
              <a href="#how-it-works" className="flex items-center gap-1 hover:opacity-70 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 rounded">How it works? <ChevronRight size={12} aria-hidden="true" /></a>
              <span aria-hidden="true">·</span>
              <button type="button" disabled className="flex items-center gap-1 hover:opacity-70 transition-opacity disabled:cursor-default">
                Supported applications <ChevronRight size={12} aria-hidden="true" />
              </button>
            </div>
          </div>

          {firstName && (
            <p className="text-sm" style={{ color: "rgba(255,255,255,0.35)" }}>
              Welcome back, <span style={{ color: "rgba(255,255,255,0.7)" }}>{firstName}</span> — We are ready to deliver a better quality builds!!!...
            </p>
          )}
        </div>

        {/* Right — robot visual + workflow cards */}
        <div className="relative flex items-center justify-center min-h-[420px]">
          {/* Ambient glow */}
          <div
            className="absolute inset-0 pointer-events-none"
            aria-hidden="true"
            style={{
              background: "radial-gradient(ellipse 80% 70% at 50% 50%, rgba(99,102,241,0.2) 0%, transparent 70%)",
              filter: "blur(30px)",
            }}
          />

          {/* QAForge icon — center */}
          <div
            className="qa-float relative z-10"
            style={{ animation: "qaFloat 4s ease-in-out infinite" }}
            aria-hidden="true"
          >
            <div
              className="w-28 h-28 rounded-3xl flex items-center justify-center"
              style={{
                background: "linear-gradient(135deg,rgba(99,102,241,0.3),rgba(79,70,229,0.2))",
                border: "1px solid rgba(99,102,241,0.4)",
                boxShadow: "0 0 50px rgba(99,102,241,0.35)",
              }}
            >
              <Image
                src="/branding/qaforge-icon.svg"
                width={64}
                height={64}
                alt="QAForge AI"
                priority
              />
            </div>
          </div>

          {/* Workflow cards orbiting */}
          {workflowCards.map((card, i) => {
            const positions: Array<{ style: React.CSSProperties; delay: string }> = [
              { style: { top: "0%", left: "5%" }, delay: "0s" },
              { style: { top: "10%", right: "0%" }, delay: "0.6s" },
              { style: { top: "42%", left: "0%" }, delay: "1.2s" },
              { style: { bottom: "10%", right: "2%" }, delay: "1.8s" },
              { style: { bottom: "0%", left: "8%" }, delay: "2.4s" },
            ];

            return (
              <div
                key={card.label}
                className="qa-float absolute flex items-start gap-2.5 rounded-xl px-3.5 py-2.5"
                style={{
                  ...positions[i]!.style,
                  background: "rgba(8,9,22,0.92)",
                  border: `1px solid ${card.color}30`,
                  backdropFilter: "blur(12px)",
                  boxShadow: `0 4px 20px rgba(0,0,0,0.4)`,
                  maxWidth: "195px",
                  zIndex: 20,
                  animation: `qaFloat ${3.5 + i * 0.4}s ease-in-out infinite`,
                  animationDelay: positions[i]!.delay,
                }}
                aria-hidden="true"
              >
                <div
                  className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0 mt-0.5"
                  style={{ background: card.bg }}
                >
                  <span className="text-[11px] font-bold" style={{ color: card.color }}>{i + 1}</span>
                </div>
                <div>
                  <p className="text-[11px] font-semibold text-white leading-tight">{card.label}</p>
                  <p className="text-[10px] mt-0.5" style={{ color: "rgba(255,255,255,0.4)" }}>{card.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
