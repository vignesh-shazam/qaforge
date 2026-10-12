"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { ProjectStatus } from "@/lib/projects/types";

const STATUSES: ProjectStatus[] = ["Active", "Draft", "Archived"];

export function CreateProjectForm(): React.JSX.Element {
  const router = useRouter();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [targetUrl, setTargetUrl] = useState("");
  const [status, setStatus] = useState<ProjectStatus>("Active");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [serverError, setServerError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent): Promise<void> {
    e.preventDefault();
    const errs: Record<string, string> = {};
    if (!name.trim()) errs.name = "Project name is required.";
    else if (name.trim().length < 2) errs.name = "Name must be at least 2 characters.";
    if (targetUrl.trim()) {
      try { const u = new URL(targetUrl.trim()); if (!["http:","https:"].includes(u.protocol)) errs.targetUrl = "URL must use http or https."; }
      catch { errs.targetUrl = "Please enter a valid URL."; }
    }
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }

    setLoading(true); setServerError(null);
    try {
      const res = await fetch("/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name.trim(), description: description.trim() || undefined, targetUrl: targetUrl.trim() || undefined, status }),
      });
      const data = await res.json() as { success: boolean; data?: { id: string }; error?: string };
      if (!res.ok || !data.success) { setServerError(data.error ?? "Unable to create project."); setLoading(false); return; }
      router.push(`/projects/${data.data!.id}`);
    } catch {
      setServerError("A network error occurred."); setLoading(false);
    }
  }

  const inputClass = "w-full h-10 rounded-xl px-3 text-sm outline-none transition-colors focus-visible:ring-2 focus-visible:ring-brand-500";
  const inputStyle = { background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.85)" };
  const errStyle = { background: "rgba(239,68,68,0.09)", border: "1px solid rgba(239,68,68,0.28)" };

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
      {serverError && <div className="rounded-xl px-4 py-3 text-sm" role="alert" style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.3)", color: "#fca5a5" }}>{serverError}</div>}

      {/* Name */}
      <div>
        <label htmlFor="name" className="text-sm font-medium mb-2 block" style={{ color: "rgba(255,255,255,0.8)" }}>
          Project Name <span style={{ color: "#f87171" }}>*</span>
        </label>
        <input id="name" value={name} onChange={e => { setName(e.target.value); setErrors(p => ({ ...p, name: "" })); }} disabled={loading} placeholder="E-commerce Website" className={inputClass} style={{ ...inputStyle, ...(errors.name ? errStyle : {}) }} aria-invalid={!!errors.name} aria-describedby={errors.name ? "name-err" : undefined} />
        {errors.name && <p id="name-err" className="text-xs mt-1.5" style={{ color: "#f87171" }} role="alert">{errors.name}</p>}
      </div>

      {/* Description */}
      <div>
        <label htmlFor="description" className="text-sm font-medium mb-2 block" style={{ color: "rgba(255,255,255,0.8)" }}>
          Description <span className="text-xs font-normal" style={{ color: "rgba(255,255,255,0.35)" }}>(optional)</span>
        </label>
        <textarea id="description" value={description} onChange={e => setDescription(e.target.value)} disabled={loading} rows={3} placeholder="Describe your project purpose and testing scope..." className="w-full rounded-xl px-3 py-2.5 text-sm outline-none resize-none focus-visible:ring-2 focus-visible:ring-brand-500" style={{ ...inputStyle, height: "80px" }} />
        <p className="text-[10px] text-right mt-1" style={{ color: "rgba(255,255,255,0.25)" }}>{description.length}/500</p>
      </div>

      {/* URL */}
      <div>
        <label htmlFor="targetUrl" className="text-sm font-medium mb-2 block" style={{ color: "rgba(255,255,255,0.8)" }}>
          Application URL <span style={{ color: "#f87171" }}>*</span>
        </label>
        <input id="targetUrl" type="url" value={targetUrl} onChange={e => { setTargetUrl(e.target.value); setErrors(p => ({ ...p, targetUrl: "" })); }} disabled={loading} placeholder="https://example.com" className={inputClass} style={{ ...inputStyle, ...(errors.targetUrl ? errStyle : {}) }} aria-invalid={!!errors.targetUrl} aria-describedby={errors.targetUrl ? "url-err" : undefined} />
        {errors.targetUrl && <p id="url-err" className="text-xs mt-1.5" style={{ color: "#f87171" }} role="alert">{errors.targetUrl}</p>}
        <p className="text-xs mt-1.5" style={{ color: "rgba(255,255,255,0.3)" }}>Enter the full URL of your application (e.g. https://app.example.com)</p>
      </div>

      {/* Status */}
      <div>
        <label htmlFor="status" className="text-sm font-medium mb-2 block" style={{ color: "rgba(255,255,255,0.8)" }}>Project Status</label>
        <select id="status" value={status} onChange={e => setStatus(e.target.value as ProjectStatus)} disabled={loading} className={inputClass} style={{ ...inputStyle, cursor: "pointer" }}>
          {STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
        </select>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3 pt-2">
        <button type="button" onClick={() => router.push("/projects")} disabled={loading} className="flex-1 h-10 rounded-xl text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 disabled:opacity-50" style={{ color: "rgba(255,255,255,0.6)", background: "rgba(255,255,255,0.06)" }}>
          Cancel
        </button>
        <button type="submit" disabled={loading} className="flex-1 h-10 rounded-xl text-sm font-semibold text-white transition-all hover:scale-[1.01] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 disabled:opacity-60" style={{ background: "linear-gradient(135deg,#6366f1,#4f46e5)", boxShadow: "0 0 14px rgba(99,102,241,0.35)" }}>
          {loading ? "Creating…" : "Create Project"}
        </button>
      </div>
    </form>
  );
}