import type { IconProps } from "./icon-base";

export function IconSelenium({ size = 32, className, style, ...props }: IconProps): React.JSX.Element {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" className={className} style={style} {...props}>
      <rect width="32" height="32" rx="8" fill="url(#sel-bg)" />
      <rect x="8" y="8" width="16" height="16" rx="8" fill="white" opacity="0.15" />
      <text x="16" y="20" textAnchor="middle" fill="white" fontSize="10" fontWeight="800" fontFamily="sans-serif">Se</text>
      <defs>
        <linearGradient id="sel-bg" x1="0" y1="0" x2="32" y2="32">
          <stop stopColor="#16a34a" />
          <stop offset="1" stopColor="#14532d" />
        </linearGradient>
      </defs>
    </svg>
  );
}
