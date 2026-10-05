"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Logo } from "./Logo";

interface SidebarNavItem {
  label: string;
  href: string;
  icon: React.ReactNode;
}

const navItems: SidebarNavItem[] = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <rect width="7" height="9" x="3" y="3" rx="1" />
        <rect width="7" height="5" x="14" y="3" rx="1" />
        <rect width="7" height="9" x="14" y="12" rx="1" />
        <rect width="7" height="5" x="3" y="16" rx="1" />
      </svg>
    ),
  },
  {
    label: "Projects",
    href: "/projects",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M3 3h6l2 3h10a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z" />
      </svg>
    ),
  },
];

interface SidebarProps {
  /** Whether the mobile drawer is open */
  mobileOpen: boolean;
  /** Close the mobile drawer */
  onClose: () => void;
}

export function Sidebar({
  mobileOpen,
  onClose,
}: SidebarProps): React.JSX.Element {
  const pathname = usePathname();

  const sidebarContent = (
    <nav className="flex flex-col h-full" aria-label="Application navigation">
      {/* Mobile header with close button */}
      <div className="flex items-center justify-between p-4 border-b border-surface-700 lg:hidden">
        <Logo />
        <button
          type="button"
          onClick={onClose}
          className="p-1.5 rounded-md text-content-secondary hover:text-content-primary hover:bg-surface-700 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
          aria-label="Close navigation menu"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M18 6 6 18" />
            <path d="m6 6 12 12" />
          </svg>
        </button>
      </div>

      {/* Nav items */}
      <ul className="flex flex-col gap-1 p-3 list-none flex-1">
        {navItems.map((item) => {
          const isActive =
            pathname === item.href || pathname.startsWith(item.href + "/");

          return (
            <li key={item.href}>
              <Link
                href={item.href}
                onClick={onClose}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-150",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500",
                  isActive
                    ? "bg-brand-500/10 text-brand-400"
                    : "text-content-secondary hover:bg-surface-700 hover:text-content-primary",
                )}
                aria-current={isActive ? "page" : undefined}
              >
                <span
                  className={cn(
                    isActive ? "text-brand-400" : "text-content-tertiary",
                  )}
                >
                  {item.icon}
                </span>
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>

      {/* Bottom section — version badge */}
      <div className="p-4 border-t border-surface-700">
        <p className="text-xs text-content-disabled">v0.1.0</p>
      </div>
    </nav>
  );

  return (
    <>
      {/* Desktop sidebar — always visible */}
      <aside className="hidden lg:flex lg:flex-col lg:w-56 lg:border-r lg:border-surface-700 lg:bg-surface-900 lg:shrink-0">
        {sidebarContent}
      </aside>

      {/* Mobile drawer overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            aria-hidden="true"
            onClick={onClose}
          />

          {/* Drawer */}
          <aside
            className="absolute left-0 top-0 bottom-0 w-64 bg-surface-900 border-r border-surface-700 shadow-xl"
            aria-label="Navigation menu"
          >
            {sidebarContent}
          </aside>
        </div>
      )}
    </>
  );
}
