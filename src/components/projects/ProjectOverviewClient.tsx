"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Edit2, MoreHorizontal, TestTube2, Bug, Zap, Database, Globe, Bot } from "lucide-react";
import type { Project } from "@/lib/projects/types";
import { StatusBadge } from "@/components/projects/StatusBadge";
import { ProjectThumbnail } from "@/components/projects/ProjectThumbnail";
import { EditProjectModal } from "@/components/projects/EditProjectModal";
import { DeleteProjectModal } from "@/components/projects/DeleteProjectModal";

interface ProjectOverviewClientProps {
  project: Project;
}

const tabs = ["Overview", "Test Cases", "Bugs", "Test Data", "Automation", "Settings"] as const;
type Tab = (typeof tabs)[number];

function formatRelative(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 2) return "just now";
  if (mins < 60) return `${mins} minutes ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs} hours ago`;
  return `${Math.floor(hrs / 24)} days ago`;
}

export function ProjectOverviewClient({ project: initial }: ProjectOverviewClientProps): React.JSX.Element {
  const router = useRouter();
  const [project, setProject] = useState<Project>(initial);
  const [activeTab, setActiveTab] = useState<Tab>("Overview");
  const [editing, setEditing] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  function handleEdited(updated: Project): void {
    setProject(updated);
  }

  function handleDeleted(): void {
    router.push("/projects");
  }

  const statCards = [
    { label: "Test Cases",     value: 0, icon: <TestTube2 size={18} aria-hidden="true" />, color: "#60a5fa", bg: "rgba(96,165,250,0.12)" },
    { label: "Open Bugs",      value: 0, icon: <Bug size={18} aria-hidden="true" />,       color: "#f87171", bg: "rgba(248,113,113,0.12)" },
    { label: "Automation Runs",value: 0, icon: <Zap size={18} aria-hidden="true" />,       color: "#4ade80", bg: "rgba(74,222,128,0.12)" },
    { label: "Test Data Sets",  value: 0, icon: <Database size={18} aria-hidden="true" />, color: "#fbbf24", bg: "rgba(251,191,36,0.12)" },
  ] as const;

  return (
    <>
      {/* Back link */}
      <Link
        href="/projects"
        className="inline-flex items-center gap-1.5 text-sm transition-opacity hover:opacity-70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 rounded self-start"
        style={{ color: "rgba(255,255,255,0.45)" }}
      >
        <ArrowLeft size={15} aria-hidden="true" />
        Back to Projects
      </Link>

      {/* Project header */}
      <div
        className="rounded-2xl p-6"
        style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.07)" }}
      >
        <div className="flex flex-col sm:flex-row items-start gap-4">
          <ProjectThumbnail name={project.name} targetUrl={project.targetUrl} size="lg" />
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3 flex-wrap">
              <h1 className="text-xl font-bold text-white truncate">{project.name}</h1>
              <StatusBadge status={project.status} size="md" />
            </div>
            {project.targetUrl && (
              <div className="flex items-center gap-1.5 mt-1">
                <Globe size={12} style={{ color: "rgba(99,102,241,0.7)" }} aria-hidden="true" />
                <span className="text-sm truncate" style={{ color: "rgba(99,102,241,0.8)" }}>{project.targetUrl}</span>
              </div>
            )}
            {project.description && (
              <p className="mt-2 text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.5)" }}>{project.description}</p>
            )}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => setEditing(true)}
              className="inline-flex items-center gap-1.5 h-8 px-3 rounded-lg text-xs font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
              style={{ color: "rgba(255,255,255,0.7)", background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.1)" }}
            >
              <Edit2 size={12} aria-hidden="true" /> Edit
            </button>
            <div className="relative">
              <button
                type="button"
                onClick={() => setMenuOpen(v => !v)}
                className="w-8 h-8 rounded-lg flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
                style={{ color: "rgba(255,255,255,0.4)", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" }}
                aria-label="More actions"
                aria-haspopup="menu"
                aria-expanded={menuOpen}
              >
                <MoreHorizontal size={14} aria-hidden="true" />
              </button>
              {menuOpen && (
                <>
                  <div className="fixed inset-0 z-40" aria-hidden="true" onClick={() => setMenuOpen(false)} />
                  <div className="absolute right-0 top-9 w-32 rounded-xl overflow-hidden z-50" role="menu" style={{ background: "rgba(8,9,22,0.98)", border: "1px solid rgba(255,255,255,0.1)", boxShadow: "0 12px 30px rgba(0,0,0,0.5)" }}>
                    <button type="button" role="menuitem" className="flex w-full items-center gap-2 px-3 py-2.5 text-xs focus-visible:outline-none" style={{ color: "#f87171" }}
                      onClick={() => { setMenuOpen(false); setDeleting(true); }}
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
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map(s => (
          <div key={s.label} className="rounded-2xl p-4 flex flex-col gap-3" style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.07)" }}>
            <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: s.bg, color: s.color }}>
              {s.icon}
            </div>
            <div>
              <p className="text-2xl font-bold text-white">{s.value}</p>
              <p className="text-xs mt-0.5" style={{ color: "rgba(255,255,255,0.4)" }}>{s.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div>
        <div className="flex items-center gap-1 overflow-x-auto pb-0" style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }} role="tablist">
          {tabs.map(tab => (
            <button
              key={tab}
              type="button"
              role="tab"
              aria-selected={activeTab === tab}
              onClick={() => setActiveTab(tab)}
              className="shrink-0 px-4 py-2.5 text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 rounded-t"
              style={{
                color: activeTab === tab ? "#a5b4fc" : "rgba(255,255,255,0.4)",
                borderBottom: activeTab === tab ? "2px solid #6366f1" : "2px solid transparent",
              }}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Tab content */}
        <div className="mt-6" role="tabpanel" aria-label={activeTab}>
          {activeTab === "Overview" ? (
            <div className="flex flex-col gap-6">
              {/* Analyze card */}
              <div
                className="rounded-2xl p-6"
                style={{ background: "linear-gradient(135deg,rgba(99,102,241,0.15) 0%,rgba(79,70,229,0.08) 100%)", border: "1px solid rgba(99,102,241,0.25)" }}
              >
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                  <div>
                    <h3 className="text-base font-semibold text-white mb-1">Analyze Your Application</h3>
                    <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.5)" }}>
                      Let QAForge discover pages, elements and flows from your application and generate test cases, find bugs, create test data and build automation.
                    </p>
                  </div>
                  <button
                    type="button"
                    disabled
                    className="shrink-0 inline-flex items-center gap-2 h-10 px-5 rounded-xl text-sm font-semibold text-white disabled:opacity-50 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
                    style={{ background: "linear-gradient(135deg,#6366f1,#4f46e5)", boxShadow: "0 0 14px rgba(99,102,241,0.35)" }}
                    title="URL analysis coming in V0.4"
                  >
                    <Bot size={15} aria-hidden="true" />
                    Analyze Application â†’
                  </button>
                </div>
              </div>

              {/* Recent activity */}
              <div className="rounded-2xl p-6" style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.07)" }}>
                <h3 className="text-sm font-semibold text-white mb-4">Recent Activity</h3>
                <div className="flex flex-col gap-3">
                  {[
                    { label: "Project created", desc: "You created this project", time: formatRelative(project.createdAt), color: "#4ade80" },
                    { label: "Project status updated", desc: `Status set to ${project.status}`, time: formatRelative(project.updatedAt), color: "#818cf8" },
                  ].map((activity, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="w-7 h-7 rounded-full flex items-center justify-center shrink-0 mt-0.5" style={{ background: `${activity.color}18`, border: `1px solid ${activity.color}30` }}>
                        <span className="w-2 h-2 rounded-full" style={{ background: activity.color }} aria-hidden="true" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-white">{activity.label}</p>
                        <p className="text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>{activity.desc}</p>
                      </div>
                      <span className="text-[11px] shrink-0" style={{ color: "rgba(255,255,255,0.3)" }}>{activity.time}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-14 gap-3">
              <p className="text-sm" style={{ color: "rgba(255,255,255,0.4)" }}>{activeTab} coming in a future release.</p>
            </div>
          )}
        </div>
      </div>

      <EditProjectModal key={project.id} project={editing ? project : null} onClose={() => setEditing(false)} onSaved={handleEdited} />
      <DeleteProjectModal project={deleting ? project : null} onClose={() => setDeleting(false)} onDeleted={handleDeleted} />
    </>
  );
}