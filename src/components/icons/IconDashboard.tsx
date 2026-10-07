import type { IconProps } from "./icon-base";

export function IconDashboard({ size = 32, className, style, ...props }: IconProps): React.JSX.Element {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" className={className} style={style} {...props}>
      <rect width="32" height="32" rx="8" fill="url(#dash-bg)" />
      {/* Bar chart columns */}
      <rect x="7" y="18" width="4" height="8" rx="1.5" fill="white" opacity="0.6" />
      <rect x="14" y="12" width="4" height="14" rx="1.5" fill="white" opacity="0.85" />
      <rect x="21" y="7" width="4" height="19" rx="1.5" fill="white" />
      <defs>
        <linearGradient id="dash-bg" x1="0" y1="0" x2="32" y2="32">
          <stop stopColor="#818cf8" />
          <stop offset="1" stopColor="#6366f1" />
        </linearGradient>
      </defs>
    </svg>
  );
}
