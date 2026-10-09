import type { ProjectStatus } from "@/lib/projects/types";

interface StatusBadgeProps {
  status: ProjectStatus;
  size?: "sm" | "md";
}

const config: Record<ProjectStatus, { color: string; bg: string; border: string; dot: string }> = {
  Active:   { color: "#4ade80", bg: "rgba(22,163,74,0.15)",   border: "rgba(34,197,94,0.45)",  dot: "#4ade80" },
  Draft:    { color: "#fbbf24", bg: "rgba(180,83,9,0.15)",    border: "rgba(245,158,11,0.45)", dot: "#fbbf24" },
  Archived: { color: "#fb923c", bg: "rgba(194,65,12,0.15)",   border: "rgba(251,146,60,0.45)", dot: "#fb923c" },
  Testing:  { color: "#60a5fa", bg: "rgba(29,78,216,0.15)",   border: "rgba(96,165,250,0.45)", dot: "#60a5fa" },
  Planned:  { color: "#a78bfa", bg: "rgba(109,40,217,0.15)",  border: "rgba(167,139,250,0.45)", dot: "#a78bfa" },
};

export function StatusBadge({ status, size = "sm" }: StatusBadgeProps): React.JSX.Element {
  const c = config[status] ?? config.Draft;
  const padding = size === "md" ? "px-3 py-1" : "px-2.5 py-0.5";
  const fontSize = size === "md" ? "text-xs" : "text-[11px]";
  return (
    <span
      className={`inline-flex items-center gap-1.5 font-semibold rounded-full ${padding} ${fontSize}`}
      style={{ color: c.color, background: c.bg, border: `1px solid ${c.border}` }}
    >
      <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: c.dot }} aria-hidden="true" />
      {status}
    </span>
  );
}