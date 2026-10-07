"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  MoreHorizontal,
  LayoutDashboard,
  Settings,
  Download,
  Palette,
  HelpCircle,
  LogOut,
  ChevronRight,
  Zap,
  BookOpen,
  MessageCircle,
  FileText,
} from "lucide-react";
import { getInitials } from "@/lib/utils";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface SidebarAccountProps {
  user: { name: string; email: string } | null;
  expanded: boolean;
  isMobile: boolean;
  onClose: () => void;
}

type AppearanceTheme = "system" | "light" | "dark" | "glass";
type Submenu = "appearance" | "help" | null;

// ---------------------------------------------------------------------------
// SidebarAccount
// ---------------------------------------------------------------------------

export function SidebarAccount({
  user,
  expanded,
  isMobile,
  onClose,
}: SidebarAccountProps): React.JSX.Element {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState<Submenu>(null);
  const [theme, setTheme] = useState<AppearanceTheme>("system");
  const [loggingOut, setLoggingOut] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const displayName = user?.name || user?.email || "User";
  const email = user?.email || "user@example.com";
  const initials = getInitials(displayName);
  const showExpanded = isMobile || expanded;

  // Close on outside click
  useEffect(() => {
    if (!menuOpen) return;
    function handleClick(e: MouseEvent): void {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setMenuOpen(false);
        setActiveSubmenu(null);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [menuOpen]);

  // Close on Escape
  useEffect(() => {
    if (!menuOpen) return;
    function handleKey(e: KeyboardEvent): void {
      if (e.key === "Escape") {
        setMenuOpen(false);
        setActiveSubmenu(null);
      }
    }
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [menuOpen]);

  const closeAll = useCallback(() => {
    setMenuOpen(false);
    setActiveSubmenu(null);
    onClose();
  }, [onClose]);

  async function handleLogout(): Promise<void> {
    setLoggingOut(true);
    closeAll();
    try {
      await fetch("/api/auth/logout", { method: "POST" });
    } finally {
      router.push("/login");
    }
  }

  // ---------------------------------------------------------------------------
  // Avatar
  // ---------------------------------------------------------------------------

  const avatar = (
    <div
      className="flex items-center justify-center w-8 h-8 rounded-full text-white text-xs font-semibold select-none shrink-0"
      style={{ background: "linear-gradient(135deg,#6366f1,#4f46e5)", fontSize: "13px" }}
      aria-hidden="true"
    >
      {initials}
    </div>
  );

  // ---------------------------------------------------------------------------
  // Popup menu positioning
  // collapsed desktop → right of sidebar
  // expanded desktop / mobile → above profile bar
  // ---------------------------------------------------------------------------

  const menuPositionStyle: React.CSSProperties =
    !isMobile && !expanded
      ? {
          position: "absolute",
          left: "calc(100% + 8px)",
          bottom: "0",
          top: "auto",
        }
      : {
          position: "absolute",
          bottom: "calc(100% + 8px)",
          left: "0",
          right: "0",
        };

  // ---------------------------------------------------------------------------
  // Render
  // ---------------------------------------------------------------------------

  return (
    <div
      ref={containerRef}
      className="relative shrink-0"
      style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
    >
      {/* ── Profile button ── */}
      <button
        type="button"
        onClick={() => {
          setMenuOpen((v) => !v);
          setActiveSubmenu(null);
        }}
        aria-label="Open account menu"
        aria-expanded={menuOpen}
        aria-haspopup="menu"
        className="w-full flex items-center gap-2.5 rounded-xl transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
        style={{
          padding: showExpanded ? "6px 8px" : "8px",
          justifyContent: showExpanded ? "flex-start" : "center",
          background: menuOpen ? "rgba(255,255,255,0.06)" : "transparent",
          margin: "8px 6px",
          width: showExpanded ? "calc(100% - 12px)" : "auto",
          alignSelf: showExpanded ? "auto" : "center",
        }}
        onMouseEnter={(e) => {
          if (!menuOpen) (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.05)";
        }}
        onMouseLeave={(e) => {
          if (!menuOpen) (e.currentTarget as HTMLButtonElement).style.background = "transparent";
        }}
      >
        {avatar}

        {showExpanded && (
          <>
            <span
              className="flex-1 text-left truncate"
              style={{ fontSize: "13px", fontWeight: 500, color: "rgba(255,255,255,0.85)" }}
            >
              {displayName}
            </span>
            <MoreHorizontal
              size={16}
              style={{ color: "rgba(255,255,255,0.4)", flexShrink: 0 }}
              aria-hidden="true"
            />
          </>
        )}
      </button>

      {/* ── Account menu popup ── */}
      {menuOpen && (
        <div
          ref={menuRef}
          role="menu"
          aria-label="Account menu"
          style={{
            ...menuPositionStyle,
            width: "240px",
            background: "rgba(12,13,22,0.98)",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: "10px",
            boxShadow: "0 12px 35px rgba(0,0,0,0.55)",
            backdropFilter: "blur(12px)",
            zIndex: 60,
            animation: "qaAccountMenuIn 150ms ease-out",
          }}
        >
          <style>{`
            @keyframes qaAccountMenuIn {
              from { opacity: 0; transform: translateY(6px); }
              to   { opacity: 1; transform: translateY(0); }
            }
          `}</style>

          {/* ── User info + upgrade ── */}
          <div className="px-3 pt-3 pb-2">
            <p
              className="font-semibold truncate"
              style={{ fontSize: "13px", color: "rgba(255,255,255,0.92)" }}
            >
              {displayName}
            </p>
            <p
              className="truncate mt-0.5"
              style={{ fontSize: "11px", color: "rgba(255,255,255,0.4)" }}
            >
              {email}
            </p>
            <button
              type="button"
              disabled
              className="mt-2.5 w-full h-7 rounded-lg text-xs font-semibold text-white disabled:opacity-60 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
              style={{
                background: "linear-gradient(135deg,#6366f1,#4f46e5)",
                boxShadow: "0 0 10px rgba(99,102,241,0.3)",
              }}
              title="Billing coming in a future release"
            >
              <Zap size={11} className="inline mr-1" aria-hidden="true" />
              Upgrade to Pro+
            </button>
          </div>

          {/* Divider */}
          <div style={{ height: "1px", background: "rgba(255,255,255,0.07)", margin: "2px 0" }} aria-hidden="true" />

          {/* ── Group 1: Dashboard + Settings ── */}
          <div className="px-1.5 py-1">
            <MenuLink
              icon={<LayoutDashboard size={14} aria-hidden="true" />}
              label="Dashboard"
              href="/dashboard"
              onClick={closeAll}
            />
            <MenuLink
              icon={<Settings size={14} aria-hidden="true" />}
              label="My Settings"
              href="/settings"
              onClick={closeAll}
            />
          </div>

          {/* Divider */}
          <div style={{ height: "1px", background: "rgba(255,255,255,0.07)", margin: "2px 0" }} aria-hidden="true" />

          {/* ── Group 2: Download / Appearance / Help ── */}
          <div className="px-1.5 py-1">
            <MenuButton
              icon={<Download size={14} aria-hidden="true" />}
              label="Download QAForge"
              disabled
              soon
            />

            {/* Appearance with submenu */}
            <div className="relative">
              <MenuButton
                icon={<Palette size={14} aria-hidden="true" />}
                label="Appearance"
                rightLabel={theme.charAt(0).toUpperCase() + theme.slice(1)}
                rightIcon={<ChevronRight size={12} aria-hidden="true" />}
                active={activeSubmenu === "appearance"}
                onClick={() =>
                  setActiveSubmenu((s) => (s === "appearance" ? null : "appearance"))
                }
              />
              {activeSubmenu === "appearance" && (
                <Submenu>
                  {(["system", "light", "dark", "glass"] as AppearanceTheme[]).map((t) => (
                    <button
                      key={t}
                      type="button"
                      role="menuitem"
                      onClick={() => {
                        setTheme(t);
                        setActiveSubmenu(null);
                      }}
                      className="w-full flex items-center justify-between px-3 py-1.5 rounded-md transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
                      style={{
                        fontSize: "12px",
                        color: theme === t ? "#a5b4fc" : "rgba(255,255,255,0.75)",
                        background: theme === t ? "rgba(99,102,241,0.12)" : "transparent",
                      }}
                      onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.background = theme === t ? "rgba(99,102,241,0.15)" : "rgba(255,255,255,0.05)"; }}
                      onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.background = theme === t ? "rgba(99,102,241,0.12)" : "transparent"; }}
                    >
                      <span className="capitalize">{t}</span>
                      {theme === t && (
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                          <path d="M2 6l3 3 5-5" stroke="#818cf8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      )}
                    </button>
                  ))}
                </Submenu>
              )}
            </div>

            {/* Help with submenu */}
            <div className="relative">
              <MenuButton
                icon={<HelpCircle size={14} aria-hidden="true" />}
                label="Help"
                rightIcon={<ChevronRight size={12} aria-hidden="true" />}
                active={activeSubmenu === "help"}
                onClick={() =>
                  setActiveSubmenu((s) => (s === "help" ? null : "help"))
                }
              />
              {activeSubmenu === "help" && (
                <Submenu>
                  {[
                    { label: "Documentation", icon: <BookOpen size={12} aria-hidden="true" />, href: "/docs" },
                    { label: "Get Help", icon: <MessageCircle size={12} aria-hidden="true" />, href: "/help" },
                    { label: "Contact Us", icon: <FileText size={12} aria-hidden="true" />, href: "/contact" },
                  ].map((item) => (
                    <Link
                      key={item.label}
                      href={item.href}
                      role="menuitem"
                      onClick={closeAll}
                      className="flex items-center gap-2.5 px-3 py-1.5 rounded-md transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
                      style={{ fontSize: "12px", color: "rgba(255,255,255,0.75)" }}
                      onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.background = "rgba(255,255,255,0.05)"; }}
                      onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.background = "transparent"; }}
                    >
                      <span style={{ color: "rgba(255,255,255,0.45)" }}>{item.icon}</span>
                      {item.label}
                    </Link>
                  ))}
                </Submenu>
              )}
            </div>
          </div>

          {/* Divider */}
          <div style={{ height: "1px", background: "rgba(255,255,255,0.07)", margin: "2px 0" }} aria-hidden="true" />

          {/* ── Logout ── */}
          <div className="px-1.5 py-1">
            <button
              type="button"
              role="menuitem"
              disabled={loggingOut}
              onClick={handleLogout}
              className="w-full flex items-center gap-2.5 px-2.5 py-2 rounded-md transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 disabled:opacity-50"
              style={{ fontSize: "13px", color: "#f87171" }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.background = "rgba(239,68,68,0.08)"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.background = "transparent"; }}
            >
              <LogOut size={14} style={{ color: "#f87171", flexShrink: 0 }} aria-hidden="true" />
              {loggingOut ? "Signing out…" : "Log Out"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Helper sub-components
// ---------------------------------------------------------------------------

function MenuLink({
  icon,
  label,
  href,
  onClick,
}: {
  icon: React.ReactNode;
  label: string;
  href: string;
  onClick: () => void;
}): React.JSX.Element {
  return (
    <Link
      href={href}
      role="menuitem"
      onClick={onClick}
      className="flex items-center gap-2.5 px-2.5 py-2 rounded-md transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
      style={{ fontSize: "13px", color: "rgba(255,255,255,0.85)" }}
      onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.background = "rgba(255,255,255,0.06)"; }}
      onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.background = "transparent"; }}
    >
      <span style={{ color: "rgba(255,255,255,0.55)", flexShrink: 0 }}>{icon}</span>
      {label}
    </Link>
  );
}

