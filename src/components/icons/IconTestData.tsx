import type { IconProps } from "./icon-base";

export function IconTestData({ size = 32, className, style, ...props }: IconProps): React.JSX.Element {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" className={className} style={style} {...props}>
      <rect width="32" height="32" rx="8" fill="url(#td-bg)" />
      <ellipse cx="16" cy="10" rx="8" ry="3" fill="white" opacity="0.9" />
      <path d="M8 10v5c0 1.66 3.58 3 8 3s8-1.34 8-3v-5" stroke="white" strokeWidth="1.3" opacity="0.7" />
      <path d="M8 15v5c0 1.66 3.58 3 8 3s8-1.34 8-3v-5" stroke="white" strokeWidth="1.3" opacity="0.5" />
      <defs>
        <linearGradient id="td-bg" x1="0" y1="0" x2="32" y2="32">
          <stop stopColor="#22d3ee" />
          <stop offset="1" stopColor="#0891b2" />
        </linearGradient>
      </defs>
    </svg>
  );
}
