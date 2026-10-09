/**
 * User data access layer.
 * All database operations on the User model live here.
 * Server-side only.
 */
import { db } from "@/lib/db";

export interface SafeUser {
  id: string;
  name: string | null;
  email: string;
  createdAt: Date;
}

function toSafeUser(u: { id: string; name: string | null; email: string; createdAt: Date }): SafeUser {
  return { id: u.id, name: u.name, email: u.email, createdAt: u.createdAt };
}

export async function findUserByEmail(email: string): Promise<{
  id: string; name: string | null; email: string; passwordHash: string; createdAt: Date;
} | null> {
  return db.user.findUnique({
    where: { email },
    select: { id: true, name: true, email: true, passwordHash: true, createdAt: true },
  });
}

export async function findUserByGoogleId(googleId: string): Promise<SafeUser | null> {
  const u = await db.user.findUnique({
    where: { googleId },
    select: { id: true, name: true, email: true, createdAt: true },
  });
  return u ? toSafeUser(u) : null;
}

export async function findUserByResetToken(tokenHash: string): Promise<{
  id: string; email: string; resetTokenHash: string | null; resetTokenExpiresAt: Date | null;
} | null> {
  return db.user.findFirst({
    where: { resetTokenHash: tokenHash, resetTokenExpiresAt: { gt: new Date() } },
    select: { id: true, email: true, resetTokenHash: true, resetTokenExpiresAt: true },
  });
}

export async function createUser(data: {
  name: string; email: string; passwordHash: string;
}): Promise<SafeUser> {
  const u = await db.user.create({
    data: { name: data.name, email: data.email, passwordHash: data.passwordHash },
    select: { id: true, name: true, email: true, createdAt: true },
  });
  return toSafeUser(u);
}

/**
 * Creates a user authenticated via Google.
 * passwordHash is set to an unusable bcrypt value — Google users cannot log
 * in with a password unless they explicitly set one later.
 */
export async function createGoogleUser(data: {
  name: string; email: string; googleId: string; unusablePasswordHash: string;
}): Promise<SafeUser> {
  const u = await db.user.create({
    data: {
      name: data.name,
      email: data.email,
      googleId: data.googleId,
      passwordHash: data.unusablePasswordHash,
    },
    select: { id: true, name: true, email: true, createdAt: true },
  });
  return toSafeUser(u);
}

export async function setResetToken(userId: string, tokenHash: string, expiresAt: Date): Promise<void> {
  await db.user.update({ where: { id: userId }, data: { resetTokenHash: tokenHash, resetTokenExpiresAt: expiresAt } });
}

export async function updatePasswordAndClearToken(userId: string, passwordHash: string): Promise<void> {
  await db.user.update({ where: { id: userId }, data: { passwordHash, resetTokenHash: null, resetTokenExpiresAt: null } });
}