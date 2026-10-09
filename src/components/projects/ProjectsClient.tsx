"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Search, LayoutGrid, List, Plus, ChevronLeft, ChevronRight } from "lucide-react";
import type { Project } from "@/lib/projects/types";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { EditProjectModal } from "@/components/projects/EditProjectModal";
import { DeleteProjectModal } from "@/components/projects/DeleteProjectModal";

type SortOption = "latest" | "oldest" | "name-asc" | "name-desc";
type ViewMode = "grid" | "list";

const STATUS_OPTIONS = [
  { label: "All Status", value: "all" },
  { label: "Active", value: "Active" },
  { label: "Draft", value: "Draft" },
  { label: "Archived", value: "Archived" },
  { label: "Testing", value: "Testing" },
  { label: "Planned", value: "Planned" },
];

const SORT_OPTIONS: Array<{ label: string; value: SortOption }> = [
  { label: "Last Modified", value: "latest" },
  { label: "Oldest First", value: "oldest" },
  { label: "Name A-Z", value: "name-asc" },
  { label: "Name Z-A", value: "name-desc" },
];

const PAGE_SIZES = [8, 12, 24];

export function ProjectsClient(): React.JSX.Element {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const [sort, setSort] = useState<SortOption>("latest");
  const [view, setView] = useState<ViewMode>("grid");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(8);
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
      setPage(1);
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

  // Pagination
  const totalPages = Math.max(1, Math.ceil(projects.length / pageSize));
  const paginated = projects.slice((page - 1) * pageSize, page * pageSize);
  const start = projects.length === 0 ? 0 : (page - 1) * pageSize + 1;
  const end = Math.min(page * pageSize, projects.length);

  const selectClass = "h-9 rounded-xl px-3 text-xs font-medium outline-none focus-visible:ring-2 focus-visible:ring-brand-500 transition-colors cursor-pointer appearance-none pr-7";
  const selectStyle = { background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.8)" };

  return (
    <>
      {/* Search + Filters + View Toggle */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
        {/* Search */}
        <div
          className="flex items-center gap-2.5 flex-1 h-10 rounded-xl px-3.5"
          style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)" }}
          role="search"
        >
          <Search size={15} style={{ color: "rgba(255,255,255,0.3)" }} aria-hidden="true" />
          <input
            type="search"
            placeholder="Search projects by name, owner, or tag..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="flex-1 bg-transparent text-sm outline-none"
            style={{ color: "rgba(255,255,255,0.85)" }}
            aria-label="Search projects"
          />
        </div>

        {/* Filters */}
        <div className="flex items-center gap-2 shrink-0 flex-wrap">
          <div className="relative">
            <select value={status} onChange={e => setStatus(e.target.value)} className={selectClass} style={selectStyle} aria-label="Filter by status">
              {STATUS_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
            </select>
            <svg className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true"><path d="M3 4.5l3 3 3-3" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" strokeLinecap="round"/></svg>
          </div>

          <div className="relative">
            <select value="all" className={selectClass} style={selectStyle} aria-label="Filter by owner" disabled>
              <option value="all">All Owners</option>
            </select>
            <svg className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true"><path d="M3 4.5l3 3 3-3" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" strokeLinecap="round"/></svg>
          </div>

          <div className="relative">
            <select value={sort} onChange={e => setSort(e.target.value as SortOption)} className={selectClass} style={selectStyle} aria-label="Sort projects">
              {SORT_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
            </select>
            <svg className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true"><path d="M3 4.5l3 3 3-3" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" strokeLinecap="round"/></svg>
          </div>

          {/* View toggle */}
          <div className="flex items-center rounded-xl overflow-hidden" style={{ border: "1px solid rgba(255,255,255,0.1)" }}>
            <button
              type="button"
              onClick={() => setView("grid")}
              aria-label="Grid view"
              aria-pressed={view === "grid"}
              className="w-9 h-9 flex items-center justify-center transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
              style={{
                background: view === "grid" ? "rgba(99,102,241,0.25)" : "rgba(255,255,255,0.03)",
                color: view === "grid" ? "#818cf8" : "rgba(255,255,255,0.4)",
                border: view === "grid" ? "1px solid rgba(99,102,241,0.4)" : "none",
              }}
            >
              <LayoutGrid size={15} aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={() => setView("list")}
              aria-label="List view"
              aria-pressed={view === "list"}
              className="w-9 h-9 flex items-center justify-center transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
              style={{
                background: view === "list" ? "rgba(99,102,241,0.25)" : "rgba(255,255,255,0.03)",
                color: view === "list" ? "#818cf8" : "rgba(255,255,255,0.4)",
                border: view === "list" ? "1px solid rgba(99,102,241,0.4)" : "none",
              }}
            >
              <List size={15} aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      {loading ? (
        <div className={`grid gap-5 ${view === "grid" ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4" : "grid-cols-1"}`} aria-busy="true">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="rounded-2xl animate-pulse overflow-hidden" style={{ background: "rgba(255,255,255,0.04)", height: view === "grid" ? "320px" : "80px" }} aria-hidden="true" />
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
            <Link href="/projects/new" className="inline-flex items-center gap-1.5 h-9 px-5 rounded-xl text-sm font-semibold text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500" style={{ background: "linear-gradient(135deg,#6366f1,#4f46e5)", boxShadow: "0 0 16px rgba(99,102,241,0.35)" }}>
              <Plus size={14} aria-hidden="true" /> Create Project
            </Link>
          )}
        </div>
      ) : (
        <>
          <div className={`grid gap-5 ${view === "grid" ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4" : "grid-cols-1"}`}>
            {paginated.map(project => (
              <ProjectCard
                key={project.id}
                project={project}
                onEdit={p => setEditProject(p)}
                onDelete={p => setDeleteProject(p)}
              />
            ))}
          </div>

          {/* Pagination */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-2">
            {/* Count */}
            <p className="text-sm" style={{ color: "rgba(255,255,255,0.4)" }}>
              Showing {start} to {end} of {projects.length} projects
            </p>

            {/* Page controls */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setPage(p => Math.max(1, p - 1))}
                disabled={page === 1}
                aria-label="Previous page"
                className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 disabled:opacity-30"
                style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.7)" }}
              >
                <ChevronLeft size={14} aria-hidden="true" />
              </button>

              {Array.from({ length: totalPages }).map((_, i) => {
                const pg = i + 1;
                return (
                  <button
                    key={pg}
                    type="button"
                    onClick={() => setPage(pg)}
                    aria-label={`Page ${pg}`}
                    aria-current={pg === page ? "page" : undefined}
                    className="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
                    style={{
                      background: pg === page ? "linear-gradient(135deg,#6366f1,#4f46e5)" : "rgba(255,255,255,0.06)",
                      border: pg === page ? "none" : "1px solid rgba(255,255,255,0.1)",
                      color: pg === page ? "white" : "rgba(255,255,255,0.6)",
                      boxShadow: pg === page ? "0 0 12px rgba(99,102,241,0.4)" : "none",
                    }}
                  >
                    {pg}
                  </button>
                );
              })}

              <button
                type="button"
                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                aria-label="Next page"
                className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 disabled:opacity-30"
                style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.7)" }}
              >
                <ChevronRight size={14} aria-hidden="true" />
              </button>
            </div>

            {/* Page size */}
            <div className="flex items-center gap-2 text-sm" style={{ color: "rgba(255,255,255,0.4)" }}>
              <span>Show</span>
              <select
                value={pageSize}
                onChange={e => { setPageSize(Number(e.target.value)); setPage(1); }}
                className="w-14 h-8 rounded-lg px-2 text-xs outline-none focus-visible:ring-2 focus-visible:ring-brand-500 cursor-pointer"
                style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.8)" }}
                aria-label="Items per page"
              >
                {PAGE_SIZES.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
              <span>per page</span>
            </div>
          </div>
        </>
      )}

      <EditProjectModal key={editProject?.id ?? "none"} project={editProject} onClose={() => setEditProject(null)} onSaved={handleEdited} />
      <DeleteProjectModal project={deleteProject} onClose={() => setDeleteProject(null)} onDeleted={handleDeleted} />
    </>
  );
}