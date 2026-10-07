/**
 * Session management using iron-session (encrypted cookie).
 *
 * Session data is encrypted with SESSION_SECRET and stored in an HttpOnly
 * cookie — never exposed to client JavaScript.
 *
 * Server-side only — never import in client components.
 */

import { getIronSession, type IronSession, type SessionOptions } from "iron-session";
import { cookies } from "next/headers";
import { serverEnv } from "@/lib/env";

// ---------------------------------------------------------------------------
// Session shape — minimum required identity; no sensitive fields
// ---------------------------------------------------------------------------

export interface SessionData {
  userId?: string;
  name?: string;
  email?: string;
}

// ---------------------------------------------------------------------------
// Cookie configuration
// ---------------------------------------------------------------------------

export const SESSION_OPTIONS: SessionOptions = {
  password: serverEnv.SESSION_SECRET,
  cookieName: "qaforge_session",
  cookieOptions: {
    secure: serverEnv.NODE_ENV === "production",
    httpOnly: true,
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7, // 7 days
    path: "/",
  },
};

// ---------------------------------------------------------------------------
// Server-side session helpers
// ---------------------------------------------------------------------------

/**
 * Returns the current iron-session from the request cookies.
 * Use in Route Handlers and Server Components.
 */
export async function getSession(): Promise<IronSession<SessionData>> {
  const cookieStore = await cookies();
  return getIronSession<SessionData>(cookieStore, SESSION_OPTIONS);
}

/**
 * Returns the authenticated user from the current session,
 * or null if the user is not authenticated.
 */
export async function getCurrentUser(): Promise<{
  userId: string;
  name: string;
  email: string;
} | null> {
  const session = await getSession();
  if (!session.userId || !session.email) return null;
  return {
    userId: session.userId,
    name: session.name ?? "",
    email: session.email,
  };
}

/**
 * Destroys the current session (logout).
 * Clears all session data and the cookie.
 */
export async function destroySession(): Promise<void> {
  const session = await getSession();
  session.destroy();
}
