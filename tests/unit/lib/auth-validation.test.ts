import { describe, it, expect } from "vitest";
import {
  validateEmail,
  validateNewPassword,
  validateConfirmPassword,
  validateLoginPassword,
  validateName,
  validateRegisterForm,
  validateLoginForm,
  validateForgotPasswordForm,
} from "@/lib/auth-validation";

// ---------------------------------------------------------------------------
// validateEmail
// ---------------------------------------------------------------------------

describe("validateEmail", () => {
  it("returns error when email is empty", () => {
    expect(validateEmail("")).toBe("Email is required.");
  });

  it("returns error when email is whitespace only", () => {
    expect(validateEmail("   ")).toBe("Email is required.");
  });

  it("returns error for an invalid email format", () => {
    expect(validateEmail("notanemail")).toBe("Enter a valid email address.");
    expect(validateEmail("missing@domain")).toBe("Enter a valid email address.");
    expect(validateEmail("@nodomain.com")).toBe("Enter a valid email address.");
  });

  it("returns undefined for a valid email", () => {
    expect(validateEmail("user@example.com")).toBeUndefined();
    expect(validateEmail("user+tag@sub.domain.co")).toBeUndefined();
  });

  it("trims whitespace before validation", () => {
    expect(validateEmail("  user@example.com  ")).toBeUndefined();
  });
});

// ---------------------------------------------------------------------------
// validateNewPassword
// ---------------------------------------------------------------------------

describe("validateNewPassword", () => {
  it("returns error when password is empty", () => {
    expect(validateNewPassword("")).toBe("Password is required.");
  });

  it("returns error when password is shorter than 8 characters", () => {
    expect(validateNewPassword("abc1")).toBe("Password must be at least 8 characters.");
    expect(validateNewPassword("1234567")).toBe("Password must be at least 8 characters.");
  });

  it("returns error when password has no numbers", () => {
    expect(validateNewPassword("abcdefgh")).toBe("Password must contain letters and numbers.");
  });

  it("returns error when password has no letters", () => {
    expect(validateNewPassword("12345678")).toBe("Password must contain letters and numbers.");
  });

  it("returns undefined for a valid password", () => {
    expect(validateNewPassword("Password1")).toBeUndefined();
    expect(validateNewPassword("secure123")).toBeUndefined();
    expect(validateNewPassword("ab12345678")).toBeUndefined();
  });
});

// ---------------------------------------------------------------------------
// validateConfirmPassword
// ---------------------------------------------------------------------------

describe("validateConfirmPassword", () => {
  it("returns error when confirm password is empty", () => {
    expect(validateConfirmPassword("Password1", "")).toBe(
      "Please confirm your password.",
    );
  });

  it("returns error when passwords do not match", () => {
    expect(validateConfirmPassword("Password1", "Password2")).toBe(
      "Passwords do not match.",
    );
  });

  it("returns undefined when passwords match", () => {
    expect(
      validateConfirmPassword("Password1", "Password1"),
    ).toBeUndefined();
  });
});

// ---------------------------------------------------------------------------
// validateLoginPassword
// ---------------------------------------------------------------------------

describe("validateLoginPassword", () => {
  it("returns error when password is empty", () => {
    expect(validateLoginPassword("")).toBe("Password is required.");
  });

  it("returns undefined for any non-empty password (no policy on login)", () => {
    // Login should not enforce the registration policy
    expect(validateLoginPassword("short")).toBeUndefined();
    expect(validateLoginPassword("nouppercase1")).toBeUndefined();
    expect(validateLoginPassword("any-password")).toBeUndefined();
  });
});

// ---------------------------------------------------------------------------
// validateName
// ---------------------------------------------------------------------------

describe("validateName", () => {
  it("returns error when name is empty", () => {
    expect(validateName("")).toBe("Name is required.");
  });

  it("returns error when name is whitespace only", () => {
    expect(validateName("   ")).toBe("Name is required.");
  });

  it("returns error when name is shorter than 2 characters", () => {
    expect(validateName("A")).toBe("Name must be at least 2 characters.");
  });

  it("returns undefined for a valid name", () => {
    expect(validateName("Jo")).toBeUndefined();
    expect(validateName("Jane Doe")).toBeUndefined();
  });
});

// ---------------------------------------------------------------------------
// validateRegisterForm
// ---------------------------------------------------------------------------

describe("validateRegisterForm", () => {
  const valid = {
    name: "Jane Doe",
    email: "jane@example.com",
    password: "Password1",
    confirmPassword: "Password1",
  };

  it("returns no errors for valid inputs", () => {
    expect(validateRegisterForm(valid)).toEqual({});
  });

  it("returns name error when name is missing", () => {
    const result = validateRegisterForm({ ...valid, name: "" });
    expect(result.name).toBeDefined();
    expect(result.email).toBeUndefined();
  });

  it("returns email error when email is invalid", () => {
    const result = validateRegisterForm({ ...valid, email: "bad-email" });
    expect(result.email).toBeDefined();
  });

  it("returns password error when password is too weak", () => {
    const result = validateRegisterForm({ ...valid, password: "short", confirmPassword: "short" });
    expect(result.password).toBeDefined();
  });

  it("returns confirmPassword error when passwords do not match", () => {
    const result = validateRegisterForm({ ...valid, confirmPassword: "Different1" });
    expect(result.confirmPassword).toBe("Passwords do not match.");
  });

  it("returns all field errors when all fields are empty", () => {
    const result = validateRegisterForm({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
    expect(result.name).toBeDefined();
    expect(result.email).toBeDefined();
    expect(result.password).toBeDefined();
    expect(result.confirmPassword).toBeDefined();
  });
});

// ---------------------------------------------------------------------------
// validateLoginForm
// ---------------------------------------------------------------------------

describe("validateLoginForm", () => {
  it("returns no errors for valid inputs", () => {
    expect(
      validateLoginForm({ email: "user@example.com", password: "anypassword" }),
    ).toEqual({});
  });

  it("returns email error when email is missing", () => {
    const result = validateLoginForm({ email: "", password: "anypassword" });
    expect(result.email).toBeDefined();
  });

  it("returns password error when password is missing", () => {
    const result = validateLoginForm({ email: "user@example.com", password: "" });
    expect(result.password).toBeDefined();
  });

  it("does not enforce password length policy on login", () => {
    // Login only checks required — not policy
    const result = validateLoginForm({ email: "user@example.com", password: "s" });
    expect(result.password).toBeUndefined();
  });
});

// ---------------------------------------------------------------------------
// validateForgotPasswordForm
// ---------------------------------------------------------------------------

describe("validateForgotPasswordForm", () => {
  it("returns no errors for a valid email", () => {
    expect(validateForgotPasswordForm({ email: "user@example.com" })).toEqual({});
  });

  it("returns email error when email is empty", () => {
    const result = validateForgotPasswordForm({ email: "" });
    expect(result.email).toBeDefined();
  });

  it("returns email error for an invalid email format", () => {
    const result = validateForgotPasswordForm({ email: "notvalid" });
    expect(result.email).toBeDefined();
  });
});
