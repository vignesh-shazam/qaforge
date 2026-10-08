"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Zap } from "lucide-react";
import { UpgradeProModal } from "./UpgradeProModal";

export function FinalCTA(): React.JSX.Element {
  const [upgradeOpen, setUpgradeOpen] = useState(false);

  return (
    <>
      <section aria-labelledby="final-cta-heading" className="py-2">
        <div
          className="relative rounded-2xl overflow-hidden px-8 py-12 sm:px-14 text-center"
          style={{
            background: "linear-gradient(135deg,#1e1b4b 0%,#312e81 40%,#4c1d95 70%,#1e1b4b 100%)",
            border: "1px solid rgba(139,92,246,0.3)",
          }}
        >
          {/* Grid overlay */}
          <div
            className="absolute inset-0 pointer-events-none"
            aria-hidden="true"
            style={{
              backgroundImage: "linear-gradient(rgba(255,255,255,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.03) 1px,transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          />
          {/* Glow orb */}
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full pointer-events-none"
            aria-hidden="true"
            style={{ background: "radial-gradient(circle,rgba(139,92,246,0.3) 0%,transparent 70%)", filter: "blur(40px)" }}
          />

          <div className="relative">
            <div
              className="inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 mb-6 text-[10px] font-bold tracking-widest uppercase"
              style={{ background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)", color: "rgba(255,255,255,0.8)" }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" aria-hidden="true" />
              Get Started Today
            </div>

            <h2
              id="final-cta-heading"
              className="text-2xl sm:text-4xl font-bold text-white tracking-tight mb-4"
            >
              Ready to Transform<br className="hidden sm:block" /> Your QA Process?
            </h2>

            <p className="text-sm sm:text-base max-w-xl mx-auto leading-relaxed mb-8" style={{ color: "rgba(255,255,255,0.65)" }}>
              Start analyzing your application today and build better software with QAForge.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                href="/projects/new"
                className="inline-flex items-center gap-2 h-11 px-7 rounded-xl text-sm font-semibold text-white transition-all hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
                style={{ background: "linear-gradient(135deg,#6366f1,#4f46e5)", boxShadow: "0 0 24px rgba(99,102,241,0.5)" }}
              >
                Create Your First Project
                <ArrowRight size={15} aria-hidden="true" />
              </Link>

              <button
                type="button"
                onClick={() => setUpgradeOpen(true)}
                className="inline-flex items-center gap-2 h-11 px-7 rounded-xl text-sm font-semibold text-white transition-all hover:scale-[1.01] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
                style={{ background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.25)" }}
              >
                <Zap size={15} aria-hidden="true" />
                View Pro Plans
              </button>
            </div>
          </div>
        </div>
      </section>

      <UpgradeProModal open={upgradeOpen} onClose={() => setUpgradeOpen(false)} />
    </>
  );
}
