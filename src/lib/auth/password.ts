/**
 * Password hashing and verification utilities.
 * Uses bcryptjs with a work factor of 12.
 *
 * Server-side only — never import in client components.
 */

import bcrypt from "bcryptjs";

const SALT_ROUNDS = 12;

/**
 * Hashes a plaintext password using bcrypt.
 * Never call this with an already-hashed password.
 */
export async function hashPassword(plaintext: string): Promise<string> {
  return bcrypt.hash(plaintext, SALT_ROUNDS);
}

/**
 * Verifies a plaintext password against a bcrypt hash.
 * Returns true if the password matches, false otherwise.
 * Constant-time comparison is handled internally by bcryptjs.
 */
export async function verifyPassword(
  plaintext: string,
  hash: string,
): Promise<boolean> {
  return bcrypt.compare(plaintext, hash);
}
