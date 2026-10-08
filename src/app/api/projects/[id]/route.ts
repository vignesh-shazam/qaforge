/**
 * GET    /api/projects/[id] — get one project (owner only)
 * PATCH  /api/projects/[id] — update project (owner only)
 * DELETE /api/projects/[id] — delete project (owner only)
 */
export const dynamic = "force-dynamic";

import { type NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { getCurrentUser } from "@/lib/auth/session";
import { db } from "@/lib/db";

const VALID_STATUSES = ["Active", "Draft", "Archived"] as const;

const updateSchema = z.object({
  name: z.string().min(2).max(100).optional(),
  description: z.string().max(500).optional().nullable(),
  targetUrl: z.string().url().optional().nullable().or(z.literal("")),
  status: z.enum(VALID_STATUSES).optional(),
});

interface RouteContext {
  params: Promise<{ id: string }>;
}

type OwnedProject = {
  id: string;
  name: string;
  description: string | null;
  targetUrl: string | null;
  status: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
} | null;

async function getOwnedProject(projectId: string, userId: string): Promise<OwnedProject> {
  const project = await db.project.findUnique({
    where: { id: projectId },
    select: {
      id: true,
      name: true,
      description: true,
      targetUrl: true,
      status: true,
      userId: true,
      createdAt: true,
      updatedAt: true,
    },
  });
  if (!project || project.userId !== userId) return null;
  return project;
}

export async function GET(_req: NextRequest, ctx: RouteContext): Promise<NextResponse> {
  try {
    const user = await getCurrentUser();
    if (!user) return NextResponse.json({ success: false, error: "Not authenticated." }, { status: 401 });
    const { id } = await ctx.params;
    const project = await getOwnedProject(id, user.userId);
    if (!project) return NextResponse.json({ success: false, error: "Project not found." }, { status: 404 });
    const { userId: _uid, ...safe } = project;
    return NextResponse.json({ success: true, data: safe });
  } catch (error) {
    console.error("[GET /api/projects/[id]]", error);
    return NextResponse.json({ success: false, error: "Unable to fetch project." }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest, ctx: RouteContext): Promise<NextResponse> {
  try {
    const user = await getCurrentUser();
    if (!user) return NextResponse.json({ success: false, error: "Not authenticated." }, { status: 401 });
    const { id } = await ctx.params;
    const existing = await getOwnedProject(id, user.userId);
    if (!existing) return NextResponse.json({ success: false, error: "Project not found." }, { status: 404 });

    let body: unknown;
    try { body = await request.json(); } catch {
      return NextResponse.json({ success: false, error: "Invalid request body." }, { status: 400 });
    }
    const parsed = updateSchema.safeParse(body);
    if (!parsed.success) return NextResponse.json({ success: false, error: "Invalid input." }, { status: 400 });

    const { name, description, targetUrl, status } = parsed.data;
    const updated = await db.project.update({
      where: { id },
      data: {
        ...(name !== undefined ? { name: name.trim() } : {}),
        ...(description !== undefined ? { description: description?.trim() || null } : {}),
        ...(targetUrl !== undefined ? { targetUrl: targetUrl?.trim() || null } : {}),
        ...(status !== undefined ? { status } : {}),
      },
      select: {
        id: true,
        name: true,
        description: true,
        targetUrl: true,
        status: true,
        createdAt: true,
        updatedAt: true,
      },
    });
    return NextResponse.json({ success: true, data: updated });
  } catch (error) {
    console.error("[PATCH /api/projects/[id]]", error);
    return NextResponse.json({ success: false, error: "Unable to update project." }, { status: 500 });
  }
}

export async function DELETE(_req: NextRequest, ctx: RouteContext): Promise<NextResponse> {
  try {
    const user = await getCurrentUser();
    if (!user) return NextResponse.json({ success: false, error: "Not authenticated." }, { status: 401 });
    const { id } = await ctx.params;
    const existing = await getOwnedProject(id, user.userId);
    if (!existing) return NextResponse.json({ success: false, error: "Project not found." }, { status: 404 });
    await db.project.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[DELETE /api/projects/[id]]", error);
    return NextResponse.json({ success: false, error: "Unable to delete project." }, { status: 500 });
  }
}
