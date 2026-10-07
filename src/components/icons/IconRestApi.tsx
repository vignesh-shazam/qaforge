import type { IconProps } from "./icon-base";

export function IconRestApi({ size = 32, className, style, ...props }: IconProps): React.JSX.Element {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" className={className} style={style} {...props}>
      <rect width="32" height="32" rx="8" fill="url(#rest-bg)" />
      <rect x="6" y="10" width="20" height="12" rx="3" fill="white" opacity="0.15" stroke="white" strokeWidth="1" />
      <text x="16" y="18.5" textAnchor="middle" fill="white" fontSize="7" fontWeight="700" fontFamily="monospace">API</text>
      <path d="M6 13h20" stroke="white" strokeWidth="0.8" opacity="0.3" />
      <defs>
        <linearGradient id="rest-bg" x1="0" y1="0" x2="32" y2="32">
          <stop stopColor="#0ea5e9" />
          <stop offset="1" stopColor="#0369a1" />
        </linearGradient>
      </defs>
    </svg>
  );
}
