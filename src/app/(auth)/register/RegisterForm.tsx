"use client";

import { useState } from "react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

interface FormState {
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

function validateForm(values: FormState): FormErrors {
  const errors: FormErrors = {};

  if (!values.name.trim()) {
    errors.name = "Name is required.";
  } else if (values.name.trim().length < 2) {
    errors.name = "Name must be at least 2 characters.";
  }

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

  if (!values.confirmPassword) {
    errors.confirmPassword = "Please confirm your password.";
  } else if (values.password !== values.confirmPassword) {
    errors.confirmPassword = "Passwords do not match.";
  }

  return errors;
}

export function RegisterForm(): React.JSX.Element {
  const [values, setValues] = useState<FormState>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitState, setSubmitState] = useState<SubmitState>("idle");

  function handleChange(e: React.ChangeEvent<HTMLInputElement>): void {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
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

    // V0.1: Placeholder — real registration implemented in V0.2
    await new Promise<void>((resolve) => setTimeout(resolve, 1000));
    setSubmitState("success");
  }

  if (submitState === "success") {
    return (
      <div
        className="rounded-lg border border-success-900 bg-success-900/20 p-4 text-center"
        role="status"
      >
        <p className="text-sm font-medium text-success-400">
          Registration coming in V0.2
        </p>
        <p className="text-xs text-content-secondary mt-1">
          This is a UI placeholder. Real account creation will be implemented
          next.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
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
        disabled={submitState === "loading"}
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
        disabled={submitState === "loading"}
        required
      />

      <Input
        label="Password"
        id="password"
        name="password"
        type="password"
        autoComplete="new-password"
        placeholder="Minimum 8 characters"
        value={values.password}
        onChange={handleChange}
        error={errors.password}
        disabled={submitState === "loading"}
        required
      />

      <Input
        label="Confirm password"
        id="confirmPassword"
        name="confirmPassword"
        type="password"
        autoComplete="new-password"
        placeholder="••••••••"
        value={values.confirmPassword}
        onChange={handleChange}
        error={errors.confirmPassword}
        disabled={submitState === "loading"}
        required
      />

      <Button
        type="submit"
        variant="primary"
        size="lg"
        loading={submitState === "loading"}
        className="w-full mt-2"
      >
        Create account
      </Button>
    </form>
  );
}
