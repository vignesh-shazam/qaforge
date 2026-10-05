import Link from "next/link";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  /** Whether to show the full wordmark or just the icon mark */
  variant?: "full" | "icon";
}

export function Logo({
  className,
  variant = "full",
}: LogoProps): React.JSX.Element {
  return (
    <Link
      href="/"
      className={cn(
        "inline-flex items-center gap-2.5 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 rounded-md",
        className,
      )}
      aria-label="QAForge home"
    >
      {/* Icon mark */}
      <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-brand-500 group-hover:bg-brand-600 transition-colors duration-150 shrink-0">
        <svg
          width="18"
          height="18"
          viewBox="0 0 18 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          {/* Simple QA checkmark / forge icon */}
          <path
            d="M3 9L7 13L15 5"
            stroke="white"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      {/* Wordmark */}
      {variant === "full" && (
        <span className="text-base font-bold text-content-primary tracking-tight">
          QAForge
        </span>
      )}
    </Link>
  );
}
