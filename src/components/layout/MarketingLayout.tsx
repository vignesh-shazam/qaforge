import { MarketingHeader } from "./MarketingHeader";
import { MarketingFooter } from "./MarketingFooter";

interface MarketingLayoutProps {
  children: React.ReactNode;
}

export function MarketingLayout({
  children,
}: MarketingLayoutProps): React.JSX.Element {
  return (
    <div className="flex flex-col min-h-screen" style={{ background: "#030712" }}>
      <MarketingHeader />
      <main className="flex-1">{children}</main>
      <MarketingFooter />
    </div>
  );
}
