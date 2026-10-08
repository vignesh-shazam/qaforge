"use client";

import { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";
import type { Project, ProjectStatus } from "@/lib/projects/types";

interface EditProjectModalProps {
  project: Project | null;
  onClose: () => void;
  onSaved: (updated: Project) => void;
}

const STATUSES: ProjectStatus[] = ["Active", "Draft", "Archived"];

/**
 * Rendered with key={project?.id} from the parent so React recreates
 * the component (and resets state) whenever a different project is edited.
 */
export function EditProjectModal({ project, onClose, onSaved }: EditProjectModalProps): React.JSX.Element | null {
  const [name, setName] = useState(project?.name ?? "");
  const [description, setDescription] = useState(project?.description ?? "");
  const [targetUrl, setTargetUrl] = useState(project?.targetUrl ?? "");
  const [status, setStatus] = useState<ProjectStatus>((project?.status ?? "Active") as ProjectStatus);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect((): void => {
    if (project && panelRef.current) panelRef.current.focus();
  }, [project]);

  useEffect((): (() => void) | void => {
    if (!project) return;
    function onKey(e: KeyboardEvent): void { if (e.key === "Escape") onClose(); }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [project, onClose]);

  if (!project) return null;

  async function handleSave(e: React.FormEvent): Promise<void> {
    e.preventDefault();
    if (!project) return;
    setSaving(true); setError(null);
    try {
      const res = await fetch(`/api/projects/${project.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name.trim(), description: description.trim() || null, targetUrl: targetUrl.trim() || null, status }),
      });
      const data = await res.json() as { success: boolean; data?: Project; error?: string };
      if (!res.ok || !data.success) { setError(data.error ?? "Unable to save changes."); setSaving(false); return; }
      onSaved(data.data!);
      onClose();
    } catch {
      setError("A network error occurred."); setSaving(false);
    }
  }

  const inputClass = "w-full h-10 rounded-xl px-3 text-sm outline-none transition-colors focus-visible:ring-2 focus-visible:ring-brand-500";
  const inputStyle = { background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.85)" };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" role="dialog" aria-modal="true" aria-label="Edit Project">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" aria-hidden="true" onClick={onClose} />
      <div
        ref={panelRef}
        tabIndex={-1}
        className="relative w-full max-w-md rounded-2xl outline-none"
        style={{ background: "rgba(8,9,22,0.98)", border: "1px solid rgba(99,102,241,0.25)", boxShadow: "0 0 50px rgba(99,102,241,0.15), 0 24px 60px rgba(0,0,0,0.7)" }}
      >
        <button type="button" onClick={onClose} aria-label="Close" className="absolute top-4 right-4 w-7 h-7 rounded-lg flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500" style={{ color: "rgba(255,255,255,0.4)", background: "rgba(255,255,255,0.06)" }}>
          <X size={15} aria-hidden="true" />
        </button>
        <div className="p-6">
          <h2 className="text-base font-semibold text-white mb-1">Edit Project</h2>
          <p className="text-xs mb-5" style={{ color: "rgba(255,255,255,0.45)" }}>Update your project details.</p>

          {error && <div className="rounded-lg px-3 py-2.5 text-xs mb-4" role="alert" style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.3)", color: "#fca5a5" }}>{error}</div>}

          <form onSubmit={handleSave} noValidate className="flex flex-col gap-4">
            <div>
              <label className="text-xs font-medium mb-1.5 block" style={{ color: "rgba(255,255,255,0.7)" }}>Project Name <span style={{ color: "#f87171" }}>*</span></label>
              <input required value={name} onChange={e => setName(e.target.value)} disabled={saving} className={inputClass} style={inputStyle} />
            </div>
            <div>
              <label className="text-xs font-medium mb-1.5 block" style={{ color: "rgba(255,255,255,0.7)" }}>Description</label>
              <textarea value={description} onChange={e => setDescription(e.target.value)} disabled={saving} rows={3} className="w-full rounded-xl px-3 py-2.5 text-sm outline-none resize-none focus-visible:ring-2 focus-visible:ring-brand-500" style={inputStyle} />
              <p className="text-[10px] text-right mt-1" style={{ color: "rgba(255,255,255,0.25)" }}>{description.length}/500</p>
            </div>
            <div>
              <label className="text-xs font-medium mb-1.5 block" style={{ color: "rgba(255,255,255,0.7)" }}>Application URL</label>
              <input value={targetUrl} onChange={e => setTargetUrl(e.target.value)} disabled={saving} type="url" placeholder="https://example.com" className={inputClass} style={inputStyle} />
            </div>
            <div>
              <label className="text-xs font-medium mb-1.5 block" style={{ color: "rgba(255,255,255,0.7)" }}>Project Status</label>
              <select value={status} onChange={e => setStatus(e.target.value as ProjectStatus)} disabled={saving} className={inputClass} style={{ ...inputStyle, cursor: "pointer" }}>
                {STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <div className="flex items-center justify-end gap-3 pt-2">
              <button type="button" onClick={onClose} disabled={saving} className="h-9 px-4 rounded-xl text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 disabled:opacity-50" style={{ color: "rgba(255,255,255,0.6)", background: "rgba(255,255,255,0.06)" }}>Cancel</button>
              <button type="submit" disabled={saving} className="h-9 px-5 rounded-xl text-sm font-semibold text-white transition-all hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 disabled:opacity-60" style={{ background: "linear-gradient(135deg,#6366f1,#4f46e5)", boxShadow: "0 0 14px rgba(99,102,241,0.35)" }}>
                {saving ? "Saving…" : "Save Changes"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}