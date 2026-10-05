"use client";

import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { Spinner } from "./Spinner";

// ---------------------------------------------------------------------------
// Variant definitions
// ---------------------------------------------------------------------------

const buttonVariants = cva(
  // Base styles applied to all variants
  [
    "inline-flex items-center justify-center gap-2",
    "font-medium rounded-md",
    "transition-colors duration-150",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 focus-visible:ring-offset-surface-900",
    "disabled:pointer-events-none disabled:opacity-50",
    "select-none",
  ],
  {
    variants: {
      variant: {
        primary: [
          "bg-brand-500 text-white",
          "hover:bg-brand-600 active:bg-brand-700",
        ],
        secondary: [
          "bg-surface-700 text-content-primary border border-surface-600",
          "hover:bg-surface-600 active:bg-surface-500",
        ],
        ghost: [
          "bg-transparent text-content-secondary",
          "hover:bg-surface-700 hover:text-content-primary active:bg-surface-600",
        ],
        destructive: [
          "bg-error-500 text-white",
          "hover:bg-error-400 active:bg-error-500",
        ],
        outline: [
          "bg-transparent text-content-primary border border-surface-600",
          "hover:bg-surface-700 hover:border-surface-500 active:bg-surface-600",
        ],
      },
      size: {
        sm: "h-8 px-3 text-sm",
        md: "h-9 px-4 text-sm",
        lg: "h-11 px-6 text-base",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  },
);

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  /** Shows a loading spinner and disables the button */
  loading?: boolean;
}

export function Button({
  variant,
  size,
  loading = false,
  disabled,
  className,
  children,
  ...props
}: ButtonProps): React.JSX.Element {
  return (
    <button
      className={cn(buttonVariants({ variant, size }), className)}
      disabled={disabled ?? loading}
      aria-disabled={disabled ?? loading}
      {...props}
    >
      {loading && (
        <Spinner
          size="sm"
          className="text-current"
          aria-hidden="true"
        />
      )}
      {children}
    </button>
  );
}
