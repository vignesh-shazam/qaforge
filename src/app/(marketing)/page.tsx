import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "QAForge — Turn your web app into a production-ready automation framework",
  description:
    "QAForge discovers your web application, designs test suites, generates Playwright automation, and keeps it maintained — automatically.",
};

// ---------------------------------------------------------------------------
// Pipeline step data
// ---------------------------------------------------------------------------

const pipelineSteps = [
  { label: "URL", description: "Provide your app's URL" },
  { label: "Discover", description: "Crawl and map pages" },
  { label: "Design", description: "Structure test suites" },
  { label: "Generate", description: "Build Playwright tests" },
  { label: "Validate", description: "Score test quality" },
  { label: "Repair", description: "Self-heal broken tests" },
  { label: "Export", description: "Download your framework" },
  { label: "Execute", description: "Run in CI/CD" },
] as const;

const features = [
  {
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <circle cx="11" cy="11" r="8" />
        <path d="m21 21-4.3-4.3" />
      </svg>
    ),
    title: "Intelligent Discovery",
    description:
      "QAForge crawls your web application and automatically discovers pages, interactions, and user flows — no manual mapping required.",
  },
  {
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    ),
    title: "Production-Ready Code",
    description:
      "Generate clean, maintainable Playwright automation following Page Object Model patterns — ready to commit and run in CI/CD.",
  },
  {
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
        <path d="m9 12 2 2 4-4" />
      </svg>
    ),
    title: "Automated Quality Scoring",
    description:
      "Every generated test suite is scored against reliability, coverage, and best-practice metrics so you ship with confidence.",
  },
  {
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
      </svg>
    ),
    title: "Self-Healing Tests",
    description:
      "When your application changes, QAForge automatically detects broken selectors and repairs them — keeping your test suite green.",
  },
] as const;

// ---------------------------------------------------------------------------
// Page component
// ---------------------------------------------------------------------------

export default function LandingPage(): React.JSX.Element {
  return (
    <>
      {/* ------------------------------------------------------------------ */}
      {/* Hero                                                                 */}
      {/* ------------------------------------------------------------------ */}
      <section className="relative overflow-hidden px-4 pt-20 pb-24 sm:pt-28 sm:pb-32">
        {/* Background gradient */}
        <div
          className="absolute inset-0 -z-10"
          aria-hidden="true"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 50% -10%, rgba(99,102,241,0.15) 0%, transparent 70%)",
          }}
        />

        <div className="mx-auto max-w-4xl text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-brand-500/30 bg-brand-500/10 px-3 py-1 text-xs font-medium text-brand-400 mb-8">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-400" aria-hidden="true" />
            Now in early access — V0.1
          </div>

          <h1 className="text-4xl font-bold tracking-tight text-content-primary sm:text-5xl lg:text-6xl leading-tight">
            Turn your web app into a{" "}
            <span className="text-brand-400">production-ready</span>{" "}
            automation framework
          </h1>

          <p className="mt-6 text-lg text-content-secondary max-w-2xl mx-auto leading-relaxed">
            QAForge discovers your application, designs comprehensive test
            suites, generates clean Playwright code, and keeps it maintained —
            so your team can ship with confidence.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/register"
              className="inline-flex items-center justify-center h-11 px-8 rounded-md bg-brand-500 text-white text-base font-semibold hover:bg-brand-600 active:bg-brand-700 transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 focus-visible:ring-offset-surface-900"
            >
              Get started free
            </Link>
            <Link
              href="/login"
              className="inline-flex items-center justify-center h-11 px-8 rounded-md border border-surface-600 text-content-secondary text-base font-medium hover:bg-surface-700 hover:text-content-primary transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 focus-visible:ring-offset-surface-900"
            >
              Log in
            </Link>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* Pipeline visualization                                              */}
      {/* ------------------------------------------------------------------ */}
      <section className="px-4 py-16 border-y border-surface-700 bg-surface-800/50" aria-labelledby="pipeline-heading">
        <div className="mx-auto max-w-6xl">
          <h2
            id="pipeline-heading"
            className="text-center text-sm font-semibold text-content-tertiary uppercase tracking-widest mb-10"
          >
            The QAForge Pipeline
          </h2>

          <ol className="flex flex-wrap justify-center items-center gap-2" role="list">
            {pipelineSteps.map((step, index) => (
              <li key={step.label} className="flex items-center gap-2">
                <div className="flex flex-col items-center gap-1.5 group">
                  <div className="flex items-center justify-center w-24 h-10 rounded-lg border border-surface-600 bg-surface-800 text-sm font-medium text-content-secondary group-hover:border-brand-500/50 group-hover:text-brand-400 transition-colors duration-150">
                    {step.label}
                  </div>
                </div>
                {index < pipelineSteps.length - 1 && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-surface-600 shrink-0"
                    aria-hidden="true"
                  >
                    <path d="m9 18 6-6-6-6" />
                  </svg>
                )}
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* Features                                                             */}
      {/* ------------------------------------------------------------------ */}
      <section className="px-4 py-20 sm:py-24" aria-labelledby="features-heading">
        <div className="mx-auto max-w-6xl">
          <div className="text-center mb-14">
            <h2
              id="features-heading"
              className="text-3xl font-bold text-content-primary tracking-tight"
            >
              Built for QA engineers, by QA engineers
            </h2>
            <p className="mt-4 text-base text-content-secondary max-w-xl mx-auto">
              QAForge is purpose-built for automation engineers who need
              reliable, maintainable test frameworks — not boilerplate.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="rounded-xl border border-surface-700 bg-surface-800 p-6 hover:border-surface-600 transition-colors duration-150"
              >
                <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-brand-500/10 text-brand-400 mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-base font-semibold text-content-primary mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-content-secondary leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* CTA                                                                  */}
      {/* ------------------------------------------------------------------ */}
      <section className="px-4 py-20 border-t border-surface-700" aria-labelledby="cta-heading">
        <div className="mx-auto max-w-2xl text-center">
          <h2
            id="cta-heading"
            className="text-3xl font-bold text-content-primary tracking-tight"
          >
            Ready to automate your QA?
          </h2>
          <p className="mt-4 text-base text-content-secondary">
            Create your free account and start building your automation
            framework today.
          </p>
          <div className="mt-8">
            <Link
              href="/register"
              className="inline-flex items-center justify-center h-11 px-8 rounded-md bg-brand-500 text-white text-base font-semibold hover:bg-brand-600 active:bg-brand-700 transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 focus-visible:ring-offset-surface-900"
            >
              Create free account
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
