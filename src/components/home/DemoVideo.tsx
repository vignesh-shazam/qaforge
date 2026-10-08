import Image from "next/image";
import { Play, Clock } from "lucide-react";

export function DemoVideo(): React.JSX.Element {
  return (
    <section aria-labelledby="demo-heading" className="py-2">
      <div className="text-center mb-8">
        <h2 id="demo-heading" className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
          See QAForge in Action
        </h2>
        <p className="mt-2 text-sm" style={{ color: "rgba(255,255,255,0.5)" }}>
          From application URL to production-ready QA.
        </p>
        <p className="mt-3 text-sm max-w-2xl mx-auto leading-relaxed" style={{ color: "rgba(255,255,255,0.4)" }}>
          Watch how QAForge analyzes your application, discovers workflows, generates test cases, finds bugs,
          creates test data, and builds automation — all in one seamless workflow.
        </p>
      </div>

      {/* Video placeholder */}
      <div
        className="relative rounded-2xl overflow-hidden mx-auto max-w-4xl"
        style={{
          background: "rgba(8,9,22,0.97)",
          border: "1px solid rgba(99,102,241,0.2)",
          boxShadow: "0 0 60px rgba(99,102,241,0.12)",
          aspectRatio: "16/9",
        }}
      >
        {/* Browser chrome */}
        <div
          className="flex items-center gap-2 px-4 py-2.5 shrink-0"
          style={{ background: "rgba(4,5,14,0.95)", borderBottom: "1px solid rgba(255,255,255,0.05)" }}
        >
          <div className="flex gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full" style={{ background: "#ef4444" }} aria-hidden="true" />
            <span className="w-2.5 h-2.5 rounded-full" style={{ background: "#f59e0b" }} aria-hidden="true" />
            <span className="w-2.5 h-2.5 rounded-full" style={{ background: "#22c55e" }} aria-hidden="true" />
          </div>
          <div
            className="flex-1 h-5 rounded-md mx-4 max-w-xs flex items-center px-2"
            style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }}
          >
            <span className="text-[9px] font-mono" style={{ color: "rgba(255,255,255,0.2)" }}>qaforgeapp.vercel.app</span>
          </div>
          <div className="flex items-center gap-1.5 ml-auto">
            <Clock size={11} style={{ color: "rgba(255,255,255,0.25)" }} aria-hidden="true" />
            <span className="text-[10px]" style={{ color: "rgba(255,255,255,0.25)" }}>2 min</span>
          </div>
        </div>

        {/* Video content area */}
        <div className="absolute inset-0 top-[34px] flex flex-col items-center justify-center gap-5">
          {/* Grid bg */}
          <div
            className="absolute inset-0 pointer-events-none"
            aria-hidden="true"
            style={{
              backgroundImage: "linear-gradient(rgba(99,102,241,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(99,102,241,0.04) 1px,transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          />

          {/* Center glow */}
          <div
            className="absolute rounded-full pointer-events-none"
            aria-hidden="true"
            style={{
              width: "300px", height: "300px",
              background: "radial-gradient(circle,rgba(99,102,241,0.18) 0%,transparent 70%)",
              filter: "blur(40px)",
            }}
          />

          {/* Logo */}
          <div className="relative z-10 flex flex-col items-center gap-3">
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center"
              style={{ background: "rgba(99,102,241,0.15)", border: "1px solid rgba(99,102,241,0.3)" }}
            >
              <Image src="/branding/qaforge-icon.svg" width={36} height={36} alt="QAForge" />
            </div>
            <div className="text-center">
              <p className="text-base font-bold text-white">QAForge Product Demo</p>
              <p className="text-sm mt-1" style={{ color: "rgba(255,255,255,0.4)" }}>Watch how it works</p>
            </div>
          </div>

          {/* Play button */}
          <button
            type="button"
            disabled
            aria-label="Play demo video — coming soon"
            title="Demo recording coming soon"
            className="relative z-10 w-16 h-16 rounded-full flex items-center justify-center disabled:opacity-60 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 transition-transform hover:scale-105"
            style={{
              background: "linear-gradient(135deg,#6366f1,#4f46e5)",
              boxShadow: "0 0 30px rgba(99,102,241,0.5)",
            }}
          >
            <Play size={22} style={{ color: "white", marginLeft: "3px" }} aria-hidden="true" />
          </button>

          <p className="relative z-10 text-xs" style={{ color: "rgba(255,255,255,0.25)" }}>
            Demo recording in progress — coming soon
          </p>
        </div>
      </div>

      {/* Play button below */}
      <div className="flex justify-center mt-6">
        <button
          type="button"
          disabled
          className="inline-flex items-center gap-2 h-11 px-6 rounded-xl text-sm font-semibold text-white disabled:opacity-50 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
          style={{ background: "rgba(99,102,241,0.15)", border: "1px solid rgba(99,102,241,0.25)" }}
          title="Demo recording coming soon"
        >
          <Play size={15} aria-hidden="true" />
          Play Demo Video
        </button>
      </div>
    </section>
  );
}
