
import { randomBytes } from "node:crypto";
import { type NextRequest, NextResponse } from "next/server";
import { OAuth2Client } from "google-auth-library";
import { serverEnv } from "@/lib/env";

export const dynamic = "force-dynamic";

const STATE_COOKIE = "qaforge_oauth_state";

export async function GET(request: NextRequest): Promise<NextResponse> {
  const clientId = serverEnv.GOOGLE_CLIENT_ID;
  const clientSecret = serverEnv.GOOGLE_CLIENT_SECRET;
  const appUrl = serverEnv.APP_URL.replace(/\/+$/, "");

  if (!clientId || !clientSecret) {
    return NextResponse.redirect(
      new URL("/login?error=oauth_not_configured", appUrl),
    );
  }

  const callbackUrl = `${appUrl}/api/auth/google/callback`;
  const stateToken = randomBytes(32).toString("hex");

  const requestedNext = request.nextUrl.searchParams.get("next");
  const nextPath =
    requestedNext?.startsWith("/") && !requestedNext.startsWith("//")
      ? requestedNext
      : "/home";

  const state = `${stateToken}:${encodeURIComponent(nextPath)}`;

  const oauthClient = new OAuth2Client(
    clientId,
    clientSecret,
    callbackUrl,
  );

  const authorizationUrl = oauthClient.generateAuthUrl({
    access_type: "online",
    scope: ["openid", "email", "profile"],
    response_type: "code",
    state,
  });

  const response = NextResponse.redirect(authorizationUrl);

  response.cookies.set(STATE_COOKIE, stateToken, {
    httpOnly: true,
    secure: appUrl.startsWith("https://"),
    sameSite: "lax",
    path: "/",
    maxAge: 10 * 60,
  });

  return response;
}
