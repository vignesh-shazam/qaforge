
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    Activity, Bot, ChevronDown, CreditCard, Folder,
    LayoutDashboard, MessageSquare, PlayCircle, Settings,
    ShieldCheck, Users, X,
} from "lucide-react";
import type { ReactElement } from "react";

const nav = [
    { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { label: "User Management", href: "/admin/users", icon: Users, expandable: true },
    { label: "Project Management", href: "/admin/projects", icon: Folder, expandable: true },
    { label: "Tests & Automation", href: "/admin/jobs-runs", icon: PlayCircle, expandable: true },
    { label: "AI & Usage", href: "/admin/ai-usage", icon: Bot, expandable: true },
    { label: "Support & Conversations", href: "/admin/support", icon: MessageSquare },
    { label: "Billing & Plans", href: "/admin/billing", icon: CreditCard, expandable: true },
    { label: "Security & Audit Logs", href: "/admin/security", icon: ShieldCheck, expandable: true },
    { label: "System Health", href: "/admin/system-health", icon: Activity, expandable: true },
    { label: "Platform Settings", href: "/admin/settings", icon: Settings, expandable: true },
];

interface Props {
    mobileOpen: boolean;
    onClose: () => void;
}

export default function AdminSidebar({
    mobileOpen,
    onClose,
}: Props): ReactElement {
    const pathname = usePathname();

    return (
        <>
            {mobileOpen && (
                <button
                    aria-label="Close navigation overlay"
                    onClick={onClose}
                    className="fixed inset-0 z-40 bg-slate-950/60 lg:hidden"
                />
            )}

            <aside className={`fixed inset-y-0 left-0 z-50 flex w-70 flex-col bg-[#10182d] text-slate-300 transition-transform duration-200 ${mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
                }`}>
                <div className="flex h-21.25items-center gap-3 border-b border-white/10 px-6">
                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-violet-600 text-white">
                        <ShieldCheck size={25} />
                    </div>
                    <div className="min-w-0">
                        <div className="flex items-center gap-2">
                            <span className="text-xl font-bold text-white">QAForge</span>
                            <span className="rounded-md bg-violet-600 px-2 py-0.5 text-[10px] font-bold text-white">ADMIN</span>
                        </div>
                        <p className="text-xs text-slate-400">AI-Powered QA Automation</p>
                    </div>
                    <button className="ml-auto lg:hidden" onClick={onClose} aria-label="Close sidebar">
                        <X size={20} />
                    </button>
                </div>

                <nav className="flex-1 space-y-1 overflow-y-auto px-4 py-4">
                    {nav.map(({ label, href, icon: Icon, expandable }) => {
                        const active = href === "/admin"
                            ? pathname === href
                            : pathname === href || pathname.startsWith(`${href}/`);

                        return (
                            <Link
                                key={href}
                                href={href}
                                onClick={onClose}
                                aria-current={active ? "page" : undefined}
                                className={`flex min-h-11 items-center gap-3 rounded-xl px-3 py-2.5 text-[13px] font-medium transition ${active
                                        ? "bg-linear-to-r from-violet-600 to-indigo-600 text-white shadow-lg shadow-violet-950/30"
                                        : "text-slate-300 hover:bg-white/[0.07] hover:text-white"
                                    }`}
                            >
                                <Icon size={19} strokeWidth={1.8} />
                                <span className="flex-1">{label}</span>
                                {expandable && <ChevronDown size={15} className="text-slate-500" />}
                            </Link>
                        );
                    })}
                </nav>

                <div className="m-4 rounded-xl border border-white/10 bg-white/4 p-4">
                    <div className="flex items-center gap-2 font-semibold text-amber-300">
                        <ShieldCheck size={19} />
                        App Owner Panel
                    </div>
                    <p className="mt-2 text-xs leading-5 text-slate-400">
                        Exclusive administration workspace for the QAForge owner.
                    </p>
                </div>
            </aside>
        </>
    );
}
