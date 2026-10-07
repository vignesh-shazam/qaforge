/**
 * POST /api/auth/register
 * Creates a new user account.
 */

import { type NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { normalizeEmail } from "@/lib/auth/email";
import { hashPassword } from "@/lib/auth/password";
import { createUser, findUserByEmail } from "@/lib/auth/user-repository";
import { getSession } from "@/lib/auth/session";
import { checkRegisterRateLimit } from "@/lib/auth/rate-limit";
import { validateRegisterForm } from "@/lib/auth-validation";

// ---------------------------------------------------------------------------
// Request schema
// ---------------------------------------------------------------------------

const registerSchema = z.object({
  name: z.string().min(1).max(100),
  email: z.string().email(),
  password: z.string().min(8).max(128),
  confirmPassword: z.string(),
});

// ---------------------------------------------------------------------------
// Handler
// ---------------------------------------------------------------------------

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    // Rate limiting
    const ip = request.headers.get("x-forwarded-for") ?? "unknown";
    const rateLimit = checkRegisterRateLimit(ip);
    if (!rateLimit.allowed) {
      return NextResponse.json(
        { success: false, error: "Too many registration attempts. Please try again later." },
        { status: 429, headers: { "Retry-After": String(Math.ceil((rateLimit.retryAfterMs ?? 60000) / 1000)) } },
      );
    }

    // Parse body
    let body: unknown;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { success: false, error: "Invalid request body." },
        { status: 400 },
      );
    }

    // Schema validation
    const parsed = registerSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { success: false, error: "Invalid input." },
        { status: 400 },
      );
    }

    const { name, email: rawEmail, password, confirmPassword } = parsed.data;
    const email = normalizeEmail(rawEmail);

    // Business validation (reuse shared lib)
    const validationErrors = validateRegisterForm({
      name,
      email,
      password,
      confirmPassword,
    });
    if (Object.keys(validationErrors).length > 0) {
      return NextResponse.json(
        { success: false, error: "Invalid input.", fields: validationErrors },
        { status: 400 },
      );
    }

    // Duplicate email check
    const existing = await findUserByEmail(email);
    if (existing) {
      return NextResponse.json(
        { success: false, error: "An account with this email already exists." },
        { status: 409 },
      );
    }

    // Hash password
    const passwordHash = await hashPassword(password);

    // Create user
    const user = await createUser({ name: name.trim(), email, passwordHash });

    // Create session
    const session = await getSession();
    session.userId = user.id;
    session.name = user.name ?? "";
    session.email = user.email;
    await session.save();

    return NextResponse.json(
      { success: true, data: { id: user.id, name: user.name, email: user.email } },
      { status: 201 },
    );
  } catch (error) {
    console.error("[POST /api/auth/register]", error);
    return NextResponse.json(
      { success: false, error: "Unable to create your account. Please try again." },
      { status: 500 },
    );
  }
}
