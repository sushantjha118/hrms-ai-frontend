import { useEffect, useState } from "react";
import DashboardLayout from "../../components/DashboardLayout";
import { SkeletonStatCardTall, SkeletonTable, SkeletonFeedItem, SkeletonText, SkeletonBox } from "../../components/Skeleton";
import api from "../../services/api";

export default function HROverview() {
  const [leaveStats, setLeaveStats] = useState({ pending: 0, on_leave_today: 0 });
  const [jobStats,   setJobStats]   = useState({ open_jobs: 0, total_applications: 0, interviewing: 0 });
  const [leaves,     setLeaves]     = useState([]);
  const [apps,       setApps]       = useState([]);
  const [loading,    setLoading]    = useState(true);

  useEffect(() => {
    Promise.all([
      api.get("/leaves/stats"),
      api.get("/recruitment/jobs/stats"),
      api.get("/leaves?status=pending"),
      api.get("/recruitment/applications?status=shortlisted"),
    ]).then(([ls, js, lv, ap]) => {
      setLeaveStats(ls.data);
      setJobStats(js.data);
      setLeaves(lv.data.slice(0, 3));
      setApps(ap.data.slice(0, 3));
    }).finally(() => setLoading(false));
  }, []);

  const stats = [
    { icon: "event_busy",  iconBg: "bg-indigo-50 text-indigo-600", label: "Pending Leaves",    value: leaveStats.pending,           sub: "Action Required" },
    { icon: "person_add",  iconBg: "bg-cyan-50 text-secondary",    label: "Total Applications", value: jobStats.total_applications,  sub: "In Pipeline" },
    { icon: "video_chat",  iconBg: "bg-orange-50 text-tertiary",   label: "Interviewing",       value: jobStats.interviewing,        sub: "Active Interviews" },
  ];

  return (
    <DashboardLayout>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-on-surface mb-2 font-headline">HR Dashboard Overview</h2>
          <p className="text-on-surface-variant">Here's what needs your attention today.</p>
        </div>
      </div>

      {loading ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {Array.from({ length: 3 }).map((_, i) => <SkeletonStatCardTall key={i} />)}
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {Array.from({ length: 2 }).map((_, i) => (
              <div key={i} className="bg-surface-container-lowest rounded-xl p-8 shadow-sm space-y-4">
                <SkeletonText className="h-5 w-40" />
                {Array.from({ length: 3 }).map((_, j) => (
                  <div key={j} className="flex items-center gap-3 p-4 rounded-xl bg-surface-container-low">
                    <div className="w-9 h-9 rounded-full bg-surface-container-high animate-pulse flex-shrink-0" />
                    <div className="flex-1 space-y-1.5">
                      <SkeletonText className="h-3 w-28" />
                      <SkeletonText className="h-2.5 w-20" />
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {stats.map((s) => (
              <div key={s.label} className="bg-surface-container-lowest p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-4">
                  <div className={`p-2 rounded-lg ${s.iconBg}`}>
                    <span className="material-symbols-outlined">{s.icon}</span>
                  </div>
                </div>
                <p className="text-on-surface-variant text-sm font-medium mb-1">{s.label}</p>
                <h3 className="text-4xl font-extrabold tracking-tight text-on-surface">{s.value}</h3>
                <div className="mt-4 pt-4 border-t border-outline-variant/10">
                  <span className="text-[10px] text-on-surface-variant uppercase tracking-wider font-bold">{s.sub}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-surface-container-lowest rounded-xl p-8 shadow-sm">
              <h3 className="text-lg font-bold text-on-surface font-headline mb-6">Pending Leave Requests</h3>
              {leaves.length === 0 ? (
                <p className="text-on-surface-variant text-sm">No pending leave requests.</p>
              ) : (
                <div className="space-y-4">
                  {leaves.map((l) => (
                    <div key={l.id} className="flex items-center justify-between p-4 rounded-xl bg-surface-container-low">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xs">
                          {l.name?.charAt(0)}
                        </div>
                        <div>
                          <p className="text-sm font-bold text-on-surface">{l.name}</p>
                          <p className="text-xs text-on-surface-variant capitalize">{l.leave_type} • {l.duration_days} day(s)</p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button onClick={() => api.put(`/leaves/${l.id}/review`, { action: "approved" })}
                          className="p-2 text-secondary hover:bg-secondary/10 rounded-lg transition-colors">
                          <span className="material-symbols-outlined">check_circle</span>
                        </button>
                        <button onClick={() => api.put(`/leaves/${l.id}/review`, { action: "rejected" })}
                          className="p-2 text-error hover:bg-error-container/20 rounded-lg transition-colors">
                          <span className="material-symbols-outlined">cancel</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="bg-surface-container-lowest rounded-xl p-8 shadow-sm">
              <h3 className="text-lg font-bold text-on-surface font-headline mb-6">Recent Shortlisted Candidates</h3>
              {apps.length === 0 ? (
                <p className="text-on-surface-variant text-sm">No shortlisted candidates.</p>
              ) : (
                <div className="space-y-4">
                  {apps.map((a) => (
                    <div key={a.id} className="flex items-center justify-between group cursor-pointer">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-surface-container-low flex items-center justify-center text-on-surface-variant">
                          <span className="material-symbols-outlined">person</span>
                        </div>
                        <div>
                          <p className="text-sm font-bold text-on-surface">{a.candidate_name}</p>
                          <p className="text-xs text-on-surface-variant">{a.job_title} • <span className="text-primary capitalize">{a.status}</span></p>
                        </div>
                      </div>
                      <p className="text-[10px] font-bold text-tertiary uppercase">AI: {a.ai_score}%</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </DashboardLayout>
  );
}
