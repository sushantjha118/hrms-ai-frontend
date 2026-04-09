import { useEffect, useState } from "react";
import DashboardLayout from "../../components/DashboardLayout";
import { useAuth } from "../../context/AuthContext";
import api from "../../services/api";

const quickActions = [
  { icon: "event_note",  label: "Apply Leave" },
  { icon: "payments",    label: "Salary Slip" },
  { icon: "forum",       label: "Feedback" },
  { icon: "query_stats", label: "My Reviews" },
];

export default function EmployeePortal() {
  const { user }  = useAuth();
  const [profile,  setProfile]  = useState(null);
  const [leaves,   setLeaves]   = useState([]);
  const [reviews,  setReviews]  = useState([]);
  const [announce, setAnnounce] = useState([]);
  const [attend,   setAttend]   = useState([]);
  const [loading,  setLoading]  = useState(true);

  useEffect(() => {
    Promise.all([
      api.get("/employees/me"),
      api.get("/leaves/me"),
      api.get("/performance/me"),
      api.get("/announcements"),
      api.get("/attendance/me"),
    ]).then(([pr, lv, rv, an, at]) => {
      setProfile(pr.data);
      setLeaves(lv.data);
      setReviews(rv.data);
      setAnnounce(an.data.slice(0, 3));
      setAttend(at.data.slice(0, 30));
    }).catch(() => {}).finally(() => setLoading(false));
  }, []);

  const presentDays  = attend.filter(a => a.status === "present" || a.status === "late").length;
  const pendingLeave = leaves.filter(l => l.status === "pending").length;
  const latestReview = reviews[0];
  const remainLeave  = leaves.filter(l => l.status === "approved").reduce((acc, l) => acc + l.duration_days, 0);

  return (
    <DashboardLayout>
      <div className="mb-4 flex items-end justify-between">
        <div>
          <h2 className="text-3xl font-extrabold tracking-tight text-on-surface mb-2 font-headline">
            Welcome back, {user?.name?.split(" ")[0]}
          </h2>
          <p className="text-on-surface-variant flex items-center gap-2">
            <span className="material-symbols-outlined text-secondary text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
            {profile?.designation || "Employee"} • {profile?.department || ""}
          </p>
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-64">
          <span className="material-symbols-outlined animate-spin text-4xl text-primary">progress_activity</span>
        </div>
      ) : (
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 lg:col-span-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-surface-container-lowest p-6 rounded-xl shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <span className="p-2 bg-indigo-50 text-primary rounded-lg"><span className="material-symbols-outlined">event_available</span></span>
                <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">Last 30 days</span>
              </div>
              <div>
                <p className="text-on-surface-variant text-sm font-medium mb-1">Days Present</p>
                <div className="flex items-baseline gap-2">
                  <h3 className="text-3xl font-extrabold text-on-surface">{presentDays}</h3>
                  <span className="text-on-surface-variant text-sm font-medium">/ {attend.length} Days</span>
                </div>
              </div>
            </div>

            <div className="bg-surface-container-lowest p-6 rounded-xl shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <span className="p-2 bg-amber-50 text-amber-600 rounded-lg"><span className="material-symbols-outlined">travel</span></span>
                <span className="text-[10px] font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full">{pendingLeave} Pending</span>
              </div>
              <div>
                <p className="text-on-surface-variant text-sm font-medium mb-1">Leave Requests</p>
                <div className="flex items-baseline gap-2">
                  <h3 className="text-3xl font-extrabold text-on-surface">{leaves.length}</h3>
                  <span className="text-on-surface-variant text-sm font-medium">Total</span>
                </div>
              </div>
            </div>

            <div className="bg-surface-container-lowest p-6 rounded-xl shadow-sm flex flex-col justify-between border-l-4 border-primary hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <span className="p-2 bg-secondary-container text-on-secondary-container rounded-lg">
                  <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>psychology</span>
                </span>
                <span className="text-[10px] font-bold text-secondary bg-secondary/10 px-2 py-0.5 rounded-full">AI Analysis</span>
              </div>
              <div>
                <p className="text-on-surface-variant text-sm font-medium mb-1">Latest Review Score</p>
                <div className="flex items-center gap-3">
                  <h3 className="text-3xl font-extrabold text-on-surface tracking-tight">
                    {latestReview?.score ? `${latestReview.score}/5` : "—"}
                  </h3>
                  {latestReview?.status && (
                    <span className="text-[10px] font-bold text-secondary bg-secondary/10 px-2 py-1 rounded-md uppercase">{latestReview.status}</span>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="col-span-12 lg:col-span-4 bg-surface-container-lowest p-6 rounded-xl shadow-sm border border-outline-variant/10 flex flex-col">
            <h3 className="text-lg font-bold text-on-surface mb-4 flex items-center gap-2 font-headline">
              <span className="material-symbols-outlined text-primary">bolt</span>Quick Actions
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {quickActions.map((a) => (
                <button key={a.label} className="flex flex-col items-center justify-center p-4 rounded-xl bg-surface-container-low hover:bg-primary/5 hover:text-primary transition-all border border-transparent hover:border-primary/10 group">
                  <span className="material-symbols-outlined mb-2 text-on-surface-variant group-hover:text-primary">{a.icon}</span>
                  <span className="text-xs font-bold">{a.label}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="col-span-12 lg:col-span-5 bg-surface-container-lowest p-6 rounded-xl shadow-sm border border-outline-variant/10">
            <h3 className="text-lg font-bold text-on-surface font-headline mb-4">My Leave History</h3>
            {leaves.length === 0 ? (
              <p className="text-on-surface-variant text-sm">No leave requests yet.</p>
            ) : (
              <div className="space-y-3">
                {leaves.slice(0, 4).map((l) => (
                  <div key={l.id} className="flex items-center justify-between p-3 rounded-xl bg-surface-container-low">
                    <div>
                      <p className="text-sm font-bold text-on-surface capitalize">{l.leave_type}</p>
                      <p className="text-xs text-on-surface-variant">{l.start_date} → {l.end_date}</p>
                    </div>
                    <span className={`text-xs font-bold px-2 py-1 rounded-full capitalize ${l.status === "approved" ? "text-emerald-600 bg-emerald-50" : l.status === "rejected" ? "text-error bg-error-container/20" : "text-amber-600 bg-amber-50"}`}>
                      {l.status}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="col-span-12 lg:col-span-7 bg-surface-container-lowest p-6 rounded-xl shadow-sm border border-outline-variant/10 flex flex-col">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-on-surface font-headline">Announcements</h3>
            </div>
            <div className="space-y-5">
              {announce.map((a) => (
                <div key={a.id} className="flex gap-4 group">
                  <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-primary/5 flex items-center justify-center text-primary">
                    <span className="material-symbols-outlined text-2xl">campaign</span>
                  </div>
                  <div className="flex-1 border-b border-outline-variant/10 pb-4">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[10px] font-extrabold uppercase tracking-widest text-primary">{a.category}</span>
                      <span className="text-xs text-on-surface-variant">{new Date(a.created_at).toLocaleDateString()}</span>
                    </div>
                    <h4 className="font-bold text-on-surface group-hover:text-primary transition-colors">{a.title}</h4>
                    <p className="text-sm text-on-surface-variant line-clamp-1 mt-1">{a.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
