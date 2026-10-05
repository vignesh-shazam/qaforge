import Link from "next/link";
import { Logo } from "./Logo";

export function MarketingFooter(): React.JSX.Element {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-surface-700 bg-surface-900">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <Logo />

          <nav aria-label="Footer navigation">
            <ul className="flex items-center gap-6 text-sm text-content-tertiary list-none">
              <li>
                <Link
                  href="#"
                  className="hover:text-content-secondary transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 rounded"
                >
                  Privacy
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:text-content-secondary transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 rounded"
                >
                  Terms
                </Link>
              </li>
            </ul>
          </nav>

          <p className="text-sm text-content-tertiary">
            &copy; {currentYear} QAForge. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
