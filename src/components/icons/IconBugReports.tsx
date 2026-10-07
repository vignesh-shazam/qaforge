import type { IconProps } from "./icon-base";

export function IconBugReports({ size = 32, className, style, ...props }: IconProps): React.JSX.Element {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" className={className} style={style} {...props}>
      <rect width="32" height="32" rx="8" fill="url(#bug-bg)" />
      <path d="M16 8a5 5 0 00-5 5v6a5 5 0 0010 0v-6a5 5 0 00-5-5Z" fill="white" opacity="0.9" />
      <path d="M16 6v2M11 10L8 8M21 10l3-2M6 14h4M22 14h4M6 19h4M22 19h4" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
      <defs>
        <linearGradient id="bug-bg" x1="0" y1="0" x2="32" y2="32">
          <stop stopColor="#f87171" />
          <stop offset="1" stopColor="#dc2626" />
        </linearGradient>
      </defs>
    </svg>
  );
}
