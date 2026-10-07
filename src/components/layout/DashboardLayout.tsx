"use client";

import { useState } from "react";
import { AppHeader } from "./AppHeader";
import { Sidebar } from "./Sidebar";

interface DashboardLayoutProps {
  children: React.ReactNode;
  user: { name: string; email: string } | null;
}

export function DashboardLayout({ children, user }: DashboardLayoutProps): React.JSX.Element {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div
      className="flex h-screen overflow-hidden"
      style={{ background: "#030712" }}
    >
      {/* Sidebar */}
      <Sidebar mobileOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main column */}
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        <AppHeader onMenuToggle={() => setSidebarOpen(true)} user={user} />
        <main
          className="flex-1 overflow-y-auto"
          style={{ background: "#030712" }}
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6 py-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
