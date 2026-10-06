/**
 * Authentication form validation utilities.
 * Pure functions — no side effects, no React dependencies.
 * Shared across register, login, and forgot-password forms.
 */

// ---------------------------------------------------------------------------
// Email
// ---------------------------------------------------------------------------

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Validates an email field value.
 * Returns an error message string, or undefined if valid.
 */
export function validateEmail(value: string): string | undefined {
  if (!value.trim()) return "Email is required.";
  if (!EMAIL_REGEX.test(value.trim())) return "Enter a valid email address.";
  return undefined;
}

// ---------------------------------------------------------------------------
// Password (registration — enforces policy)
// ---------------------------------------------------------------------------

/**
 * Validates a new password during registration.
 * Returns an error message string, or undefined if valid.
 */
export function validateNewPassword(value: string): string | undefined {
  if (!value) return "Password is required.";
  if (value.length < 8) return "Password must be at least 8 characters.";
  if (!/[A-Za-z]/.test(value) || !/[0-9]/.test(value)) {
    return "Password must contain letters and numbers.";
  }
  return undefined;
}

/**
 * Validates that two password fields match.
 * Returns an error message string, or undefined if they match.
 */
export function validateConfirmPassword(
  password: string,
  confirm: string,
): string | undefined {
  if (!confirm) return "Please confirm your password.";
  if (password !== confirm) return "Passwords do not match.";
  return undefined;
}

// ---------------------------------------------------------------------------
// Password (login — required only, no policy)
// ---------------------------------------------------------------------------

/**
 * Validates a login password field (required only — no policy enforcement).
 * Returns an error message string, or undefined if valid.
 */
export function validateLoginPassword(value: string): string | undefined {
  if (!value) return "Password is required.";
  return undefined;
}

// ---------------------------------------------------------------------------
// Full name
// ---------------------------------------------------------------------------

/**
 * Validates a full name field.
 * Returns an error message string, or undefined if valid.
 */
export function validateName(value: string): string | undefined {
  if (!value.trim()) return "Name is required.";
  if (value.trim().length < 2) return "Name must be at least 2 characters.";
  return undefined;
}

// ---------------------------------------------------------------------------
// Composite validators
// ---------------------------------------------------------------------------

export interface RegisterErrors {
  name?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
}

export interface LoginErrors {
  email?: string;
  password?: string;
}

export interface ForgotPasswordErrors {
  email?: string;
}

export function validateRegisterForm(values: {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}): RegisterErrors {
  const errors: RegisterErrors = {};
  const name = validateName(values.name);
  const email = validateEmail(values.email);
  const password = validateNewPassword(values.password);
  const confirmPassword = validateConfirmPassword(values.password, values.confirmPassword);
  if (name) errors.name = name;
  if (email) errors.email = email;
  if (password) errors.password = password;
  if (confirmPassword) errors.confirmPassword = confirmPassword;
  return errors;
}

export function validateLoginForm(values: {
  email: string;
  password: string;
}): LoginErrors {
  const errors: LoginErrors = {};
  const email = validateEmail(values.email);
  const password = validateLoginPassword(values.password);
  if (email) errors.email = email;
  if (password) errors.password = password;
  return errors;
}

export function validateForgotPasswordForm(values: {
  email: string;
}): ForgotPasswordErrors {
  const errors: ForgotPasswordErrors = {};
  const email = validateEmail(values.email);
  if (email) errors.email = email;
  return errors;
}
