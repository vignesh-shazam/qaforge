import type { Metadata } from "next";
import { getCurrentUser } from "@/lib/auth/session";
import { db } from "@/lib/db";
import type { Project } from "@/lib/projects/types";
import { HomeHero } from "@/components/home/HomeHero";
import { QuickActions } from "@/components/home/QuickActions";
import { HowQAForgeWorks } from "@/components/home/HowQAForgeWorks";
import { DemoVideo } from "@/components/home/DemoVideo";
import { FinalCTA } from "@/components/home/FinalCTA";
import { UpgradePopup } from "@/components/dashboard/UpgradePopup";
import { HomeRecentProjects } from "@/components/home/HomeRecentProjects";

export const metadata: Metadata = {
  title: "Home | QAForge",
  description: "Your AI-powered QA engineering platform.",
  robots: { index: false, follow: false },
  openGraph: { title: "Home | QAForge", description: "Your AI-powered QA engineering platform.", siteName: "QAForge" },
};

export default async function HomePage(): Promise<React.JSX.Element> {
  const user = await getCurrentUser();
  const userName = user?.name || user?.email || "";
  const firstName = userName.includes(" ") ? (userName.split(" ")[0] ?? "") : userName.split("@")[0] ?? "";

  let recentProjects: Project[] = [];
  if (user?.userId) {
    const raw = await db.project.findMany({
      where: { userId: user.userId },
      orderBy: { updatedAt: "desc" },
      take: 3,
      select: { id: true, name: true, description: true, targetUrl: true, status: true, createdAt: true, updatedAt: true },
    });
    recentProjects = raw.map(p => ({
      id: p.id,
      name: p.name,
      description: p.description,
      targetUrl: p.targetUrl,
      status: p.status as Project["status"],
      thumbnail: null, // column pending migration
      createdAt: p.createdAt.toISOString(),
      updatedAt: p.updatedAt.toISOString(),
    }));
  }

  return (
    <div className="flex flex-col gap-14 min-w-0">
      <UpgradePopup />
      <HomeHero firstName={firstName} />
      <QuickActions />
      <HomeRecentProjects projects={recentProjects} />
      <HowQAForgeWorks />
      <DemoVideo />
      <FinalCTA />
    </div>
  );
}