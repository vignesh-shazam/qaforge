import { describe, it, expect } from "vitest";
import { cn, getInitials, formatRelativeDate, truncate } from "@/lib/utils";

// ---------------------------------------------------------------------------
// cn()
// ---------------------------------------------------------------------------

describe("cn", () => {
  it("returns a single class unchanged", () => {
    expect(cn("px-4")).toBe("px-4");
  });

  it("merges multiple classes", () => {
    expect(cn("px-4", "py-2")).toBe("px-4 py-2");
  });

  it("deduplicates conflicting Tailwind classes — last wins", () => {
    expect(cn("px-4", "px-8")).toBe("px-8");
  });

  it("filters out falsy values", () => {
    expect(cn("px-4", false && "py-2", undefined, null, "text-sm")).toBe(
      "px-4 text-sm",
    );
  });

  it("handles conditional classes", () => {
    const isActive = true;
    expect(cn("base", isActive && "active")).toBe("base active");
  });
});

// ---------------------------------------------------------------------------
// getInitials()
// ---------------------------------------------------------------------------

describe("getInitials", () => {
  it("returns two uppercase initials from a full name", () => {
    expect(getInitials("Jane Doe")).toBe("JD");
  });

  it("returns a single uppercase letter for a one-word name", () => {
    expect(getInitials("Alice")).toBe("A");
  });

  it("uses the first and last word when there are more than two", () => {
    expect(getInitials("Jane Mary Doe")).toBe("JD");
  });

  it("returns ? for an empty string", () => {
    expect(getInitials("")).toBe("?");
  });

  it("returns ? for a whitespace-only string", () => {
    expect(getInitials("   ")).toBe("?");
  });

  it("handles extra whitespace between words", () => {
    expect(getInitials("  John   Smith  ")).toBe("JS");
  });

  it("uppercases lowercase initials", () => {
    expect(getInitials("john doe")).toBe("JD");
  });
});

// ---------------------------------------------------------------------------
// formatRelativeDate()
// ---------------------------------------------------------------------------

describe("formatRelativeDate", () => {
  it("returns 'just now' for a very recent date", () => {
    const recent = new Date(Date.now() - 5000);
    expect(formatRelativeDate(recent)).toBe("just now");
  });

  it("returns minutes ago for dates within the last hour", () => {
    const twoMinsAgo = new Date(Date.now() - 2 * 60 * 1000);
    expect(formatRelativeDate(twoMinsAgo)).toBe("2 minutes ago");
  });

  it("uses singular 'minute' when diff is exactly 1 minute", () => {
    const oneMinAgo = new Date(Date.now() - 61 * 1000);
    expect(formatRelativeDate(oneMinAgo)).toBe("1 minute ago");
  });

  it("returns hours ago for dates within the last day", () => {
    const threeHoursAgo = new Date(Date.now() - 3 * 60 * 60 * 1000);
    expect(formatRelativeDate(threeHoursAgo)).toBe("3 hours ago");
  });

  it("returns days ago for dates within the last 30 days", () => {
    const fiveDaysAgo = new Date(Date.now() - 5 * 24 * 60 * 60 * 1000);
    expect(formatRelativeDate(fiveDaysAgo)).toBe("5 days ago");
  });

  it("returns a formatted date string for dates older than 30 days", () => {
    const oldDate = new Date("2020-01-15T00:00:00Z");
    const result = formatRelativeDate(oldDate);
    expect(result).toMatch(/Jan/);
    expect(result).toMatch(/2020/);
  });
});

// ---------------------------------------------------------------------------
// truncate()
// ---------------------------------------------------------------------------

describe("truncate", () => {
  it("returns the string unchanged when it fits within maxLength", () => {
    expect(truncate("hello", 10)).toBe("hello");
  });

  it("truncates and appends ellipsis when string exceeds maxLength", () => {
    expect(truncate("hello world", 8)).toBe("hello...");
  });

  it("returns the string unchanged when length equals maxLength", () => {
    expect(truncate("hello", 5)).toBe("hello");
  });

  it("handles empty string", () => {
    expect(truncate("", 10)).toBe("");
  });
});
