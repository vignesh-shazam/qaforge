"use client";

import { useEffect, useState } from "react";
import { X, Zap } from "lucide-react";

const SESSION_KEY = "qaforge_upgrade_dismissed";

/**
 * Upgrade to Pro popup.
 * Shown once per browser session for free-plan users.
 * Dismissed by X — stored in sessionStorage so it doesn't
 * reappear on page refresh within the same session.
 */
export function UpgradePopup(): React.JSX.Element | null {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const dismissed = sessionStorage.getItem(SESSION_KEY);
    if (!dismissed) {
      const timer = setTimeout(() => setVisible(true), 800);
      return () => clearTimeout(timer);
    }
  }, []);

  function dismiss(): void {
    sessionStorage.setItem(SESSION_KEY, "1");
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div
      className="fixed bottom-6 right-6 z-50 w-72 rounded-2xl shadow-2xl"
      role="dialog"
      aria-modal="false"
      aria-label="Upgrade to Pro"
      style={{
        background: "linear-gradient(135deg, rgba(30,27,75,0.98) 0%, rgba(49,46,129,0.98) 50%, rgba(76,29,149,0.98) 100%)",
        border: "1px solid rgba(139,92,246,0.4)",
        boxShadow: "0 0 40px rgba(99,102,241,0.25), 0 24px 48px rgba(0,0,0,0.5)",
        backdropFilter: "blur(20px)",
      }}
    >
      {/* X close button */}
      <button
        type="button"
        onClick={dismiss}
        aria-label="Dismiss upgrade popup"
        className="absolute top-3 right-3 w-6 h-6 rounded-full flex items-center justify-center transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
        style={{ background: "rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.6)" }}
        onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.2)"; }}
        onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.1)"; }}
      >
        <X size={12} aria-hidden="true" />
      </button>

      <div className="p-5">
        {/* Header */}
        <div className="flex items-center gap-2.5 mb-3">
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
            style={{ background: "rgba(139,92,246,0.3)", border: "1px solid rgba(139,92,246,0.4)" }}
          >
            <Zap size={18} style={{ color: "#c4b5fd" }} aria-hidden="true" />
          </div>
          <div>
            <p className="text-sm font-bold text-white">Upgrade to Pro</p>
            <p className="text-[10px]" style={{ color: "rgba(255,255,255,0.45)" }}>Free plan · Limited features</p>
          </div>
        </div>

        {/* Benefits */}
        <ul className="flex flex-col gap-1.5 mb-4 list-none">
          {[
            "Unlimited projects",
            "Advanced AI test generation",
            "Team collaboration",
            "Priority support",
          ].map((benefit) => (
            <li key={benefit} className="flex items-center gap-2 text-xs" style={{ color: "rgba(255,255,255,0.65)" }}>
              <span
                className="w-4 h-4 rounded-full flex items-center justify-center shrink-0"
                style={{ background: "rgba(139,92,246,0.25)" }}
                aria-hidden="true"
              >
                <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                  <path d="M1.5 4l2 2 3-3" stroke="#c4b5fd" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </span>
              {benefit}
            </li>
          ))}
        </ul>

        {/* CTA */}
        <button
          type="button"
          disabled
          className="w-full h-9 rounded-xl text-sm font-semibold text-white disabled:opacity-70 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
          style={{ background: "linear-gradient(135deg, #7c3aed, #6366f1)", boxShadow: "0 0 16px rgba(124,58,237,0.4)" }}
          title="Billing coming in a future release"
        >
          Upgrade Now — Coming Soon
        </button>

        <button
          type="button"
          onClick={dismiss}
          className="w-full mt-2 h-7 text-xs rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
          style={{ color: "rgba(255,255,255,0.35)" }}
        >
          Maybe later
        </button>
      </div>
    </div>
  );
}
