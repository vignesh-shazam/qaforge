/**
 * QAForge Dashboard — isolated demo data.
 *
 * These values are used as a visual reference while the real
 * aggregation queries (V0.3+) are not yet implemented.
 *
 * To replace with real data:
 *   1. Add a server-side function that queries Prisma
 *   2. Pass the result as props to dashboard components
 *   3. Remove the demo imports from page.tsx
 *
 * Do NOT scatter fake data inside individual UI components.
 * All demo values live here and are clearly typed.
 */

import type {
  DashboardStats,
  ActivityDataPoint,
  TestExecutionSummary,
  DashboardProject,
  DashboardActivity,
  DashboardData,
} from "./types";

// ---------------------------------------------------------------------------
// Stat cards
// ---------------------------------------------------------------------------

export const demoDashboardStats: DashboardStats = {
  totalProjects: {
    id: "totalProjects",
    label: "Total Projects",
    value: 5,
    icon: "FolderKanban",
    trend: { direction: "up", label: "2 new this month" },
    color: "#818cf8",
  },
  testCases: {
    id: "testCases",
    label: "Test Cases",
    value: 128,
    icon: "TestTube2",
    trend: { direction: "up", label: "24 new this week" },
    color: "#22d3ee",
  },
  openBugs: {
    id: "openBugs",
    label: "Open Bugs",
    value: 12,
    icon: "Bug",
    trend: { direction: "down", label: "5 fixed this week" },
    color: "#f87171",
  },
  automationRuns: {
    id: "automationRuns",
    label: "Automation Runs",
    value: 36,
    icon: "Zap",
    trend: { direction: "up", label: "10 this week" },
    color: "#4ade80",
  },
};

// ---------------------------------------------------------------------------
// Activity chart (last 7 days)
// ---------------------------------------------------------------------------

export const demoActivityChart: ActivityDataPoint[] = [
  { date: "Mon", testCases: 8, bugs: 3, automationRuns: 4 },
  { date: "Tue", testCases: 12, bugs: 5, automationRuns: 6 },
  { date: "Wed", testCases: 6, bugs: 2, automationRuns: 3 },
  { date: "Thu", testCases: 15, bugs: 4, automationRuns: 8 },
  { date: "Fri", testCases: 10, bugs: 1, automationRuns: 5 },
  { date: "Sat", testCases: 4, bugs: 0, automationRuns: 2 },
  { date: "Sun", testCases: 7, bugs: 2, automationRuns: 4 },
];

// ---------------------------------------------------------------------------
// Test execution summary
// ---------------------------------------------------------------------------

export const demoTestExecution: TestExecutionSummary = {
  passed: 82,
  failed: 12,
  skipped: 6,
  total: 100,
  passRate: 82,
};

// ---------------------------------------------------------------------------
// Recent projects
// ---------------------------------------------------------------------------

export const demoRecentProjects: DashboardProject[] = [
  {
    id: "proj-1",
    name: "E-commerce Website",
    description: "Online store testing project",
    testCases: 45,
    bugs: 3,
    automationRuns: 12,
    status: "Active",
    updatedAt: "2 hours ago",
  },
  {
    id: "proj-2",
    name: "Mobile App",
    description: "iOS and Android application",
    testCases: 32,
    bugs: 7,
    automationRuns: 8,
    status: "Active",
    updatedAt: "Yesterday",
  },
  {
    id: "proj-3",
    name: "Internal Tools",
    description: "Company internal tools",
    testCases: 18,
    bugs: 2,
    automationRuns: 6,
    status: "Completed",
    updatedAt: "3 days ago",
  },
  {
    id: "proj-4",
    name: "Marketing Website",
    description: "Public website testing",
    testCases: 22,
    bugs: 0,
    automationRuns: 5,
    status: "Active",
    updatedAt: "4 days ago",
  },
  {
    id: "proj-5",
    name: "API Testing",
    description: "REST API test automation",
    testCases: 11,
    bugs: 0,
    automationRuns: 5,
    status: "Active",
    updatedAt: "1 week ago",
  },
];

// ---------------------------------------------------------------------------
// Recent activity
// ---------------------------------------------------------------------------

export const demoRecentActivity: DashboardActivity[] = [
  {
    id: "act-1",
    type: "test_case_added",
    title: "New test case added",
    description: "Login flow — valid credentials",
    timestamp: "2 hours ago",
  },
  {
    id: "act-2",
    type: "bug_reported",
    title: "Bug reported",
    description: "Checkout button not responding on mobile",
    timestamp: "4 hours ago",
  },
  {
    id: "act-3",
    type: "automation_run",
    title: "Automation run completed",
    description: "E-commerce Website — 12/14 tests passed",
    timestamp: "6 hours ago",
  },
  {
    id: "act-4",
    type: "bug_fixed",
    title: "Bug fixed",
    description: "Navigation menu overlap on tablet",
    timestamp: "Yesterday",
  },
  {
    id: "act-5",
    type: "test_case_updated",
    title: "Test case updated",
    description: "Password reset — edge case added",
    timestamp: "Yesterday",
  },
  {
    id: "act-6",
    type: "project_updated",
    title: "Project updated",
    description: "Internal Tools — target URL changed",
    timestamp: "2 days ago",
  },
];

// ---------------------------------------------------------------------------
// Assembled dashboard payload
// ---------------------------------------------------------------------------

export const demoDashboardData: DashboardData = {
  stats: demoDashboardStats,
  activityChart: demoActivityChart,
  testExecution: demoTestExecution,
  recentProjects: demoRecentProjects,
  recentActivity: demoRecentActivity,
};
