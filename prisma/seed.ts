/**
 * Prisma seed script — QAForge V0.1 placeholder.
 *
 * This script will be used to populate the database with test data
 * for local development and testing environments.
 *
 * V0.2 will add real seed data (test users, sample projects) once
 * authentication and project management are fully implemented.
 *
 * Run with: npm run prisma:seed
 */

import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();

async function main(): Promise<void> {
  console.log("🌱 Seeding database...");

  // V0.2+: Add seed data here
  // Example:
  // await db.user.upsert({
  //   where: { email: 'demo@qaforge.io' },
  //   update: {},
  //   create: {
  //     email: 'demo@qaforge.io',
  //     name: 'Demo User',
  //     passwordHash: await hash('password', 12),
  //   },
  // });

  console.log("✅ Seed complete.");
}

main()
  .catch((error: unknown) => {
    console.error("❌ Seed failed:", error);
    process.exit(1);
  })
  .finally(() => {
    void db.$disconnect();
  });
