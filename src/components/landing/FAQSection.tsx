"use client";

import { useState } from "react";

const faqs = [
  { question: "What is QAForge?", answer: "QAForge is an AI-powered QA engineering platform that helps QA engineers, SDETs and automation engineers generate test cases, bug reports, test data, API tests and Playwright automation from a single platform." },
  { question: "How does QAForge generate test cases?", answer: "QAForge uses AI to analyse your application URL, requirements documents, or user stories and generates comprehensive structured test cases covering functional, negative, UI/UX and accessibility scenarios." },
  { question: "Can I generate Playwright automation?", answer: "Yes — Playwright automation generation is a core QAForge feature. Provide your application URL and QAForge will discover pages, map interactions and generate production-ready Playwright tests following Page Object Model patterns." },
  { question: "Can I export generated test cases?", answer: "Yes. Generated test cases can be exported to multiple formats including CSV, Excel, and directly to test management tools. Jira and GitHub integrations are on the roadmap." },
  { question: "Does QAForge support API testing?", answer: "Yes. QAForge can generate API tests from OpenAPI/Swagger specifications, Postman collections or raw endpoints. REST, GraphQL and SOAP APIs are supported." },
  { question: "Is my application data secure?", answer: "Security is a core concern for QAForge. Your application data and generated content are never shared. All data is encrypted in transit and at rest." },
] as const;

function FAQItem({ question, answer }: { question: string; answer: string }): React.JSX.Element {
  const [open, setOpen] = useState(false);

  return (
    <div style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
      <button
        type="button"
        className="flex w-full items-center justify-between gap-4 py-4 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 rounded"
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
        style={{ maxHeight: open ? "120px" : "0px" }}
      >
        <p className="text-sm leading-relaxed pb-4 pr-8" style={{ color: "rgba(255,255,255,0.45)" }}>
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
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <p className="text-[10px] font-bold text-brand-400 uppercase tracking-[0.2em] mb-3">
            Frequently Asked Questions
          </p>
          <h2 id="faq-heading" className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            We&apos;ve got answers.
          </h2>
        </div>

        <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
          {faqs.map((faq) => (
            <FAQItem key={faq.question} {...faq} />
          ))}
        </div>
      </div>
    </section>
  );
}
