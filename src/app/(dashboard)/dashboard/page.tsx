import type { Metadata } from "next";
import Link from "next/link";
import { Plus } from "lucide-react";
import { getCurrentUser } from "@/lib/auth/session";
import { DashboardStats } from "@/components/dashboard/DashboardStats";
import { ProjectActivity } from "@/components/dashboard/ProjectActivity";
import { TestExecutionSummary } from "@/components/dashboard/TestExecutionSummary";
import { RecentProjects } from "@/components/dashboard/RecentProjects";
import { RecentActivity } from "@/components/dashboard/RecentActivity";
import {
  demoDashboardStats,
  demoActivityChart,
  demoTestExecution,
  demoRecentProjects,
  demoRecentActivity,
} from "@/lib/dashboard/dashboard-data";

export const metadata: Metadata = {
  title: "Dashboard | QAForge",
  robots: { index: false, follow: false },
};

export default async function DashboardPage(): Promise<React.JSX.Element> {
  const user = await getCurrentUser();
  const userName = user?.name || user?.email || "there";
  const firstName = userName.includes(" ")
    ? userName.split(" ")[0]
    : userName.split("@")[0];

  const stats = demoDashboardStats;
  const activityChart = demoActivityChart;
  const testExecution = demoTestExecution;
  const recentProjects = demoRecentProjects;
  const recentActivity = demoRecentActivity;

  return (
    <div className="flex flex-col gap-6 min-w-0">
      {/* Page header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex-1 min-w-0">
          <h1 className="text-2xl font-bold text-white tracking-tight">
            Welcome back, {firstName}!
          </h1>
          <p className="mt-1 text-sm" style={{ color: "rgba(255,255,255,0.45)" }}>
            {"Here's what's happening with your QA projects today."}
          </p>
        </div>

        <Link
          href="/projects/new"
          className="inline-flex items-center gap-2 h-9 px-4 rounded-xl text-sm font-semibold text-white transition-all duration-150 hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 shrink-0"
          style={{
            background: "linear-gradient(135deg,#6366f1 0%,#4f46e5 100%)",
            boxShadow: "0 0 16px rgba(99,102,241,0.35)",
          }}
        >
          <Plus size={15} aria-hidden="true" />
          New Project
        </Link>
      </div>

      {/* KPI stat cards */}
      <DashboardStats stats={stats} />

      {/* Charts row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2">
          <ProjectActivity data={activityChart} />
        </div>
        <div>
          <TestExecutionSummary data={testExecution} />
        </div>
      </div>

      {/* Bottom row */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
        <div className="lg:col-span-3">
          <RecentProjects projects={recentProjects} />
        </div>
        <div className="lg:col-span-2">
          <RecentActivity activities={recentActivity} />
        </div>
      </div>

    </div>
  );
}
