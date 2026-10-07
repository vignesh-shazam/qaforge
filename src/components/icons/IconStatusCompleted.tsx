import type { IconProps } from "./icon-base";

export function IconStatusCompleted({ size = 16, className, style, ...props }: IconProps): React.JSX.Element {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" className={className} style={style} {...props}>
      <circle cx="8" cy="8" r="7" fill="#60a5fa" />
      <circle cx="8" cy="8" r="4" fill="#2563eb" />
    </svg>
  );
}
