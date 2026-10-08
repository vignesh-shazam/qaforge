-- Migration: add_project_status
-- Adds status column to projects table with default 'Active'.
ALTER TABLE "projects" ADD COLUMN IF NOT EXISTS "status" TEXT NOT NULL DEFAULT 'Active';