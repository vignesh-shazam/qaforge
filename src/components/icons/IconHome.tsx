import type { IconProps } from "./icon-base";

export function IconHome({ size = 32, className, style, ...props }: IconProps): React.JSX.Element {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" className={className} style={style} {...props}>
      <rect width="32" height="32" rx="8" fill="url(#home-bg)" />
      <path d="M16 6L6 14.5V26h7v-6h6v6h7V14.5L16 6Z" fill="white" opacity="0.9" />
      <defs>
        <linearGradient id="home-bg" x1="0" y1="0" x2="32" y2="32">
          <stop stopColor="#6366f1" />
          <stop offset="1" stopColor="#4338ca" />
        </linearGradient>
      </defs>
    </svg>
  );
}
