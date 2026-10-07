"use client";

import Link from "next/link";

interface AppHeaderProps {
  onMenuToggle: () => void;
  user: { name: string; email: string } | null;
}

const topicLinks = [
  { label: "Docs",      href: "/docs"      },
  { label: "QA Guides", href: "/qa-guides" },
  { label: "Templates", href: "/templates" },
  { label: "Changelog", href: "/changelog" },
] as const;

export function AppHeader({
  onMenuToggle,
}: AppHeaderProps): React.JSX.Element {
  return (
    <header
      className="sticky top-0 z-30 flex h-14 items-center px-4 gap-3 shrink-0"
      style={{
        background: "rgba(4,5,18,0.95)",
        backdropFilter: "blur(16px)",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      {/* Mobile: sidebar hamburger */}
      <button
        type="button"
        onClick={onMenuToggle}
        className="lg:hidden p-1.5 rounded-lg text-content-secondary hover:text-content-primary hover:bg-surface-700 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 shrink-0"
        aria-label="Open navigation menu"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <line x1="4" x2="20" y1="6" y2="6" />
          <line x1="4" x2="20" y1="12" y2="12" />
          <line x1="4" x2="20" y1="18" y2="18" />
        </svg>
      </button>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Topic links */}
      <nav aria-label="Product navigation" className="flex items-center gap-5 sm:gap-6">
        {topicLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="text-xs text-content-secondary hover:text-content-primary transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 rounded whitespace-nowrap"
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
