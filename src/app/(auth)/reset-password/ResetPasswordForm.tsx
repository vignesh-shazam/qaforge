"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { PasswordInput } from "@/components/ui/PasswordInput";
import { Button } from "@/components/ui/Button";
import { validateNewPassword } from "@/lib/auth-validation";

interface FormValues {
  password: string;
  confirmPassword: string;
}

interface FormErrors {
  password?: string;
  confirmPassword?: string;
}

type SubmitState = "idle" | "loading" | "success" | "error";

export function ResetPasswordForm(): React.JSX.Element {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [values, setValues] = useState<FormValues>({ password: "", confirmPassword: "" });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const [serverError, setServerError] = useState<string | null>(null);

  if (!token) {
    return (
      <div
        className="rounded-lg p-5 text-center"
        role="alert"
        style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.3)" }}
      >
        <p className="text-sm font-semibold" style={{ color: "#fca5a5" }}>Invalid reset link</p>
        <p className="text-xs mt-1" style={{ color: "rgba(255,255,255,0.45)" }}>
          This password reset link is missing a token. Please request a new one.
        </p>
      </div>
    );
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>): void {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
    if (serverError) setServerError(null);
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>): Promise<void> {
    e.preventDefault();

    const fieldErrors: FormErrors = {};
    const passwordError = validateNewPassword(values.password);
    if (passwordError) fieldErrors.password = passwordError;
    if (!values.confirmPassword) fieldErrors.confirmPassword = "Please confirm your password.";
    else if (values.password !== values.confirmPassword) fieldErrors.confirmPassword = "Passwords do not match.";

    if (Object.keys(fieldErrors).length > 0) {
      setErrors(fieldErrors);
      return;
    }

    setSubmitState("loading");
    setServerError(null);

    try {
      const res = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password: values.password, confirmPassword: values.confirmPassword }),
      });
      const data = await res.json() as { success: boolean; error?: string };

      if (!res.ok || !data.success) {
        setServerError(data.error ?? "Unable to reset your password. Please try again.");
        setSubmitState("error");
        return;
      }

      setSubmitState("success");
      setTimeout(() => router.push("/login"), 2500);
    } catch {
      setServerError("A network error occurred. Please try again.");
      setSubmitState("error");
    }
  }

  const isLoading = submitState === "loading";

  if (submitState === "success") {
    return (
      <div
        className="rounded-lg p-5 text-center"
        role="status"
        aria-live="polite"
        style={{ background: "rgba(34,197,94,0.08)", border: "1px solid rgba(34,197,94,0.25)" }}
      >
        <div className="flex justify-center mb-3">
          <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: "rgba(34,197,94,0.15)" }} aria-hidden="true">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M4 10l4 4 8-8" stroke="#4ade80" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>
        <p className="text-sm font-semibold text-white mb-1">Password updated!</p>
        <p className="text-xs" style={{ color: "rgba(255,255,255,0.45)" }}>
          Redirecting you to sign in…
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
      {serverError && (
        <div className="rounded-lg px-4 py-3 text-sm" role="alert" aria-live="assertive"
          style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.3)", color: "#fca5a5" }}>
          {serverError}
        </div>
      )}
      <PasswordInput
        label="New password"
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
        label="Confirm new password"
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
      <Button type="submit" variant="primary" size="lg" loading={isLoading} className="w-full mt-1">
        {isLoading ? "Resetting password…" : "Reset Password"}
      </Button>
    </form>
  );
}
