/**
 * User data access layer.
 * All database operations on the User model live here.
 *
 * Server-side only — never import in client components.
 */

import { db } from "@/lib/db";

// ---------------------------------------------------------------------------
// Safe user type — never includes passwordHash or reset tokens
// ---------------------------------------------------------------------------

export interface SafeUser {
  id: string;
  name: string | null;
  email: string;
  createdAt: Date;
}

function toSafeUser(user: {
  id: string;
  name: string | null;
  email: string;
  createdAt: Date;
}): SafeUser {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    createdAt: user.createdAt,
  };
}

// ---------------------------------------------------------------------------
// Queries
// ---------------------------------------------------------------------------

/**
 * Finds a user by email (normalized). Returns null if not found.
 * Includes passwordHash — use only for authentication, never return to client.
 */
export async function findUserByEmail(email: string): Promise<{
  id: string;
  name: string | null;
  email: string;
  passwordHash: string;
  createdAt: Date;
} | null> {
  return db.user.findUnique({
    where: { email },
    select: {
      id: true,
      name: true,
      email: true,
      passwordHash: true,
      createdAt: true,
    },
  });
}

/**
 * Finds a user by reset token hash. Returns null if not found or token expired.
 */
export async function findUserByResetToken(tokenHash: string): Promise<{
  id: string;
  email: string;
  resetTokenHash: string | null;
  resetTokenExpiresAt: Date | null;
} | null> {
  return db.user.findFirst({
    where: {
      resetTokenHash: tokenHash,
      resetTokenExpiresAt: { gt: new Date() },
    },
    select: {
      id: true,
      email: true,
      resetTokenHash: true,
      resetTokenExpiresAt: true,
    },
  });
}

/**
 * Creates a new user. Throws if email already exists (unique constraint).
 */
export async function createUser(data: {
  name: string;
  email: string;
  passwordHash: string;
}): Promise<SafeUser> {
  const user = await db.user.create({
    data: {
      name: data.name,
      email: data.email,
      passwordHash: data.passwordHash,
    },
    select: {
      id: true,
      name: true,
      email: true,
      createdAt: true,
    },
  });
  return toSafeUser(user);
}

/**
 * Stores a password reset token hash and expiry on the user.
 */
export async function setResetToken(
  userId: string,
  tokenHash: string,
  expiresAt: Date,
): Promise<void> {
  await db.user.update({
    where: { id: userId },
    data: { resetTokenHash: tokenHash, resetTokenExpiresAt: expiresAt },
  });
}

/**
 * Updates the user's password hash and clears the reset token.
 */
export async function updatePasswordAndClearToken(
  userId: string,
  passwordHash: string,
): Promise<void> {
  await db.user.update({
    where: { id: userId },
    data: {
      passwordHash,
      resetTokenHash: null,
      resetTokenExpiresAt: null,
    },
  });
}
