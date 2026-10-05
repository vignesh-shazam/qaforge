/**
 * Shared TypeScript types for QAForge.
 *
 * Prisma-generated types are used directly for DB models.
 * This file defines application-level types used across the UI.
 */

// ---------------------------------------------------------------------------
// API response shapes
// ---------------------------------------------------------------------------

export type ApiSuccess<T> = {
  success: true;
  data: T;
};

export type ApiError = {
  success: false;
  error: string;
};

export type ApiResponse<T> = ApiSuccess<T> | ApiError;

// ---------------------------------------------------------------------------
// Navigation
// ---------------------------------------------------------------------------

export interface NavItem {
  label: string;
  href: string;
  icon?: React.ComponentType<{ className?: string }>;
  badge?: string;
}

// ---------------------------------------------------------------------------
// UI state helpers
// ---------------------------------------------------------------------------

export type LoadingState = "idle" | "loading" | "success" | "error";

// ---------------------------------------------------------------------------
// Project types (UI layer — Prisma types used in server code)
// ---------------------------------------------------------------------------

export interface ProjectSummary {
  id: string;
  name: string;
  description: string | null;
  targetUrl: string | null;
  createdAt: Date;
  updatedAt: Date;
}
