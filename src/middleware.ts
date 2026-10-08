/**
 * Next.js Middleware — Route Protection
 *
 * Runs on every request matched by config.matcher.
 * Reads the iron-session cookie to check authentication.
 * Redirects unauthenticated users to /login, preserving
 * the intended destination as a `next` query parameter.
 *
 * Note: middleware runs in the Edge runtime — imports must
 * not use Node.js-only APIs. Session options are inlined here.
 */

import { type NextRequest, NextResponse } from "next/server";
import { getIronSession } from "iron-session";
import type { SessionData } from "@/lib/auth/session";

// ---------------------------------------------------------------------------
// Protected route prefixes
// ---------------------------------------------------------------------------

const PROTECTED_PREFIXES = ["/dashboard", "/projects", "/home"];

// ---------------------------------------------------------------------------
// Session options — must stay in sync with src/lib/auth/session.ts.
// Inlined here because middleware runs in Edge runtime.
// ---------------------------------------------------------------------------

const SESSION_COOKIE_NAME = "qaforge_session";

function getSessionSecret(): string {
  return (
    process.env.SESSION_SECRET ??
    "dev-session-secret-change-in-production-min32chars"
  );
}

// ---------------------------------------------------------------------------
// Middleware
// ---------------------------------------------------------------------------

export async function middleware(request: NextRequest): Promise<NextResponse> {
  const { pathname } = request.nextUrl;

  const isProtected = PROTECTED_PREFIXES.some(
    (prefix) => pathname === prefix || pathname.startsWith(prefix + "/"),
  );

  if (!isProtected) {
    return NextResponse.next();
  }

  const response = NextResponse.next();

  const session = await getIronSession<SessionData>(
    request,
    response,
    {
      password: getSessionSecret(),
      cookieName: SESSION_COOKIE_NAME,
      cookieOptions: {
        secure: process.env.NODE_ENV === "production",
        httpOnly: true,
        sameSite: "lax" as const,
      },
    },
  );

  if (!session.userId) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("next", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return response;
}

// ---------------------------------------------------------------------------
// Matcher — run only on authenticated app routes
// ---------------------------------------------------------------------------

export const config = {
  matcher: ["/dashboard/:path*", "/projects/:path*", "/home/:path*"],
};
