"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

interface FormState {
  name: string;
  description: string;
  targetUrl: string;
}

interface FormErrors {
  name?: string;
  description?: string;
  targetUrl?: string;
}

type SubmitState = "idle" | "loading" | "success" | "error";

function validateForm(values: FormState): FormErrors {
  const errors: FormErrors = {};

  if (!values.name.trim()) {
    errors.name = "Project name is required.";
  } else if (values.name.trim().length < 2) {
    errors.name = "Project name must be at least 2 characters.";
  } else if (values.name.trim().length > 100) {
    errors.name = "Project name must be 100 characters or fewer.";
  }

  if (values.description.length > 500) {
    errors.description = "Description must be 500 characters or fewer.";
  }

  if (values.targetUrl && values.targetUrl.trim()) {
    try {
      const url = new URL(values.targetUrl.trim());
      if (!["http:", "https:"].includes(url.protocol)) {
        errors.targetUrl = "URL must use http or https.";
      }
    } catch {
      errors.targetUrl = "Please enter a valid URL (e.g. https://example.com).";
    }
  }

  return errors;
}

export function CreateProjectForm(): React.JSX.Element {
  const router = useRouter();
  const [values, setValues] = useState<FormState>({
    name: "",
    description: "",
    targetUrl: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitState, setSubmitState] = useState<SubmitState>("idle");

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ): void {
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

    // V0.1: Placeholder — real API wired up in V0.3
    await new Promise<void>((resolve) => setTimeout(resolve, 800));
    setSubmitState("success");

    // Redirect to projects list after short delay
    setTimeout(() => router.push("/projects"), 600);
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
      <Input
        label="Project name"
        id="name"
        name="name"
        type="text"
        placeholder="My Web Application"
        value={values.name}
        onChange={handleChange}
        error={errors.name}
        disabled={submitState === "loading" || submitState === "success"}
        required
      />

      <div className="flex flex-col gap-1.5">
        <label
          htmlFor="description"
          className="text-sm font-medium text-content-primary"
        >
          Description{" "}
          <span className="text-content-tertiary font-normal">(optional)</span>
        </label>
        <textarea
          id="description"
          name="description"
          rows={3}
          placeholder="Brief description of the application under test..."
          value={values.description}
          onChange={handleChange}
          disabled={submitState === "loading" || submitState === "success"}
          className="w-full rounded-md px-3 py-2 bg-surface-800 text-content-primary text-sm border border-surface-600 placeholder:text-content-tertiary resize-none transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-1 focus:ring-offset-surface-900 focus:border-brand-500 disabled:opacity-50 disabled:cursor-not-allowed"
          aria-describedby={errors.description ? "description-error" : undefined}
          aria-invalid={!!errors.description}
        />
        {errors.description && (
          <p id="description-error" className="text-xs text-error-400" role="alert">
            {errors.description}
          </p>
        )}
      </div>

      <Input
        label="Target URL"
        id="targetUrl"
        name="targetUrl"
        type="url"
        placeholder="https://app.example.com"
        value={values.targetUrl}
        onChange={handleChange}
        error={errors.targetUrl}
        disabled={submitState === "loading" || submitState === "success"}
        helperText="The base URL of the application you want to test. Required for discovery in V0.4."
      />

      {submitState === "success" && (
        <div
          className="rounded-lg border border-success-900 bg-success-900/20 p-3 text-center"
          role="status"
        >
          <p className="text-sm text-success-400">
            Project created — redirecting…
          </p>
        </div>
      )}

      <div className="flex items-center justify-end gap-3 pt-2 border-t border-surface-700">
        <Button
          type="button"
          variant="ghost"
          size="md"
          disabled={submitState === "loading" || submitState === "success"}
          onClick={() => router.push("/projects")}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          variant="primary"
          size="md"
          loading={submitState === "loading"}
          disabled={submitState === "success"}
        >
          Create project
        </Button>
      </div>
    </form>
  );
}
