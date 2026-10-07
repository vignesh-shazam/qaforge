"use client";

import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import {
  IconProjects,
  IconTestCases,
  IconBugReports,
  IconApiTests,
} from "@/components/icons";
import type { DashboardStat } from "@/lib/dashboard/types";

// ---------------------------------------------------------------------------
// Icon resolver — maps icon name string to custom icon component
// ---------------------------------------------------------------------------

function StatIcon({ name, size }: { name: string; size: number }): React.JSX.Element {
  const props = { size, "aria-hidden": true as const };
  switch (name) {
    case "FolderKanban": return <IconProjects {...props} />;
    case "TestTube2":    return <IconTestCases {...props} />;
    case "Bug":          return <IconBugReports {...props} />;
    case "Zap":          return <IconApiTests {...props} />;
    default:             return <IconProjects {...props} />;
  }
}

// ---------------------------------------------------------------------------
// StatCard
// ---------------------------------------------------------------------------

interface StatCardProps {
  stat: DashboardStat;
}

export function StatCard({ stat }: StatCardProps): React.JSX.Element {
  const TrendIcon =
    stat.trend.direction === "up"
      ? TrendingUp
      : stat.trend.direction === "down"
        ? TrendingDown
        : Minus;

  const trendColor =
    stat.id === "openBugs"
      ? stat.trend.direction === "down" ? "#4ade80" : "#f87171"
      : stat.trend.direction === "up"   ? "#4ade80"
      : stat.trend.direction === "down" ? "#f87171"
      : "rgba(255,255,255,0.4)";

  return (
    <div
      className="group relative rounded-2xl p-5 flex flex-col gap-4 transition-all duration-300"
      style={{
        background: "rgba(255,255,255,0.025)",
        border: "1px solid rgba(255,255,255,0.07)",
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget;
        el.style.border = `1px solid ${stat.color}33`;
        el.style.boxShadow = `0 0 20px ${stat.color}18`;
        el.style.background = "rgba(255,255,255,0.04)";
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget;
        el.style.border = "1px solid rgba(255,255,255,0.07)";
        el.style.boxShadow = "none";
        el.style.background = "rgba(255,255,255,0.025)";
      }}
    >
      {/* Top: icon + label */}
      <div className="flex items-center justify-between">
        <div className="w-10 h-10 rounded-xl flex items-center justify-center overflow-hidden">
          <StatIcon name={stat.icon} size={36} />
        </div>
        <span className="text-xs font-medium" style={{ color: "rgba(255,255,255,0.4)" }}>
          {stat.label}
        </span>
      </div>

      {/* Value */}
      <p className="text-3xl font-bold text-white tabular-nums leading-none">
        {stat.value}
      </p>

      {/* Trend */}
      <div className="flex items-center gap-1.5 mt-auto">
        <TrendIcon size={13} style={{ color: trendColor }} aria-hidden="true" />
        <span className="text-xs" style={{ color: trendColor }}>
          {stat.trend.label}
        </span>
      </div>
    </div>
  );
}
