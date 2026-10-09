import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth/session";
import { db } from "@/lib/db";
import type { Project } from "@/lib/projects/types";
import { ProjectOverviewClient } from "@/components/projects/ProjectOverviewClient";

export const metadata: Metadata = {
  title: "Project Overview | QAForge",
  robots: { index: false, follow: false },
};

interface ProjectPageProps {
  params: Promise<{ id: string }>;
}

export default async function ProjectPage({ params }: ProjectPageProps): Promise<React.JSX.Element> {
  const user = await getCurrentUser();
  if (!user) redirect("/login?next=/projects");

  const { id } = await params;

  const raw = await db.project.findUnique({
    where: { id },
    select: { id: true, name: true, description: true, targetUrl: true, status: true, userId: true, createdAt: true, updatedAt: true },
  });

  if (!raw || raw.userId !== user.userId) notFound();

  const project: Project = {
    id: raw.id,
    name: raw.name,
    description: raw.description,
    targetUrl: raw.targetUrl,
    status: raw.status as Project["status"],
    thumbnail: null, // column pending migration
    createdAt: raw.createdAt.toISOString(),
    updatedAt: raw.updatedAt.toISOString(),
  };

  return (
    <div className="flex flex-col gap-6 min-w-0">
      <ProjectOverviewClient project={project} />
    </div>
  );
}