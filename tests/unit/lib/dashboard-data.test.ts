import { describe, it, expect } from "vitest";
import {
  demoDashboardStats,
  demoActivityChart,
  demoTestExecution,
  demoRecentProjects,
  demoRecentActivity,
  demoDashboardData,
} from "@/lib/dashboard/dashboard-data";

// ---------------------------------------------------------------------------
// Stats
// ---------------------------------------------------------------------------

describe("demoDashboardStats", () => {
  it("has all four required stat keys", () => {
    expect(demoDashboardStats.totalProjects).toBeDefined();
    expect(demoDashboardStats.testCases).toBeDefined();
    expect(demoDashboardStats.openBugs).toBeDefined();
    expect(demoDashboardStats.automationRuns).toBeDefined();
  });

  it("each stat has a numeric or string value", () => {
    const stats = Object.values(demoDashboardStats);
    for (const stat of stats) {
      expect(typeof stat.value === "number" || typeof stat.value === "string").toBe(true);
    }
  });

  it("each stat has a trend with direction and label", () => {
    const stats = Object.values(demoDashboardStats);
    for (const stat of stats) {
      expect(["up", "down", "neutral"]).toContain(stat.trend.direction);
      expect(stat.trend.label.length).toBeGreaterThan(0);
    }
  });

  it("each stat has a non-empty icon name", () => {
    const stats = Object.values(demoDashboardStats);
    for (const stat of stats) {
      expect(stat.icon.length).toBeGreaterThan(0);
    }
  });
});

// ---------------------------------------------------------------------------
// Activity chart
// ---------------------------------------------------------------------------

describe("demoActivityChart", () => {
  it("has 7 data points for last 7 days", () => {
    expect(demoActivityChart).toHaveLength(7);
  });

  it("each point has date, testCases, bugs, automationRuns", () => {
    for (const point of demoActivityChart) {
      expect(typeof point.date).toBe("string");
      expect(typeof point.testCases).toBe("number");
      expect(typeof point.bugs).toBe("number");
      expect(typeof point.automationRuns).toBe("number");
    }
  });

  it("all values are non-negative", () => {
    for (const point of demoActivityChart) {
      expect(point.testCases).toBeGreaterThanOrEqual(0);
      expect(point.bugs).toBeGreaterThanOrEqual(0);
      expect(point.automationRuns).toBeGreaterThanOrEqual(0);
    }
  });
});

// ---------------------------------------------------------------------------
// Test execution summary
// ---------------------------------------------------------------------------

describe("demoTestExecution", () => {
  it("passed + failed + skipped equals total", () => {
    const { passed, failed, skipped, total } = demoTestExecution;
    expect(passed + failed + skipped).toBe(total);
  });

  it("passRate is calculated correctly", () => {
    const { passed, total, passRate } = demoTestExecution;
    expect(passRate).toBe(Math.round((passed / total) * 100));
  });

  it("passRate is between 0 and 100", () => {
    expect(demoTestExecution.passRate).toBeGreaterThanOrEqual(0);
    expect(demoTestExecution.passRate).toBeLessThanOrEqual(100);
  });

  it("all counts are non-negative", () => {
    const { passed, failed, skipped, total } = demoTestExecution;
    expect(passed).toBeGreaterThanOrEqual(0);
    expect(failed).toBeGreaterThanOrEqual(0);
    expect(skipped).toBeGreaterThanOrEqual(0);
    expect(total).toBeGreaterThan(0);
  });
});

// ---------------------------------------------------------------------------
// Recent projects
// ---------------------------------------------------------------------------

describe("demoRecentProjects", () => {
  it("returns an array of projects", () => {
    expect(Array.isArray(demoRecentProjects)).toBe(true);
    expect(demoRecentProjects.length).toBeGreaterThan(0);
  });

  it("each project has required fields", () => {
    for (const project of demoRecentProjects) {
      expect(typeof project.id).toBe("string");
      expect(project.id.length).toBeGreaterThan(0);
      expect(typeof project.name).toBe("string");
      expect(project.name.length).toBeGreaterThan(0);
      expect(["Active", "Draft", "Archived"]).toContain(project.status);
    }
  });

  it("each project has non-negative numeric counts", () => {
    for (const project of demoRecentProjects) {
      expect(project.testCases).toBeGreaterThanOrEqual(0);
      expect(project.bugs).toBeGreaterThanOrEqual(0);
      expect(project.automationRuns).toBeGreaterThanOrEqual(0);
    }
  });

  it("all project ids are unique", () => {
    const ids = demoRecentProjects.map((p) => p.id);
    const unique = new Set(ids);
    expect(unique.size).toBe(ids.length);
  });
});

// ---------------------------------------------------------------------------
// Recent activity
// ---------------------------------------------------------------------------

describe("demoRecentActivity", () => {
  it("returns an array of activity items", () => {
    expect(Array.isArray(demoRecentActivity)).toBe(true);
    expect(demoRecentActivity.length).toBeGreaterThan(0);
  });

  it("each activity has required fields", () => {
    const validTypes = [
      "test_case_added",
      "bug_reported",
      "automation_run",
      "project_updated",
      "bug_fixed",
      "test_case_updated",
    ];
    for (const activity of demoRecentActivity) {
      expect(typeof activity.id).toBe("string");
      expect(activity.title.length).toBeGreaterThan(0);
      expect(activity.description.length).toBeGreaterThan(0);
      expect(activity.timestamp.length).toBeGreaterThan(0);
      expect(validTypes).toContain(activity.type);
    }
  });

  it("all activity ids are unique", () => {
    const ids = demoRecentActivity.map((a) => a.id);
    const unique = new Set(ids);
    expect(unique.size).toBe(ids.length);
  });
});

// ---------------------------------------------------------------------------
// Assembled dashboard data
// ---------------------------------------------------------------------------

describe("demoDashboardData", () => {
  it("contains all required top-level keys", () => {
    expect(demoDashboardData.stats).toBeDefined();
    expect(demoDashboardData.activityChart).toBeDefined();
    expect(demoDashboardData.testExecution).toBeDefined();
    expect(demoDashboardData.recentProjects).toBeDefined();
    expect(demoDashboardData.recentActivity).toBeDefined();
  });

  it("stats reference is the same object as demoDashboardStats", () => {
    expect(demoDashboardData.stats).toBe(demoDashboardStats);
  });
});
