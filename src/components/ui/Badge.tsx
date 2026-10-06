import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium transition-colors",
  {
    variants: {
      variant: {
        default: "bg-surface-700 text-content-secondary border border-surface-600",
        success: "bg-success-900 text-success-400 border border-success-900",
        warning: "bg-warning-900 text-warning-400 border border-warning-900",
        error: "bg-error-900 text-error-400 border border-error-900",
        info: "bg-info-900 text-info-400 border border-info-900",
        brand: "bg-brand-500/10 text-brand-400 border border-brand-500/20",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

export function Badge({
  variant,
  className,
  children,
  ...props
}: BadgeProps): React.JSX.Element {
  return (
    <span className={cn(badgeVariants({ variant }), className)} {...props}>
      {children}
    </span>
  );
}
