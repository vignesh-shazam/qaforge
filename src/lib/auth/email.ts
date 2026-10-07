/**
 * Email normalization utility.
 * Trims whitespace and lowercases the email address consistently.
 * Used for registration, login, and password reset.
 *
 * Example: " User@Example.COM " → "user@example.com"
 */
export function normalizeEmail(email: string): string {
  return email.trim().toLowerCase();
}
