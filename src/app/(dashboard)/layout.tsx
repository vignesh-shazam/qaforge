import { getCurrentUser } from "@/lib/auth/session";
import { DashboardLayout } from "@/components/layout/DashboardLayout";

interface DashboardRouteLayoutProps {
  children: React.ReactNode;
}

export default async function DashboardRouteLayout({
  children,
}: DashboardRouteLayoutProps): Promise<React.JSX.Element> {
  // getCurrentUser is safe to call here — returns null if not authenticated.
  // Middleware already redirects unauthenticated users before reaching this.
  const user = await getCurrentUser();

  return (
    <DashboardLayout user={user}>
      {children}
    </DashboardLayout>
  );
}
