import type { ProjectStatus } from "@/lib/projects/types";

interface StatusBadgeProps {
  status: ProjectStatus;
  size?: "sm" | "md";
}

const config: Record<ProjectStatus, { color: string; bg: string; border: string; dot: string }> = {
  Active:   { color: "#4ade80", bg: "rgba(74,222,128,0.12)",  border: "rgba(74,222,128,0.3)",  dot: "#4ade80" },
  Draft:    { color: "#fbbf24", bg: "rgba(251,191,36,0.12)",  border: "rgba(251,191,36,0.3)",  dot: "#fbbf24" },
  Archived: { color: "#94a3b8", bg: "rgba(148,163,184,0.12)", border: "rgba(148,163,184,0.3)", dot: "#94a3b8" },
};

export function StatusBadge({ status, size = "sm" }: StatusBadgeProps): React.JSX.Element {
  const c = config[status];
  const padding = size === "md" ? "px-2.5 py-1" : "px-2 py-0.5";
  const fontSize = size === "md" ? "text-xs" : "text-[10px]";
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