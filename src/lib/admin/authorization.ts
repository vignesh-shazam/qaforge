import "server-only";

import { redirect } from "next/navigation";
import { serverEnv } from "@/lib/env";
import { getCurrentUser } from "@/lib/auth/session";
import { db } from "@/lib/db";

export async function isAdminOwner(): Promise<boolean> {
  const sessionUser = await getCurrentUser();

  if (!sessionUser?.userId || !sessionUser.email || !serverEnv.ADMIN_OWNER_EMAIL) {
    return false;
  }

  const ownerEmail = serverEnv.ADMIN_OWNER_EMAIL.trim().toLowerCase();

  if (sessionUser.email.trim().toLowerCase() !== ownerEmail) {
    return false;
  }

  const user = await db.user.findUnique({
    where: { id: sessionUser.userId },
    select: { email: true },
  });

  return user?.email.trim().toLowerCase() === ownerEmail;
}

export async function requireAdminOwner(): Promise<void> {
  const sessionUser = await getCurrentUser();

  if (!sessionUser) {
    redirect("/admin/login");
  }

  if (!(await isAdminOwner())) {
    redirect("/dashboard");
  }
}