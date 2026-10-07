/**
 * Cryptographically secure token generation and hashing for password reset.
 *
 * The raw token is sent to the user via email.
 * Only the SHA-256 hash is stored in the database.
 * This way, a database breach does not expose usable reset tokens.
 *
 * Server-side only — never import in client components.
 */

import crypto from "crypto";

const TOKEN_BYTES = 32; // 256 bits of entropy
const RESET_TOKEN_EXPIRY_MINUTES = 15;

/**
 * Generates a cryptographically random URL-safe token.
 * Returns both the raw token (to email to the user) and
 * its SHA-256 hash (to store in the database).
 */
export function generateResetToken(): {
  rawToken: string;
  tokenHash: string;
  expiresAt: Date;
} {
  const rawToken = crypto.randomBytes(TOKEN_BYTES).toString("hex");
  const tokenHash = hashToken(rawToken);
  const expiresAt = new Date(
    Date.now() + RESET_TOKEN_EXPIRY_MINUTES * 60 * 1000,
  );
  return { rawToken, tokenHash, expiresAt };
}

/**
 * Hashes a raw token with SHA-256 for safe database storage.
 * Use this when looking up a submitted reset token.
 */
export function hashToken(rawToken: string): string {
  return crypto.createHash("sha256").update(rawToken).digest("hex");
}
