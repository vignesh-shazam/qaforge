import Link from "next/link";

export function FinalCTA(): React.JSX.Element {
  return (
    <section
      className="relative py-20 sm:py-28 overflow-hidden"
      aria-labelledby="final-cta-heading"
      style={{ background: "#030712" }}
    >
      {/* Strong purple glow */}
      <div className="absolute inset-0 -z-10 overflow-hidden" aria-hidden="true">
        <div
          className="absolute inset-0"
          style={{
            background: "radial-gradient(ellipse 80% 60% at 50% 60%, rgba(99,102,241,0.25) 0%, rgba(139,92,246,0.15) 35%, transparent 70%)",
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: "linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)",
            backgroundSize: "50px 50px",
          }}
        />
      </div>

      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
        <div
          className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 mb-8 text-[10px] font-bold uppercase tracking-widest"
          style={{ background: "rgba(99,102,241,0.12)", border: "1px solid rgba(99,102,241,0.25)", color: "#818cf8" }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-brand-400 animate-pulse" aria-hidden="true"/>
          Ready to get started?
        </div>

        <h2 id="final-cta-heading" className="font-bold text-white tracking-tight leading-tight mb-6" style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)" }}>
          Ready to transform your QA process?
        </h2>

        <p className="text-sm sm:text-base leading-relaxed mb-10 max-w-lg mx-auto" style={{ color: "rgba(255,255,255,0.5)" }}>
          Build better tests, reduce repetitive work and move from requirements
          to automation faster.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/register"
            className="inline-flex items-center justify-center gap-2 h-12 px-8 rounded-lg text-sm font-semibold text-white transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 w-full sm:w-auto"
            style={{
              background: "linear-gradient(135deg, #6366f1 0%, #7c3aed 100%)",
              boxShadow: "0 0 30px rgba(99,102,241,0.3), 0 4px 12px rgba(0,0,0,0.3)",
            }}
          >
            Get Started Free
          </Link>
          <button
            type="button"
            className="inline-flex items-center justify-center gap-2 h-12 px-8 rounded-lg text-sm font-medium transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 w-full sm:w-auto"
            style={{
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.12)",
              color: "rgba(255,255,255,0.7)",
            }}
          >
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden="true">
              <circle cx="7.5" cy="7.5" r="6.5" stroke="currentColor" strokeWidth="1.1"/>
              <path d="M6 5l4 2.5L6 10V5Z" fill="currentColor"/>
            </svg>
            Watch Demo
          </button>
        </div>

        {/* Already users copy */}
        <p className="mt-10 text-xs" style={{ color: "rgba(255,255,255,0.2)" }}>
          Join QA engineers who are already saving time and building better automation with QAForge
        </p>
      </div>
    </section>
  );
}
