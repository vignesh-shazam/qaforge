import type { IconProps } from "./icon-base";

export function IconSubscription({
  size = 32,
  className,
  style,
  ...props
}: IconProps): React.JSX.Element {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      className={className}
      style={style}
      {...props}
    >
      <rect width="32" height="32" rx="8" fill="url(#subscription-bg)" />

      {/* Crown */}
      <path
        d="M9 13l3.2 3.5L16 10l3.8 6.5L23 13l-1.5 8H10.5L9 13Z"
        fill="white"
        opacity="0.95"
      />

      {/* Crown base */}
      <path
        d="M10.5 21h11"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.75"
      />

      {/* Crown gems */}
      <circle cx="12" cy="13.5" r="1" fill="white" />
      <circle cx="16" cy="10.5" r="1" fill="white" />
      <circle cx="20" cy="13.5" r="1" fill="white" />

      <defs>
        <linearGradient
          id="subscription-bg"
          x1="0"
          y1="0"
          x2="32"
          y2="32"
        >
          <stop stopColor="#fbbf24" />
          <stop offset="1" stopColor="#d97706" />
        </linearGradient>
      </defs>
    </svg>
  );
}