"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { MoreHorizontal } from "lucide-react";
import type { Project } from "@/lib/projects/types";
import { StatusBadge } from "./StatusBadge";
import { getProjectThumbnail } from "@/lib/projects/thumbnails";
import { getInitials } from "@/lib/utils";

interface ProjectCardProps {
  project: Project;
  onEdit: (project: Project) => void;
  onDelete: (project: Project) => void;
  ownerName?: string;
}

function formatRelative(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 2) return "just now";
  if (mins < 60) return `${mins} minutes ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs} hours ago`;
  const days = Math.floor(hrs / 24);
  return `${days} day${days === 1 ? "" : "s"} ago`;
}

// Metric icon components
function TestCaseIcon(): React.JSX.Element {
  return (
    <div className="flex items-center justify-center w-5 h-5 rounded shrink-0" style={{ background: "rgba(96,165,250,0.15)" }}>
      <svg width="11" height="11" viewBox="0 0 12 12" fill="none" aria-hidden="true">
        <rect x="1" y="1" width="10" height="10" rx="2" stroke="#60a5fa" strokeWidth="1.2"/>
        <path d="M3 4h6M3 6h4M3 8h5" stroke="#60a5fa" strokeWidth="1" strokeLinecap="round"/>
      </svg>
    </div>
  );
}

function BugIcon(): React.JSX.Element {
  return (
    <div className="flex items-center justify-center w-5 h-5 rounded shrink-0" style={{ background: "rgba(248,113,113,0.15)" }}>
      <svg width="11" height="11" viewBox="0 0 12 12" fill="none" aria-hidden="true">
        <circle cx="6" cy="6" r="3" stroke="#f87171" strokeWidth="1.2"/>
        <path d="M6 3V1M4 3.5L2.5 2M8 3.5L9.5 2M2 6h1M9 6h1M3 9L2 10M9 9l1 1" stroke="#f87171" strokeWidth="1" strokeLinecap="round"/>
      </svg>
    </div>
  );
}

function TestDataIcon(): React.JSX.Element {
  return (
    <div className="flex items-center justify-center w-5 h-5 rounded shrink-0" style={{ background: "rgba(20,184,166,0.15)" }}>
      <svg width="11" height="11" viewBox="0 0 12 12" fill="none" aria-hidden="true">
        <ellipse cx="6" cy="3.5" rx="4" ry="1.8" stroke="#14b8a6" strokeWidth="1.1"/>
        <path d="M2 3.5v2.5c0 1 1.8 1.8 4 1.8s4-.8 4-1.8V3.5" stroke="#14b8a6" strokeWidth="1.1"/>
        <path d="M2 6v2.5c0 1 1.8 1.8 4 1.8s4-.8 4-1.8V6" stroke="#14b8a6" strokeWidth="1.1" opacity="0.6"/>
      </svg>
    </div>
  );
}

