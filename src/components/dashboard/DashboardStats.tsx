import { StatCard } from "./StatCard";
import type { DashboardStats as DashboardStatsType } from "@/lib/dashboard/types";

interface DashboardStatsProps {
  stats: DashboardStatsType;
}

export function DashboardStats({ stats }: DashboardStatsProps): React.JSX.Element {
  return (
    <section aria-labelledby="stats-heading">
      <h2 id="stats-heading" className="sr-only">Overview statistics</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <StatCard stat={stats.totalProjects} />
        <StatCard stat={stats.testCases} />
        <StatCard stat={stats.openBugs} />
        <StatCard stat={stats.automationRuns} />
      </div>
    </section>
  );
}
