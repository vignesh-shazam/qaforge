/**
 * POST /api/auth/forgot-password
 * Initiates a password reset — always returns a generic response
 * to prevent account enumeration.
 */

import { type NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { normalizeEmail } from "@/lib/auth/email";
import { generateResetToken } from "@/lib/auth/token";
import { findUserByEmail, setResetToken } from "@/lib/auth/user-repository";
import { checkForgotPasswordRateLimit } from "@/lib/auth/rate-limit";

// Generic message regardless of account existence
const GENERIC_RESPONSE = "If an account exists for this email, we'll send you a password reset link.";

const schema = z.object({
  email: z.string().email(),
});

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    // Rate limiting
    const ip = request.headers.get("x-forwarded-for") ?? "unknown";
    const rateLimit = checkForgotPasswordRateLimit(ip);
    if (!rateLimit.allowed) {
      // Still return generic response — don't reveal rate limit state to attackers
      return NextResponse.json({ success: true, message: GENERIC_RESPONSE });
    }

    let body: unknown;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json({ success: true, message: GENERIC_RESPONSE });
    }

    const parsed = schema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ success: true, message: GENERIC_RESPONSE });
    }

    const email = normalizeEmail(parsed.data.email);
    const user = await findUserByEmail(email);

    if (user) {
      const { tokenHash, expiresAt } = generateResetToken();
      await setResetToken(user.id, tokenHash, expiresAt);

      // TODO (V0.2+): Send email with reset link
      // The reset link format would be:
      // `${serverEnv.APP_URL}/reset-password?token=${rawToken}`
      // Email delivery requires an email service (e.g. Resend, SendGrid).
      // For now the token is stored and ready — email integration is pending.
      console.warn(`[forgot-password] Reset token stored for user ${user.id}. Email delivery pending.`);
    }

    // Always return generic message — never reveal account existence
    return NextResponse.json({ success: true, message: GENERIC_RESPONSE });
  } catch (error) {
    console.error("[POST /api/auth/forgot-password]", error);
    // Still return generic — don't expose internal errors
    return NextResponse.json({ success: true, message: GENERIC_RESPONSE });
  }
}
