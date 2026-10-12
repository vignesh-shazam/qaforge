
import type { ReactElement } from "react";
import type { LucideIcon } from "lucide-react";
import { ArrowUpRight } from "lucide-react";

interface Props {
  title: string;
  value: string;
  change: string;
  icon: LucideIcon;
  color: "violet" | "blue" | "green" | "orange" | "pink";
}

const colors = {
  violet: "bg-violet-100 text-violet-600",
  blue: "bg-blue-100 text-blue-600",
  green: "bg-emerald-100 text-emerald-600",
  orange: "bg-orange-100 text-orange-600",
  pink: "bg-pink-100 text-pink-600",
};

export default function AdminStatCard({
  title, value, change, icon: Icon, color,
}: Props): ReactElement {
  return (
    <article className="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm transition hover:shadow-md md:p-5">
      <div className="flex items-start justify-between gap-2">
        <div className={`rounded-xl p-3 ${colors[color]}`}>
          <Icon size={22} />
        </div>
        <span className="flex items-center gap-1 text-xs font-semibold text-emerald-600">
          <ArrowUpRight size={14} /> {change}
        </span>
      </div>
      <p className="mt-4 text-sm text-slate-500">{title}</p>
      <h3 className="mt-1 text-2xl font-bold tracking-tight text-slate-900">{value}</h3>
    </article>
  );
}
