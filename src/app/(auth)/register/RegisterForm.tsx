"use client";

import { useState } from "react";
import { Input } from "@/components/ui/Input";
import { PasswordInput } from "@/components/ui/PasswordInput";
import { Button } from "@/components/ui/Button";
import {
  validateRegisterForm,
} from "@/lib/auth-validation";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface FormValues {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
}

type SubmitState = "idle" | "loading" | "success" | "error";

// ---------------------------------------------------------------------------
// Validation — delegated to shared lib
// ---------------------------------------------------------------------------

function validate(values: FormValues): FormErrors {
  return validateRegisterForm(values);
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function RegisterForm(): React.JSX.Element {
  const [values, setValues] = useState<FormValues>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const [serverError, setServerError] = useState<string | null>(null);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>): void {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
    // Clear field error on change
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
    if (serverError) setServerError(null);
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>): Promise<void> {
    e.preventDefault();

    const validationErrors = validate(values);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setSubmitState("loading");
    setServerError(null);

    // V0.1: UI placeholder — real registration implemented in V0.2.
    // The submission boundary is isolated here for clean V0.2 backend integration.
    await new Promise<void>((resolve) => setTimeout(resolve, 800));
    setSubmitState("success");
  }

  const isLoading = submitState === "loading";

  // ── Success state ──
  if (submitState === "success") {
    return (
      <div
        className="rounded-lg p-5 text-center"
        role="status"
        aria-live="polite"
        style={{
          background: "rgba(34,197,94,0.08)",
          border: "1px solid rgba(34,197,94,0.25)",
        }}
      >
        {/* Checkmark icon */}
        <div className="flex justify-center mb-3">
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center"
            style={{ background: "rgba(34,197,94,0.15)" }}
            aria-hidden="true"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M4 10l4 4 8-8" stroke="#4ade80" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>
        <p className="text-sm font-semibold text-white mb-1">Account created!</p>
        <p className="text-xs" style={{ color: "rgba(255,255,255,0.45)" }}>
          Full authentication is coming in V0.2. Your account is ready.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">

      {/* Server error banner */}
      {serverError && (
        <div
          className="rounded-lg px-4 py-3 text-sm"
          role="alert"
          aria-live="assertive"
          style={{
            background: "rgba(239,68,68,0.1)",
            border: "1px solid rgba(239,68,68,0.3)",
            color: "#fca5a5",
          }}
        >
          {serverError}
        </div>
      )}

      <Input
        label="Full name"
        id="name"
        name="name"
        type="text"
        autoComplete="name"
        placeholder="Jane Doe"
        value={values.name}
        onChange={handleChange}
        error={errors.name}
        disabled={isLoading}
        required
      />

      <Input
        label="Email"
        id="email"
        name="email"
        type="email"
        autoComplete="email"
        placeholder="you@example.com"
        value={values.email}
        onChange={handleChange}
        error={errors.email}
        disabled={isLoading}
        required
      />

      <PasswordInput
        label="Password"
        id="password"
        name="password"
        autoComplete="new-password"
        placeholder="Min. 8 characters"
        value={values.password}
        onChange={handleChange}
        error={errors.password}
        helperText={!errors.password ? "Use letters and numbers." : undefined}
        disabled={isLoading}
        required
      />

      <PasswordInput
        label="Confirm password"
        id="confirmPassword"
        name="confirmPassword"
        autoComplete="new-password"
        placeholder="Repeat your password"
        value={values.confirmPassword}
        onChange={handleChange}
        error={errors.confirmPassword}
        disabled={isLoading}
        required
      />

      <Button
        type="submit"
        variant="primary"
        size="lg"
        loading={isLoading}
        className="w-full mt-1"
      >
        {isLoading ? "Creating account…" : "Create Account"}
      </Button>
    </form>
  );
}
