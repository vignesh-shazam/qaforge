import type { Metadata } from "next";
import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card";

export const metadata: Metadata = {
  title: "Project overview",
};

interface ProjectPageProps {
  params: Promise<{ id: string }>;
}

const placeholderSections = [
  {
    title: "Discovery",
    description: "URL crawling and page map",
    badge: "V0.4",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" />
      </svg>
    ),
  },
  {
    title: "Test Generation",
    description: "AI-generated Playwright suites",
    badge: "V0.5",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" />
      </svg>
    ),
  },
  {
    title: "Quality Score",
    description: "Automation quality metrics",
    badge: "V0.6",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 20h9" /><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
      </svg>
    ),
  },
  {
    title: "CI/CD Execution",
    description: "GitHub integration and execution",
    badge: "V0.7",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="10" /><polygon points="10 8 16 12 10 16 10 8" />
      </svg>
    ),
  },
] as const;

export default async function ProjectPage({
  params,
}: ProjectPageProps): Promise<React.JSX.Element> {
  const { id } = await params;

  // V0.1: Placeholder — real project data fetched from DB in V0.3
  const project = {
    id,
    name: "Project " + id.slice(0, 8),
    description: null as string | null,
    targetUrl: null as string | null,
    createdAt: new Date(),
  };

  return (
    <div className="flex flex-col gap-6">
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
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m9 18 6-6-6-6" />
            </svg>
          </li>
          <li className="text-content-primary truncate max-w-[180px]" aria-current="page">
            {project.name}
          </li>
        </ol>
      </nav>

      {/* Project header */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex flex-col gap-1 min-w-0">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold text-content-primary tracking-tight truncate">
              {project.name}
            </h1>
            <Badge variant="default">V0.1</Badge>
          </div>
          {project.targetUrl ? (
            <p className="text-sm text-content-secondary truncate">
              {project.targetUrl}
            </p>
          ) : (
            <p className="text-sm text-content-tertiary italic">
              No target URL set
            </p>
          )}
        </div>
      </div>

      {/* Coming soon sections */}
      <section aria-labelledby="features-heading">
        <h2
          id="features-heading"
          className="text-sm font-semibold text-content-tertiary uppercase tracking-wider mb-4"
        >
          Upcoming features
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {placeholderSections.map((section) => (
            <Card key={section.title} className="opacity-60">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-surface-700 text-content-tertiary">
                    {section.icon}
                  </div>
                  <Badge variant="default">{section.badge}</Badge>
                </div>
                <CardTitle className="text-sm mt-3">{section.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>{section.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Foundation notice */}
      <div className="rounded-xl border border-surface-700 bg-surface-800/50 p-4">
        <p className="text-xs text-content-tertiary leading-relaxed">
          <span className="text-content-secondary font-medium">V0.1 Foundation</span> — This project shell is ready. Full project management, discovery, test generation, and execution features are coming in V0.3–V0.7.
        </p>
      </div>
    </div>
  );
}
