"use client";

import Link from "next/link";
import { ChevronRight, Plus } from "lucide-react";
import {
  IconProjects,
  IconTestCases,
  IconBugReports,
  IconAutomation,
} from "@/components/icons";
import { cn } from "@/lib/utils";
import type { DashboardProject, ProjectStatus } from "@/lib/dashboard/types";

// ---------------------------------------------------------------------------
// Status badge
// ---------------------------------------------------------------------------

function StatusBadge({ status }: { status: ProjectStatus }): React.JSX.Element {
  const config: Record<ProjectStatus, { color: string; bg: string; border: string }> = {
    Active:   { color: "#4ade80", bg: "rgba(74,222,128,0.1)",  border: "rgba(74,222,128,0.25)"  },
    Draft:    { color: "#fbbf24", bg: "rgba(251,191,36,0.1)", border: "rgba(251,191,36,0.25)" },
    Archived: { color: "#94a3b8", bg: "rgba(148,163,184,0.1)", border: "rgba(148,163,184,0.25)" },
  };
  const c = config[status];
  return (
    <span
      className="text-[10px] font-semibold px-2 py-0.5 rounded-full shrink-0"
      style={{ color: c.color, background: c.bg, border: `1px solid ${c.border}` }}
    >
      {status}
    </span>
  );
}

// ---------------------------------------------------------------------------
// Project row
// ---------------------------------------------------------------------------

function ProjectRow({ project }: { project: DashboardProject }): React.JSX.Element {
  return (
    <Link
      href={`/projects/${project.id}`}
      className={cn(
        "group flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all duration-150",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500",
      )}
      style={{ background: "rgba(255,255,255,0.02)", border: "1px solid transparent" }}
      onMouseEnter={(e) => {
        const el = e.currentTarget;
        el.style.background = "rgba(255,255,255,0.04)";
        el.style.border = "1px solid rgba(99,102,241,0.2)";
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget;
        el.style.background = "rgba(255,255,255,0.02)";
        el.style.border = "1px solid transparent";
      }}
    >
      {/* Project icon */}
      <div
        className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 overflow-hidden"
      >
        <IconProjects size={36} aria-hidden="true" />
      </div>

      {/* Name + description */}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-white truncate">{project.name}</p>
        <p className="text-xs truncate" style={{ color: "rgba(255,255,255,0.4)" }}>
          {project.description}
        </p>
      </div>

      {/* Stats — hidden on mobile */}
      <div className="hidden sm:flex items-center gap-4 shrink-0">
        <div className="flex items-center gap-1.5 text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>
          <IconTestCases size={14} aria-hidden="true" />
          <span>{project.testCases}</span>
        </div>
        <div className="flex items-center gap-1.5 text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>
          <IconBugReports size={14} aria-hidden="true" />
          <span>{project.bugs}</span>
        </div>
        <div className="flex items-center gap-1.5 text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>
          <IconAutomation size={14} aria-hidden="true" />
          <span>{project.automationRuns}</span>
        </div>
      </div>

      <StatusBadge status={project.status} />

      <ChevronRight
        size={14}
        className="shrink-0 opacity-0 group-hover:opacity-40 transition-opacity"
        aria-hidden="true"
      />
    </Link>
  );
}

// ---------------------------------------------------------------------------
// RecentProjects
// ---------------------------------------------------------------------------

interface RecentProjectsProps {
  projects: DashboardProject[];
}

export function RecentProjects({ projects }: RecentProjectsProps): React.JSX.Element {
  return (
    <div
      className="rounded-2xl p-6 flex flex-col gap-4"
      style={{
        background: "rgba(255,255,255,0.025)",
        border: "1px solid rgba(255,255,255,0.07)",
      }}
    >
      {/* Header */}
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-base font-semibold text-white">Recent Projects</h2>
        <div className="flex items-center gap-2">
          <Link
            href="/projects"
            className="flex items-center gap-1.5 h-7 px-3 rounded-lg text-xs font-semibold text-white transition-all hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
            style={{ background: "linear-gradient(135deg,#6366f1,#4f46e5)" }}
          >
            View all
          </Link>
        </div>
      </div>

      {/* Projects list */}
      {projects.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-10 gap-3">
          <IconProjects size={32} style={{ color: "rgba(255,255,255,0.15)" }} aria-hidden="true" />
          <div className="text-center">
            <p className="text-sm font-medium" style={{ color: "rgba(255,255,255,0.4)" }}>No projects yet.</p>
            <p className="text-xs mt-1" style={{ color: "rgba(255,255,255,0.25)" }}>Create your first QA project to get started.</p>
          </div>
          <Link
            href="/projects/new"
            className="mt-2 flex items-center gap-1.5 h-8 px-4 rounded-lg text-xs font-semibold text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
            style={{ background: "linear-gradient(135deg,#6366f1,#4f46e5)" }}
          >
            <Plus size={12} aria-hidden="true" />
            Create Project
          </Link>
        </div>
      ) : (
        <ul className="flex flex-col gap-1.5 list-none">
          {projects.map((project) => (
            <li key={project.id}>
              <ProjectRow project={project} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
