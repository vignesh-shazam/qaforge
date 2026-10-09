-- Migration: add_google_id
-- Adds optional Google OAuth ID to users table.
ALTER TABLE "users" ADD COLUMN IF NOT EXISTS "googleId" TEXT;
CREATE UNIQUE INDEX IF NOT EXISTS "users_googleId_key" ON "users"("googleId") WHERE "googleId" IS NOT NULL;