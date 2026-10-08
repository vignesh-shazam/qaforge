"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/Input";
import { PasswordInput } from "@/components/ui/PasswordInput";
import { Button } from "@/components/ui/Button";
import { validateRegisterForm } from "@/lib/auth-validation";

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
// Component
// ---------------------------------------------------------------------------

export function RegisterForm(): React.JSX.Element {
  const router = useRouter();

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
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
    if (serverError) setServerError(null);
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>): Promise<void> {
    e.preventDefault();

    const validationErrors = validateRegisterForm(values);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setSubmitState("loading");
    setServerError(null);

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      const data = await res.json() as {
        success: boolean;
        error?: string;
        fields?: FormErrors;
      };

      if (!res.ok || !data.success) {
        if (data.fields) setErrors(data.fields);
        setServerError(
          data.error ?? "Unable to create your account. Please try again.",
        );
        setSubmitState("error");
        return;
      }

      setSubmitState("success");
      router.push("/home");
    } catch {
      setServerError("A network error occurred. Please try again.");
      setSubmitState("error");
    }
  }

  const isLoading = submitState === "loading";

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">

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
