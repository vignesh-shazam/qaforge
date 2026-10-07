import type { IconProps } from "./icon-base";

export function IconApiTests({ size = 32, className, style, ...props }: IconProps): React.JSX.Element {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" className={className} style={style} {...props}>
      <rect width="32" height="32" rx="8" fill="url(#api-bg)" />
      <rect x="7" y="10" width="18" height="12" rx="2.5" fill="white" opacity="0.15" stroke="white" strokeWidth="1" />
      <text x="16" y="18.5" textAnchor="middle" fill="white" fontSize="8" fontWeight="700" fontFamily="monospace">API</text>
      <defs>
        <linearGradient id="api-bg" x1="0" y1="0" x2="32" y2="32">
          <stop stopColor="#34d399" />
          <stop offset="1" stopColor="#059669" />
        </linearGradient>
      </defs>
    </svg>
  );
}
