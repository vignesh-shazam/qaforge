/**
 * Environment configuration module.
 *
 * All environment variables must be accessed through this module.
 * Never use process.env directly in application code.
 *
 * This module validates all required variables at startup.
 * A missing required variable will throw a descriptive error immediately.
 */

import { z } from "zod";

// ---------------------------------------------------------------------------
// Server-side environment schema
// These variables are NEVER exposed to the browser.
// ---------------------------------------------------------------------------

const serverSchema = z.object({
  NODE_ENV: z
    .enum(["development", "test", "production"])
    .default("development"),

  DATABASE_URL: z.string().min(1, "DATABASE_URL is required"),

  // V0.2 — not required in V0.1 but validated as optional strings
  NEXTAUTH_URL: z.string().url().optional(),
  NEXTAUTH_SECRET: z.string().optional(),
});

// ---------------------------------------------------------------------------
// Client-side environment schema
// Only NEXT_PUBLIC_* variables are safe to expose to the browser.
// ---------------------------------------------------------------------------

const clientSchema = z.object({
  NEXT_PUBLIC_APP_URL: z.string().url().default("http://localhost:3000"),
});

// ---------------------------------------------------------------------------
// Validation
// ---------------------------------------------------------------------------

function validateServerEnv(): z.infer<typeof serverSchema> {
  const result = serverSchema.safeParse(process.env);

  if (!result.success) {
    const formatted = result.error.issues
      .map((issue) => `  • ${issue.path.join(".")}: ${issue.message}`)
      .join("\n");

    throw new Error(
      `\n\n❌ Invalid server environment variables:\n${formatted}\n\n` +
        `See .env.example for required configuration.\n`,
    );
  }

  return result.data;
}

function validateClientEnv(): z.infer<typeof clientSchema> {
  const result = clientSchema.safeParse({
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
  });

  if (!result.success) {
    const formatted = result.error.issues
      .map((issue) => `  • ${issue.path.join(".")}: ${issue.message}`)
      .join("\n");

    throw new Error(
      `\n\n❌ Invalid client environment variables:\n${formatted}\n\n` +
        `See .env.example for required configuration.\n`,
    );
  }

  return result.data;
}

// ---------------------------------------------------------------------------
// Exported env objects
// ---------------------------------------------------------------------------

/**
 * Server-side environment variables.
 * Import this only in server-side code (Route Handlers, Server Components, lib/).
 * Never import in client components.
 */
export const serverEnv = validateServerEnv();

/**
 * Client-safe environment variables (NEXT_PUBLIC_* only).
 * Safe to import in both server and client components.
 */
export const clientEnv = validateClientEnv();
