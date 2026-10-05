import Link from "next/link";
import { Logo } from "./Logo";

export function MarketingHeader(): React.JSX.Element {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-surface-700 bg-surface-900/95 backdrop-blur-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Logo />

          <nav aria-label="Main navigation">
            <ul className="flex items-center gap-1 list-none">
              <li>
                <Link
                  href="/login"
                  className="px-3 py-2 text-sm text-content-secondary hover:text-content-primary transition-colors duration-150 rounded-md hover:bg-surface-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
                >
                  Log in
                </Link>
              </li>
              <li>
                <Link
                  href="/register"
                  className="inline-flex items-center justify-center h-8 px-3 text-sm font-medium rounded-md bg-brand-500 text-white hover:bg-brand-600 active:bg-brand-700 transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 focus-visible:ring-offset-surface-900"
                >
                  Get started
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}
