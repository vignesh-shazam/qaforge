import type { IconProps } from "./icon-base";

export function IconPostman({ size = 32, className, style, ...props }: IconProps): React.JSX.Element {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" className={className} style={style} {...props}>
      <rect width="32" height="32" rx="16" fill="url(#pm-bg)" />
      {/* Postman rocket/send icon simplified */}
      <path d="M8 16l18-8-8 18-3-6-7-4Z" fill="white" opacity="0.9" />
      <defs>
        <linearGradient id="pm-bg" x1="0" y1="0" x2="32" y2="32">
          <stop stopColor="#f97316" />
          <stop offset="1" stopColor="#c2410c" />
        </linearGradient>
      </defs>
    </svg>
  );
}
