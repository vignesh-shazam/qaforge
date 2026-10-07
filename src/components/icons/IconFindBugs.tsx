import type { IconProps } from "./icon-base";

export function IconFindBugs({ size = 32, className, style, ...props }: IconProps): React.JSX.Element {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" className={className} style={style} {...props}>
      <rect width="32" height="32" rx="8" fill="url(#fb-bg)" />
      {/* Target / bullseye */}
      <circle cx="16" cy="16" r="9" stroke="white" strokeWidth="1.5" opacity="0.4" />
      <circle cx="16" cy="16" r="6" stroke="white" strokeWidth="1.5" opacity="0.65" />
      <circle cx="16" cy="16" r="3" fill="white" opacity="0.9" />
      <defs>
        <linearGradient id="fb-bg" x1="0" y1="0" x2="32" y2="32">
          <stop stopColor="#fb7185" />
          <stop offset="1" stopColor="#e11d48" />
        </linearGradient>
      </defs>
    </svg>
  );
}
