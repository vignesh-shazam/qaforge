"use client";

import { useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import type { ActivityDataPoint, ActivityRange } from "@/lib/dashboard/types";

interface ProjectActivityProps {
  data: ActivityDataPoint[];
}

const ranges: { label: string; value: ActivityRange }[] = [
  { label: "Last 7 days", value: "7d" },
  { label: "Last 30 days", value: "30d" },
  { label: "Last 90 days", value: "90d" },
];

// ---------------------------------------------------------------------------
// Custom tooltip
// ---------------------------------------------------------------------------

interface TooltipEntry {
  name: string;
  value: number;
  color: string;
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: TooltipEntry[];
  label?: string;
}

function CustomTooltip({ active, payload, label }: CustomTooltipProps): React.JSX.Element | null {
  if (!active || !payload?.length) return null;
  return (
    <div
      className="rounded-xl px-4 py-3 shadow-xl text-xs"
      style={{
        background: "rgba(8,9,22,0.97)",
        border: "1px solid rgba(255,255,255,0.1)",
        backdropFilter: "blur(16px)",
      }}
    >
      <p className="text-white font-semibold mb-2">{label}</p>
      {payload.map((entry) => (
        <div key={entry.name} className="flex items-center gap-2 mb-1">
          <span className="w-2 h-2 rounded-full shrink-0" style={{ background: entry.color }} />
          <span style={{ color: "rgba(255,255,255,0.55)" }}>{entry.name}:</span>
          <span className="font-semibold text-white">{entry.value}</span>
        </div>
      ))}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function ProjectActivity({ data }: ProjectActivityProps): React.JSX.Element {
  const [activeRange, setActiveRange] = useState<ActivityRange>("7d");

  return (
    <div
      className="rounded-2xl p-6 flex flex-col gap-5"
      style={{
        background: "rgba(255,255,255,0.025)",
        border: "1px solid rgba(255,255,255,0.07)",
      }}
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <h2 className="text-base font-semibold text-white">Project Activity</h2>
        <div
          className="flex items-center rounded-lg p-0.5 gap-0.5"
          style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}
          role="group"
          aria-label="Select time range"
        >
          {ranges.map((range) => (
            <button
              key={range.value}
              type="button"
              onClick={() => setActiveRange(range.value)}
              className="px-3 py-1.5 rounded-md text-xs font-medium transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
              style={
                activeRange === range.value
                  ? { background: "rgba(99,102,241,0.25)", color: "#a5b4fc", border: "1px solid rgba(99,102,241,0.3)" }
                  : { color: "rgba(255,255,255,0.4)" }
              }
              aria-pressed={activeRange === range.value}
            >
              {range.label}
            </button>
          ))}
        </div>
      </div>

      {/* Chart */}
      {data.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-48 gap-2">
          <p className="text-sm" style={{ color: "rgba(255,255,255,0.4)" }}>No activity data yet.</p>
          <p className="text-xs" style={{ color: "rgba(255,255,255,0.25)" }}>Create a project to start tracking.</p>
        </div>
      ) : (
        <div style={{ height: "220px" }} aria-label="Project activity area chart">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorTestCases" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#818cf8" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#818cf8" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorBugs" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f87171" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#f87171" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorAutomation" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#4ade80" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#4ade80" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
              <XAxis dataKey="date" tick={{ fill: "rgba(255,255,255,0.35)", fontSize: 11 }} tickLine={false} axisLine={false} />
              <YAxis tick={{ fill: "rgba(255,255,255,0.35)", fontSize: 11 }} tickLine={false} axisLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Legend
                wrapperStyle={{ fontSize: "11px", paddingTop: "12px" }}
                formatter={(value: string) => <span style={{ color: "rgba(255,255,255,0.5)" }}>{value}</span>}
              />
              <Area type="monotone" dataKey="testCases" name="Test Cases" stroke="#818cf8" strokeWidth={2} fill="url(#colorTestCases)" dot={false} activeDot={{ r: 4, fill: "#818cf8" }} />
              <Area type="monotone" dataKey="bugs" name="Bugs" stroke="#f87171" strokeWidth={2} fill="url(#colorBugs)" dot={false} activeDot={{ r: 4, fill: "#f87171" }} />
              <Area type="monotone" dataKey="automationRuns" name="Automation Runs" stroke="#4ade80" strokeWidth={2} fill="url(#colorAutomation)" dot={false} activeDot={{ r: 4, fill: "#4ade80" }} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}
