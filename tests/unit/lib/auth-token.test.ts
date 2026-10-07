import { describe, it, expect } from "vitest";
import { generateResetToken, hashToken } from "@/lib/auth/token";

describe("generateResetToken", () => {
  it("returns a rawToken, tokenHash, and expiresAt", () => {
    const result = generateResetToken();
    expect(result.rawToken).toBeDefined();
    expect(result.tokenHash).toBeDefined();
    expect(result.expiresAt).toBeInstanceOf(Date);
  });

  it("rawToken is a 64-character hex string (32 bytes)", () => {
    const { rawToken } = generateResetToken();
    expect(rawToken).toHaveLength(64);
    expect(/^[0-9a-f]+$/.test(rawToken)).toBe(true);
  });

  it("tokenHash is a 64-character hex string (SHA-256)", () => {
    const { tokenHash } = generateResetToken();
    expect(tokenHash).toHaveLength(64);
    expect(/^[0-9a-f]+$/.test(tokenHash)).toBe(true);
  });

  it("tokenHash is the SHA-256 hash of rawToken", () => {
    const { rawToken, tokenHash } = generateResetToken();
    expect(hashToken(rawToken)).toBe(tokenHash);
  });

  it("expiresAt is roughly 15 minutes in the future", () => {
    const before = Date.now();
    const { expiresAt } = generateResetToken();
    const after = Date.now();
    const expectedMs = 15 * 60 * 1000;
    expect(expiresAt.getTime()).toBeGreaterThanOrEqual(before + expectedMs - 100);
    expect(expiresAt.getTime()).toBeLessThanOrEqual(after + expectedMs + 100);
  });

  it("generates unique tokens each call", () => {
    const a = generateResetToken();
    const b = generateResetToken();
    expect(a.rawToken).not.toBe(b.rawToken);
    expect(a.tokenHash).not.toBe(b.tokenHash);
  });
});

describe("hashToken", () => {
  it("produces the same hash for the same input", () => {
    const token = "abc123";
    expect(hashToken(token)).toBe(hashToken(token));
  });

  it("produces different hashes for different inputs", () => {
    expect(hashToken("tokenA")).not.toBe(hashToken("tokenB"));
  });

  it("returns a 64-character hex string", () => {
    const hash = hashToken("some-token");
    expect(hash).toHaveLength(64);
    expect(/^[0-9a-f]+$/.test(hash)).toBe(true);
  });
});
