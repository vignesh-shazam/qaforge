import Link from "next/link";

const tiers = [
  {
    name: "Starter",
    subtitle: "Free forever",
    price: "$0",
    period: "",
    description: "For individual QA engineers",
    features: [
      "3 projects",
      "50 generations/month",
      "Test case generator",
      "Community support",
    ],
    cta: "Get Started Free",
    ctaHref: "/register",
    highlighted: false,
  },
  {
    name: "Pro",
    subtitle: "Most Popular",
    price: "$29",
    period: "/mo",
    description: "For professional QA engineers",
    features: [
      "Unlimited projects",
      "1,000+ generations/month",
      "All features",
      "Priority support",
    ],
    cta: "Start Pro Trial",
    ctaHref: "/register",
    highlighted: true,
  },
  {
    name: "Team",
    subtitle: "For teams",
    price: "$99",
    period: "/mo",
    description: "For QA teams & organisations",
    features: [
      "Everything in Pro",
      "Team collaboration",
      "Advanced analytics",
      "Dedicated support",
    ],
    cta: "Contact Sales",
    ctaHref: "/register",
    highlighted: false,
  },
] as const;

export function PricingPreview(): React.JSX.Element {
  return (
    <section
      id="pricing"
      className="py-20 sm:py-24"
      aria-labelledby="pricing-heading"
      style={{ background: "#030712" }}
    >
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div
            className="inline-flex items-center px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider mb-4"
            style={{ color: "#fbbf24", background: "rgba(245,158,11,0.1)", border: "1px solid rgba(245,158,11,0.2)" }}
          >
            Simple Transparent Pricing
          </div>
          <h2 id="pricing-heading" className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Choose the plan that fits your team.
          </h2>
          <p className="mt-2 text-xs" style={{ color: "rgba(255,255,255,0.3)" }}>
            Pricing preview — no payment functionality in V0.1.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-start">
          {tiers.map((tier) => (
            <div
              key={tier.name}
              className="relative flex flex-col rounded-2xl p-7"
              style={{
                background: tier.highlighted ? "rgba(99,102,241,0.08)" : "rgba(255,255,255,0.02)",
                border: tier.highlighted ? "1px solid rgba(99,102,241,0.4)" : "1px solid rgba(255,255,255,0.07)",
                transform: tier.highlighted ? "scale(1.02)" : "none",
              }}
            >
              {tier.highlighted && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                  <span
                    className="px-3 py-1 rounded-full text-[10px] font-bold text-white"
                    style={{ background: "#6366f1" }}
                  >
                    {tier.subtitle}
                  </span>
                </div>
              )}
              {!tier.highlighted && (
                <p className="text-[10px] font-semibold uppercase tracking-wider mb-1" style={{ color: "rgba(255,255,255,0.3)" }}>
                  {tier.subtitle}
                </p>
              )}

              <h3 className="text-base font-semibold text-white mb-1">{tier.name}</h3>
              <div className="flex items-end gap-1 mb-1">
                <span className="text-4xl font-bold text-white">{tier.price}</span>
                {tier.period && <span className="text-sm mb-1.5" style={{ color: "rgba(255,255,255,0.35)" }}>{tier.period}</span>}
              </div>
              <p className="text-xs mb-5" style={{ color: "rgba(255,255,255,0.4)" }}>{tier.description}</p>

              <ul className="flex flex-col gap-2.5 flex-1 mb-6" role="list">
                {tier.features.map((f) => (
                  <li key={f} className="flex items-center gap-2.5 text-sm" style={{ color: "rgba(255,255,255,0.55)" }}>
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="shrink-0" aria-hidden="true">
                      <circle cx="7" cy="7" r="6" fill={tier.highlighted ? "rgba(34,197,94,0.2)" : "rgba(255,255,255,0.05)"}/>
                      <path d="M4 7l2 2 4-4" stroke={tier.highlighted ? "#4ade80" : "rgba(255,255,255,0.2)"} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    {f}
                  </li>
                ))}
              </ul>

              <Link
                href={tier.ctaHref}
                className="inline-flex items-center justify-center h-10 px-5 rounded-lg text-sm font-semibold transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
                style={
                  tier.highlighted
                    ? { background: "#6366f1", color: "white" }
                    : { background: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.7)", border: "1px solid rgba(255,255,255,0.1)" }
                }
              >
                {tier.cta}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
