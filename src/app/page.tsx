
import type { Metadata } from "next";

import { HeroSection } from "@/components/landing/HeroSection";
import { TrustSection } from "@/components/landing/TrustSection";
import { ProblemSolution } from "@/components/landing/ProblemSolution";
import { FeaturesSection } from "@/components/landing/FeaturesSection";
import { WorkflowSection } from "@/components/landing/WorkflowSection";
import { ProductShowcase } from "@/components/landing/ProductShowcase";
import { UseCasesSection } from "@/components/landing/UseCasesSection";
import { TestimonialsSection } from "@/components/landing/TestimonialsSection";
import { PricingPreview } from "@/components/landing/PricingPreview";
import { FAQSection } from "@/components/landing/FAQSection";
import { FinalCTA } from "@/components/landing/FinalCTA";

export const metadata: Metadata = {
  title: "QAForge — AI-Powered QA Automation Platform",
  description:
    "Build better software with QAForge. Analyze applications, generate test cases, find bugs, create test data, and build test automation with AI.",
  openGraph: {
    title: "QAForge — AI-Powered QA Automation Platform",
    description:
      "Build better software with AI-powered quality assurance.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "QAForge — AI-Powered QA Automation Platform",
    description:
      "Build better software with AI-powered quality assurance.",
  },
};

export default function LandingPage(): React.JSX.Element {
  return (
    <div className="marketing-background">
      {/* Background image and effects */}
      <div
        className="marketing-background__image"
        aria-hidden="true"
      />

      {/* <div
        className="marketing-background__glow marketing-background__glow--blue"
        aria-hidden="true"
      /> */}

        {/* <div
            className="marketing-background__glow marketing-background__glow--purple"
            aria-hidden="true"
        /> */}

      {/* Landing page content */}
      <main className="marketing-background__content">
        <HeroSection />
        <TrustSection />
        <ProblemSolution />
        <FeaturesSection />
        <WorkflowSection />
        <ProductShowcase />
        <UseCasesSection />
        <TestimonialsSection />
        <PricingPreview />
        <FAQSection />
        <FinalCTA />
      </main>
    </div>
  );
}
