import type { Metadata } from "next";
import Link from "next/link";
import { Plus } from "lucide-react";
import { ProjectsClient } from "@/components/projects/ProjectsClient";

export const metadata: Metadata = {
  title: "Projects | QAForge",
  robots: { index: false, follow: false },
};

export default function ProjectsPage(): React.JSX.Element {
  return (
    <div className="flex flex-col gap-6 min-w-0">
      {/* Page header */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Projects</h1>
          <p className="mt-1 text-sm" style={{ color: "rgba(255,255,255,0.5)" }}>
            Manage your QA projects, analyze applications and generate test cases.
          </p>
        </div>
        <Link
          href="/projects/new"
          className="inline-flex items-center gap-2 h-9 px-4 rounded-xl text-sm font-semibold text-white transition-all hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 shrink-0"
          style={{ background: "linear-gradient(135deg,#6366f1,#4f46e5)", boxShadow: "0 0 14px rgba(99,102,241,0.3)" }}
        >
          <Plus size={15} aria-hidden="true" />
          Create New Project
        </Link>
      </div>

      {/* Interactive client content */}
      <ProjectsClient />
    </div>
  );
}