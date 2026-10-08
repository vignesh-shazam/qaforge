"use client";

import { useState } from "react";
import Link from "next/link";
import { MoreHorizontal, TestTube2, Bug, Zap, ExternalLink } from "lucide-react";
import type { Project } from "@/lib/projects/types";
import { StatusBadge } from "./StatusBadge";
import { ProjectThumbnail } from "./ProjectThumbnail";

interface ProjectCardProps {
  project: Project;
  onEdit: (project: Project) => void;
  onDelete: (project: Project) => void;
}

function formatRelative(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 60) return `${mins} minutes ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs} hours ago`;
  return `${Math.floor(hrs / 24)} days ago`;
}

export function ProjectCard({ project, onEdit, onDelete }: ProjectCardProps): React.JSX.Element {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div
      className="group relative flex flex-col rounded-2xl transition-all duration-300"
      style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.07)" }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLDivElement;
        el.style.border = "1px solid rgba(99,102,241,0.35)";
        el.style.boxShadow = "0 0 24px rgba(99,102,241,0.12)";
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLDivElement;
        el.style.border = "1px solid rgba(255,255,255,0.07)";
        el.style.boxShadow = "none";
        if (!menuOpen) setMenuOpen(false);
      }}
    >
      {/* Top: thumbnail + status + menu */}
      <div className="flex items-start justify-between p-4 pb-3">
        <ProjectThumbnail name={project.name} targetUrl={project.targetUrl} size="md" />
        <div className="flex items-center gap-2">
          <StatusBadge status={project.status} />
          {/* Three-dot menu */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setMenuOpen((v) => !v)}
              className="w-7 h-7 rounded-lg flex items-center justify-center transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
              style={{ color: "rgba(255,255,255,0.4)", background: menuOpen ? "rgba(255,255,255,0.08)" : "transparent" }}
              aria-label="Project actions"
              aria-haspopup="menu"
              aria-expanded={menuOpen}
              onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.08)"; }}
              onMouseLeave={(e) => { if (!menuOpen) (e.currentTarget as HTMLButtonElement).style.background = "transparent"; }}
            >
              <MoreHorizontal size={15} aria-hidden="true" />
            </button>
            {menuOpen && (
              <>
                <div className="fixed inset-0 z-40" aria-hidden="true" onClick={() => setMenuOpen(false)} />
                <div
                  className="absolute right-0 top-8 w-36 rounded-xl overflow-hidden z-50"
                  role="menu"
                  style={{ background: "rgba(8,9,22,0.98)", border: "1px solid rgba(255,255,255,0.1)", boxShadow: "0 12px 30px rgba(0,0,0,0.5)" }}
                >
                  <Link
                    href={`/projects/${project.id}`}
                    role="menuitem"
                    className="flex items-center gap-2 px-3 py-2.5 text-xs transition-colors focus-visible:outline-none"
                    style={{ color: "rgba(255,255,255,0.75)" }}
                    onClick={() => setMenuOpen(false)}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.background = "rgba(255,255,255,0.06)"; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.background = "transparent"; }}
                  >
                    <ExternalLink size={12} aria-hidden="true" /> Open
                  </Link>
                  <button
                    type="button"
                    role="menuitem"
                    className="flex w-full items-center gap-2 px-3 py-2.5 text-xs transition-colors focus-visible:outline-none"
                    style={{ color: "rgba(255,255,255,0.75)" }}
                    onClick={() => { setMenuOpen(false); onEdit(project); }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.06)"; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.background = "transparent"; }}
                  >
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true"><path d="M8.5 1.5l2 2L4 10H2V8L8.5 1.5Z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    Edit
                  </button>
                  <button
                    type="button"
                    role="menuitem"
                    className="flex w-full items-center gap-2 px-3 py-2.5 text-xs transition-colors focus-visible:outline-none"
                    style={{ color: "#f87171" }}
                    onClick={() => { setMenuOpen(false); onDelete(project); }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.background = "rgba(239,68,68,0.08)"; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.background = "transparent"; }}
                  >
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true"><path d="M2 3h8M5 3V2h2v1M4 3l.5 7h3L8 3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    Delete
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Project info */}
      <Link href={`/projects/${project.id}`} className="flex-1 flex flex-col px-4 pb-4 gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 rounded-b-2xl">
        <div>
          <h3 className="text-sm font-semibold text-white truncate">{project.name}</h3>
          {project.targetUrl && (
            <p className="text-[11px] truncate mt-0.5" style={{ color: "rgba(99,102,241,0.8)" }}>{project.targetUrl}</p>
          )}
        </div>
        {project.description && (
          <p className="text-xs leading-relaxed line-clamp-2" style={{ color: "rgba(255,255,255,0.45)" }}>{project.description}</p>
        )}

        {/* Stats row */}
        <div className="flex items-center gap-4 mt-auto pt-3" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
          <div className="flex items-center gap-1 text-xs" style={{ color: "rgba(255,255,255,0.45)" }}>
            <TestTube2 size={11} aria-hidden="true" />
            <span>0</span>
            <span className="text-[9px]">Test Cases</span>
          </div>
          <div className="flex items-center gap-1 text-xs" style={{ color: "rgba(239,68,68,0.7)" }}>
            <Bug size={11} aria-hidden="true" />
            <span>0</span>
            <span className="text-[9px]" style={{ color: "rgba(255,255,255,0.35)" }}>Bugs</span>
          </div>
          <div className="flex items-center gap-1 text-xs" style={{ color: "rgba(74,222,128,0.7)" }}>
            <Zap size={11} aria-hidden="true" />
            <span>0</span>
            <span className="text-[9px]" style={{ color: "rgba(255,255,255,0.35)" }}>Runs</span>
          </div>
          <span className="ml-auto text-[10px]" style={{ color: "rgba(255,255,255,0.25)" }}>
            {formatRelative(project.updatedAt)}
          </span>
        </div>
      </Link>
    </div>
  );
}