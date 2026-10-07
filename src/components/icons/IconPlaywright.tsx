import type { IconProps } from "./icon-base";

export function IconPlaywright({ size = 32, className, style, ...props }: IconProps): React.JSX.Element {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" className={className} style={style} {...props}>
      <rect width="32" height="32" rx="8" fill="url(#pw-bg)" />
      {/* Comedy/tragedy masks */}
      <ellipse cx="12" cy="15" rx="5" ry="6" fill="white" opacity="0.85" />
      <ellipse cx="21" cy="15" rx="5" ry="6" fill="white" opacity="0.55" />
      <path d="M10 14.5a1 1 0 012 0" stroke="#1e3a5f" strokeWidth="1" strokeLinecap="round" />
      <path d="M9.5 17.5c1 1.5 3 1.5 4 0" stroke="#1e3a5f" strokeWidth="1" strokeLinecap="round" />
      <path d="M19 14.5a1 1 0 012 0" stroke="#1e3a5f" strokeWidth="1" strokeLinecap="round" />
      <path d="M18.5 18c1-1.5 3-1.5 4 0" stroke="#1e3a5f" strokeWidth="1" strokeLinecap="round" />
      <defs>
        <linearGradient id="pw-bg" x1="0" y1="0" x2="32" y2="32">
          <stop stopColor="#1e40af" />
          <stop offset="1" stopColor="#1e3a8a" />
        </linearGradient>
      </defs>
    </svg>
  );
}
