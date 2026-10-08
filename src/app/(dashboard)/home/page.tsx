import type { Metadata } from "next";
import { getCurrentUser } from "@/lib/auth/session";
import { HomeHero } from "@/components/home/HomeHero";
import { QuickActions } from "@/components/home/QuickActions";
import { HowQAForgeWorks } from "@/components/home/HowQAForgeWorks";
import { DemoVideo } from "@/components/home/DemoVideo";
import { FinalCTA } from "@/components/home/FinalCTA";
import { UpgradePopup } from "@/components/dashboard/UpgradePopup";

export const metadata: Metadata = {
  title: "Home | QAForge",
  description: "Your AI-powered QA engineering platform. Analyze applications, generate test cases, find bugs, and build automation.",
  robots: { index: false, follow: false },
  openGraph: {
    title: "Home | QAForge",
    description: "Your AI-powered QA engineering platform.",
    siteName: "QAForge",
  },
};

export default async function HomePage(): Promise<React.JSX.Element> {
  const user = await getCurrentUser();
  const userName = user?.name || user?.email || "";
  const firstName = userName.includes(" ")
    ? (userName.split(" ")[0] ?? "")
    : userName.split("@")[0] ?? "";

  return (
    <div className="flex flex-col gap-14 min-w-0">
      <UpgradePopup />
      <HomeHero firstName={firstName} />
      <QuickActions />
      <HowQAForgeWorks />
      <DemoVideo />
      <FinalCTA />
    </div>
  );
}
