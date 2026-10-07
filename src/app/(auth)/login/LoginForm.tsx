"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Input } from "@/components/ui/Input";
import { PasswordInput } from "@/components/ui/PasswordInput";
import { Button } from "@/components/ui/Button";
import { validateLoginForm } from "@/lib/auth-validation";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface FormValues {
  email: string;
  password: string;
}

interface FormErrors {
  email?: string;
  password?: string;
}

type SubmitState = "idle" | "loading" | "success" | "error";

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function LoginForm(): React.JSX.Element {
  const router = useRouter();
  const searchParams = useSearchParams();
  const nextPath = searchParams.get("next") ?? "/dashboard";

  const [values, setValues] = useState<FormValues>({ email: "", password: "" });
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

    const validationErrors = validateLoginForm(values);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setSubmitState("loading");
    setServerError(null);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      const data = await res.json() as { success: boolean; error?: string };

      if (!res.ok || !data.success) {
        setServerError(data.error ?? "Invalid email or password.");
        setSubmitState("error");
        return;
      }

      setSubmitState("success");
      // Redirect to intended destination or dashboard
      const safe = nextPath.startsWith("/") ? nextPath : "/dashboard";
      router.push(safe);
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

      {/* Password row with inline forgot link */}
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
            className="text-xs text-brand-400 hover:opacity-80 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 rounded"
          >
            Forgot password?
          </Link>
        </div>
        <PasswordInput
          id="password"
          name="password"
          autoComplete="current-password"
          placeholder="••••••••"
          value={values.password}
          onChange={handleChange}
          error={errors.password}
          disabled={isLoading}
          required
          hideLabel
          label="Password"
        />
      </div>

      <Button
        type="submit"
        variant="primary"
        size="lg"
        loading={isLoading}
        className="w-full mt-1"
      >
        {isLoading ? "Signing in…" : "Sign In"}
      </Button>
    </form>
  );
}
