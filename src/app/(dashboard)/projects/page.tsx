import type { Metadata } from "next";
import Link from "next/link";
import { Plus, FolderKanban } from "lucide-react";
import { ProjectsClient } from "@/components/projects/ProjectsClient";
import { getCurrentUser } from "@/lib/auth/session";
import { db } from "@/lib/db";

export const metadata: Metadata = {
  title: "Projects | QAForge",
  robots: { index: false, follow: false },
};

const statCards = [
  {
    id: "total",
    label: "Total Projects",
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <path d="M2 5h5l2 2.5H18a1 1 0 0 1 1 1V16a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1z" stroke="#a78bfa" strokeWidth="1.4" strokeLinejoin="round"/>
      </svg>
    ),
    iconBg: "rgba(109,40,217,0.2)",
    color: "#a78bfa",
    glow: "rgba(109,40,217,0.3)",
    trend: "+20%",
    trendUp: true,
  },
  {
    id: "testcases",
    label: "Total Test Cases",
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <rect x="3" y="2" width="14" height="16" rx="2" stroke="#60a5fa" strokeWidth="1.4"/>
        <path d="M6 7h8M6 10h5M6 13h6" stroke="#60a5fa" strokeWidth="1.2" strokeLinecap="round"/>
      </svg>
    ),
    iconBg: "rgba(37,99,235,0.2)",
    color: "#60a5fa",
    glow: "rgba(37,99,235,0.3)",
    trend: "+15%",
    trendUp: true,
  },
  {
    id: "bugs",
    label: "Total Bugs",
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <circle cx="10" cy="10" r="4" stroke="#f87171" strokeWidth="1.4"/>
        <path d="M10 6V3M7 7L5 5M13 7l2-2M4 10H2M18 10h-2M7 13l-2 2M13 13l2 2" stroke="#f87171" strokeWidth="1.2" strokeLinecap="round"/>
      </svg>
    ),
    iconBg: "rgba(220,38,38,0.2)",
    color: "#f87171",
    glow: "rgba(220,38,38,0.3)",
    trend: "-8%",
    trendUp: false,
  },
  {
    id: "runs",
    label: "Automation Runs",
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <polygon points="6,3 18,10 6,17" fill="rgba(52,211,153,0.5)" stroke="#34d399" strokeWidth="1.4" strokeLinejoin="round"/>
      </svg>
    ),
    iconBg: "rgba(5,150,105,0.2)",
    color: "#34d399",
    glow: "rgba(5,150,105,0.3)",
    trend: "+32%",
    trendUp: true,
  },
] as const;

export default async function ProjectsPage(): Promise<React.JSX.Element> {
  const user = await getCurrentUser();
  let totalProjects = 0;
  if (user?.userId) {
    totalProjects = await db.project.count({ where: { userId: user.userId } });
  }

  return (
    <div className="flex flex-col gap-6 min-w-0">
      {/* Page header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div
            className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0"
            style={{ background: "rgba(109,40,217,0.2)", border: "1px solid rgba(139,92,246,0.35)", boxShadow: "0 0 16px rgba(109,40,217,0.2)" }}
          >
            <FolderKanban size={22} style={{ color: "#a78bfa" }} aria-hidden="true" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white tracking-tight">Projects</h1>
            <p className="text-sm mt-0.5" style={{ color: "rgba(255,255,255,0.45)" }}>
              View and manage all your testing projects
            </p>
          </div>
        </div>
        <Link
          href="/projects/new"
          className="inline-flex items-center gap-2 h-10 px-5 rounded-xl text-sm font-semibold text-white transition-all hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 shrink-0"
          style={{
            background: "linear-gradient(135deg,#6366f1 0%,#4f46e5 100%)",
            boxShadow: "0 0 20px rgba(99,102,241,0.4)",
          }}
        >
          <Plus size={16} aria-hidden="true" />
          Create Project
        </Link>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((stat) => {
          const value = stat.id === "total" ? totalProjects : 0;
          return (
            <div
              key={stat.id}
              className="rounded-2xl p-5 flex items-center gap-4"
              style={{
                background: "rgba(13,10,35,0.8)",
                border: `1px solid ${stat.glow.replace("0.3", "0.2")}`,
                boxShadow: `0 0 20px ${stat.glow}`,
              }}
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                style={{ background: stat.iconBg, border: `1px solid ${stat.glow.replace("0.3", "0.3")}` }}
              >
                {stat.icon}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs mb-1" style={{ color: "rgba(255,255,255,0.5)" }}>{stat.label}</p>
                <p className="text-3xl font-bold text-white tabular-nums leading-none">{value}</p>
                <p
                  className="text-[11px] mt-1 font-medium"
                  style={{ color: stat.trendUp ? "#4ade80" : "#f87171" }}
                >
                  {stat.trendUp ? "▲" : "▼"} {stat.trend}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Projects list */}
      <ProjectsClient />
    </div>
  );
}