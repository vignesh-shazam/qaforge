
"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type MouseEvent,
  type ReactElement,
} from "react";

import {
  ArrowDownUp,
  CalendarDays,
  CheckCircle2,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Copy,
  FolderKanban,
  LoaderCircle,
  MoreHorizontal,
  RefreshCw,
  Search,
  ShieldCheck,
  Trash2,
  UserRound,
  UserRoundPlus,
  UsersRound,
  X,
  Ban,
  Check,
} from "lucide-react";

interface AdminUser {
  id: string;
  name: string | null;
  email: string;
  createdAt: string;
  projectCount: number;
  status: "active" | "deactivated";
}

interface UsersResponse {
  success: boolean;
  data: AdminUser[];
  pagination: {
    page: number;
    pageSize: number;
    total: number;
    totalPages: number;
  };
  error?: string;
}

type DateFilter = "all" | "7" | "30" | "90";
type SortOrder = "newest" | "oldest" | "name";

interface MenuPosition {
  user: AdminUser;
  top: number;
  left: number;
}

function initials(name: string | null, email: string): string {
  const value = name?.trim();

  if (value) {
    return value
      .split(/\s+/)
      .slice(0, 2)
      .map((part) => part[0] ?? "")
      .join("")
      .toUpperCase();
  }

  return email.slice(0, 2).toUpperCase();
}

function formatDate(value: string): string {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) return "Unknown";

  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(date);
}

