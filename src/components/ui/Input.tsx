"use client";

import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  /** Label text shown above the input */
  label?: string;
  /** Helper text shown below the input */
  helperText?: string;
  /** Error message — renders the input in error state */
  error?: string;
  /** Hides the label visually but keeps it accessible */
  hideLabel?: boolean;
}

export function Input({
  label,
  helperText,
  error,
  hideLabel = false,
  id,
  className,
  disabled,
  ...props
}: InputProps): React.JSX.Element {
  const inputId = id ?? (label ? label.toLowerCase().replace(/\s+/g, "-") : undefined);
  const errorId = error && inputId ? `${inputId}-error` : undefined;
  const helperId = helperText && inputId ? `${inputId}-helper` : undefined;

  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label
          htmlFor={inputId}
          className={cn(
            "text-sm font-medium text-content-primary",
            hideLabel && "sr-only",
            disabled && "opacity-50",
          )}
        >
          {label}
        </label>
      )}

      <input
        id={inputId}
        disabled={disabled}
        aria-invalid={!!error}
        aria-describedby={
          [errorId, helperId].filter(Boolean).join(" ") || undefined
        }
        className={cn(
          "h-9 w-full rounded-md px-3 py-2",
          "bg-surface-800 text-content-primary text-sm",
          "border border-surface-600",
          "placeholder:text-content-tertiary",
          "transition-colors duration-150",
          "focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-1 focus:ring-offset-surface-900 focus:border-brand-500",
          "disabled:opacity-50 disabled:cursor-not-allowed",
          error && "border-error-500 focus:ring-error-500",
          className,
        )}
        {...props}
      />

      {error && (
        <p id={errorId} className="text-xs text-error-400" role="alert">
          {error}
        </p>
      )}

      {helperText && !error && (
        <p id={helperId} className="text-xs text-content-tertiary">
          {helperText}
        </p>
      )}
    </div>
  );
}
