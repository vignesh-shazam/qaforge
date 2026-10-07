import type { IconProps } from "./icon-base";

export function IconUser({ size = 32, className, style, ...props }: IconProps): React.JSX.Element {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" className={className} style={style} {...props}>
      <rect width="32" height="32" rx="16" fill="url(#user-bg)" />
      <circle cx="16" cy="12" r="5" fill="white" opacity="0.9" />
      <path d="M6 26c0-5.52 4.48-10 10-10s10 4.48 10 10" fill="white" opacity="0.7" />
      <defs>
        <linearGradient id="user-bg" x1="0" y1="0" x2="32" y2="32">
          <stop stopColor="#6366f1" />
          <stop offset="1" stopColor="#4f46e5" />
        </linearGradient>
      </defs>
    </svg>
  );
}