function MenuButton({
  icon,
  label,
  rightLabel,
  rightIcon,
  onClick,
  disabled,
  soon,
  active,
}: {
  icon: React.ReactNode;
  label: string;
  rightLabel?: string;
  rightIcon?: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  soon?: boolean;
  active?: boolean;
}): React.JSX.Element {
  return (
    <button
      type="button"
      role="menuitem"
      disabled={disabled}
      onClick={onClick}
      className="w-full flex items-center gap-2.5 px-2.5 py-2 rounded-md transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 disabled:opacity-40 disabled:cursor-default"
      style={{
        fontSize: "13px",
        color: "rgba(255,255,255,0.85)",
        background: active ? "rgba(255,255,255,0.04)" : "transparent",
      }}
      onMouseEnter={(e) => {
        if (!disabled) (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.06)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLButtonElement).style.background = active ? "rgba(255,255,255,0.04)" : "transparent";
      }}
    >
      <span style={{ color: "rgba(255,255,255,0.55)", flexShrink: 0 }}>{icon}</span>
      <span className="flex-1 text-left">{label}</span>
      {soon && (
        <span
          className="text-[9px] font-semibold px-1.5 py-0.5 rounded-full"
          style={{ background: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.3)", border: "1px solid rgba(255,255,255,0.08)" }}
        >
          Soon
        </span>
      )}
      {rightLabel && (
        <span style={{ fontSize: "11px", color: "rgba(255,255,255,0.4)" }}>{rightLabel}</span>
      )}
      {rightIcon && (
        <span style={{ color: "rgba(255,255,255,0.3)" }}>{rightIcon}</span>
      )}
    </button>
  );
}

function Submenu({ children }: { children: React.ReactNode }): React.JSX.Element {
  return (
    <div
      className="mt-1 mb-1 ml-3 rounded-lg overflow-hidden"
      style={{
        background: "rgba(255,255,255,0.03)",
        border: "1px solid rgba(255,255,255,0.07)",
      }}
    >
      {children}
    </div>
  );
}
