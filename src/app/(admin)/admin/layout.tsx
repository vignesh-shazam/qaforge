import type { ReactElement, ReactNode } from "react";
import { requireAdminOwner } from "@/lib/admin/authorization";
import AdminShell from "@/components/admin/AdminShell";

export const dynamic = "force-dynamic";

export default async function AdminLayout({
  children,
}: {
  children: ReactNode;
}): Promise<ReactElement> {
  await requireAdminOwner();

  return <AdminShell>{children}</AdminShell>;
}