import type { IconProps } from "./icon-base";

export function IconUpgrade({ size = 32, className, style, ...props }: IconProps): React.JSX.Element {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" className={className} style={style} {...props}>
      <rect width="32" height="32" rx="8" fill="url(#upg-bg)" />
      {/* Crown */}
      <path d="M7 22l3-9 6 5 6-5 3 9H7Z" fill="white" opacity="0.9" />
      <circle cx="7" cy="13" r="2" fill="white" />
      <circle cx="25" cy="13" r="2" fill="white" />
      <circle cx="16" cy="10" r="2" fill="white" />
      <defs>
        <linearGradient id="upg-bg" x1="0" y1="0" x2="32" y2="32">
          <stop stopColor="#fbbf24" />
          <stop offset="1" stopColor="#d97706" />
        </linearGradient>
      </defs>
    </svg>
  );
}
