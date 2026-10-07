import type { IconProps } from "./icon-base";

export function IconAutomation({ size = 32, className, style, ...props }: IconProps): React.JSX.Element {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" className={className} style={style} {...props}>
      <rect width="32" height="32" rx="8" fill="url(#auto-bg)" />
      {/* Play triangle */}
      <path d="M12 9l13 7-13 7V9Z" fill="white" opacity="0.9" />
      <defs>
        <linearGradient id="auto-bg" x1="0" y1="0" x2="32" y2="32">
          <stop stopColor="#4ade80" />
          <stop offset="1" stopColor="#16a34a" />
        </linearGradient>
      </defs>
    </svg>
  );
}
