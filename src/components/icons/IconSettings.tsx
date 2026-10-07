import type { IconProps } from "./icon-base";

export function IconSettings({ size = 32, className, style, ...props }: IconProps): React.JSX.Element {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" className={className} style={style} {...props}>
      <rect width="32" height="32" rx="8" fill="url(#set-bg)" />
      <circle cx="16" cy="16" r="4" fill="white" opacity="0.9" />
      <path d="M16 6v3M16 23v3M6 16h3M23 16h3M9.17 9.17l2.12 2.12M20.71 20.71l2.12 2.12M9.17 22.83l2.12-2.12M20.71 11.29l2.12-2.12" stroke="white" strokeWidth="1.8" strokeLinecap="round" opacity="0.7" />
      <defs>
        <linearGradient id="set-bg" x1="0" y1="0" x2="32" y2="32">
          <stop stopColor="#94a3b8" />
          <stop offset="1" stopColor="#475569" />
        </linearGradient>
      </defs>
    </svg>
  );
}
