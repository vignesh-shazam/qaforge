import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const spinnerVariants = cva("animate-spin rounded-full border-2 border-current border-t-transparent", {
  variants: {
    size: {
      sm: "h-4 w-4",
      md: "h-6 w-6",
      lg: "h-8 w-8",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

export interface SpinnerProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof spinnerVariants> {
  /** Accessible label for screen readers */
  label?: string;
}

export function Spinner({
  size,
  label = "Loading...",
  className,
  ...props
}: SpinnerProps): React.JSX.Element {
  return (
    <span role="status" aria-label={label} {...props}>
      <span className={cn(spinnerVariants({ size }), className)} />
      <span className="sr-only">{label}</span>
    </span>
  );
}
