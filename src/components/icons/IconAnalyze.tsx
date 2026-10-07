import type { IconProps } from "./icon-base";

export function IconAnalyze({ size = 32, className, style, ...props }: IconProps): React.JSX.Element {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" className={className} style={style} {...props}>
      <rect width="32" height="32" rx="8" fill="url(#anal-bg)" />
      {/* Sparkle/star shape */}
      <path d="M16 6l1.5 8H24l-6.5 4.5 2.5 8L16 22l-4 4.5 2.5-8L8 14h6.5L16 6Z" fill="white" opacity="0.9" />
      <defs>
        <linearGradient id="anal-bg" x1="0" y1="0" x2="32" y2="32">
          <stop stopColor="#c084fc" />
          <stop offset="1" stopColor="#9333ea" />
        </linearGradient>
      </defs>
    </svg>
  );
}
