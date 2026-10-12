
"use client";

import { useState, type ReactElement, type ReactNode } from "react";
import AdminHeader from "./AdminHeader";
import AdminSidebar from "./AdminSidebar";

export default function AdminShell({
  children,
}: {
  children: ReactNode;
}): ReactElement {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#f5f7fb]">
      <AdminSidebar
        mobileOpen={mobileOpen}
        onClose={() => setMobileOpen(false)}
      />

      <div className="min-h-screen lg:pl-70">
        <AdminHeader
          onMenuClick={() => setMobileOpen(true)}
        />

        <main className="mx-auto min-h-[calc(100vh-68px)] w-full max-w-none p-3 sm:p-5 lg:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
