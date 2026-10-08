"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Search, LayoutGrid, List, Plus, SlidersHorizontal } from "lucide-react";
import type { Project } from "@/lib/projects/types";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { EditProjectModal } from "@/components/projects/EditProjectModal";
import { DeleteProjectModal } from "@/components/projects/DeleteProjectModal";

type SortOption = "latest" | "oldest" | "name-asc" | "name-desc";
type ViewMode = "grid" | "list";

const STATUS_OPTIONS: Array<{ label: string; value: string }> = [
  { label: "All Status", value: "all" },
  { label: "Active", value: "Active" },
  { label: "Draft", value: "Draft" },
  { label: "Archived", value: "Archived" },
];

const SORT_OPTIONS: Array<{ label: string; value: SortOption }> = [
  { label: "Latest", value: "latest" },
  { label: "Oldest", value: "oldest" },
  { label: "Name A-Z", value: "name-asc" },
  { label: "Name Z-A", value: "name-desc" },
];

export function ProjectsClient(): React.JSX.Element {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const [sort, setSort] = useState<SortOption>("latest");
  const [view, setView] = useState<ViewMode>("grid");
  const [editProject, setEditProject] = useState<Project | null>(null);
  const [deleteProject, setDeleteProject] = useState<Project | null>(null);

  async function fetchProjects(): Promise<void> {
    setLoading(true); setError(null);
    try {
      const params = new URLSearchParams({ search, status, sort });
      const res = await fetch(`/api/projects?${params.toString()}`);
      const data = await res.json() as { success: boolean; data?: Project[]; error?: string };
      if (!res.ok || !data.success) { setError(data.error ?? "Unable to load projects."); setLoading(false); return; }
      setProjects(data.data ?? []);
    } catch {
      setError("A network error occurred.");
    }
    setLoading(false);
  }

  useEffect((): void => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchProjects().catch(console.error);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, status, sort]);

  function handleEdited(updated: Project): void {
    setProjects(prev => prev.map(p => p.id === updated.id ? updated : p));
  }

  function handleDeleted(id: string): void {
    setProjects(prev => prev.filter(p => p.id !== id));
  }

  const selectClass = "h-9 rounded-xl px-3 text-xs font-medium outline-none focus-visible:ring-2 focus-visible:ring-brand-500 transition-colors cursor-pointer";
  const selectStyle = { background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.75)" };

  return (
    <>
      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
        {/* Search */}
        <div
          className="flex items-center gap-2 flex-1 h-9 rounded-xl px-3"
          style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
          role="search"
        >
          <Search size={14} style={{ color: "rgba(255,255,255,0.3)" }} aria-hidden="true" />
          <input
            type="search"
            placeholder="Search projects..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="flex-1 bg-transparent text-sm outline-none"
            style={{ color: "rgba(255,255,255,0.8)" }}
            aria-label="Search projects"
          />
        </div>

        {/* Filters */}
        <div className="flex items-center gap-2 shrink-0">
          <SlidersHorizontal size={14} style={{ color: "rgba(255,255,255,0.3)" }} aria-hidden="true" />
          <select value={status} onChange={e => setStatus(e.target.value)} className={selectClass} style={selectStyle} aria-label="Filter by status">
            {STATUS_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
          </select>

          <span className="text-xs" style={{ color: "rgba(255,255,255,0.3)" }}>Sort by</span>
          <select value={sort} onChange={e => setSort(e.target.value as SortOption)} className={selectClass} style={selectStyle} aria-label="Sort projects">
            {SORT_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
          </select>

          {/* View toggle */}
          <div className="flex items-center rounded-xl overflow-hidden" style={{ border: "1px solid rgba(255,255,255,0.08)" }}>
            <button type="button" onClick={() => setView("grid")} aria-label="Grid view" aria-pressed={view === "grid"} className="w-9 h-9 flex items-center justify-center transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500" style={{ background: view === "grid" ? "rgba(99,102,241,0.2)" : "rgba(255,255,255,0.04)", color: view === "grid" ? "#818cf8" : "rgba(255,255,255,0.4)" }}>
              <LayoutGrid size={14} aria-hidden="true" />
            </button>
            <button type="button" onClick={() => setView("list")} aria-label="List view" aria-pressed={view === "list"} className="w-9 h-9 flex items-center justify-center transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500" style={{ background: view === "list" ? "rgba(99,102,241,0.2)" : "rgba(255,255,255,0.04)", color: view === "list" ? "#818cf8" : "rgba(255,255,255,0.4)" }}>
              <List size={14} aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      {loading ? (
        <div className={`grid gap-4 ${view === "grid" ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"}`} aria-busy="true" aria-label="Loading projects">
          {[1,2,3,4,5,6].map(i => (
            <div key={i} className="h-52 rounded-2xl animate-pulse" style={{ background: "rgba(255,255,255,0.04)" }} aria-hidden="true" />
          ))}
        </div>
      ) : error ? (
        <div className="flex flex-col items-center justify-center py-16 gap-3">
          <p className="text-sm" style={{ color: "rgba(255,255,255,0.4)" }}>{error}</p>
          <button type="button" onClick={() => void fetchProjects()} className="text-xs text-brand-400 hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 rounded">Try again</button>
        </div>
      ) : projects.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 gap-4">
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center" style={{ background: "rgba(99,102,241,0.1)", border: "1px solid rgba(99,102,241,0.2)" }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#818cf8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M3 3h6l2 3h10a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z"/></svg>
          </div>
          <div className="text-center">
            <p className="text-base font-semibold text-white mb-1">
              {search || status !== "all" ? "No projects match your search" : "No projects yet"}
            </p>
            <p className="text-sm" style={{ color: "rgba(255,255,255,0.4)" }}>
              {search || status !== "all" ? "Try changing your search or filters." : "Create your first QA project to get started."}
            </p>
          </div>
          {!search && status === "all" && (
            <Link href="/projects/new" className="inline-flex items-center gap-1.5 h-9 px-4 rounded-xl text-sm font-semibold text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500" style={{ background: "linear-gradient(135deg,#6366f1,#4f46e5)" }}>
              <Plus size={14} aria-hidden="true" /> Create Project
            </Link>
          )}
        </div>
      ) : (
        <div className={`grid gap-4 ${view === "grid" ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"}`}>
          {projects.map(project => (
            <ProjectCard
              key={project.id}
              project={project}
              onEdit={p => setEditProject(p)}
              onDelete={p => setDeleteProject(p)}
            />
          ))}
        </div>
      )}

      <EditProjectModal key={editProject?.id ?? "none"} project={editProject} onClose={() => setEditProject(null)} onSaved={handleEdited} />
      <DeleteProjectModal project={deleteProject} onClose={() => setDeleteProject(null)} onDeleted={handleDeleted} />
    </>
  );
}