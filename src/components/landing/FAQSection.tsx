"use client";

import Link from "next/link";
import { useState } from "react";

const faqs = [
  { question: "What is QAForge?", answer: "QAForge is an AI-powered QA engineering platform that helps QA engineers, SDETs and automation engineers generate test cases, bug reports, test data, API tests and Playwright automation from a single platform." },
  { question: "Do I need a credit card to start?", answer: "No. QAForge offers a free Starter plan with no credit card required. You can upgrade to a paid plan at any time from your account settings." },
  { question: "What types of applications does it support?", answer: "QAForge supports web applications, REST and GraphQL APIs, mobile web apps, and any application accessible via URL. Native mobile app support is on the roadmap." },
  { question: "Can I export the generated test cases?", answer: "Yes. Generated test cases can be exported to CSV, Excel and directly to test management tools. Jira and GitHub integrations are on the roadmap." },
  { question: "Does it integrate with Jira?", answer: "Jira integration is planned for a future release. You can currently export test cases and bug reports and import them into Jira manually." },
  { question: "Is my data secure?", answer: "Security is a core concern for QAForge. Your application data and generated content are never shared. All data is encrypted in transit and at rest." },
] as const;

function FAQItem({ question, answer }: { question: string; answer: string }): React.JSX.Element {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="rounded-xl transition-all duration-200"
      style={{
        background: "rgba(255,255,255,0.02)",
        border: "1px solid rgba(255,255,255,0.07)",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLDivElement).style.border = "1px solid rgba(99,102,241,0.3)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLDivElement).style.border = "1px solid rgba(255,255,255,0.07)";
      }}
    >
      <button
        type="button"
        className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 rounded-xl"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        <span className="text-sm font-medium text-white">{question}</span>
        <span
          className="shrink-0 w-6 h-6 rounded-full flex items-center justify-center transition-all duration-200"
          style={{
            background: open ? "rgba(99,102,241,0.2)" : "rgba(255,255,255,0.05)",
            border: open ? "1px solid rgba(99,102,241,0.4)" : "1px solid rgba(255,255,255,0.1)",
            transform: open ? "rotate(180deg)" : "rotate(0deg)",
          }}
          aria-hidden="true"
        >
          <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
            <path d="M2.5 4l3 3 3-3" stroke={open ? "#818cf8" : "rgba(255,255,255,0.4)"} strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </span>
      </button>

      <div
        className="overflow-hidden transition-all duration-300"
        style={{ maxHeight: open ? "300px" : "0px", opacity: open ? 1 : 0 }}
      >
        <p className="text-sm leading-relaxed px-5 pb-5 pr-12" style={{ color: "rgba(255,255,255,0.45)" }}>
          {answer}
        </p>
      </div>
    </div>
  );
}

export function FAQSection(): React.JSX.Element {
  return (
    <section
      className="py-20 sm:py-24"
      aria-labelledby="faq-heading"
      style={{ background: "#040810" }}
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Header row */}
        <div className="flex items-start justify-between gap-6 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full px-3 py-1 mb-4"
              style={{ background: "rgba(99,102,241,0.12)", border: "1px solid rgba(99,102,241,0.25)" }}>
              <span className="text-[10px] font-bold uppercase tracking-widest" style={{ color: "#818cf8" }}>
                Frequently Asked Questions
              </span>
            </div>
            <h2 id="faq-heading" className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
              Got questions? We&apos;ve got answers.
            </h2>
          </div>
          <Link
            href="#"
            className="hidden sm:inline-flex items-center gap-1.5 text-sm font-medium shrink-0 mt-1 transition-colors hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 rounded"
            style={{ color: "#818cf8" }}
          >
            View all FAQs
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
        </div>

        {/* 2-column grid — items-start prevents height equalization */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 items-start">
          {faqs.map((faq) => (
            <FAQItem key={faq.question} {...faq} />
          ))}
        </div>
      </div>
    </section>
  );
}
