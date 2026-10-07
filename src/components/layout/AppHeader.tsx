"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Logo } from "./Logo";
import { getInitials } from "@/lib/utils";

interface AppHeaderProps {
  /** Callback to toggle the mobile sidebar */
  onMenuToggle: () => void;
  /** Authenticated user info passed from server component */
  user: { name: string; email: string } | null;
}

export function AppHeader({ onMenuToggle, user }: AppHeaderProps): React.JSX.Element {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);

  async function handleLogout(): Promise<void> {
    setLoggingOut(true);
    try {
      await fetch("/api/auth/logout", { method: "POST" });
    } finally {
      router.push("/login");
    }
  }

  const displayName = user?.name || user?.email || "User";

  return (
    <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b border-surface-700 bg-surface-900 px-4">
      {/* Mobile menu toggle */}
      <button
        type="button"
        onClick={onMenuToggle}
        className="lg:hidden p-1.5 rounded-md text-content-secondary hover:text-content-primary hover:bg-surface-700 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
        aria-label="Open navigation menu"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <line x1="4" x2="20" y1="6" y2="6" />
          <line x1="4" x2="20" y1="12" y2="12" />
          <line x1="4" x2="20" y1="18" y2="18" />
        </svg>
      </button>

      <div className="hidden lg:block">
        <Logo />
      </div>

      <div className="flex-1" />

      {/* User menu */}
      <div className="relative">
        <button
          type="button"
          onClick={() => setMenuOpen((v) => !v)}
          className="flex items-center gap-2 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 focus-visible:ring-offset-surface-900"
          aria-label={`User menu for ${displayName}`}
          aria-expanded={menuOpen}
          aria-haspopup="menu"
        >
          <div
            className="flex items-center justify-center w-8 h-8 rounded-full bg-brand-500 text-white text-sm font-semibold select-none"
            aria-hidden="true"
          >
            {getInitials(displayName)}
          </div>
        </button>

        {/* Dropdown */}
        {menuOpen && (
          <div
            className="absolute right-0 mt-2 w-48 rounded-xl border border-surface-700 bg-surface-800 shadow-xl z-50 overflow-hidden"
            role="menu"
            aria-label="User menu"
          >
            {user && (
              <div className="px-4 py-3 border-b border-surface-700">
                <p className="text-xs font-semibold text-content-primary truncate">{user.name || "User"}</p>
                <p className="text-xs text-content-tertiary truncate">{user.email}</p>
              </div>
            )}
            <button
              type="button"
              role="menuitem"
              disabled={loggingOut}
              onClick={handleLogout}
              className="flex w-full items-center gap-2 px-4 py-2.5 text-sm text-content-secondary hover:bg-surface-700 hover:text-content-primary transition-colors focus-visible:outline-none focus-visible:bg-surface-700 disabled:opacity-50"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                <polyline points="16 17 21 12 16 7" />
                <line x1="21" x2="9" y1="12" y2="12" />
              </svg>
              {loggingOut ? "Signing out…" : "Sign out"}
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
