"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { IconSubscription } from "@/components/icons/IconSubscription";
import { IconDashboard } from "@/components/icons/IconDashboard";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Logo } from "./Logo";
import { SidebarAccount } from "./SidebarAccount";
import { IconProjects } from "../icons/IconProjects";
import { IconNotifications, IconTestCases } from "../icons";
import { IconBugReports } from "../icons/IconBugReports";
import { IconTestData } from "../icons/IconTestData";
import { IconApiTests } from "../icons/IconApiTests";
import { IconAutomation } from "../icons/IconAutomation";
import { IconReports } from "../icons/IconReports";
import { IconHome } from "../icons/IconHome";

interface NavItem {
  label: string;
  href: string;
  icon: React.ReactNode;
  comingSoon?: boolean;
}

const primaryNav: NavItem[] = [
  { label: "Home", href: "/home", icon: <IconHome size={18} aria-hidden="true" />, comingSoon: true },
  { label: "Dashboard", href: "/dashboard", icon: <IconDashboard size={18} aria-hidden="true" /> },
  { label: "Projects", href: "/projects", icon: <IconProjects size={18} aria-hidden="true" /> },
  { label: "Test Cases", href: "/test-cases", icon: <IconTestCases size={18} aria-hidden="true" />, comingSoon: true },
  { label: "Bug Reports", href: "/bug-reports", icon: <IconBugReports size={18} aria-hidden="true" />, comingSoon: true },
  { label: "Test Data", href: "/test-data", icon: <IconTestData size={18} aria-hidden="true" />, comingSoon: true },
  { label: "API Tests", href: "/api-tests", icon: <IconApiTests size={18} aria-hidden="true" />, comingSoon: true },
  { label: "Automation", href: "/automation", icon: <IconAutomation size={18} aria-hidden="true" />, comingSoon: true },
  { label: "Reports", href: "/reports", icon: <IconReports size={18} aria-hidden="true" />, comingSoon: true },
  { label: "Subscriptions", href: "/subscriptions", icon: <IconSubscription size={18} aria-hidden="true" />, comingSoon: true },
  { label: "Notifications", href: "/notifications", icon: <IconNotifications size={18} aria-hidden="true" />, comingSoon: true },
];

interface NavLinkProps {
  item: NavItem;
  isActive: boolean;
  expanded: boolean;
  onClick: () => void;
}

function NavLink({ item, isActive, expanded, onClick }: NavLinkProps): React.JSX.Element {
  const iconEl = (
    <span
      className={cn(
        "shrink-0 flex items-center justify-center w-8 h-8 rounded-lg transition-all duration-150",
        isActive ? "text-white" : item.comingSoon ? "text-content-disabled" : "text-content-tertiary group-hover:text-content-secondary",
      )}
      style={isActive ? { background: "rgba(99,102,241,0.35)" } : undefined}
    >
      {item.icon}
    </span>
  );

  const labelEl = expanded ? (
    <span
      className={cn(
        "flex-1 text-sm font-medium truncate transition-all duration-150",
        isActive ? "text-white" : item.comingSoon ? "text-content-disabled" : "text-content-secondary group-hover:text-content-primary",
      )}
    >
      {item.label}
    </span>
  ) : null;

  const soonBadge = item.comingSoon && expanded ? (
    <span
      className="shrink-0 text-[9px] font-semibold px-1.5 py-0.5 rounded-full"
      style={{ background: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.3)", border: "1px solid rgba(255,255,255,0.08)" }}
    >
      Soon
    </span>
  ) : null;

  const base = cn(
    "group flex items-center gap-2.5 px-2 py-1.5 rounded-xl transition-all duration-150",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500",
    isActive ? "" : item.comingSoon ? "cursor-default opacity-60" : "hover:bg-surface-700/50",
  );

  if (item.comingSoon) {
    return (
      <span className={base} aria-label={`${item.label} - coming soon`} title={`${item.label} - coming soon`}>
        {iconEl}{labelEl}{soonBadge}
      </span>
    );
  }

  return (
    <Link
      href={item.href}
      onClick={onClick}
      className={base}
      aria-current={isActive ? "page" : undefined}
      title={!expanded ? item.label : undefined}
      style={isActive ? {
        background: "linear-gradient(135deg, rgba(99,102,241,0.25) 0%, rgba(79,70,229,0.18) 100%)",
        border: "1px solid rgba(99,102,241,0.3)",
        boxShadow: "0 0 12px rgba(99,102,241,0.15)",
      } : undefined}
    >
      {iconEl}{labelEl}
      {!item.comingSoon && isActive && expanded && (
        <ChevronRight size={12} className="shrink-0 opacity-40 ml-auto" aria-hidden="true" />
      )}
    </Link>
  );
}

interface SidebarProps {
  mobileOpen: boolean;
  onClose: () => void;
  user: { name: string; email: string } | null;
}

export function Sidebar({ mobileOpen, onClose, user }: SidebarProps): React.JSX.Element {
  const pathname = usePathname();
  const [hovered, setHovered] = useState(false);
  const expanded = hovered;

  function isActive(href: string): boolean {
    return pathname === href || pathname.startsWith(href + "/");
  }

  const navContent = (isMobile: boolean): React.JSX.Element => (
    <nav
      className="flex flex-col h-full"
      aria-label="Application navigation"
      style={{ background: "rgba(4,5,18,0.97)" }}
    >
      {/* Logo + mobile close */}
      <div
        className="flex items-center justify-between shrink-0 px-3 py-3"
        style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}
      >
        {isMobile || expanded ? <Logo /> : <Logo variant="icon" />}
        {isMobile && (
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-md text-content-secondary hover:text-content-primary hover:bg-surface-700 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
            aria-label="Close navigation menu"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M18 6 6 18" /><path d="m6 6 12 12" />
            </svg>
          </button>
        )}
      </div>

      {/* Nav scroll area */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden px-2 py-3 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        <ul className="flex flex-col gap-0.5 list-none">
          {primaryNav.map((item) => (
            <li key={item.href}>
              <NavLink item={item} isActive={isActive(item.href)} expanded={isMobile || expanded} onClick={onClose} />
            </li>
          ))}
        </ul>
      </div>

      {/* Account section — pinned to bottom */}
      <SidebarAccount
        user={user}
        expanded={isMobile || expanded}
        isMobile={isMobile}
        onClose={onClose}
      />
    </nav>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <aside
        className="hidden lg:flex lg:flex-col lg:shrink-0 transition-all duration-200"
        style={{
          width: expanded ? "240px" : "60px",
          borderRight: "1px solid rgba(255,255,255,0.06)",
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {navContent(false)}
      </aside>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" aria-hidden="true" onClick={onClose} />
          <aside className="absolute left-0 top-0 bottom-0 w-64 shadow-xl">
            {navContent(true)}
          </aside>
        </div>
      )}
    </>
  );
}
