"use client";

import { useEffect, useRef, useState } from "react";
import { X, Zap, Check, Crown } from "lucide-react";

interface UpgradeProModalProps {
  open: boolean;
  onClose: () => void;
}

type BillingCycle = "monthly" | "yearly";

const FREE_FEATURES = [
  "3 Projects",
  "50 AI generations/month",
  "Test case generator",
  "Community support",
];

const PRO_FEATURES = [
  "Unlimited projects",
  "1,000+ AI generations/month",
  "All QA features",
  "Priority support",
  "Team collaboration",
  "Export & integrations",
];

export function UpgradeProModal({ open, onClose }: UpgradeProModalProps): React.JSX.Element | null {
  const [cycle, setCycle] = useState<BillingCycle>("monthly");
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent): void {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  useEffect(() => {
    if (open && panelRef.current) panelRef.current.focus();
  }, [open]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-label="Upgrade to Pro"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        aria-hidden="true"
        onClick={onClose}
      />

      {/* Panel */}
      <div
        ref={panelRef}
        tabIndex={-1}
        className="relative w-full max-w-2xl rounded-2xl outline-none"
        style={{
          background: "rgba(8,9,22,0.98)",
          border: "1px solid rgba(99,102,241,0.3)",
          boxShadow: "0 0 60px rgba(99,102,241,0.2), 0 32px 80px rgba(0,0,0,0.7)",
        }}
      >
        {/* Close */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close modal"
          className="absolute top-4 right-4 w-8 h-8 rounded-lg flex items-center justify-center transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
          style={{ color: "rgba(255,255,255,0.5)", background: "rgba(255,255,255,0.06)" }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.12)"; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.06)"; }}
        >
          <X size={16} aria-hidden="true" />
        </button>

        <div className="p-8">
          {/* Header */}
          <div className="flex flex-col items-center text-center mb-8">
            <div
              className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4"
              style={{ background: "linear-gradient(135deg,#6366f1,#4f46e5)", boxShadow: "0 0 24px rgba(99,102,241,0.4)" }}
            >
              <Crown size={24} style={{ color: "#c7d2fe" }} aria-hidden="true" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">Upgrade to Pro</h2>
            <p className="text-sm" style={{ color: "rgba(255,255,255,0.5)" }}>
              Unlock the full power of AI-driven QA engineering.
            </p>
          </div>

          {/* Billing toggle */}
          <div className="flex items-center justify-center gap-3 mb-8">
            <span className="text-sm" style={{ color: cycle === "monthly" ? "white" : "rgba(255,255,255,0.5)" }}>Monthly</span>
            <button
              type="button"
              onClick={() => setCycle(c => c === "monthly" ? "yearly" : "monthly")}
              aria-label={`Switch to ${cycle === "monthly" ? "yearly" : "monthly"} billing`}
              className="relative w-11 h-6 rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
              style={{ background: cycle === "yearly" ? "#6366f1" : "rgba(255,255,255,0.15)" }}
            >
              <span
                className="absolute top-1 w-4 h-4 rounded-full bg-white transition-transform duration-150"
                style={{ left: cycle === "yearly" ? "calc(100% - 20px)" : "4px" }}
                aria-hidden="true"
              />
            </button>
            <span className="text-sm" style={{ color: cycle === "yearly" ? "white" : "rgba(255,255,255,0.5)" }}>
              Yearly
              <span
                className="ml-1.5 text-[10px] px-1.5 py-0.5 rounded-full font-semibold"
                style={{ background: "rgba(74,222,128,0.15)", color: "#4ade80", border: "1px solid rgba(74,222,128,0.2)" }}
              >
                Save 20%
              </span>
            </span>
          </div>

          {/* Plan cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            {/* Free */}
            <div
              className="rounded-xl p-5"
              style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.08)" }}
            >
              <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: "rgba(255,255,255,0.4)" }}>Free</p>
              <div className="mb-5">
                <span className="text-3xl font-bold text-white">₹0</span>
                <span className="text-sm ml-1" style={{ color: "rgba(255,255,255,0.35)" }}>forever</span>
              </div>
              <ul className="flex flex-col gap-2">
                {FREE_FEATURES.map(f => (
                  <li key={f} className="flex items-center gap-2 text-xs" style={{ color: "rgba(255,255,255,0.55)" }}>
                    <Check size={12} style={{ color: "rgba(255,255,255,0.3)", flexShrink: 0 }} aria-hidden="true" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>

            {/* Pro */}
            <div
              className="rounded-xl p-5 relative overflow-hidden"
              style={{ background: "rgba(99,102,241,0.1)", border: "1px solid rgba(99,102,241,0.4)", boxShadow: "0 0 24px rgba(99,102,241,0.15)" }}
            >
              <div className="absolute inset-x-0 top-0 h-0.5" style={{ background: "linear-gradient(90deg,#6366f1,#818cf8,#60a5fa)" }} aria-hidden="true" />
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold text-white" style={{ background: "#6366f1" }}>Most Popular</span>
              </div>
              <p className="text-xs font-semibold uppercase tracking-widest mb-3 mt-2" style={{ color: "#a5b4fc" }}>Pro</p>
              <div className="mb-5">
                <span className="text-3xl font-bold text-white">
                  {cycle === "monthly" ? "₹999" : "₹9,999"}
                </span>
                <span className="text-sm ml-1" style={{ color: "rgba(255,255,255,0.35)" }}>
                  {cycle === "monthly" ? "/month" : "/year"}
                </span>
              </div>
              <ul className="flex flex-col gap-2">
                {PRO_FEATURES.map(f => (
                  <li key={f} className="flex items-center gap-2 text-xs" style={{ color: "rgba(255,255,255,0.75)" }}>
                    <Check size={12} style={{ color: "#4ade80", flexShrink: 0 }} aria-hidden="true" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* CTA */}
          <button
            type="button"
            disabled
            className="w-full h-11 rounded-xl text-sm font-semibold text-white disabled:opacity-60 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
            style={{ background: "linear-gradient(135deg,#6366f1,#4f46e5)", boxShadow: "0 0 20px rgba(99,102,241,0.4)" }}
            title="Billing coming in a future release"
          >
            <Zap size={15} className="inline mr-2" aria-hidden="true" />
            Upgrade Now — Coming Soon
          </button>
          <button
            type="button"
            onClick={onClose}
            className="w-full mt-2.5 h-8 text-xs rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
            style={{ color: "rgba(255,255,255,0.35)" }}
          >
            Maybe later
          </button>
        </div>
      </div>
    </div>
  );
}
