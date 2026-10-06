"use client";

// Testimonials — placeholder/demo content, clearly marked

const testimonials = [
  {
    rating: 5,
    quote: "QAForge has completely changed how we create and manage test cases for our application. It saves us hours every week.",
    name: "Sarah Chen",
    role: "QA Lead, TechCo",
    initials: "SC",
    accent: "#6366f1",
  },
  {
    rating: 5,
    quote: "The AI-generated test cases are incredibly accurate. Our team is 10x more productive now.",
    name: "Michael Rodriguez",
    role: "SDET Engineer, BuildCo",
    initials: "MR",
    accent: "#a78bfa",
  },
  {
    rating: 5,
    quote: "From test cases to Playwright automation in one platform. Exactly what we needed.",
    name: "Alex Thompson",
    role: "QA Engineer, CloudBiz",
    initials: "AT",
    accent: "#60a5fa",
  },
] as const;

function Stars({ count }: { count: number }): React.JSX.Element {
  return (
    <div className="flex gap-0.5" aria-label={`${count} out of 5 stars`}>
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden="true">
          <path d="M6.5 1l1.3 3.5H11.5L8.8 6.5l.9 3.5L6.5 8.3 3.3 10l.9-3.5L1.5 4.5h3.7L6.5 1Z" fill="#fbbf24"/>
        </svg>
      ))}
    </div>
  );
}

export function TestimonialsSection(): React.JSX.Element {
  return (
    <section
      className="py-20 sm:py-24"
      aria-labelledby="testimonials-heading"
      style={{ background: "#040810" }}
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 rounded-full px-3 py-1 mb-4"
            style={{ background: "rgba(99,102,241,0.12)", border: "1px solid rgba(99,102,241,0.25)" }}>
            <span className="text-[10px] font-bold uppercase tracking-widest" style={{ color: "#818cf8" }}>
              What QA Engineers Say
            </span>
          </div>
          <h2 id="testimonials-heading" className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Loved by QA teams worldwide.
          </h2>
          <p className="mt-2 text-[11px] italic" style={{ color: "rgba(255,255,255,0.2)" }}>
            Placeholder testimonials for illustration
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="flex flex-col gap-4 rounded-2xl p-6 transition-all duration-300"
              style={{
                background: "rgba(255,255,255,0.02)",
                border: "1px solid rgba(255,255,255,0.07)",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLDivElement;
                el.style.border = "1px solid rgba(99,102,241,0.55)";
                el.style.boxShadow = "0 0 0 1px rgba(99,102,241,0.18), 0 0 22px rgba(99,102,241,0.35), 0 0 48px rgba(99,102,241,0.14)";
                el.style.background = "rgba(99,102,241,0.04)";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLDivElement;
                el.style.border = "1px solid rgba(255,255,255,0.07)";
                el.style.boxShadow = "none";
                el.style.background = "rgba(255,255,255,0.02)";
              }}
            >
              <Stars count={t.rating} />

              <blockquote className="flex-1 text-sm leading-relaxed italic" style={{ color: "rgba(255,255,255,0.6)" }}>
                &ldquo;{t.quote}&rdquo;
              </blockquote>

              <div className="flex items-center gap-3 pt-4" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center shrink-0"
                  style={{ background: t.accent }}
                  aria-hidden="true"
                >
                  <span className="text-[10px] font-bold text-white">{t.initials}</span>
                </div>
                <div>
                  <p className="text-xs font-semibold text-white">{t.name}</p>
                  <p className="text-[10px]" style={{ color: "rgba(255,255,255,0.35)" }}>{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
