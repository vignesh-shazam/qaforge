-- Migration: add_password_reset_fields
-- Adds password reset token support to the users table.
-- resetTokenHash: SHA-256 hash of the one-time reset token (never the raw token).
-- resetTokenExpiresAt: when the token expires (15 minutes from issue).

ALTER TABLE "users"
  ADD COLUMN IF NOT EXISTS "resetTokenHash" TEXT,
  ADD COLUMN IF NOT EXISTS "resetTokenExpiresAt" TIMESTAMP(3);
