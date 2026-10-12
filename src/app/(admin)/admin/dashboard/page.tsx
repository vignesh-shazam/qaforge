
import type { ReactElement } from "react";
import Link from "next/link";
import {
  Activity, ArrowRight, Bot, BriefcaseBusiness, CalendarDays,
  CheckCircle2, Folder, MessageSquare, Play, Users,
} from "lucide-react";
import AdminStatCard from "@/components/admin/AdminStatCard";

const registrations = [
  { name: "Siddharth", email: "siddharth@example.com", projects: 3, date: "12 Oct 2026" },
  { name: "Priya Sharma", email: "priya@example.com", projects: 1, date: "12 Oct 2026" },
  { name: "Arjun Kumar", email: "arjun@example.com", projects: 5, date: "11 Oct 2026" },
  { name: "Neha Reddy", email: "neha@example.com", projects: 2, date: "11 Oct 2026" },
];

const projects = [
  { name: "ECommerce App", owner: "Siddharth", status: "Active" },
  { name: "Banking Portal", owner: "Priya", status: "Active" },
  { name: "Travel Booking", owner: "Arjun", status: "Running" },
  { name: "Learning Platform", owner: "Neha", status: "Active" },
];

const conversations = [
  { name: "Amit Patel", message: "Unable to log in to my account", type: "Bug", time: "2h ago" },
  { name: "Sneha Iyer", message: "How to run tests in parallel?", type: "Support", time: "5h ago" },
  { name: "Ramesh Kumar", message: "Project creation error", type: "Bug", time: "1d ago" },
  { name: "Pooja Verma", message: "Need help with AI usage limits", type: "Question", time: "1d ago" },
];

function Panel({
  title,
  href,
  children,
}: {
  title: string;
  href?: string;
  children: React.ReactNode;
}): ReactElement {
  return (
    <section className="min-w-0 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="flex items-center justify-between gap-3 border-b border-slate-100 px-5 py-4">
        <h2 className="text-sm font-bold text-slate-900">{title}</h2>
        {href && (
          <Link href={href} className="shrink-0 text-xs font-semibold text-violet-600 hover:text-violet-800">
            View All
          </Link>
        )}
      </div>
      {children}
    </section>
  );
}

function ChartBars(): ReactElement {
  const values = [72, 52, 43, 25];
  const labels = ["GPT-4o", "Claude", "Gemini", "Other"];

  return (
    <div className="flex 43.75 items-end justify-around gap-4 px-5 pb-7 pt-4">
      {values.map((value, i) => (
        <div key={labels[i]} className="flex h-full flex-1 flex-col items-center justify-end gap-2">
          <div className="flex w-full flex-1 items-end justify-center">
            <div
              className="w-full max-w-12 rounded-t-md bg-violet-500 transition-all hover:bg-violet-700"
              style={{ height: `${value}%` }}
              title={`${labels[i]}: illustrative usage`}
            />
          </div>
          <span className="text-[11px] text-slate-500">{labels[i]}</span>
        </div>
      ))}
    </div>
  );
}

function ExecutionChart(): ReactElement {
  return (
    <div className="p-5">
      <div className="flex h-43.75 items-center justify-center">
        <div className="relative flex h-36 w-36 items-center justify-center rounded-full"
          style={{ background: "conic-gradient(#22c55e 0deg 266deg, #ef4444 266deg 327deg, #f59e0b 327deg 352deg, #94a3b8 352deg 360deg)" }}>
          <div className="flex h-24 w-24 flex-col items-center justify-center rounded-full bg-white">
            <span className="text-xl font-bold text-slate-900">—</span>
            <span className="text-[10px] text-slate-500">Sample chart</span>
          </div>
        </div>
      </div>
      <p className="text-center text-xs text-slate-500">Connect real test execution data to display results.</p>
    </div>
  );
}

