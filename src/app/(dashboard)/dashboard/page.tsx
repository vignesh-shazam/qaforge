import type { Metadata } from "next";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";

export const metadata: Metadata = {
  title: "Dashboard",
};

const statCards = [
  {
    label: "Projects",
    value: "—",
    description: "Total projects",
    badge: null,
  },
  {
    label: "Test Suites",
    value: "—",
    description: "Generated suites",
    badge: { label: "V0.5", variant: "default" as const },
  },
  {
    label: "Tests Passing",
    value: "—",
    description: "Across all projects",
    badge: { label: "V0.5", variant: "default" as const },
  },
  {
    label: "Quality Score",
    value: "—",
    description: "Average score",
    badge: { label: "V0.6", variant: "default" as const },
  },
] as const;

export default function DashboardPage(): React.JSX.Element {
  return (
    <div className="flex flex-col gap-8">
      {/* Page header */}
      <div>
        <h1 className="text-2xl font-bold text-content-primary tracking-tight">
          Dashboard
        </h1>
        <p className="mt-1 text-sm text-content-secondary">
          Welcome to QAForge. Your automation overview will appear here.
        </p>
      </div>

      {/* Stat cards */}
      <section aria-labelledby="stats-heading">
        <h2 id="stats-heading" className="sr-only">
          Overview statistics
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {statCards.map((stat) => (
            <Card key={stat.label} className="p-0">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardDescription>{stat.label}</CardDescription>
                  {stat.badge && (
                    <Badge variant={stat.badge.variant}>
                      {stat.badge.label}
                    </Badge>
                  )}
                </div>
                <CardTitle className="text-3xl font-bold tabular-nums">
                  {stat.value}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-xs text-content-tertiary">
                  {stat.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Quick actions */}
      <section aria-labelledby="actions-heading">
        <h2
          id="actions-heading"
          className="text-base font-semibold text-content-primary mb-4"
        >
          Get started
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Link
            href="/projects/new"
            className="group flex items-start gap-4 rounded-xl border border-surface-700 bg-surface-800 p-5 hover:border-brand-500/50 hover:bg-surface-700/50 transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
          >
            <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-brand-500/10 text-brand-400 shrink-0 group-hover:bg-brand-500/20 transition-colors duration-150">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M5 12h14" />
                <path d="M12 5v14" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-semibold text-content-primary">
                New project
              </p>
              <p className="text-xs text-content-secondary mt-0.5">
                Connect a web application to get started
              </p>
            </div>
          </Link>

          <Link
            href="/projects"
            className="group flex items-start gap-4 rounded-xl border border-surface-700 bg-surface-800 p-5 hover:border-surface-600 hover:bg-surface-700/50 transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
          >
            <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-surface-700 text-content-tertiary shrink-0 group-hover:bg-surface-600 transition-colors duration-150">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
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
            </div>
            <div>
              <p className="text-sm font-semibold text-content-primary">
                View projects
              </p>
              <p className="text-xs text-content-secondary mt-0.5">
                Browse and manage your QA projects
              </p>
            </div>
          </Link>
        </div>
      </section>

      {/* Coming soon notice */}
      <div className="rounded-xl border border-surface-700 bg-surface-800/50 p-5">
        <div className="flex items-start gap-3">
          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-brand-500/10 text-brand-400 shrink-0 mt-0.5">
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
              <circle cx="12" cy="12" r="10" />
              <path d="M12 8v4" />
              <path d="M12 16h.01" />
            </svg>
          </div>
          <div>
            <p className="text-sm font-semibold text-content-primary">
              V0.1 Foundation
            </p>
            <p className="text-xs text-content-secondary mt-1 leading-relaxed">
              You&apos;re looking at the QAForge V0.1 foundation. Authentication,
              test generation, and AI features are coming in future releases.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
