"use client";

import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

import type {
  TestExecutionSummary as TestExecutionSummaryType,
} from "@/lib/dashboard/types";

interface TestExecutionSummaryProps {
  data: TestExecutionSummaryType;
}

const COLORS = {
  passed: "#4ade80",
  failed: "#f87171",
  skipped: "#fbbf24",
};

interface TooltipPayload {
  name: string;
  value: number;
  payload: {
    name: string;
    value: number;
  };
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: TooltipPayload[];
}

function CustomTooltip({
  active,
  payload,
}: CustomTooltipProps): React.JSX.Element | null {
  if (!active || !payload?.length) {
    return null;
  }

  const item = payload[0];

  if (!item) {
    return null;
  }

  return (
    <div
      className="rounded-xl px-3 py-2 shadow-2xl text-xs"
      style={{
        background: "rgba(255, 255, 255, 1)",
        border: "1px solid rgba(0, 0, 0, 0.15)",
        boxShadow: "0 8px 24px rgba(0, 0, 0, 0.35)",
        opacity: 1,
        zIndex: 9999,
        minWidth: "88px",
        textAlign: "center",
        pointerEvents: "none",
      }}
    >
      <p
        className="font-semibold"
        style={{
          color: "#000000",
          fontSize: "12px",
          lineHeight: "16px",
          whiteSpace: "nowrap",
        }}
      >
        {item.name}: {item.value}
      </p>
    </div>
  );
}

export function TestExecutionSummary({
  data,
}: TestExecutionSummaryProps): React.JSX.Element {
  const chartData = [
    {
      name: "Passed",
      value: data.passed,
    },
    {
      name: "Failed",
      value: data.failed,
    },
    {
      name: "Skipped",
      value: data.skipped,
    },
  ];

  const rows = [
    {
      label: "Passed",
      value: data.passed,
      color: COLORS.passed,
    },
    {
      label: "Failed",
      value: data.failed,
      color: COLORS.failed,
    },
    {
      label: "Skipped",
      value: data.skipped,
      color: COLORS.skipped,
    },
    {
      label: "Total",
      value: data.total,
      color: "rgba(255,255,255,0.5)",
    },
  ];

  return (
    <div
      className="rounded-2xl p-6 flex flex-col gap-5"
      style={{
        background: "rgba(255,255,255,0.025)",
        border: "1px solid rgba(255,255,255,0.07)",
      }}
    >
      {/* Card title */}
      <h2 className="text-base font-semibold text-white">
        Test Execution Summary
      </h2>

      {data.total === 0 ? (
        /* Empty state */
        <div className="flex flex-col items-center justify-center h-48 gap-2">
          <p
            className="text-sm"
            style={{
              color: "rgba(255,255,255,0.4)",
            }}
          >
            No test runs yet.
          </p>

          <p
            className="text-xs"
            style={{
              color: "rgba(255,255,255,0.25)",
            }}
          >
            Run your automation to see results.
          </p>
        </div>
      ) : (
        <div className="flex flex-col items-center gap-5">
          {/* Donut chart */}
          <div
            className="relative"
            style={{
              width: "160px",
              height: "160px",
            }}
          >
            <ResponsiveContainer
              width="100%"
              height="100%"
            >
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={52}
                  outerRadius={72}
                  paddingAngle={3}
                  dataKey="value"
                  startAngle={90}
                  endAngle={-270}
                  isAnimationActive={false}
                  aria-label="Test execution donut chart"
                >
                  {chartData.map(
                    (entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={
                          Object.values(
                            COLORS,
                          )[index]
                        }
                        strokeWidth={0}
                      />
                    ),
                  )}
                </Pie>

                <Tooltip
                  content={<CustomTooltip />}
                  cursor={false}
                  wrapperStyle={{
                    zIndex: 9999,
                  }}
                />
              </PieChart>
            </ResponsiveContainer>

            {/* Centered pass rate */}
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-2xl font-bold text-white">
                {data.passRate}%
              </span>

              <span
                className="text-[10px] font-medium"
                style={{
                  color: "rgba(255,255,255,0.4)",
                }}
              >
                Pass Rate
              </span>
            </div>
          </div>

          {/* Stats table */}
          <dl className="w-full flex flex-col gap-2">
            {rows.map((row) => (
              <div
                key={row.label}
                className="flex items-center justify-between"
              >
                <dt
                  className="flex items-center gap-2 text-xs"
                  style={{
                    color:
                      "rgba(255,255,255,0.5)",
                  }}
                >
                  <span
                    className="w-2 h-2 rounded-full shrink-0"
                    style={{
                      background: row.color,
                    }}
                    aria-hidden="true"
                  />

                  {row.label}
                </dt>

                <dd className="text-xs font-semibold text-white tabular-nums">
                  {row.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      )}
    </div>
  );
}