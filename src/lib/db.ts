/**
 * Prisma client singleton.
 *
 * In development, Next.js hot-reloads modules which would create multiple
 * Prisma client instances and exhaust the database connection pool.
 * This pattern stores the client on the global object in development to
 * prevent that — in production a new instance is created once per process.
 *
 * Usage:
 *   import { db } from '@/lib/db';
 *   const user = await db.user.findUnique({ where: { id } });
 *
 * This module must only be imported in server-side code:
 * Route Handlers, Server Components, Server Actions, and lib/ utilities.
 * Never import in client components.
 */

import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const db: PrismaClient =
  globalForPrisma.prisma ??
  new PrismaClient({
    log:
      process.env.NODE_ENV === "development"
        ? ["query", "error", "warn"]
        : ["error"],
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = db;
}
