import type { IconProps } from "./icon-base";

export function IconHelpSupport({ size = 32, className, style, ...props }: IconProps): React.JSX.Element {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" className={className} style={style} {...props}>
      <rect width="32" height="32" rx="8" fill="url(#help-bg)" />
      <circle cx="16" cy="16" r="9" stroke="white" strokeWidth="1.5" opacity="0.5" />
      <path d="M13 13a3 3 0 016 0c0 2-3 2.5-3 5" stroke="white" strokeWidth="2" strokeLinecap="round" />
      <circle cx="16" cy="21.5" r="1.2" fill="white" />
      <defs>
        <linearGradient id="help-bg" x1="0" y1="0" x2="32" y2="32">
          <stop stopColor="#64748b" />
          <stop offset="1" stopColor="#334155" />
        </linearGradient>
      </defs>
    </svg>
  );
}
