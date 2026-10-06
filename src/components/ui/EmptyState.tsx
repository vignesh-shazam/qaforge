import { cn } from "@/lib/utils";

export interface EmptyStateProps {
  /** Large icon or illustration shown at the top */
  icon?: React.ReactNode;
  /** Primary heading */
  title: string;
  /** Supporting description */
  description?: string;
  /** Optional CTA button or link */
  action?: React.ReactNode;
  className?: string;
}

export function EmptyState({
  icon,
  title,
  description,
  action,
  className,
}: EmptyStateProps): React.JSX.Element {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center text-center",
        "py-16 px-6 gap-4",
        className,
      )}
    >
      {icon && (
        <div className="flex items-center justify-center w-16 h-16 rounded-full bg-surface-700 text-content-tertiary">
          {icon}
        </div>
      )}

      <div className="flex flex-col gap-2 max-w-sm">
        <h3 className="text-base font-semibold text-content-primary">{title}</h3>
        {description && (
          <p className="text-sm text-content-secondary leading-relaxed">
            {description}
          </p>
        )}
      </div>

      {action && <div className="mt-2">{action}</div>}
    </div>
  );
}
