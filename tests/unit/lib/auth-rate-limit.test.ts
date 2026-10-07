import { describe, it, expect } from "vitest";
import { checkRateLimit } from "@/lib/auth/rate-limit";

describe("checkRateLimit", () => {
  it("allows the first request", () => {
    const result = checkRateLimit("test-key-1", 3, 60_000);
    expect(result.allowed).toBe(true);
  });

  it("allows requests up to the limit", () => {
    const key = "test-key-2";
    for (let i = 0; i < 3; i++) {
      expect(checkRateLimit(key, 3, 60_000).allowed).toBe(true);
    }
  });

  it("blocks the request after the limit is exceeded", () => {
    const key = "test-key-3";
    for (let i = 0; i < 3; i++) {
      checkRateLimit(key, 3, 60_000);
    }
    const result = checkRateLimit(key, 3, 60_000);
    expect(result.allowed).toBe(false);
    expect(result.retryAfterMs).toBeGreaterThan(0);
  });

  it("uses independent counts per key", () => {
    checkRateLimit("key-a", 1, 60_000);
    const blockA = checkRateLimit("key-a", 1, 60_000);
    const allowB = checkRateLimit("key-b", 1, 60_000);
    expect(blockA.allowed).toBe(false);
    expect(allowB.allowed).toBe(true);
  });
});