export function ProjectCard({ project, onEdit, onDelete, ownerName }: ProjectCardProps): React.JSX.Element {
  const [menuOpen, setMenuOpen] = useState(false);
  const thumbSrc = getProjectThumbnail(project.name, project.thumbnail);
  const owner = ownerName ?? "You";

  return (
    <div
      className="group relative flex flex-col rounded-2xl overflow-hidden transition-all duration-300"
      style={{ background: "rgba(13,10,35,0.9)", border: "1px solid rgba(99,102,241,0.18)" }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLDivElement;
        el.style.border = "1px solid rgba(99,102,241,0.5)";
        el.style.boxShadow = "0 0 28px rgba(99,102,241,0.18), 0 8px 32px rgba(0,0,0,0.4)";
        el.style.transform = "translateY(-2px)";
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLDivElement;
        el.style.border = "1px solid rgba(99,102,241,0.18)";
        el.style.boxShadow = "none";
        el.style.transform = "translateY(0)";
      }}
    >
      {/* Thumbnail */}
      <div className="relative w-full overflow-hidden" style={{ height: "160px" }}>
        <Image
          src={thumbSrc}
          alt={`${project.name} thumbnail`}
          fill
          className="object-cover"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          unoptimized
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, rgba(13,10,35,0.6) 100%)" }} />

        {/* Status badge — bottom left */}
        <div className="absolute bottom-3 left-3 z-10">
          <StatusBadge status={project.status} />
        </div>

        {/* Three-dot menu — top right */}
        <div className="absolute top-3 right-3 z-10">
          <div className="relative">
            <button
              type="button"
              onClick={(e) => { e.preventDefault(); setMenuOpen((v) => !v); }}
              className="w-8 h-8 rounded-full flex items-center justify-center transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
              style={{ background: "rgba(0,0,0,0.5)", backdropFilter: "blur(8px)", color: "rgba(255,255,255,0.7)", border: "1px solid rgba(255,255,255,0.15)" }}
              aria-label="Project actions"
              aria-haspopup="menu"
              aria-expanded={menuOpen}
            >
              <MoreHorizontal size={15} aria-hidden="true" />
            </button>
            {menuOpen && (
              <>
                <div className="fixed inset-0 z-40" aria-hidden="true" onClick={() => setMenuOpen(false)} />
                <div
                  className="absolute right-0 top-10 w-36 rounded-xl overflow-hidden z-50"
                  role="menu"
                  style={{ background: "rgba(8,9,22,0.98)", border: "1px solid rgba(99,102,241,0.2)", boxShadow: "0 12px 30px rgba(0,0,0,0.6)" }}
                >
                  <Link
                    href={`/projects/${project.id}`}
                    role="menuitem"
                    className="flex items-center gap-2 px-3.5 py-2.5 text-xs transition-colors"
                    style={{ color: "rgba(255,255,255,0.8)" }}
                    onClick={() => setMenuOpen(false)}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.background = "rgba(99,102,241,0.1)"; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.background = "transparent"; }}
                  >
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true"><path d="M1 6s2-4 5-4 5 4 5 4-2 4-5 4-5-4-5-4z" stroke="currentColor" strokeWidth="1.2"/><circle cx="6" cy="6" r="1.5" stroke="currentColor" strokeWidth="1.2"/></svg>
                    Open
                  </Link>
                  <button
                    type="button"
                    role="menuitem"
                    className="flex w-full items-center gap-2 px-3.5 py-2.5 text-xs transition-colors"
                    style={{ color: "rgba(255,255,255,0.8)" }}
                    onClick={() => { setMenuOpen(false); onEdit(project); }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.background = "rgba(99,102,241,0.1)"; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.background = "transparent"; }}
                  >
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true"><path d="M8.5 1.5l2 2L4 10H2V8L8.5 1.5Z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    Edit
                  </button>
                  <button
                    type="button"
                    role="menuitem"
                    className="flex w-full items-center gap-2 px-3.5 py-2.5 text-xs transition-colors"
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

      {/* Card body */}
      <Link href={`/projects/${project.id}`} className="flex-1 flex flex-col p-4 gap-3 focus-visible:outline-none">
        {/* Name + description */}
        <div>
          <h3 className="text-sm font-bold text-white leading-tight mb-1">{project.name}</h3>
          {project.description ? (
            <p className="text-xs leading-relaxed line-clamp-2" style={{ color: "rgba(255,255,255,0.5)" }}>
              {project.description}
            </p>
          ) : project.targetUrl ? (
            <p className="text-[11px] truncate" style={{ color: "rgba(99,102,241,0.7)" }}>{project.targetUrl}</p>
          ) : null}
        </div>

        {/* Metrics */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <TestCaseIcon />
            <span className="text-[11px] font-semibold text-white">0</span>
            <span className="text-[10px]" style={{ color: "rgba(255,255,255,0.35)" }}>Test Cases</span>
          </div>
          <div className="flex items-center gap-1.5">
            <BugIcon />
            <span className="text-[11px] font-semibold text-white">0</span>
            <span className="text-[10px]" style={{ color: "rgba(255,255,255,0.35)" }}>Bugs</span>
          </div>
          <div className="flex items-center gap-1.5">
            <TestDataIcon />
            <span className="text-[11px] font-semibold text-white">0</span>
            <span className="text-[10px]" style={{ color: "rgba(255,255,255,0.35)" }}>Test Data</span>
          </div>
        </div>

        {/* Footer: avatar + owner + updated */}
        <div className="flex items-center gap-2 mt-auto pt-3" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
          {/* Owner avatar */}
          <div
            className="w-6 h-6 rounded-full flex items-center justify-center text-[9px] font-bold text-white shrink-0"
            style={{ background: "linear-gradient(135deg,#6366f1,#4f46e5)", border: "1.5px solid rgba(99,102,241,0.5)" }}
            aria-hidden="true"
          >
            {getInitials(owner)}
          </div>
          <span className="text-[11px] font-medium flex-1 truncate" style={{ color: "rgba(255,255,255,0.65)" }}>
            {owner}
          </span>
          <span className="text-[10px] shrink-0" style={{ color: "rgba(255,255,255,0.3)" }}>
            Updated {formatRelative(project.updatedAt)}
          </span>
        </div>
      </Link>
    </div>
  );
}