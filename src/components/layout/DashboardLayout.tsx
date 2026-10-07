"use client";

import { useState } from "react";
import { AppHeader } from "./AppHeader";
import { Sidebar } from "./Sidebar";

interface DashboardLayoutProps {
  children: React.ReactNode;
  user: { name: string; email: string } | null;
}

export function DashboardLayout({
  children,
  user,
}: DashboardLayoutProps): React.JSX.Element {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex flex-col min-h-screen bg-surface-900">
      <AppHeader onMenuToggle={() => setSidebarOpen(true)} user={user} />

      <div className="flex flex-1 overflow-hidden">
        <Sidebar
          mobileOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />

        <main className="flex-1 overflow-y-auto p-6 min-w-0">
          {children}
        </main>
      </div>
    </div>
  );
}