export default function AdminOverviewPage(): ReactElement {
  return (
    <div className="space-y-6">
      <section className="flex flex-col justify-between gap-4 xl:flex-row xl:items-center">
        <div>
          <p className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-violet-600">
            <Activity size={15} /> Platform control center
          </p>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 md:text-3xl">
            Dashboard
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Overview of your QAForge platform
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-600">
            <CalendarDays size={17} />
            <span>Last 30 days</span>
          </div>
          <span className="rounded-xl bg-violet-600 px-4 py-3 text-xs font-semibold text-white">
            Owner Console
          </span>
        </div>
      </section>

      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 2xl:grid-cols-5">
        <AdminStatCard title="Total Users" value="—" change="Live data pending" icon={Users} color="violet" />
        <AdminStatCard title="Total Projects" value="—" change="Live data pending" icon={Folder} color="blue" />
        <AdminStatCard title="Test Executions" value="—" change="Live data pending" icon={Play} color="green" />
        <AdminStatCard title="AI Requests" value="—" change="Live data pending" icon={Bot} color="orange" />
        <AdminStatCard title="Revenue (INR)" value="—" change="Billing not connected" icon={BriefcaseBusiness} color="pink" />
      </section>

      <section className="grid grid-cols-1 gap-5 xl:grid-cols-3">
        <Panel title="User Growth">
          <div className="p-5">
            <div className="flex h-42.5 items-end justify-between gap-2 border-b border-l border-slate-200 px-3 pb-2">
              {[25, 31, 30, 43, 48, 54, 50, 63, 70, 80, 91].map((h, i) => (
                <div key={i} className="flex h-full flex-1 items-end">
                  <div className="w-full rounded-t bg-violet-400/80" style={{ height: `${h}%` }} />
                </div>
              ))}
            </div>
            <p className="mt-3 text-center text-xs text-slate-500">Illustrative trend — live data pending</p>
          </div>
        </Panel>

        <Panel title="Test Execution Summary">
          <ExecutionChart />
        </Panel>

        <Panel title="AI Usage by Model">
          <ChartBars />
          <p className="px-5 pb-4 text-center text-xs text-slate-500">Illustrative distribution — usage data pending</p>
        </Panel>
      </section>

      <section className="grid grid-cols-1 gap-5 2xl:grid-cols-3">
        <Panel title="Recent User Registrations" href="/admin/users">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500">
                <tr>
                  <th className="px-4 py-3 font-medium">User</th>
                  <th className="px-4 py-3 font-medium">Projects</th>
                  <th className="px-4 py-3 font-medium">Joined</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {registrations.map((user) => (
                  <tr key={user.email}>
                    <td className="px-4 py-3">
                      <p className="font-semibold text-slate-800">{user.name}</p>
                      <p className="mt-1 text-slate-500">{user.email}</p>
                    </td>
                    <td className="px-4 py-3 text-slate-600">{user.projects}</td>
                    <td className="whitespace-nowrap px-4 py-3 text-slate-500">{user.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Panel>

        <Panel title="Recent Projects" href="/admin/projects">
          <div className="divide-y divide-slate-100">
            {projects.map((project) => (
              <div key={project.name} className="flex items-center gap-3 px-5 py-4">
                <div className="rounded-lg bg-violet-50 p-2 text-violet-600">
                  <Folder size={17} />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-xs font-semibold text-slate-800">{project.name}</p>
                  <p className="mt-1 text-xs text-slate-500">Owner: {project.owner}</p>
                </div>
                <span className={`rounded-full px-2 py-1 text-[10px] font-semibold ${
                  project.status === "Running" ? "bg-blue-50 text-blue-700" : "bg-emerald-50 text-emerald-700"
                }`}>{project.status}</span>
              </div>
            ))}
          </div>
        </Panel>

        <Panel title="Recent Support & Conversations" href="/admin/support">
          <div className="divide-y divide-slate-100">
            {conversations.map((conversation) => (
              <Link
                href="/admin/support"
                key={conversation.name}
                className="flex items-start gap-3 px-4 py-4 transition hover:bg-slate-50"
              >
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-violet-100 text-xs font-bold text-violet-700">
                  {conversation.name.charAt(0)}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center justify-between gap-1">
                    <p className="text-xs font-semibold text-slate-800">{conversation.name}</p>
                    <span className="text-[10px] text-slate-400">{conversation.time}</span>
                  </div>
                  <p className="mt-1 truncate text-xs text-slate-500">{conversation.message}</p>
                  <span className="mt-2 inline-block rounded-md bg-violet-50 px-2 py-1 text-[10px] font-medium text-violet-700">
                    {conversation.type}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </Panel>
      </section>

      <section className="flex flex-col gap-3 rounded-2xl border border-violet-100 bg-linear-to-r from-violet-50 to-white p-5 sm:flex-row sm:items-center">
        <div className="rounded-xl bg-white p-3 text-violet-600 shadow-sm">
          <MessageSquare size={22} />
        </div>
        <div className="flex-1">
          <h2 className="font-semibold text-slate-900">Support needs your attention</h2>
          <p className="mt-1 text-sm text-slate-500">
            Connect the support inbox to help users directly from the owner console.
          </p>
        </div>
        <Link href="/admin/support" className="inline-flex items-center justify-center gap-2 rounded-xl bg-violet-600 px-4 py-3 text-sm font-semibold text-white hover:bg-violet-700">
          Open Support Inbox <ArrowRight size={16} />
        </Link>
      </section>

      <div className="flex items-center justify-center gap-2 pb-2 text-xs text-slate-400">
        <CheckCircle2 size={14} />
        QAForge Owner Console · UI foundation
      </div>
    </div>
  );
}
