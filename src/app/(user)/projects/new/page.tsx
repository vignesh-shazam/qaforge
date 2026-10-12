import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { CreateProjectForm } from "./CreateProjectForm";

export const metadata: Metadata = {
  title: "Create Project | QAForge",
  robots: { index: false, follow: false },
};

export default function NewProjectPage(): React.JSX.Element {
  return (
    <div className="flex flex-col gap-6 max-w-lg mx-auto min-w-0">
      {/* Back */}
      <Link
        href="/projects"
        className="inline-flex items-center gap-1.5 text-sm transition-opacity hover:opacity-70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 rounded self-start"
        style={{ color: "rgba(255,255,255,0.45)" }}
      >
        <ArrowLeft size={15} aria-hidden="true" />
        Back to Projects
      </Link>

      {/* Heading */}
      <div>
        <h1 className="text-2xl font-bold text-white tracking-tight">Create New Project</h1>
        <p className="mt-1 text-sm" style={{ color: "rgba(255,255,255,0.5)" }}>
          Add a new QA project to start analyzing your application.
        </p>
      </div>

      {/* Form card */}
      <div
        className="rounded-2xl p-6"
        style={{
          background: "rgba(255,255,255,0.025)",
          border: "1px solid rgba(255,255,255,0.07)",
          boxShadow: "0 0 30px rgba(99,102,241,0.06)",
        }}
      >
        <CreateProjectForm />
      </div>
    </div>
  );
}