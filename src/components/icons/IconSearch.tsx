import type { IconProps } from "./icon-base";

export function IconSearch({ size = 32, className, style, ...props }: IconProps): React.JSX.Element {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" className={className} style={style} {...props}>
      <rect width="32" height="32" rx="8" fill="url(#srch-bg)" />
      <circle cx="15" cy="14" r="6" stroke="white" strokeWidth="2" opacity="0.9" />
      <path d="M19.5 19.5l4.5 4.5" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
      <defs>
        <linearGradient id="srch-bg" x1="0" y1="0" x2="32" y2="32">
          <stop stopColor="#38bdf8" />
          <stop offset="1" stopColor="#0284c7" />
        </linearGradient>
      </defs>
    </svg>
  );
}
