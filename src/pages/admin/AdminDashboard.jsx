import { useEffect, useState } from "react";
import DashboardLayout from "../../components/DashboardLayout";
import { SkeletonStatCard, SkeletonText, SkeletonBox, SkeletonFeedItem } from "../../components/Skeleton";
import api from "../../services/api";

export default function AdminDashboard() {
  const [empStats,   setEmpStats]   = useState({ total: 0, active: 0 });
  const [leaveStats, setLeaveStats] = useState({ pending: 0 });
  const [jobStats,   setJobStats]   = useState({ open_jobs: 0 });
  const [perfStats,  setPerfStats]  = useState({ avg_score: 0 });
  const [activities, setActivities] = useState([]);
  const [depts,      setDepts]      = useState([]);
  const [loading,    setLoading]    = useState(true);

  useEffect(() => {
    Promise.all([
      api.get("/employees/stats"),
      api.get("/leaves/stats"),
      api.get("/recruitment/jobs/stats"),
      api.get("/performance/stats"),
      api.get("/departments"),
      api.get("/announcements"),
    ]).then(([emp, leave, job, perf, dept, ann]) => {
      setEmpStats(emp.data);
      setLeaveStats(leave.data);
      setJobStats(job.data);
      setPerfStats(perf.data);
      setDepts(dept.data.slice(0, 4));
      setActivities(ann.data.slice(0, 4));
    }).finally(() => setLoading(false));
  }, []);

  const stats = [
    { icon: "groups",      bg: "bg-primary-container/10 text-primary",    label: "Total Employees", value: empStats.total,          badge: `${empStats.active} Active`, badgeColor: "text-green-600 bg-green-50" },
    { icon: "work",        bg: "bg-secondary-container/20 text-secondary", label: "Open Jobs",       value: jobStats.open_jobs,       badge: "Active",                    badgeColor: "text-indigo-600 bg-indigo-50" },
    { icon: "event_busy",  bg: "bg-tertiary-container/10 text-tertiary",   label: "Pending Leaves",  value: leaveStats.pending,       badge: "Action Required",           badgeColor: "text-error bg-error-container/20" },
    { icon: "query_stats", bg: "bg-primary/10 text-primary",               label: "Avg Perf Score",  value: perfStats.avg_score || 0, badge: "/ 5.0",                     badgeColor: "text-green-600 bg-green-50" },
  ];

  const deptColors = ["bg-primary", "bg-secondary", "bg-primary-container", "bg-tertiary-container"];
  const deptPcts   = [42, 25, 18, 15];

  return (
    <DashboardLayout>
      <section>
        <h2 className="text-3xl font-extrabold font-headline tracking-tight text-on-surface mb-1">Admin Dashboard</h2>
        <p className="text-on-surface-variant font-medium">Here's your workforce summary.</p>
      </section>

      {/* Stat Cards */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {loading
          ? Array.from({ length: 4 }).map((_, i) => <SkeletonStatCard key={i} />)
          : stats.map((s) => (
            <div key={s.label} className="bg-surface-container-lowest px-5 py-4 rounded-xl shadow-sm flex items-center gap-4">
              <div className={`p-2.5 ${s.bg} rounded-xl flex-shrink-0`}>
                <span className="material-symbols-outlined text-xl">{s.icon}</span>
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-xs font-semibold text-on-surface-variant truncate">{s.label}</h3>
                <p className="text-2xl font-extrabold font-headline tracking-tighter text-on-surface leading-tight">{s.value}</p>
              </div>
              <span className={`text-xs font-bold px-2 py-1 rounded-full flex-shrink-0 ${s.badgeColor}`}>{s.badge}</span>
            </div>
          ))
        }
      </section>

      {/* Dept Overview + AI Insight */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-surface-container-lowest p-8 rounded-xl shadow-sm">
          <h3 className="text-lg font-bold font-headline mb-6">Department Overview</h3>
          {loading ? (
            <div className="space-y-5">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="space-y-2">
                  <div className="flex justify-between">
                    <SkeletonText className="h-3 w-24" />
                    <SkeletonText className="h-3 w-8" />
                  </div>
                  <SkeletonBox className="h-2 w-full rounded-full" />
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-5">
              {depts.map((d, i) => (
                <div key={d.id} className="space-y-2">
                  <div className="flex justify-between text-xs font-bold text-on-surface-variant">
                    <span>{d.name}</span><span>{deptPcts[i] || 20}%</span>
                  </div>
                  <div className="h-2 w-full bg-surface-container-low rounded-full overflow-hidden">
                    <div className={`h-full ${deptColors[i]} rounded-full`} style={{ width: `${deptPcts[i] || 20}%` }}></div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="bg-gradient-to-br from-slate-900 to-indigo-950 p-8 rounded-xl shadow-xl text-white relative overflow-hidden flex flex-col justify-between">
          <div className="absolute top-0 right-0 w-32 h-32 bg-secondary opacity-20 blur-3xl rounded-full"></div>
          <div>
            <div className="flex items-center gap-2 mb-6">
              <div className="w-2 h-2 bg-secondary-container rounded-full animate-pulse"></div>
              <span className="text-[10px] uppercase tracking-widest font-bold text-secondary-container">AI Live Insight</span>
            </div>
            {loading ? (
              <div className="space-y-3">
                <SkeletonBox className="h-5 w-40 bg-white/10" />
                <SkeletonBox className="h-3 w-full bg-white/10" />
                <SkeletonBox className="h-3 w-5/6 bg-white/10" />
                <SkeletonBox className="h-16 w-full rounded-xl bg-white/10 mt-4" />
              </div>
            ) : (
              <>
                <h4 className="text-xl font-headline font-bold mb-4">Workforce Health</h4>
                <p className="text-indigo-100 text-sm leading-relaxed mb-6">
                  {empStats.active} of {empStats.total} employees are currently active.
                  Average performance score is <span className="font-bold text-white">{perfStats.avg_score}/5.0</span>.
                </p>
                <div className="bg-white/10 ai-glow p-4 rounded-xl backdrop-blur-sm">
                  <p className="text-xs font-semibold mb-2">Recommended Action:</p>
                  <p className="text-xs text-indigo-100 italic">
                    "Review {leaveStats.pending} pending leave requests and schedule upcoming performance reviews."
                  </p>
                </div>
              </>
            )}
          </div>
          <button className="mt-8 py-3 rounded-lg bg-secondary-container text-on-secondary-container font-headline font-bold text-xs uppercase tracking-widest hover:bg-white transition-colors">
            Deep Dive Analysis
          </button>
        </div>
      </section>

      {/* Announcements */}
      <section className="bg-surface-container-lowest p-8 rounded-xl shadow-sm">
        <h3 className="text-lg font-bold font-headline mb-6">Recent Announcements</h3>
        {loading ? (
          <div className="space-y-6">
            {Array.from({ length: 4 }).map((_, i) => <SkeletonFeedItem key={i} />)}
          </div>
        ) : (
          <div className="space-y-6">
            {activities.map((a, i) => (
              <div key={i} className="flex items-center gap-4 group">
                <div className="w-10 h-10 rounded-full bg-surface-container-low flex items-center justify-center text-on-surface-variant group-hover:bg-primary-fixed group-hover:text-primary transition-colors">
                  <span className="material-symbols-outlined">campaign</span>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold">{a.title}</p>
                  <p className="text-[10px] text-on-surface-variant font-medium">{a.category} • {new Date(a.created_at).toLocaleDateString()}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </DashboardLayout>
  );
}
