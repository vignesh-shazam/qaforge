"use client";

import { useState } from "react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

interface FormState {
  email: string;
}

interface FormErrors {
  email?: string;
}

type SubmitState = "idle" | "loading" | "submitted";

export function ForgotPasswordForm(): React.JSX.Element {
  const [values, setValues] = useState<FormState>({ email: "" });
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

    if (!values.email.trim()) {
      setErrors({ email: "Email is required." });
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
      setErrors({ email: "Please enter a valid email address." });
      return;
    }

    setSubmitState("loading");

    // V0.1: Placeholder — real password reset implemented in V0.2
    await new Promise<void>((resolve) => setTimeout(resolve, 1000));
    setSubmitState("submitted");
  }

  if (submitState === "submitted") {
    return (
      <div
        className="rounded-lg border border-success-900 bg-success-900/20 p-4 text-center"
        role="status"
      >
        <p className="text-sm font-medium text-success-400">Check your inbox</p>
        <p className="text-xs text-content-secondary mt-1">
          If an account exists for{" "}
          <span className="text-content-primary">{values.email}</span>, a reset
          link will be sent. (V0.2 feature)
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
        helperText="We'll send a password reset link to this address."
        required
      />

      <Button
        type="submit"
        variant="primary"
        size="lg"
        loading={submitState === "loading"}
        className="w-full mt-2"
      >
        Send reset link
      </Button>
    </form>
  );
}
