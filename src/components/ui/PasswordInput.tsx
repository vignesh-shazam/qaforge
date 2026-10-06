"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import type { InputProps } from "./Input";

type PasswordInputProps = Omit<InputProps, "type">;

/**
 * Password input with accessible show/hide toggle.
 * Extends the base Input style — consistent with the design system.
 */
export function PasswordInput({
  label,
  helperText,
  error,
  hideLabel = false,
  id,
  className,
  disabled,
  ...props
}: PasswordInputProps): React.JSX.Element {
  const [visible, setVisible] = useState(false);

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

      <div className="relative">
        <input
          id={inputId}
          type={visible ? "text" : "password"}
          disabled={disabled}
          aria-invalid={!!error}
          aria-describedby={
            [errorId, helperId].filter(Boolean).join(" ") || undefined
          }
          className={cn(
            "h-9 w-full rounded-md px-3 py-2 pr-10",
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

        {/* Visibility toggle */}
        <button
          type="button"
          tabIndex={0}
          aria-label={visible ? "Hide password" : "Show password"}
          disabled={disabled}
          onClick={() => setVisible((v) => !v)}
          className={cn(
            "absolute right-2 top-1/2 -translate-y-1/2",
            "flex items-center justify-center w-6 h-6 rounded",
            "text-content-tertiary transition-colors duration-150",
            "hover:text-content-secondary",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500",
            "disabled:pointer-events-none disabled:opacity-40",
          )}
        >
          {visible ? (
            /* Eye-off icon */
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M1 1l22 22" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
            </svg>
          ) : (
            /* Eye icon */
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
              <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.8"/>
            </svg>
          )}
        </button>
      </div>

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
