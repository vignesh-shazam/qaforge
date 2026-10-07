/**
 * Dashboard loading skeleton.
 * Shown while dashboard data is being fetched.
 * Matches actual card dimensions to prevent layout shift.
 */

function SkeletonBlock({
  className,
  style,
}: {
  className?: string;
  style?: React.CSSProperties;
}): React.JSX.Element {
  return (
    <div
      className={`rounded-xl animate-pulse ${className ?? ""}`}
      style={{ background: "rgba(255,255,255,0.06)", ...style }}
      aria-hidden="true"
    />
  );
}

export function DashboardSkeleton(): React.JSX.Element {
  return (
    <div className="flex flex-col gap-6" aria-busy="true" aria-label="Loading dashboard…">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-2">
          <SkeletonBlock style={{ width: "220px", height: "28px" }} />
          <SkeletonBlock style={{ width: "300px", height: "16px" }} />
        </div>
        <SkeletonBlock style={{ width: "120px", height: "36px" }} />
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {[0, 1, 2, 3].map((i) => (
          <SkeletonBlock key={i} style={{ height: "132px" }} />
        ))}
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <SkeletonBlock style={{ height: "300px" }} className="lg:col-span-2" />
        <SkeletonBlock style={{ height: "300px" }} />
      </div>

      {/* Bottom row */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
        <SkeletonBlock style={{ height: "340px" }} className="lg:col-span-3" />
        <SkeletonBlock style={{ height: "340px" }} className="lg:col-span-2" />
      </div>
    </div>
  );
}
