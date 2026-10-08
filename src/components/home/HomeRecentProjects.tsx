import Link from "next/link";
import { Plus, ArrowRight } from "lucide-react";
import type { Project } from "@/lib/projects/types";
import { ProjectThumbnail } from "@/components/projects/ProjectThumbnail";
import { StatusBadge } from "@/components/projects/StatusBadge";

interface HomeRecentProjectsProps {
  projects: Project[];
}

export function HomeRecentProjects({ projects }: HomeRecentProjectsProps): React.JSX.Element {
  return (
    <section aria-labelledby="recent-projects-heading">
      <div className="flex items-center justify-between mb-4">
        <h2 id="recent-projects-heading" className="text-base font-semibold text-white">Recent Projects</h2>
        <div className="flex items-center gap-3">
          <Link href="/projects" className="text-xs font-medium text-brand-400 hover:opacity-80 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 rounded">View all</Link>
          <Link href="/projects/new" className="inline-flex items-center gap-1.5 h-7 px-3 rounded-lg text-xs font-semibold text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500" style={{ background: "linear-gradient(135deg,#6366f1,#4f46e5)" }}>
            <Plus size={11} aria-hidden="true" /> Create Project
          </Link>
        </div>
      </div>

      {projects.length === 0 ? (
        <div className="rounded-2xl p-8 flex flex-col items-center gap-3 text-center" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}>
          <p className="text-sm font-medium" style={{ color: "rgba(255,255,255,0.45)" }}>No projects yet</p>
          <p className="text-xs" style={{ color: "rgba(255,255,255,0.25)" }}>Create your first QA project to get started.</p>
          <Link href="/projects/new" className="mt-1 inline-flex items-center gap-1.5 h-8 px-3 rounded-lg text-xs font-semibold text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500" style={{ background: "linear-gradient(135deg,#6366f1,#4f46e5)" }}>
            <Plus size={11} aria-hidden="true" /> Create Project
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {projects.map(project => (
            <Link
              key={project.id}
              href={`/projects/${project.id}`}
              className="group flex items-center gap-3 rounded-xl p-3.5 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
              style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.07)" }}
              onMouseEnter={(e) => { const el = e.currentTarget as HTMLAnchorElement; el.style.border = "1px solid rgba(99,102,241,0.3)"; el.style.background = "rgba(255,255,255,0.04)"; }}
              onMouseLeave={(e) => { const el = e.currentTarget as HTMLAnchorElement; el.style.border = "1px solid rgba(255,255,255,0.07)"; el.style.background = "rgba(255,255,255,0.025)"; }}
            >
              <ProjectThumbnail name={project.name} targetUrl={project.targetUrl} size="sm" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-white truncate">{project.name}</p>
                {project.targetUrl && <p className="text-[11px] truncate" style={{ color: "rgba(99,102,241,0.7)" }}>{project.targetUrl}</p>}
                <div className="mt-1"><StatusBadge status={project.status} /></div>
              </div>
              <ArrowRight size={13} className="shrink-0 opacity-0 group-hover:opacity-40 transition-opacity" aria-hidden="true" />
            </Link>
          ))}
        </div>
      )}
    </section>
  );
}