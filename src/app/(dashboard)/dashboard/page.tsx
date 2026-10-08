import type { Metadata } from "next";
import Link from "next/link";
import { Plus } from "lucide-react";
import { getCurrentUser } from "@/lib/auth/session";
import { db } from "@/lib/db";
import { DashboardStats } from "@/components/dashboard/DashboardStats";
import { ProjectActivity } from "@/components/dashboard/ProjectActivity";
import { TestExecutionSummary } from "@/components/dashboard/TestExecutionSummary";
import { RecentProjects } from "@/components/dashboard/RecentProjects";
import { RecentActivity } from "@/components/dashboard/RecentActivity";
import {
  demoDashboardStats,
  demoActivityChart,
  demoTestExecution,
  demoRecentActivity,
} from "@/lib/dashboard/dashboard-data";
import type { DashboardProject } from "@/lib/dashboard/types";

export const metadata: Metadata = {
  title: "Dashboard | QAForge",
  robots: { index: false, follow: false },
};

export default async function DashboardPage(): Promise<React.JSX.Element> {
  const user = await getCurrentUser();

  const firstName = (() => {
    const n = user?.name || user?.email || "there";
    return n.includes(" ") ? (n.split(" ")[0] ?? n) : (n.split("@")[0] ?? n);
  })();

  // Real project count
  let totalProjects = 0;
  let recentProjects: DashboardProject[] = [];

  if (user?.userId) {
    totalProjects = await db.project.count({
      where: {
        userId: user.userId,
      },
    });

    const raw = await db.project.findMany({
      where: {
        userId: user.userId,
      },
      orderBy: {
        updatedAt: "desc",
      },
      take: 5,
      select: {
        id: true,
        name: true,
        description: true,
        targetUrl: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    recentProjects = raw.map((project) => ({
      id: project.id,
      name: project.name,
      description: project.description ?? "",
      testCases: 0,
      bugs: 0,
      automationRuns: 0,

      // Project model currently has no status field.
      // Until project status is persisted in Prisma,
      // treat existing projects as active.
      status: "active" as DashboardProject["status"],

      updatedAt: new Date(project.updatedAt).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      }),
    }));
  }

  // Build real stats
  // Test cases / bugs / automation runs remain 0
  // until those systems are connected.
  const stats = {
    ...demoDashboardStats,

    totalProjects: {
      ...demoDashboardStats.totalProjects,
      value: totalProjects,
      trend: {
        direction: "neutral" as const,
        label: `${totalProjects} total`,
      },
    },
  };

  return (
    <div className="flex flex-col gap-6 min-w-0">
      {/* Page header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">
            Welcome back, {firstName}!
          </h1>

          <p
            className="mt-1 text-sm"
            style={{ color: "rgba(255,255,255,0.45)" }}
          >
            {"Here's what's happening with your QA projects today."}
          </p>
        </div>

        <Link
          href="/projects/new"
          className="inline-flex items-center gap-2 h-9 px-4 rounded-xl text-sm font-semibold text-white transition-all hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 shrink-0"
          style={{
            background:
              "linear-gradient(135deg,#6366f1 0%,#4f46e5 100%)",
            boxShadow: "0 0 16px rgba(99,102,241,0.35)",
          }}
        >
          <Plus size={15} aria-hidden="true" />
          New Project
        </Link>
      </div>

      {/* Dashboard statistics */}
      <DashboardStats stats={stats} />

      {/* Activity + Test Execution */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2">
          <ProjectActivity data={demoActivityChart} />
        </div>

        <div>
          <TestExecutionSummary data={demoTestExecution} />
        </div>
      </div>

      {/* Recent Projects + Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
        <div className="lg:col-span-3">
          <RecentProjects projects={recentProjects} />
        </div>

        <div className="lg:col-span-2">
          <RecentActivity activities={demoRecentActivity} />
        </div>
      </div>
    </div>
  );
}