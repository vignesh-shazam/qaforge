-- Migration: add_project_thumbnail
-- Adds optional thumbnail path to projects table.
ALTER TABLE "projects" ADD COLUMN IF NOT EXISTS "thumbnail" TEXT;