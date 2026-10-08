import type { ProjectStatus } from "@/lib/projects/types";

interface ProjectThumbnailProps {
  name: string;
  targetUrl?: string | null;
  status?: ProjectStatus;
  size?: "sm" | "md" | "lg";
}

const COLORS = ["#6366f1","#22d3ee","#f87171","#4ade80","#fbbf24","#a78bfa","#fb7185","#34d399"];

function stringToColor(str: string): string {
  let hash = 0;
  for (let i = 0; i < str.length; i++) hash = str.charCodeAt(i) + ((hash << 5) - hash);
  return COLORS[Math.abs(hash) % COLORS.length] ?? "#6366f1";
}

interface DimConfig { outer: string; text: string }

const DIMS: Record<string, DimConfig> = {
  sm: { outer: "w-10 h-10 rounded-lg",   text: "text-xs"  },
  md: { outer: "w-14 h-14 rounded-xl",   text: "text-sm"  },
  lg: { outer: "w-20 h-20 rounded-2xl",  text: "text-lg"  },
};

export function ProjectThumbnail({ name, targetUrl, size = "md" }: ProjectThumbnailProps): React.JSX.Element {
  const color = stringToColor(name);
  const initials = name.split(/\s+/).map(w => w[0]).slice(0, 2).join("").toUpperCase();
  const d: DimConfig = DIMS[size] ?? DIMS.md ?? { outer: "w-14 h-14 rounded-xl", text: "text-sm" };

  let domain = "";
  try {
    if (targetUrl) domain = new URL(targetUrl).hostname.replace("www.", "");
  } catch { /* ignore */ }

  return (
    <div
      className={`${d.outer} flex flex-col items-center justify-center shrink-0 select-none overflow-hidden`}
      style={{ background: `linear-gradient(135deg, ${color}22 0%, ${color}11 100%)`, border: `1px solid ${color}33` }}
      aria-hidden="true"
    >
      <span className={`font-bold text-white ${d.text}`}>{initials}</span>
      {domain && size === "lg" && (
        <span className="text-[9px] mt-1 opacity-50 truncate max-w-full px-1" style={{ color }}>
          {domain}
        </span>
      )}
    </div>
  );
}