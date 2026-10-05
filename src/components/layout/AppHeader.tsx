"use client";

import { Logo } from "./Logo";
import { getInitials } from "@/lib/utils";

interface AppHeaderProps {
  /** Callback to toggle the mobile sidebar */
  onMenuToggle: () => void;
}

export function AppHeader({ onMenuToggle }: AppHeaderProps): React.JSX.Element {
  // Placeholder user — V0.2 will wire up real auth session
  const placeholderUser = { name: "Demo User", email: "demo@qaforge.io" };

  return (
    <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b border-surface-700 bg-surface-900 px-4">
      {/* Mobile menu toggle */}
      <button
        type="button"
        onClick={onMenuToggle}
        className="lg:hidden p-1.5 rounded-md text-content-secondary hover:text-content-primary hover:bg-surface-700 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
        aria-label="Open navigation menu"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <line x1="4" x2="20" y1="6" y2="6" />
          <line x1="4" x2="20" y1="12" y2="12" />
          <line x1="4" x2="20" y1="18" y2="18" />
        </svg>
      </button>

      <div className="hidden lg:block">
        <Logo />
      </div>

      {/* Spacer */}
      <div className="flex-1" />

      {/* User avatar placeholder */}
      <button
        type="button"
        className="flex items-center gap-2 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 focus-visible:ring-offset-surface-900"
        aria-label={`User menu for ${placeholderUser.name}`}
      >
        <div
          className="flex items-center justify-center w-8 h-8 rounded-full bg-brand-500 text-white text-sm font-semibold select-none"
          aria-hidden="true"
        >
          {getInitials(placeholderUser.name)}
        </div>
      </button>
    </header>
  );
}
