"use client";

import { useState } from "react";
import Link from "next/link";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

interface FormState {
  email: string;
  password: string;
}

interface FormErrors {
  email?: string;
  password?: string;
}

type SubmitState = "idle" | "loading" | "success" | "error";

function validateForm(values: FormState): FormErrors {
  const errors: FormErrors = {};

  if (!values.email.trim()) {
    errors.email = "Email is required.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
    errors.email = "Please enter a valid email address.";
  }

  if (!values.password) {
    errors.password = "Password is required.";
  } else if (values.password.length < 8) {
    errors.password = "Password must be at least 8 characters.";
  }

  return errors;
}

export function LoginForm(): React.JSX.Element {
  const [values, setValues] = useState<FormState>({ email: "", password: "" });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitState, setSubmitState] = useState<SubmitState>("idle");

  function handleChange(e: React.ChangeEvent<HTMLInputElement>): void {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
    // Clear error on change
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  }

  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>,
  ): Promise<void> {
    e.preventDefault();

    const validationErrors = validateForm(values);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setSubmitState("loading");

    // V0.1: Placeholder — no real auth endpoint yet
    await new Promise<void>((resolve) => setTimeout(resolve, 1000));

    // Simulate success state for UI demonstration
    setSubmitState("success");
  }

  if (submitState === "success") {
    return (
      <div
        className="rounded-lg border border-success-900 bg-success-900/20 p-4 text-center"
        role="status"
      >
        <p className="text-sm font-medium text-success-400">
          Authentication coming in V0.2
        </p>
        <p className="text-xs text-content-secondary mt-1">
          This is a UI placeholder. Real authentication will be implemented
          next.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
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
        disabled={submitState === "loading"}
        required
      />

      <div className="flex flex-col gap-1.5">
        <div className="flex items-center justify-between">
          <label
            htmlFor="password"
            className="text-sm font-medium text-content-primary"
          >
            Password
          </label>
          <Link
            href="/forgot-password"
            className="text-xs text-brand-400 hover:text-brand-400/80 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 rounded"
          >
            Forgot password?
          </Link>
        </div>
        <Input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          placeholder="••••••••"
          value={values.password}
          onChange={handleChange}
          error={errors.password}
          disabled={submitState === "loading"}
          required
          hideLabel
          label="Password"
        />
      </div>

      <Button
        type="submit"
        variant="primary"
        size="lg"
        loading={submitState === "loading"}
        className="w-full mt-2"
      >
        Log in
      </Button>
    </form>
  );
}
