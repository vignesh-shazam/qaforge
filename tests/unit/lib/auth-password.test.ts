import { describe, it, expect } from "vitest";
import { hashPassword, verifyPassword } from "@/lib/auth/password";

describe("hashPassword", () => {
  it("returns a string that starts with a bcrypt prefix", async () => {
    const hash = await hashPassword("Password1");
    expect(hash.startsWith("$2b$") || hash.startsWith("$2a$")).toBe(true);
  });

  it("returns a different hash each call (unique salt)", async () => {
    const a = await hashPassword("Password1");
    const b = await hashPassword("Password1");
    expect(a).not.toBe(b);
  });

  it("does not return the plaintext password", async () => {
    const hash = await hashPassword("MySecret1");
    expect(hash).not.toContain("MySecret1");
  });
});

describe("verifyPassword", () => {
  it("returns true for a correct password", async () => {
    const hash = await hashPassword("Password1");
    expect(await verifyPassword("Password1", hash)).toBe(true);
  });

  it("returns false for an incorrect password", async () => {
    const hash = await hashPassword("Password1");
    expect(await verifyPassword("WrongPassword", hash)).toBe(false);
  });

  it("returns false for an empty password", async () => {
    const hash = await hashPassword("Password1");
    expect(await verifyPassword("", hash)).toBe(false);
  });

  it("is case-sensitive", async () => {
    const hash = await hashPassword("Password1");
    expect(await verifyPassword("password1", hash)).toBe(false);
  });
});
