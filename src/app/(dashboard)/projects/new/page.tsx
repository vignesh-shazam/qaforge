import type { Metadata } from "next";
import Link from "next/link";
import { CreateProjectForm } from "./CreateProjectForm";

export const metadata: Metadata = {
  title: "New project",
};

export default function NewProjectPage(): React.JSX.Element {
  return (
    <div className="flex flex-col gap-6 max-w-2xl">
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb">
        <ol className="flex items-center gap-2 text-sm text-content-tertiary list-none">
          <li>
            <Link
              href="/projects"
              className="hover:text-content-secondary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 rounded"
            >
              Projects
            </Link>
          </li>
          <li aria-hidden="true">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m9 18 6-6-6-6" />
            </svg>
          </li>
          <li className="text-content-primary" aria-current="page">
            New project
          </li>
        </ol>
      </nav>

      {/* Page header */}
      <div>
        <h1 className="text-2xl font-bold text-content-primary tracking-tight">
          Create a new project
        </h1>
        <p className="mt-1 text-sm text-content-secondary">
          Set up a QA project for your web application
        </p>
      </div>

      {/* Form card */}
      <div className="rounded-xl border border-surface-700 bg-surface-800 p-6">
        <CreateProjectForm />
      </div>
    </div>
  );
}
