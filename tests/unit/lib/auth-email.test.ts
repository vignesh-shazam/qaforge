import { describe, it, expect } from "vitest";
import { normalizeEmail } from "@/lib/auth/email";

describe("normalizeEmail", () => {
  it("lowercases the email address", () => {
    expect(normalizeEmail("User@Example.COM")).toBe("user@example.com");
  });

  it("trims leading and trailing whitespace", () => {
    expect(normalizeEmail("  user@example.com  ")).toBe("user@example.com");
  });

  it("trims and lowercases together", () => {
    expect(normalizeEmail("  USER@EXAMPLE.COM  ")).toBe("user@example.com");
  });

  it("preserves a correctly formatted email unchanged", () => {
    expect(normalizeEmail("user@example.com")).toBe("user@example.com");
  });

  it("handles empty string", () => {
    expect(normalizeEmail("")).toBe("");
  });
});
