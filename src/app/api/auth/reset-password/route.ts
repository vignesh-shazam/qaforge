/**
 * POST /api/auth/reset-password
 * Validates a reset token and updates the user's password.
 */

import { type NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { hashToken } from "@/lib/auth/token";
import { hashPassword } from "@/lib/auth/password";
import { findUserByResetToken, updatePasswordAndClearToken } from "@/lib/auth/user-repository";
import { destroySession } from "@/lib/auth/session";
import { validateNewPassword } from "@/lib/auth-validation";

const schema = z.object({
  token: z.string().min(1).max(256),
  password: z.string().min(8).max(128),
  confirmPassword: z.string(),
});

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    let body: unknown;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { success: false, error: "Invalid request body." },
        { status: 400 },
      );
    }

    const parsed = schema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { success: false, error: "Invalid input." },
        { status: 400 },
      );
    }

    const { token, password, confirmPassword } = parsed.data;

    // Validate new password policy
    const passwordError = validateNewPassword(password);
    if (passwordError) {
      return NextResponse.json(
        { success: false, error: passwordError },
        { status: 400 },
      );
    }

    if (password !== confirmPassword) {
      return NextResponse.json(
        { success: false, error: "Passwords do not match." },
        { status: 400 },
      );
    }

    // Look up user by token hash — also checks expiry
    const tokenHash = hashToken(token);
    const user = await findUserByResetToken(tokenHash);

    if (!user) {
      return NextResponse.json(
        { success: false, error: "This reset link is invalid or has expired." },
        { status: 400 },
      );
    }

    // Hash new password and clear token (single-use)
    const newPasswordHash = await hashPassword(password);
    await updatePasswordAndClearToken(user.id, newPasswordHash);

    // Invalidate existing sessions for this user
    // iron-session is stateless — we can't invalidate all sessions without
    // a session store. As a security measure we destroy the current session.
    // TODO: With a Redis session store, enumerate and delete all user sessions.
    await destroySession();

    return NextResponse.json({
      success: true,
      message: "Your password has been reset. Please sign in with your new password.",
    });
  } catch (error) {
    console.error("[POST /api/auth/reset-password]", error);
    return NextResponse.json(
      { success: false, error: "An unexpected error occurred. Please try again." },
      { status: 500 },
    );
  }
}
