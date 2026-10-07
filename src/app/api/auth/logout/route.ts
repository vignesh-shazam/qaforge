/**
 * POST /api/auth/logout
 * Destroys the current session and clears the session cookie.
 */

// Force dynamic rendering — prevents static evaluation at build time.
export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { destroySession } from "@/lib/auth/session";

export async function POST(): Promise<NextResponse> {
  try {
    await destroySession();
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[POST /api/auth/logout]", error);
    return NextResponse.json(
      { success: false, error: "An unexpected error occurred." },
      { status: 500 },
    );
  }
}
