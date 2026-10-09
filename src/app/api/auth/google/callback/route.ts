/**
 * GET /api/auth/google/callback
 * Handles the OAuth callback from Google.
 */
export const dynamic = "force-dynamic";

import { type NextRequest, NextResponse } from "next/server";
import { OAuth2Client } from "google-auth-library";
import { serverEnv } from "@/lib/env";
import { normalizeEmail } from "@/lib/auth/email";
import { hashPassword } from "@/lib/auth/password";
import { getSession } from "@/lib/auth/session";
import { findUserByGoogleId, findUserByEmail, createGoogleUser } from "@/lib/auth/user-repository";
import crypto from "crypto";

const STATE_COOKIE = "qaforge_oauth_state";

function loginRedirect(error: string): NextResponse {
  const base = serverEnv.APP_URL || "https://qaforgeapp.vercel.app";
  return NextResponse.redirect(`${base}/login?error=${error}`);
}

export async function GET(request: NextRequest): Promise<NextResponse> {
  const { searchParams } = request.nextUrl;
  const code = searchParams.get("code");
  const returnedState = searchParams.get("state");
  const errorParam = searchParams.get("error");

  // Google denied or user cancelled
  if (errorParam) return loginRedirect("google_cancelled");

  // Google must provide both code and state
  if (!code || !returnedState) {
    console.error("[google/callback] Missing code or state", { code: !!code, state: !!returnedState });
    return loginRedirect("invalid_callback");
  }

  // Parse state — format is `stateToken:encodedNextPath`
  const colonIdx = returnedState.indexOf(":");
  const stateToken = colonIdx >= 0 ? returnedState.slice(0, colonIdx) : returnedState;
  const encodedNext = colonIdx >= 0 ? returnedState.slice(colonIdx + 1) : "";
  const nextPath = encodedNext ? decodeURIComponent(encodedNext) : "/home";
  const safePath = nextPath.startsWith("/") ? nextPath : "/home";

  // Validate CSRF state cookie
  const storedState = request.cookies.get(STATE_COOKIE)?.value;
  if (!storedState || storedState !== stateToken) {
    console.error("[google/callback] State mismatch", { stored: storedState, received: stateToken });
    return loginRedirect("invalid_state");
  }

  const clientId = serverEnv.GOOGLE_CLIENT_ID;
  const clientSecret = serverEnv.GOOGLE_CLIENT_SECRET;
  if (!clientId || !clientSecret) return loginRedirect("oauth_not_configured");

  // Build callback URL from the actual request origin to avoid APP_URL mismatch
  const origin = `${request.nextUrl.protocol}//${request.nextUrl.host}`;
  const callbackUrl = `${origin}/api/auth/google/callback`;

  try {
    const oauth2Client = new OAuth2Client(clientId, clientSecret, callbackUrl);
    const { tokens } = await oauth2Client.getToken(code);

    if (!tokens.id_token) return loginRedirect("no_id_token");

    const ticket = await oauth2Client.verifyIdToken({ idToken: tokens.id_token, audience: clientId });
    const payload = ticket.getPayload();

    if (!payload?.sub || !payload.email || !payload.email_verified) {
      return loginRedirect("unverified_email");
    }

    const googleId = payload.sub;
    const email = normalizeEmail(payload.email);
    const name = payload.name ?? email.split("@")[0] ?? "User";

    // Find by Google ID first (returning user)
    let user = await findUserByGoogleId(googleId);

    if (!user) {
      // Block auto-linking with existing email/password accounts
      const existing = await findUserByEmail(email);
      if (existing) return loginRedirect("email_exists");

      // Create new Google-authenticated user
      const unusableHash = await hashPassword(`google-${googleId}-${crypto.randomUUID()}`);
      user = await createGoogleUser({ name, email, googleId, unusablePasswordHash: unusableHash });
    }

    // Issue iron-session
    const session = await getSession();
    session.userId = user.id;
    session.name = user.name ?? "";
    session.email = user.email;
    await session.save();

    const response = NextResponse.redirect(`${origin}${safePath}`);
    response.cookies.delete(STATE_COOKIE);
    return response;

  } catch (error) {
    console.error("[google/callback] OAuth error:", error);
    return loginRedirect("oauth_failed");
  }
}