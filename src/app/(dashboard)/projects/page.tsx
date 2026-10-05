import type { Metadata } from "next";
import Link from "next/link";
import { EmptyState } from "@/components/ui/EmptyState";

export const metadata: Metadata = {
  title: "Projects",
};

export default function ProjectsPage(): React.JSX.Element {
  // V0.1: No real data — empty state shown by default
  // V0.3 will wire up real project data from Prisma
  const projects: unknown[] = [];

  return (
    <div className="flex flex-col gap-6">
      {/* Page header */}
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-content-primary tracking-tight">
            Projects
          </h1>
          <p className="mt-1 text-sm text-content-secondary">
            Manage your QA automation projects
          </p>
        </div>

        <Link
          href="/projects/new"
          className="inline-flex items-center justify-center gap-2 h-9 px-4 text-sm font-medium rounded-md bg-brand-500 text-white hover:bg-brand-600 active:bg-brand-700 transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 focus-visible:ring-offset-surface-900"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M5 12h14" />
            <path d="M12 5v14" />
          </svg>
          New project
        </Link>
      </div>

      {/* Content */}
      {projects.length === 0 ? (
        <div className="rounded-xl border border-surface-700 bg-surface-800 min-h-[360px] flex items-center justify-center">
          <EmptyState
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M3 3h6l2 3h10a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z" />
              </svg>
            }
            title="No projects yet"
            description="Create your first project to start building an automation framework for your web application."
            action={
              <Link
                href="/projects/new"
                className="inline-flex items-center justify-center gap-2 h-9 px-4 text-sm font-medium rounded-md bg-brand-500 text-white hover:bg-brand-600 transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 focus-visible:ring-offset-surface-900"
              >
                Create project
              </Link>
            }
          />
        </div>
      ) : null}
    </div>
  );
}
