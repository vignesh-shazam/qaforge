import type { IconProps } from "./icon-base";

export function IconReports({ size = 32, className, style, ...props }: IconProps): React.JSX.Element {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" className={className} style={style} {...props}>
      <rect width="32" height="32" rx="8" fill="url(#rep-bg)" />
      <rect x="7" y="6" width="18" height="20" rx="2.5" fill="white" opacity="0.15" stroke="white" strokeWidth="1" />
      <rect x="10" y="10" width="12" height="2" rx="1" fill="white" opacity="0.9" />
      <rect x="10" y="14" width="8" height="1.5" rx="0.75" fill="white" opacity="0.65" />
      <rect x="10" y="17" width="10" height="1.5" rx="0.75" fill="white" opacity="0.45" />
      {/* Mini bar chart at bottom */}
      <rect x="10" y="21" width="2.5" height="3" rx="0.75" fill="white" opacity="0.7" />
      <rect x="14" y="19" width="2.5" height="5" rx="0.75" fill="white" opacity="0.85" />
      <rect x="18" y="20.5" width="2.5" height="3.5" rx="0.75" fill="white" opacity="0.6" />
      <defs>
        <linearGradient id="rep-bg" x1="0" y1="0" x2="32" y2="32">
          <stop stopColor="#a78bfa" />
          <stop offset="1" stopColor="#6d28d9" />
        </linearGradient>
      </defs>
    </svg>
  );
}
