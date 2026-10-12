
"use client";

import { useState, type ReactElement } from "react";
import { Bell, LogOut, Menu, Search } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

interface Props {
  onMenuClick: () => void;
}

export default function AdminHeader({
  onMenuClick,
}: Props): ReactElement {
  const router = useRouter();
  const pathname = usePathname();

  const [loggingOut, setLoggingOut] = useState(false);
  const [error, setError] = useState("");

  const hideGlobalSearch = pathname === "/admin/users";

  async function handleLogout(): Promise<void> {
    if (loggingOut) return;

    setLoggingOut(true);
    setError("");

    try {
      const response = await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "same-origin",
      });

      if (!response.ok) {
        throw new Error("Logout failed");
      }

      router.replace("/admin/login");
      router.refresh();
    } catch {
      setError("Unable to log out. Please try again.");
      setLoggingOut(false);
    }
  }

  return (
    <header className="sticky top-0 z-40 flex min-h-17 items-center justify-between gap-4 border-b border-slate-200 bg-white/95 px-4 backdrop-blur-xl md:px-7">
      <div className="flex min-w-0 flex-1 items-center gap-3">
        <button
          type="button"
          onClick={onMenuClick}
          className="rounded-lg p-2 hover:bg-slate-100 lg:hidden"
          aria-label="Open navigation"
        >
          <Menu size={21} />
        </button>

        {!hideGlobalSearch && (
          <div className="hidden w-full max-w-162.5 items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 sm:flex">
            <Search size={18} className="shrink-0 text-slate-400" />
            <input
              aria-label="Global search"
              placeholder="Search users, projects, issues, or anything..."
              className="w-full bg-transparent text-sm outline-none placeholder:text-slate-400"
            />
            <kbd className="rounded border border-slate-200 bg-white px-2 py-1 text-xs text-slate-400">
              Ctrl K
            </kbd>
          </div>
        )}
      </div>

      <div className="flex shrink-0 items-center gap-3 md:gap-5">
        <button
          type="button"
          aria-label="Notifications"
          className="relative rounded-xl p-2 hover:bg-slate-100"
        >
          <Bell size={21} className="text-slate-600" />
        </button>

        <div className="hidden h-9 border-l border-slate-200 sm:block" />

        <div className="hidden items-center gap-3 sm:flex">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#182b68] font-semibold text-white">
            V
          </div>

          <div>
            <p className="text-sm font-semibold text-slate-900">
              App Owner
            </p>
            <p className="text-xs text-slate-500">
              Owner account
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={handleLogout}
          disabled={loggingOut}
          className="flex items-center gap-2 rounded-xl border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-60"
        >
          <LogOut size={17} />
          {loggingOut ? "Logging out..." : "Logout"}
        </button>
      </div>

      {error && (
        <p
          role="alert"
          className="absolute right-4 top-full mt-2 rounded-lg bg-red-50 p-3 text-sm text-red-700 shadow"
        >
          {error}
        </p>
      )}
    </header>
  );
}
