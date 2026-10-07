import type { IconProps } from "./icon-base";

export function IconTestCases({ size = 32, className, style, ...props }: IconProps): React.JSX.Element {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" className={className} style={style} {...props}>
      <rect width="32" height="32" rx="8" fill="url(#tc-bg)" />
      <rect x="8" y="6" width="16" height="20" rx="2.5" fill="white" opacity="0.15" stroke="white" strokeWidth="1.2" />
      <rect x="11" y="10" width="10" height="2" rx="1" fill="white" opacity="0.9" />
      <rect x="11" y="14" width="7" height="1.5" rx="0.75" fill="white" opacity="0.65" />
      <rect x="11" y="17.5" width="8.5" height="1.5" rx="0.75" fill="white" opacity="0.45" />
      <path d="M11 22l1.8 1.8 3-3" stroke="white" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
      <defs>
        <linearGradient id="tc-bg" x1="0" y1="0" x2="32" y2="32">
          <stop stopColor="#60a5fa" />
          <stop offset="1" stopColor="#2563eb" />
        </linearGradient>
      </defs>
    </svg>
  );
}
