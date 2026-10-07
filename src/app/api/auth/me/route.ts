/**
 * GET /api/auth/me
 * Returns the currently authenticated user's safe profile,
 * or 401 if not authenticated.
 */

// Force dynamic rendering — prevents static evaluation at build time.
export const dynamic = "force-dynamic";
import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth/session";

export async function GET(): Promise<NextResponse> {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json(
        { success: false, error: "Not authenticated." },
        { status: 401 },
      );
    }
    return NextResponse.json({ success: true, data: user });
  } catch (error) {
    console.error("[GET /api/auth/me]", error);
    return NextResponse.json(
      { success: false, error: "An unexpected error occurred." },
      { status: 500 },
    );
  }
}