function formatTime(value: string): string {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) return "";

  return new Intl.DateTimeFormat("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}

function matchesDateFilter(
  createdAt: string,
  filter: DateFilter,
): boolean {
  if (filter === "all") return true;

  const date = new Date(createdAt);

  if (Number.isNaN(date.getTime())) return false;

  const cutoff = new Date();
  cutoff.setDate(cutoff.getDate() - Number(filter));

  return date >= cutoff;
}

function TrendGraphic({
  color,
}: {
  color: string;
}): ReactElement {
  return (
    <svg
      viewBox="0 0 110 48"
      className="h-12 w-28 overflow-visible"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M2 40 C12 40 14 15 25 23 S40 42 50 23 S66 10 75 20 S90 25 108 3"
        stroke={color}
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function UserIllustration(): ReactElement {
  return (
    <svg
      viewBox="0 0 260 150"
      className="h-32 w-56 max-w-full"
      fill="none"
      role="img"
      aria-label="Illustration of platform users"
    >
      <circle cx="130" cy="74" r="60" fill="#8B5CF6" opacity=".07" />
      <circle
        cx="130"
        cy="74"
        r="45"
        stroke="#8B5CF6"
        strokeOpacity=".15"
        strokeDasharray="4 6"
      />
      <g>
        <circle cx="130" cy="46" r="19" fill="#C4B5FD" />
        <path
          d="M95 111c0-20 15-33 35-33s35 13 35 33v5H95v-5Z"
          fill="#7C3AED"
        />
      </g>
      <g>
        <circle cx="77" cy="66" r="15" fill="#93C5FD" />
        <path
          d="M49 112c0-17 12-28 28-28s28 11 28 28v4H49v-4Z"
          fill="#3B82F6"
        />
      </g>
      <g>
        <circle cx="184" cy="66" r="15" fill="#A7F3D0" />
        <path
          d="M156 112c0-17 12-28 28-28s28 11 28 28v4h-56v-4Z"
          fill="#10B981"
        />
      </g>
      <circle cx="213" cy="24" r="15" fill="#F3E8FF" />
      <path
        d="m207 24 4 4 8-9"
        stroke="#7C3AED"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="42" cy="35" r="11" fill="#DBEAFE" />
      <path
        d="m39 35 2 2 4-5"
        stroke="#2563EB"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function SummaryCard({
  label,
  value,
  description,
  icon: Icon,
  color,
  index,
}: {
  label: string;
  value: string | number;
  description: string;
  icon: typeof UsersRound;
  color: "purple" | "green" | "blue" | "amber";
  index: number;
}): ReactElement {
  const styles = {
    purple: {
      icon: "bg-violet-100 text-violet-600",
      line: "#8B5CF6",
    },
    green: {
      icon: "bg-emerald-100 text-emerald-600",
      line: "#10B981",
    },
    blue: {
      icon: "bg-blue-100 text-blue-600",
      line: "#3B82F6",
    },
    amber: {
      icon: "bg-amber-100 text-amber-600",
      line: "#F59E0B",
    },
  }[color];

  return (
    <article
      className="group rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-violet-950/5"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className="flex items-start justify-between gap-3">
        <div
          className={`flex h-12 w-12 items-center justify-center rounded-2xl ${styles.icon}`}
        >
          <Icon size={23} strokeWidth={1.9} />
        </div>
        <TrendGraphic color={styles.line} />
      </div>

      <p className="mt-5 text-sm font-medium text-slate-500">
        {label}
      </p>

      <p className="mt-1 text-3xl font-bold tracking-tight text-slate-900">
        {value}
      </p>

      <p className="mt-2 text-xs text-slate-500">{description}</p>
    </article>
  );
}

export default function AdminUsersPage(): ReactElement {
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);
  const [refreshKey, setRefreshKey] = useState(0);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [dateFilter, setDateFilter] = useState<DateFilter>("all");
  const [sortOrder, setSortOrder] = useState<SortOrder>("newest");
  const [menu, setMenu] = useState<MenuPosition | null>(null);
  const [selectedUser, setSelectedUser] = useState<AdminUser | null>(null);
  const [actionLoading, setActionLoading] = useState(false);

  const loadUsers = useCallback(
    async (signal: AbortSignal): Promise<void> => {
      try {
        const params = new URLSearchParams({
          page: String(page),
          pageSize: String(pageSize),
          search: search.trim(),
        });

        const response = await fetch(`/api/admin/users?${params}`, {
          method: "GET",
          cache: "no-store",
          signal,
        });

        const result = (await response.json()) as UsersResponse;

        if (!response.ok || !result.success) {
          throw new Error(
            result.error ?? "Unable to load registered users.",
          );
        }

        if (signal.aborted) return;

        setUsers(
          result.data.map((user) => ({
            ...user,
            // The API must return a persisted database status.
            status: user.status ?? "active",
          })),
        );
        setTotal(result.pagination.total);
        setTotalPages(result.pagination.totalPages);
        setError("");
      } catch (caught: unknown) {
        if (signal.aborted) return;

        setError(
          caught instanceof Error
            ? caught.message
            : "Something went wrong while loading users.",
        );
      } finally {
        if (!signal.aborted) setLoading(false);
      }
    },
    [page, pageSize, search],
  );

  useEffect(() => {
    const controller = new AbortController();

    const timer = window.setTimeout(() => {
      void loadUsers(controller.signal);
    }, 250);

    return () => {
      window.clearTimeout(timer);
      controller.abort();
    };
  }, [loadUsers, refreshKey]);

  useEffect(() => {
    if (!menu) return;

    const closeMenu = (): void => setMenu(null);

    window.addEventListener("resize", closeMenu);
    window.addEventListener("scroll", closeMenu, true);

    return () => {
      window.removeEventListener("resize", closeMenu);
      window.removeEventListener("scroll", closeMenu, true);
    };
  }, [menu]);

  const visibleUsers = useMemo(
    () =>
      users
        .filter((user) => matchesDateFilter(user.createdAt, dateFilter))
        .sort((a, b) => {
          if (sortOrder === "name") {
            return (a.name ?? a.email).localeCompare(
              b.name ?? b.email,
            );
          }

          const difference =
            new Date(a.createdAt).getTime() -
            new Date(b.createdAt).getTime();

          return sortOrder === "newest" ? -difference : difference;
        }),
    [users, dateFilter, sortOrder],
  );

  const totalProjects = users.reduce(
    (sum, user) => sum + user.projectCount,
    0,
  );

  const latestRegistration = users.reduce<AdminUser | null>(
    (latest, user) =>
      !latest ||
      new Date(user.createdAt).getTime() >
        new Date(latest.createdAt).getTime()
        ? user
        : latest,
    null,
  );

  const activeCount = users.filter(
    (user) => user.status === "active",
  ).length;

  const handleSearch = (value: string): void => {
    setSearch(value);
    setPage(1);
    setLoading(true);
    setError("");
    setMenu(null);
  };

  const refreshUsers = (): void => {
    setLoading(true);
    setError("");
    setNotice("");
    setMenu(null);
    setRefreshKey((value) => value + 1);
  };

  const changePage = (nextPage: number): void => {
    if (
      nextPage < 1 ||
      nextPage > totalPages ||
      nextPage === page
    ) {
      return;
    }

    setPage(nextPage);
    setLoading(true);
    setError("");
    setMenu(null);
  };

  const changePageSize = (value: string): void => {
    const nextSize = Number(value);

    if (![10, 20, 50, 100].includes(nextSize)) return;

    setPageSize(nextSize);
    setPage(1);
    setLoading(true);
    setMenu(null);
  };

  const openMenu = (
    event: MouseEvent<HTMLButtonElement>,
    user: AdminUser,
  ): void => {
    event.stopPropagation();

    if (menu?.user.id === user.id) {
      setMenu(null);
      return;
    }

    const rect = event.currentTarget.getBoundingClientRect();
    const menuWidth = 208;
    const menuHeight = 160;

    const left = Math.max(
      12,
      Math.min(rect.right - menuWidth, window.innerWidth - menuWidth - 12),
    );

    const top =
      rect.bottom + menuHeight > window.innerHeight
        ? Math.max(12, rect.top - menuHeight)
        : rect.bottom + 6;

    setMenu({ user, top, left });
  };

  const copyUserId = async (user: AdminUser): Promise<void> => {
    try {
      await navigator.clipboard.writeText(user.id);
      setNotice("Account ID copied.");
    } catch {
      setNotice("Unable to copy the account ID.");
    }

    setMenu(null);
  };

  const performAccountAction = async (
    user: AdminUser,
    action: "activate" | "deactivate" | "delete",
  ): Promise<void> => {
    const actionLabel =
      action === "activate"
        ? "activate"
        : action === "deactivate"
          ? "deactivate"
          : "delete";

    if (
      action === "delete" &&
      !window.confirm(
        `Delete the account for ${user.email}?\n\nThis action should be implemented as a soft delete.`,
      )
    ) {
      setMenu(null);
      return;
    }

    setActionLoading(true);
    setMenu(null);
    setNotice("");
    setError("");

    try {
      const response = await fetch(`/api/admin/users/${user.id}`, {
        method: action === "delete" ? "DELETE" : "PATCH",
        headers: { "Content-Type": "application/json" },
        body:
          action === "delete"
            ? undefined
            : JSON.stringify({
                status: action === "activate" ? "active" : "deactivated",
              }),
      });

      const result = (await response.json()) as {
        success?: boolean;
        error?: string;
      };

      if (!response.ok || !result.success) {
        throw new Error(
          result.error ??
            `Unable to ${actionLabel} this account. Verify that the admin API is implemented.`,
        );
      }

      setNotice(
        action === "delete"
          ? "Account deleted."
          : `Account ${action === "activate" ? "activated" : "deactivated"}.`,
      );

      setLoading(true);
      setRefreshKey((value) => value + 1);
    } catch (caught: unknown) {
      setError(
        caught instanceof Error
          ? caught.message
          : `Unable to ${actionLabel} this account.`,
      );
    } finally {
      setActionLoading(false);
    }
  };

  const showingStart =
    visibleUsers.length === 0 ? 0 : (page - 1) * pageSize + 1;

  const showingEnd =
    visibleUsers.length === 0
      ? 0
      : Math.min((page - 1) * pageSize + visibleUsers.length, total);

  const placeholderCount = Math.max(
    0,
    pageSize - visibleUsers.length,
  );

  return (
    <div className="qaf-users min-h-full bg-[#fcfcfc] text-slate-900">
      <div className="mx-auto w-full max-w-none space-y-6 p-4 sm:p-6 xl:p-8">
        <section className="relative overflow-hidden rounded-3xl border border-violet-100 bg-white shadow-sm">
          <div className="absolute -right-12 -top-24 h-64 w-64 rounded-full bg-violet-100/70 blur-3xl" />
          <div className="absolute right-1/4 top-16 h-40 w-40 rounded-full bg-blue-100/60 blur-3xl" />

          <div className="relative flex flex-col items-center justify-between gap-5 p-5 md:flex-row md:p-7">
            <div className="flex items-start gap-4">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-linear-to-br from-violet-600 to-indigo-600 text-white shadow-lg shadow-violet-500/25">
                <UsersRound size={28} />
              </div>

              <div>
                <div className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-violet-600">
                  <ShieldCheck size={15} />
                  Platform Control Center
                </div>

                <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
                  User Management
                </h1>

                <p className="mt-2 max-w-xl text-sm leading-6 text-slate-500">
                  Monitor registrations, review account activity, and
                  manage your QAForge community.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="hidden lg:block">
                <UserIllustration />
              </div>

              <button
                type="button"
                onClick={refreshUsers}
                disabled={loading}
                className="inline-flex shrink-0 items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold shadow-sm transition hover:border-violet-300 hover:bg-violet-50 disabled:opacity-60"
              >
                <RefreshCw
                  size={16}
                  className={loading ? "animate-spin" : ""}
                />
                Refresh
              </button>
            </div>
          </div>
        </section>

        <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <SummaryCard
            index={0}
            label="Total Users"
            value={total}
            description="Matching your current search"
            icon={UsersRound}
            color="purple"
          />

          <SummaryCard
            index={1}
            label="New Users (30 days)"
            value={
              users.filter((user) =>
                matchesDateFilter(user.createdAt, "30"),
              ).length
            }
            description="Among currently loaded users"
            icon={UserRoundPlus}
            color="green"
          />

          <SummaryCard
            index={2}
            label="Projects on this page"
            value={totalProjects}
            description="Combined project count"
            icon={FolderKanban}
            color="blue"
          />

          <SummaryCard
            index={3}
            label="Latest Registration"
            value={
              latestRegistration
                ? formatDate(latestRegistration.createdAt)
                : "—"
            }
            description={
              latestRegistration?.email ?? "No registrations found"
            }
            icon={CalendarDays}
            color="amber"
          />
        </section>

        {error && (
          <div
            role="alert"
            className="flex items-start justify-between gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
          >
            <span>{error}</span>
            <button
              type="button"
              aria-label="Dismiss error"
              onClick={() => setError("")}
            >
              <X size={17} />
            </button>
          </div>
        )}

        {notice && (
          <div
            role="status"
            className="flex items-start justify-between gap-3 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700"
          >
            <span>{notice}</span>
            <button
              type="button"
              aria-label="Dismiss message"
              onClick={() => setNotice("")}
            >
              <X size={17} />
            </button>
          </div>
        )}

        <section className="overflow-visible rounded-2xl border border-slate-200 bg-white shadow-lg shadow-slate-200/50">
          <div className="flex flex-col justify-between gap-4 border-b border-slate-100 p-5 sm:flex-row sm:items-center sm:p-6">
            <div className="flex items-start gap-3">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                <UsersRound size={22} />
              </div>

              <div>
                <h2 className="text-lg font-bold">
                  Registered Users
                  <span className="ml-2 text-sm font-medium text-slate-400">
                    ({total})
                  </span>
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Search accounts and review registration details.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs text-slate-500">
              <span className="flex h-2 w-2 rounded-full bg-emerald-500" />
              {activeCount} active on this page
            </div>
          </div>

          <div className="flex flex-col gap-3 border-b border-slate-100 bg-slate-50/70 p-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="relative w-full lg:max-w-sm">
              <Search
                size={17}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
              />
              <input
                type="search"
                value={search}
                onChange={(event) => handleSearch(event.target.value)}
                placeholder="Search by name or email..."
                aria-label="Search users by name or email"
                className="h-10 w-full rounded-xl border border-slate-200 bg-white pl-10 pr-4 text-sm outline-none transition placeholder:text-slate-400 focus:border-violet-400 focus:ring-4 focus:ring-violet-100"
              />
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <label className="relative">
                <span className="sr-only">Filter registration date</span>
                <select
                  value={dateFilter}
                  onChange={(event) =>
                    setDateFilter(event.target.value as DateFilter)
                  }
                  className="h-10 appearance-none rounded-xl border border-slate-200 bg-white py-2 pl-3 pr-9 text-sm font-medium outline-none focus:border-violet-400"
                >
                  <option value="all">All dates</option>
                  <option value="7">Last 7 days</option>
                  <option value="30">Last 30 days</option>
                  <option value="90">Last 90 days</option>
                </select>
                <ChevronDown
                  size={14}
                  className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-500"
                />
              </label>

              <label className="relative">
                <span className="sr-only">Sort users</span>
                <select
                  value={sortOrder}
                  onChange={(event) =>
                    setSortOrder(event.target.value as SortOrder)
                  }
                  className="h-10 appearance-none rounded-xl border border-slate-200 bg-white py-2 pl-3 pr-9 text-sm font-medium outline-none focus:border-violet-400"
                >
                  <option value="newest">Newest first</option>
                  <option value="oldest">Oldest first</option>
                  <option value="name">Name A–Z</option>
                </select>
                <ArrowDownUp
                  size={14}
                  className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-500"
                />
              </label>

              <button
                type="button"
                onClick={refreshUsers}
                disabled={loading}
                className="inline-flex h-10 items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 text-sm font-semibold text-slate-600 transition hover:bg-slate-100 disabled:opacity-50"
              >
                <RefreshCw
                  size={15}
                  className={loading ? "animate-spin" : ""}
                />
                Refresh
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-225 border-collapse text-left">
              <thead>
                <tr className="border-b border-slate-100 bg-white text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  <th className="px-5 py-4">User</th>
                  <th className="px-5 py-4">Email address</th>
                  <th className="px-5 py-4 text-center">Projects</th>
                  <th className="px-5 py-4">Registered</th>
                  <th className="px-5 py-4">Status</th>
                  <th className="px-5 py-4 text-center">Actions</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {loading ? (
                  <tr>
                    <td colSpan={6} className="py-24 text-center">
                      <LoaderCircle
                        size={30}
                        className="mx-auto animate-spin text-violet-600"
                      />
                      <p className="mt-3 text-sm font-medium text-slate-500">
                        Loading users...
                      </p>
                    </td>
                  </tr>
                ) : visibleUsers.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-5 py-20 text-center">
                      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-slate-400">
                        <Search size={24} />
                      </div>
                      <p className="mt-4 font-semibold text-slate-700">
                        No users found
                      </p>
                      <p className="mt-1 text-sm text-slate-500">
                        Try another search term or date filter.
                      </p>
                      <button
                        type="button"
                        onClick={() => {
                          handleSearch("");
                          setDateFilter("all");
                        }}
                        className="mt-4 text-sm font-semibold text-violet-600 hover:text-violet-800"
                      >
                        Clear filters
                      </button>
                    </td>
                  </tr>
                ) : (
                  <>
                    {visibleUsers.map((user) => (
                      <tr
                        key={user.id}
                        className="group transition-colors duration-200 hover:bg-violet-50/50"
                      >
                        <td className="px-5 py-4">
                          <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-linear-to-br from-violet-100 to-indigo-100 text-sm font-bold text-violet-700 ring-1 ring-violet-200/70">
                              {initials(user.name, user.email)}
                            </div>

                            <div className="min-w-0">
                              <p className="max-w-45 truncate text-sm font-semibold text-slate-800">
                                {user.name?.trim() || "Unnamed user"}
                              </p>
                              <p className="mt-0.5 text-xs text-slate-400">
                                ID: {user.id.slice(0, 8)}
                              </p>
                            </div>
                          </div>
                        </td>

                        <td className="px-5 py-4">
                          <span className="block max-w-60 truncate text-sm text-slate-600">
                            {user.email}
                          </span>
                        </td>

                        <td className="px-5 py-4 text-center">
                          <span className="inline-flex min-w-9 items-center justify-center rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1.5 text-sm font-semibold text-slate-700">
                            {user.projectCount}
                          </span>
                        </td>

                        <td className="px-5 py-4">
                          <p className="whitespace-nowrap text-sm font-medium text-slate-700">
                            {formatDate(user.createdAt)}
                          </p>
                          <p className="mt-1 text-xs text-slate-400">
                            {formatTime(user.createdAt)}
                          </p>
                        </td>

                        <td className="px-5 py-4">
                          {user.status === "active" ? (
                            <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700">
                              <CheckCircle2 size={13} />
                              Active
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-200 bg-amber-50 px-2.5 py-1 text-xs font-semibold text-amber-700">
                              <Ban size={13} />
                              Deactivated
                            </span>
                          )}
                        </td>

                        <td className="px-5 py-4 text-center">
                          <button
                            type="button"
                            onClick={(event) => openMenu(event, user)}
                            aria-label={`Actions for ${user.email}`}
                            aria-expanded={menu?.user.id === user.id}
                            className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-transparent text-slate-400 transition hover:border-slate-200 hover:bg-white hover:text-slate-700"
                          >
                            <MoreHorizontal size={20} />
                          </button>
                        </td>
                      </tr>
                    ))}

                    {Array.from(
                      { length: placeholderCount },
                      (_, index) => (
                        <tr
                          key={`empty-${page}-${index}`}
                          aria-hidden="true"
                          className="pointer-events-none"
                        >
                          <td className="h-17 px-5 py-4">
                            <div className="h-3 w-28 rounded bg-slate-50" />
                          </td>
                          <td className="px-5 py-4">
                            <div className="h-3 w-36 rounded bg-slate-50" />
                          </td>
                          <td className="px-5 py-4">
                            <div className="mx-auto h-7 w-8 rounded-lg bg-slate-50" />
                          </td>
                          <td className="px-5 py-4">
                            <div className="h-3 w-24 rounded bg-slate-50" />
                          </td>
                          <td className="px-5 py-4">
                            <div className="h-6 w-20 rounded-full bg-slate-50" />
                          </td>
                          <td className="px-5 py-4">
                            <div className="mx-auto h-8 w-8 rounded-xl bg-slate-50" />
                          </td>
                        </tr>
                      ),
                    )}
                  </>
                )}
              </tbody>
            </table>
          </div>

          <div className="flex flex-col gap-3 border-t border-slate-100 bg-white px-5 py-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xs text-slate-500">
              Showing{" "}
              <span className="font-semibold text-slate-700">
                {showingStart}–{showingEnd}
              </span>{" "}
              of{" "}
              <span className="font-semibold text-slate-700">{total}</span>{" "}
              users
            </p>

            <div className="flex flex-wrap items-center gap-2">
              <label className="flex items-center gap-2 text-xs text-slate-500">
                Rows
                <select
                  value={pageSize}
                  onChange={(event) => changePageSize(event.target.value)}
                  className="h-8 rounded-lg border border-slate-200 bg-white px-2 text-xs font-semibold text-slate-700 outline-none focus:border-violet-400"
                >
                  <option value={10}>10</option>
                  <option value={20}>20</option>
                  <option value={50}>50</option>
                  <option value={100}>100</option>
                </select>
                per page
              </label>

              <div className="mx-1 h-5 w-px bg-slate-200" />

              <button
                type="button"
                onClick={() => changePage(page - 1)}
                disabled={page <= 1 || loading}
                aria-label="Previous page"
                className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
              >
                <ChevronLeft size={16} />
              </button>

              <span className="min-w-16 text-center text-xs font-semibold text-slate-600">
                Page {totalPages === 0 ? 0 : page} of {totalPages}
              </span>

              <button
                type="button"
                onClick={() => changePage(page + 1)}
                disabled={page >= totalPages || loading}
                aria-label="Next page"
                className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </section>

        <div className="flex items-start gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3">
          <ShieldCheck size={18} className="mt-0.5 shrink-0 text-violet-600" />
          <p className="text-xs leading-5 text-slate-500">
            <span className="font-semibold text-slate-700">
              Admin security:
            </span>{" "}
            Account actions must be authorized on the server. UI status
            labels are not a substitute for persisted account status or
            login enforcement.
          </p>
        </div>
      </div>

      {menu && (
        <>
          <button
            type="button"
            aria-label="Close account actions"
            className="fixed inset-0 z-90 cursor-default"
            onClick={() => setMenu(null)}
          />

          <div
            role="menu"
            className="fixed z-100 w-52 rounded-xl border border-slate-200 bg-white p-1.5 shadow-xl shadow-slate-900/10"
            style={{ top: menu.top, left: menu.left }}
          >
            <button
              type="button"
              role="menuitem"
              onClick={() => {
                setSelectedUser(menu.user);
                setMenu(null);
              }}
              className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2.5 text-left text-sm text-slate-700 transition hover:bg-slate-50"
            >
              <UserRound size={16} className="text-slate-400" />
              View account details
            </button>

            <button
              type="button"
              role="menuitem"
              onClick={() => void copyUserId(menu.user)}
              className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2.5 text-left text-sm text-slate-700 transition hover:bg-slate-50"
            >
              <Copy size={16} className="text-slate-400" />
              Copy account ID
            </button>

            <div className="my-1 border-t border-slate-100" />

            {menu.user.status === "active" ? (
              <button
                type="button"
                role="menuitem"
                disabled={actionLoading}
                onClick={() =>
                  void performAccountAction(menu.user, "deactivate")
                }
                className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2.5 text-left text-sm text-amber-700 transition hover:bg-amber-50 disabled:opacity-50"
              >
                <Ban size={16} />
                Deactivate account
              </button>
            ) : (
              <button
                type="button"
                role="menuitem"
                disabled={actionLoading}
                onClick={() =>
                  void performAccountAction(menu.user, "activate")
                }
                className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2.5 text-left text-sm text-emerald-700 transition hover:bg-emerald-50 disabled:opacity-50"
              >
                <Check size={16} />
                Activate account
              </button>
            )}

            <button
              type="button"
              role="menuitem"
              disabled={actionLoading}
              onClick={() =>
                void performAccountAction(menu.user, "delete")
              }
              className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2.5 text-left text-sm text-red-600 transition hover:bg-red-50 disabled:opacity-50"
            >
              <Trash2 size={16} />
              Delete account
            </button>
          </div>
        </>
      )}

      {selectedUser && (
        <div
          className="fixed inset-0 z-120 flex items-center justify-center bg-slate-950/40 p-4 backdrop-blur-sm"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setSelectedUser(null);
            }
          }}
        >
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="user-details-title"
            className="w-full max-w-lg overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl"
          >
            <div className="flex items-start justify-between border-b border-slate-100 px-6 py-5">
              <div>
                <h2
                  id="user-details-title"
                  className="text-lg font-bold text-slate-900"
                >
                  Account details
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  User registration information
                </p>
              </div>

              <button
                type="button"
                aria-label="Close account details"
                onClick={() => setSelectedUser(null)}
                className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
              >
                <X size={19} />
              </button>
            </div>

            <div className="p-6">
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-violet-100 text-lg font-bold text-violet-700">
                  {initials(selectedUser.name, selectedUser.email)}
                </div>
                <div className="min-w-0">
                  <p className="truncate font-semibold text-slate-900">
                    {selectedUser.name?.trim() || "Unnamed user"}
                  </p>
                  <p className="truncate text-sm text-slate-500">
                    {selectedUser.email}
                  </p>
                  <span
                    className={`mt-2 inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${
                      selectedUser.status === "active"
                        ? "bg-emerald-50 text-emerald-700"
                        : "bg-amber-50 text-amber-700"
                    }`}
                  >
                    {selectedUser.status === "active"
                      ? "Active"
                      : "Deactivated"}
                  </span>
                </div>
              </div>

              <dl className="mt-6 divide-y divide-slate-100 rounded-xl border border-slate-100">
                <div className="flex items-start justify-between gap-4 px-4 py-3">
                  <dt className="text-sm text-slate-500">Account ID</dt>
                  <dd className="max-w-[65%] break-all text-right text-xs font-medium text-slate-700">
                    {selectedUser.id}
                  </dd>
                </div>
                <div className="flex items-center justify-between gap-4 px-4 py-3">
                  <dt className="text-sm text-slate-500">Projects</dt>
                  <dd className="text-sm font-semibold text-slate-800">
                    {selectedUser.projectCount}
                  </dd>
                </div>
                <div className="flex items-center justify-between gap-4 px-4 py-3">
                  <dt className="text-sm text-slate-500">Registered</dt>
                  <dd className="text-right text-sm font-medium text-slate-800">
                    {formatDate(selectedUser.createdAt)}
                    <span className="block text-xs font-normal text-slate-400">
                      {formatTime(selectedUser.createdAt)}
                    </span>
                  </dd>
                </div>
              </dl>

              <div className="mt-5 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => void copyUserId(selectedUser)}
                  className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                >
                  <Copy size={15} />
                  Copy ID
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedUser(null)}
                  className="rounded-xl bg-violet-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-violet-700"
                >
                  Close
                </button>
              </div>
            </div>
          </section>
        </div>
      )}

      {actionLoading && (
        <div className="fixed bottom-5 right-5 z-130 flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-700 shadow-lg">
          <LoaderCircle size={16} className="animate-spin text-violet-600" />
          Updating account...
        </div>
      )}
    </div>
  );
}
