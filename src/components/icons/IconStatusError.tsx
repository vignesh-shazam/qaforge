import type { IconProps } from "./icon-base";

export function IconStatusError({ size = 16, className, style, ...props }: IconProps): React.JSX.Element {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" className={className} style={style} {...props}>
      <circle cx="8" cy="8" r="7" fill="#f87171" />
      <circle cx="8" cy="8" r="4" fill="#dc2626" />
    </svg>
  );
}
