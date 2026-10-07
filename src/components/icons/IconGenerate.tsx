import type { IconProps } from "./icon-base";

export function IconGenerate({ size = 32, className, style, ...props }: IconProps): React.JSX.Element {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" className={className} style={style} {...props}>
      <rect width="32" height="32" rx="8" fill="url(#gen-bg)" />
      {/* Magic wand + sparkles */}
      <path d="M8 24L20 12" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M20 12l2-5 2 5-5-2 5 2Z" fill="white" opacity="0.9" />
      <circle cx="10" cy="10" r="1.5" fill="white" opacity="0.7" />
      <circle cx="25" cy="20" r="1.5" fill="white" opacity="0.7" />
      <circle cx="22" cy="25" r="1" fill="white" opacity="0.5" />
      <defs>
        <linearGradient id="gen-bg" x1="0" y1="0" x2="32" y2="32">
          <stop stopColor="#f472b6" />
          <stop offset="1" stopColor="#db2777" />
        </linearGradient>
      </defs>
    </svg>
  );
}
