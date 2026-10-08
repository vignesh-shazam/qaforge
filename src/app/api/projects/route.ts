/**
 * GET  /api/projects — list authenticated user's projects
 * POST /api/projects — create a new project
 */

export const dynamic = "force-dynamic";

import { type NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { getCurrentUser } from "@/lib/auth/session";
import { db } from "@/lib/db";

const VALID_STATUSES = ["Active", "Draft", "Archived"] as const;

type ProjectStatus = (typeof VALID_STATUSES)[number];

const createSchema = z.object({
  name: z.string().min(2).max(100),
  description: z.string().max(500).optional(),
  targetUrl: z.string().url().optional().or(z.literal("")),
  status: z.enum(VALID_STATUSES).optional(),
});

function isProjectStatus(value: string): value is ProjectStatus {
  return VALID_STATUSES.includes(value as ProjectStatus);
}

/**
 * GET /api/projects
 * List projects belonging to the authenticated user.
 */
export async function GET(
  request: NextRequest,
): Promise<NextResponse> {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          error: "Not authenticated.",
        },
        { status: 401 },
      );
    }

    const { searchParams } = request.nextUrl;

    const search = searchParams.get("search") ?? "";
    const statusParam = searchParams.get("status") ?? "all";
    const sort = searchParams.get("sort") ?? "latest";

    /**
     * Query parameters are strings.
     * Narrow the status to our valid ProjectStatus union before
     * passing it to Prisma.
     */
    let status: ProjectStatus | undefined;

    if (statusParam !== "all" && isProjectStatus(statusParam)) {
      status = statusParam;
    }

    const projects = await db.project.findMany({
      where: {
        userId: user.userId,

        ...(status !== undefined
          ? {
              status,
            }
          : {}),

        ...(search.trim()
          ? {
              OR: [
                {
                  name: {
                    contains: search.trim(),
                    mode: "insensitive",
                  },
                },
                {
                  targetUrl: {
                    contains: search.trim(),
                    mode: "insensitive",
                  },
                },
              ],
            }
          : {}),
      },

      orderBy:
        sort === "oldest"
          ? { createdAt: "asc" }
          : sort === "name-asc"
            ? { name: "asc" }
            : sort === "name-desc"
              ? { name: "desc" }
              : { createdAt: "desc" },

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

    return NextResponse.json({
      success: true,
      data: projects,
    });
  } catch (error) {
    console.error("[GET /api/projects]", error);

    return NextResponse.json(
      {
        success: false,
        error: "Unable to fetch projects.",
      },
      { status: 500 },
    );
  }
}

/**
 * POST /api/projects
 * Create a new project for the authenticated user.
 */
export async function POST(
  request: NextRequest,
): Promise<NextResponse> {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          error: "Not authenticated.",
        },
        { status: 401 },
      );
    }

    let body: unknown;

    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid request body.",
        },
        { status: 400 },
      );
    }

    const parsed = createSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid input.",
          fields: parsed.error.flatten().fieldErrors,
        },
        { status: 400 },
      );
    }

    const {
      name,
      description,
      targetUrl,
      status,
    } = parsed.data;

    const project = await db.project.create({
      data: {
        name: name.trim(),
        description: description?.trim() || null,
        targetUrl: targetUrl?.trim() || null,
        status: status ?? "Active",
        userId: user.userId,
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

    return NextResponse.json(
      {
        success: true,
        data: project,
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("[POST /api/projects]", error);

    return NextResponse.json(
      {
        success: false,
        error: "Unable to create project.",
      },
      { status: 500 },
    );
  }
}