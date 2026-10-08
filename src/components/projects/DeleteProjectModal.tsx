"use client";

import { useState, useEffect, useRef } from "react";
import { X, Trash2 } from "lucide-react";
import type { Project } from "@/lib/projects/types";
import { ProjectThumbnail } from "./ProjectThumbnail";

interface DeleteProjectModalProps {
  project: Project | null;
  onClose: () => void;
  onDeleted: (projectId: string) => void;
}

export function DeleteProjectModal({ project, onClose, onDeleted }: DeleteProjectModalProps): React.JSX.Element | null {
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!project) return;
    function onKey(e: KeyboardEvent): void { if (e.key === "Escape") onClose(); }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [project, onClose]);

  useEffect(() => {
    if (project && panelRef.current) panelRef.current.focus();
  }, [project]);

  if (!project) return null;

  async function handleDelete(): Promise<void> {
    if (!project) return;
    setDeleting(true); setError(null);
    try {
      const res = await fetch(`/api/projects/${project.id}`, { method: "DELETE" });
      const data = await res.json() as { success: boolean; error?: string };
      if (!res.ok || !data.success) { setError(data.error ?? "Unable to delete project."); setDeleting(false); return; }
      onDeleted(project.id);
      onClose();
    } catch {
      setError("A network error occurred."); setDeleting(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" role="dialog" aria-modal="true" aria-label="Delete Project">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" aria-hidden="true" onClick={onClose} />
      <div
        ref={panelRef}
        tabIndex={-1}
        className="relative w-full max-w-sm rounded-2xl outline-none"
        style={{ background: "rgba(8,9,22,0.98)", border: "1px solid rgba(239,68,68,0.25)", boxShadow: "0 0 40px rgba(239,68,68,0.1), 0 24px 60px rgba(0,0,0,0.7)" }}
      >
        <button type="button" onClick={onClose} aria-label="Close" className="absolute top-4 right-4 w-7 h-7 rounded-lg flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500" style={{ color: "rgba(255,255,255,0.4)", background: "rgba(255,255,255,0.06)" }}>
          <X size={15} aria-hidden="true" />
        </button>
        <div className="p-6">
          <div className="flex justify-center mb-4">
            <div className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{ background: "rgba(239,68,68,0.15)", border: "1px solid rgba(239,68,68,0.3)" }}>
              <Trash2 size={22} style={{ color: "#f87171" }} aria-hidden="true" />
            </div>
          </div>
          <h2 className="text-base font-semibold text-white text-center mb-2">Delete Project?</h2>
          <p className="text-xs text-center mb-5 leading-relaxed" style={{ color: "rgba(255,255,255,0.45)" }}>
            This action cannot be undone. This will permanently delete your project and all associated data.
          </p>

          {/* Project preview */}
          <div className="flex items-center gap-3 rounded-xl p-3 mb-5" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)" }}>
            <ProjectThumbnail name={project.name} targetUrl={project.targetUrl} size="sm" />
            <div className="min-w-0">
              <p className="text-sm font-semibold text-white truncate">{project.name}</p>
              {project.targetUrl && <p className="text-[11px] truncate" style={{ color: "rgba(99,102,241,0.8)" }}>{project.targetUrl}</p>}
            </div>
          </div>

          {error && <div className="rounded-lg px-3 py-2 text-xs mb-4" role="alert" style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.3)", color: "#fca5a5" }}>{error}</div>}

          <div className="flex items-center gap-3">
            <button type="button" onClick={onClose} disabled={deleting} className="flex-1 h-9 rounded-xl text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 disabled:opacity-50" style={{ color: "rgba(255,255,255,0.6)", background: "rgba(255,255,255,0.06)" }}>Cancel</button>
            <button type="button" onClick={handleDelete} disabled={deleting} className="flex-1 h-9 rounded-xl text-sm font-semibold text-white transition-all hover:scale-[1.01] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 disabled:opacity-60" style={{ background: "linear-gradient(135deg,#dc2626,#b91c1c)", boxShadow: "0 0 14px rgba(220,38,38,0.3)" }}>
              {deleting ? "Deleting…" : "Delete Project"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}