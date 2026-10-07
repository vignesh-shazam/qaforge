import Link from "next/link";
import {
  TestTube2,
  Bug,
  Zap,
  FolderKanban,
  CheckCircle2,
  RefreshCw,
} from "lucide-react";
import type { DashboardActivity, ActivityType } from "@/lib/dashboard/types";

// ---------------------------------------------------------------------------
// Icon + color per activity type
// ---------------------------------------------------------------------------

interface ActivityConfig {
  icon: React.ReactNode;
  color: string;
  bg: string;
}

function getActivityConfig(type: ActivityType): ActivityConfig {
  switch (type) {
    case "test_case_added":
    case "test_case_updated":
      return {
        icon: <TestTube2 size={14} aria-hidden="true" />,
        color: "#22d3ee",
        bg: "rgba(34,211,238,0.12)",
      };
    case "bug_reported":
      return {
        icon: <Bug size={14} aria-hidden="true" />,
        color: "#f87171",
        bg: "rgba(239,68,68,0.12)",
      };
    case "bug_fixed":
      return {
        icon: <CheckCircle2 size={14} aria-hidden="true" />,
        color: "#4ade80",
        bg: "rgba(74,222,128,0.12)",
      };
    case "automation_run":
      return {
        icon: <Zap size={14} aria-hidden="true" />,
        color: "#fbbf24",
        bg: "rgba(251,191,36,0.12)",
      };
    case "project_updated":
      return {
        icon: <FolderKanban size={14} aria-hidden="true" />,
        color: "#818cf8",
        bg: "rgba(99,102,241,0.12)",
      };
    default:
      return {
        icon: <RefreshCw size={14} aria-hidden="true" />,
        color: "rgba(255,255,255,0.4)",
        bg: "rgba(255,255,255,0.06)",
      };
  }
}

// ---------------------------------------------------------------------------
// RecentActivity
// ---------------------------------------------------------------------------

interface RecentActivityProps {
  activities: DashboardActivity[];
}

export function RecentActivity({ activities }: RecentActivityProps): React.JSX.Element {
  return (
    <div
      className="rounded-2xl p-6 flex flex-col gap-4"
      style={{
        background: "rgba(255,255,255,0.025)",
        border: "1px solid rgba(255,255,255,0.07)",
      }}
    >
      {/* Header */}
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-base font-semibold text-white">Recent Activity</h2>
        <Link
          href="/dashboard"
          className="flex items-center gap-1.5 h-7 px-3 rounded-lg text-xs font-semibold text-white transition-all hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
          style={{ background: "linear-gradient(135deg,#6366f1,#4f46e5)" }}
        >
          View all
        </Link>
      </div>

      {/* Activity feed */}
      {activities.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-8 gap-2">
          <RefreshCw size={28} style={{ color: "rgba(255,255,255,0.15)" }} aria-hidden="true" />
          <p className="text-sm" style={{ color: "rgba(255,255,255,0.4)" }}>No activity yet.</p>
          <p className="text-xs" style={{ color: "rgba(255,255,255,0.25)" }}>Activity will appear as you use QAForge.</p>
        </div>
      ) : (
        <ol className="flex flex-col list-none" aria-label="Recent activity feed">
          {activities.map((activity, index) => {
            const config = getActivityConfig(activity.type);
            const isLast = index === activities.length - 1;
            return (
              <li key={activity.id} className="relative flex gap-3">
                {/* Vertical connector line */}
                {!isLast && (
                  <div
                    className="absolute left-[18px] top-10 bottom-0 w-px"
                    style={{ background: "rgba(255,255,255,0.06)" }}
                    aria-hidden="true"
                  />
                )}

                {/* Icon */}
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 mt-0.5 z-10"
                  style={{ background: config.bg, color: config.color }}
                >
                  {config.icon}
                </div>

                {/* Content */}
                <div className={`flex-1 min-w-0 pb-4 ${isLast ? "" : ""}`}>
                  <p className="text-sm font-medium text-white">{activity.title}</p>
                  <p className="text-xs mt-0.5 truncate" style={{ color: "rgba(255,255,255,0.4)" }}>
                    {activity.description}
                  </p>
                  <time
                    className="text-[11px] mt-1 block"
                    style={{ color: "rgba(255,255,255,0.25)" }}
                    dateTime={activity.timestamp}
                  >
                    {activity.timestamp}
                  </time>
                </div>
              </li>
            );
          })}
        </ol>
      )}
    </div>
  );
}
