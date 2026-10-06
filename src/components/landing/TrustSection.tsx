// Trust section — shows technology brand names as logos
// These are technology names used illustratively, not endorsements

const logos = [
  { name: "Microsoft", width: 90 },
  { name: "Google", width: 66 },
  { name: "aws", width: 48 },
  { name: "Atlassian", width: 90 },
  { name: "Adobe", width: 64 },
  { name: "shopify", width: 82 },
  { name: "slack", width: 66 },
] as const;

function BrandLogo({ name }: { name: string }): React.JSX.Element {
  return (
    <div className="flex items-center justify-center px-2">
      <span
        className="font-semibold select-none"
        style={{
          fontSize: "clamp(13px, 1.4vw, 16px)",
          color: "rgba(255,255,255,0.28)",
          letterSpacing: name === "aws" ? "0.05em" : undefined,
          fontStyle: name === "aws" ? "italic" : undefined,
          fontWeight: ["Microsoft", "Atlassian", "shopify"].includes(name) ? 600 : 500,
          fontFamily: name === "Google" ? "sans-serif" : undefined,
        }}
      >
        {name === "aws" ? "aws" : name}
      </span>
    </div>
  );
}

export function TrustSection(): React.JSX.Element {
  return (
    <section
      className="py-10 sm:py-12"
      aria-labelledby="trust-heading"
      style={{ background: "#030712", borderTop: "1px solid rgba(255,255,255,0.05)", borderBottom: "1px solid rgba(255,255,255,0.05)" }}
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <p
          id="trust-heading"
          className="text-center text-[10px] font-semibold uppercase tracking-[0.2em] mb-7"
          style={{ color: "rgba(255,255,255,0.25)" }}
        >
          Trusted by QA &amp; Engineering Teams
        </p>

        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4 sm:gap-x-12">
          {logos.map((logo) => (
            <BrandLogo key={logo.name} name={logo.name} />
          ))}
        </div>
      </div>
    </section>
  );
}
