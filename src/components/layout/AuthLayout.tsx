import { Logo } from "./Logo";

interface AuthLayoutProps {
  children: React.ReactNode;
}

/**
 * Minimal centered layout for authentication pages.
 * Shows QAForge branding, no marketing navigation or footer.
 */
export function AuthLayout({ children }: AuthLayoutProps): React.JSX.Element {
  return (
    <div className="min-h-screen flex flex-col bg-surface-950">
      {/* Top branding bar */}
      <div className="flex justify-center pt-8 pb-4">
        <Logo />
      </div>

      {/* Centered content */}
      <main className="flex flex-1 items-center justify-center px-4 py-8">
        <div className="w-full max-w-sm">{children}</div>
      </main>

      {/* Minimal footer */}
      <div className="py-6 text-center">
        <p className="text-xs text-content-disabled">
          &copy; {new Date().getFullYear()} QAForge
        </p>
      </div>
    </div>
  );
}
