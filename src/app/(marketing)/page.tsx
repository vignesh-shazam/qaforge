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
    "Turn any web application into a production-ready QA automation framework. Generate test cases, bug reports, test data, API tests and Playwright automation — powered by AI.",
};

export default function LandingPage(): React.JSX.Element {
  return (
    <>
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
    </>
  );
}
