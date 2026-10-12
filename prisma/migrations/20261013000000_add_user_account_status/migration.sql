CREATE TYPE "AccountStatus" AS ENUM ('Active', 'Deactivated', 'Deleted');

ALTER TABLE "users"
ADD COLUMN "status" "AccountStatus" NOT NULL DEFAULT 'Active',
ADD COLUMN "deletedAt" TIMESTAMP(3),
ADD COLUMN "deletedEmail" TEXT;

CREATE UNIQUE INDEX "users_deletedEmail_key" ON "users"("deletedEmail");
