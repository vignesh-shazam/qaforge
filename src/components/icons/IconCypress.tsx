import type { IconProps } from "./icon-base";

export function IconCypress({ size = 32, className, style, ...props }: IconProps): React.JSX.Element {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" className={className} style={style} {...props}>
      <rect width="32" height="32" rx="8" fill="url(#cy-bg)" />
      <circle cx="16" cy="16" r="9" stroke="white" strokeWidth="2" opacity="0.9" />
      <text x="16" y="20" textAnchor="middle" fill="white" fontSize="9" fontWeight="800" fontFamily="sans-serif">Cy</text>
      <defs>
        <linearGradient id="cy-bg" x1="0" y1="0" x2="32" y2="32">
          <stop stopColor="#374151" />
          <stop offset="1" stopColor="#111827" />
        </linearGradient>
      </defs>
    </svg>
  );
}
