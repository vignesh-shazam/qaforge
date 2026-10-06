import { MarketingLayout } from "@/components/layout/MarketingLayout";

interface MarketingRouteLayoutProps {
  children: React.ReactNode;
}

export default function MarketingRouteLayout({
  children,
}: MarketingRouteLayoutProps): React.JSX.Element {
  return <MarketingLayout>{children}</MarketingLayout>;
}
