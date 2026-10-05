import { AuthLayout } from "@/components/layout/AuthLayout";

interface AuthRouteLayoutProps {
  children: React.ReactNode;
}

export default function AuthRouteLayout({
  children,
}: AuthRouteLayoutProps): React.JSX.Element {
  return <AuthLayout>{children}</AuthLayout>;
}
