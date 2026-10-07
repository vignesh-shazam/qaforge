import type { IconProps } from "./icon-base";

export function IconProjects({ size = 32, className, style, ...props }: IconProps): React.JSX.Element {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" className={className} style={style} {...props}>
      <rect width="32" height="32" rx="8" fill="url(#proj-bg)" />
      <path d="M6 12h20v13a2 2 0 01-2 2H8a2 2 0 01-2-2V12Z" fill="white" opacity="0.85" />
      <path d="M6 12l3-5h8l3 5H6Z" fill="white" />
      <defs>
        <linearGradient id="proj-bg" x1="0" y1="0" x2="32" y2="32">
          <stop stopColor="#a78bfa" />
          <stop offset="1" stopColor="#7c3aed" />
        </linearGradient>
      </defs>
    </svg>
  );
}
