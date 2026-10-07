import type { IconProps } from "./icon-base";

export function IconJMeter({ size = 32, className, style, ...props }: IconProps): React.JSX.Element {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" className={className} style={style} {...props}>
      <rect width="32" height="32" rx="16" fill="url(#jm-bg)" />
      {/* Feather / quill */}
      <path d="M22 6c-8 2-14 10-14 18 2-4 6-7 10-8l-2 10c4-6 7-14 6-20Z" fill="white" opacity="0.9" />
      <defs>
        <linearGradient id="jm-bg" x1="0" y1="0" x2="32" y2="32">
          <stop stopColor="#dc2626" />
          <stop offset="1" stopColor="#991b1b" />
        </linearGradient>
      </defs>
    </svg>
  );
}
