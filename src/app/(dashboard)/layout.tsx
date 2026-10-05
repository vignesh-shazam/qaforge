import { DashboardLayout } from "@/components/layout/DashboardLayout";

interface DashboardRouteLayoutProps {
  children: React.ReactNode;
}

export default function DashboardRouteLayout({
  children,
}: DashboardRouteLayoutProps): React.JSX.Element {
  return <DashboardLayout>{children}</DashboardLayout>;
}
