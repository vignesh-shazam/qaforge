import type { IconProps } from "./icon-base";

export function IconNotifications({ size = 32, className, style, ...props }: IconProps): React.JSX.Element {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" className={className} style={style} {...props}>
      <rect width="32" height="32" rx="8" fill="url(#notif-bg)" />
      <path d="M16 7a7 7 0 00-7 7v4l-2 3h18l-2-3v-4a7 7 0 00-7-7Z" fill="white" opacity="0.85" />
      <path d="M14 23a2 2 0 004 0" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="23" cy="9" r="3.5" fill="#ef4444" />
      <defs>
        <linearGradient id="notif-bg" x1="0" y1="0" x2="32" y2="32">
          <stop stopColor="#fbbf24" />
          <stop offset="1" stopColor="#d97706" />
        </linearGradient>
      </defs>
    </svg>
  );
}
