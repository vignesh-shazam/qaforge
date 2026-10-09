/**
 * QAForge Dashboard — TypeScript types.
 *
 * All dashboard data flows through these types.
 * Mock data is isolated in dashboard-data.ts so it can be
 * replaced by real API/DB queries without touching UI components.
 */

// ---------------------------------------------------------------------------
// Stat cards
// ---------------------------------------------------------------------------

export type TrendDirection = "up" | "down" | "neutral";

export interface StatTrend {
  direction: TrendDirection;
  label: string;
}

export interface DashboardStat {
  id: string;
  label: string;
  value: number | string;
  icon: string; // Lucide icon name — rendered in StatCard
  trend: StatTrend;
  color: string; // CSS color for icon / accent
}

export interface DashboardStats {
  totalProjects: DashboardStat;
  testCases: DashboardStat;
  openBugs: DashboardStat;
  automationRuns: DashboardStat;
}

// ---------------------------------------------------------------------------
// Project activity chart
// ---------------------------------------------------------------------------

export interface ActivityDataPoint {
  date: string; // "Mon", "Tue", etc.
  testCases: number;
  bugs: number;
  automationRuns: number;
}

export type ActivityRange = "7d" | "30d" | "90d";

// ---------------------------------------------------------------------------
// Test execution summary (donut chart)
// ---------------------------------------------------------------------------

export interface TestExecutionSummary {
  passed: number;
  failed: number;
  skipped: number;
  total: number;
  passRate: number; // 0–100
}

// ---------------------------------------------------------------------------
// Recent projects
// ---------------------------------------------------------------------------

export type ProjectStatus = "Active" | "Draft" | "Archived" | "Testing" | "Planned";

export interface DashboardProject {
  id: string;
  name: string;
  description: string;
  testCases: number;
  bugs: number;
  automationRuns: number;
  status: ProjectStatus;
  updatedAt: string; // ISO string or relative label
}

// ---------------------------------------------------------------------------
// Recent activity
// ---------------------------------------------------------------------------

export type ActivityType =
  | "test_case_added"
  | "bug_reported"
  | "automation_run"
  | "project_updated"
  | "bug_fixed"
  | "test_case_updated";

export interface DashboardActivity {
  id: string;
  type: ActivityType;
  title: string;
  description: string;
  timestamp: string; // relative label e.g. "2 hours ago"
}

// ---------------------------------------------------------------------------
// Full dashboard payload
// ---------------------------------------------------------------------------

export interface DashboardData {
  stats: DashboardStats;
  activityChart: ActivityDataPoint[];
  testExecution: TestExecutionSummary;
  recentProjects: DashboardProject[];
  recentActivity: DashboardActivity[];
}
