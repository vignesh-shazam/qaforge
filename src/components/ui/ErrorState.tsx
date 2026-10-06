import { cn } from "@/lib/utils";
import { Button } from "./Button";

export interface ErrorStateProps {
  /** Error message to display */
  message?: string;
  /** Called when the retry button is clicked */
  onRetry?: () => void;
  /** Label for the retry button */
  retryLabel?: string;
  className?: string;
}

export function ErrorState({
  message = "Something went wrong. Please try again.",
  onRetry,
  retryLabel = "Try again",
  className,
}: ErrorStateProps): React.JSX.Element {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center text-center",
        "py-16 px-6 gap-4",
        className,
      )}
      role="alert"
    >
      <div className="flex items-center justify-center w-16 h-16 rounded-full bg-error-900/50">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-error-400"
          aria-hidden="true"
        >
          <circle cx="12" cy="12" r="10" />
          <line x1="12" x2="12" y1="8" y2="12" />
          <line x1="12" x2="12.01" y1="16" y2="16" />
        </svg>
      </div>

      <div className="flex flex-col gap-2 max-w-sm">
        <h3 className="text-base font-semibold text-content-primary">
          Something went wrong
        </h3>
        <p className="text-sm text-content-secondary leading-relaxed">
          {message}
        </p>
      </div>

      {onRetry && (
        <Button variant="secondary" size="sm" onClick={onRetry}>
          {retryLabel}
        </Button>
      )}
    </div>
  );
}
