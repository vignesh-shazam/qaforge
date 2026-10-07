/**
 * POST /api/auth/login
 * Authenticates a user and creates a session.
 */

import { type NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { normalizeEmail } from "@/lib/auth/email";
import { verifyPassword } from "@/lib/auth/password";
import { findUserByEmail } from "@/lib/auth/user-repository";
import { getSession } from "@/lib/auth/session";
import { checkLoginRateLimit } from "@/lib/auth/rate-limit";

// Generic error — never reveal whether email exists
const INVALID_CREDENTIALS = "Invalid email or password.";

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1).max(128),
});

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    // Rate limiting
    const ip = request.headers.get("x-forwarded-for") ?? "unknown";
    const rateLimit = checkLoginRateLimit(ip);
    if (!rateLimit.allowed) {
      return NextResponse.json(
        { success: false, error: "Too many login attempts. Please try again later." },
        { status: 429, headers: { "Retry-After": String(Math.ceil((rateLimit.retryAfterMs ?? 60000) / 1000)) } },
      );
    }

    let body: unknown;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { success: false, error: "Invalid request body." },
        { status: 400 },
      );
    }

    const parsed = loginSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { success: false, error: INVALID_CREDENTIALS },
        { status: 401 },
      );
    }

    const email = normalizeEmail(parsed.data.email);
    const user = await findUserByEmail(email);

    // Always verify even if user not found (constant-time to prevent enumeration)
    const passwordMatch = user
      ? await verifyPassword(parsed.data.password, user.passwordHash)
      : await verifyPassword(parsed.data.password, "$2b$12$invalidhashfortimingprotection00000000000000000000");

    if (!user || !passwordMatch) {
      return NextResponse.json(
        { success: false, error: INVALID_CREDENTIALS },
        { status: 401 },
      );
    }

    // Create session — minimum identity data only
    const session = await getSession();
    session.userId = user.id;
    session.name = user.name ?? "";
    session.email = user.email;
    await session.save();

    return NextResponse.json({
      success: true,
      data: { id: user.id, name: user.name, email: user.email },
    });
  } catch (error) {
    console.error("[POST /api/auth/login]", error);
    return NextResponse.json(
      { success: false, error: "An unexpected error occurred. Please try again." },
      { status: 500 },
    );
  }
}
