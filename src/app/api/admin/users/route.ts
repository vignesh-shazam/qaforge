
import { NextResponse, type NextRequest } from "next/server";
import { getCurrentUser } from "@/lib/auth/session";
import { isAdminOwner } from "@/lib/admin/authorization";
import { db } from "@/lib/db";

export const dynamic = "force-dynamic";

const ALLOWED_PAGE_SIZES = [10, 20, 50, 100] as const;
type PageSize = (typeof ALLOWED_PAGE_SIZES)[number];

function parsePositiveInteger(
  value: string | null,
  fallback: number,
): number {
  if (!value) return fallback;

  const parsed = Number(value);

  return Number.isSafeInteger(parsed) && parsed > 0
    ? parsed
    : fallback;
}

function parsePageSize(value: string | null): PageSize {
  const parsed = parsePositiveInteger(value, 10);

  return ALLOWED_PAGE_SIZES.includes(parsed as PageSize)
    ? (parsed as PageSize)
    : 10;
}

export async function GET(request: NextRequest): Promise<NextResponse> {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return NextResponse.json(
        { success: false, error: "Authentication required." },
        { status: 401 },
      );
    }

    if (!(await isAdminOwner())) {
      return NextResponse.json(
        { success: false, error: "Admin owner access required." },
        { status: 403 },
      );
    }

    const params = request.nextUrl.searchParams;
    const search = (params.get("search") ?? "").trim().slice(0, 100);
    const page = Math.min(
      parsePositiveInteger(params.get("page"), 1),
      1_000_000,
    );
    const pageSize = parsePageSize(params.get("pageSize"));

    const where = search
      ? {
          OR: [
            {
              name: {
                contains: search,
                mode: "insensitive" as const,
              },
            },
            {
              email: {
                contains: search,
                mode: "insensitive" as const,
              },
            },
          ],
        }
      : {};

    const [total, users] = await db.$transaction([
      db.user.count({ where }),
      db.user.findMany({
        where,
        select: {
          id: true,
          name: true,
          email: true,
          createdAt: true,
          _count: {
            select: { projects: true },
          },
        },
        orderBy: { createdAt: "desc" },
        skip: (page - 1) * pageSize,
        take: pageSize,
      }),
    ]);

    return NextResponse.json(
      {
        success: true,
        data: users.map((user) => ({
          id: user.id,
          name: user.name,
          email: user.email,
          createdAt: user.createdAt.toISOString(),
          projectCount: user._count.projects,
          status: "active",
        })),
        pagination: {
          page,
          pageSize,
          total,
          totalPages: Math.ceil(total / pageSize),
        },
      },
      {
        headers: {
          "Cache-Control": "no-store",
        },
      },
    );
  } catch (error) {
    console.error("[GET /api/admin/users]", error);

    return NextResponse.json(
      { success: false, error: "Unable to load users." },
      { status: 500 },
    );
  }
}
