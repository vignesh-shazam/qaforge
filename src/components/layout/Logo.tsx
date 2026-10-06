import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  /**
   * variant:
   * - "full"  → horizontal logo (icon + QAForge wordmark SVG) — default
   * - "icon"  → icon mark only (square, for small contexts)
   * - "dark"  → full horizontal dark version (explicit)
   * - "white" → full horizontal white/light version
   */
  variant?: "full" | "icon" | "dark" | "white";
}

export function Logo({
  className,
  variant = "full",
}: LogoProps): React.JSX.Element {
  const isIconOnly = variant === "icon";
  const isWhite = variant === "white";

  const src = isIconOnly
    ? "/branding/qaforge-icon.svg"
    : isWhite
      ? "/branding/qaforge-logo-white.svg"
      : "/branding/qaforge-logo-dark.svg";

  const width = isIconOnly ? 36 : 160;
  const height = isIconOnly ? 36 : 36;

  return (
    <Link
      href="/"
      className={cn(
        "inline-flex items-center outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent rounded-md",
        className,
      )}
      aria-label="QAForge home"
    >
      <Image
        src={src}
        width={width}
        height={height}
        alt="QAForge"
        priority
        style={{ display: "block" }}
      />
    </Link>
  );
}
