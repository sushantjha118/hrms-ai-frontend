import { useEffect, useState } from "react";
import DashboardLayout from "../../components/DashboardLayout";
import { useAuth } from "../../context/AuthContext";
import api from "../../services/api";

const statusBg = {
  completed:  "bg-green-100 text-green-700",
  scheduled:  "bg-amber-100 text-amber-700",
  "in-draft": "bg-indigo-100 text-indigo-700",
};

export default function PerformanceReviews() {
  const { user }  = useAuth();
  const isHR      = user?.role === "admin" || user?.role === "hr";

  const [reviews, setReviews] = useState([]);
  const [stats,   setStats]   = useState({ total: 0, completed: 0, avg_score: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isHR) {
      Promise.all([api.get("/performance"), api.get("/performance/stats")])
        .then(([rv, st]) => { setReviews(rv.data); setStats(st.data); })
        .finally(() => setLoading(false));
    } else {
      api.get("/performance/me")
        .then((res) => setReviews(res.data))
        .finally(() => setLoading(false));
    }
  }, [isHR]);

  // Employee personal stats derived from their own reviews
  const myCompleted  = reviews.filter(r => r.status === "completed").length;
  const myScheduled  = reviews.filter(r => r.status === "scheduled").length;
  const myAvgScore   = reviews.filter(r => r.score).length
    ? (reviews.filter(r => r.score).reduce((a, r) => a + r.score, 0) / reviews.filter(r => r.score).length).toFixed(1)
    : "—";

  const statCards = isHR ? [
    { label: "Avg Team Score",     value: stats.avg_score || "—", sub: "out of 5.0",    color: "text-secondary" },
    { label: "Reviews Completed",  value: `${stats.completed}/${stats.total}`, sub: "this cycle", color: "text-primary" },
    { label: "Total Reviews",      value: stats.total,            sub: "all periods",   color: "text-tertiary" },
  ] : [
    { label: "My Avg Score",       value: myAvgScore,             sub: "out of 5.0",    color: "text-secondary" },
    { label: "Completed Reviews",  value: myCompleted,            sub: "finalized",     color: "text-primary" },
    { label: "Upcoming Reviews",   value: myScheduled,            sub: "scheduled",     color: "text-tertiary" },
  ];

  return (
    <DashboardLayout>
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-extrabold font-headline tracking-tight text-on-surface">
            {isHR ? "Performance Intelligence" : "My Performance"}
          </h2>
          <p className="text-on-surface-variant mt-1">
            {isHR ? "Reviewing organizational health and individual achievements." : "Track your performance reviews and scores."}
          </p>
        </div>
        {isHR && (
          <button className="px-5 py-2.5 bg-gradient-to-r from-primary to-primary-container text-on-primary rounded-lg font-semibold text-sm shadow-lg hover:opacity-90 transition-all">
            Schedule Review
          </button>
        )}
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-64">
          <span className="material-symbols-outlined animate-spin text-4xl text-primary">progress_activity</span>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {statCards.map((s) => (
              <div key={s.label} className="bg-surface-container-lowest p-6 rounded-xl shadow-sm">
                <p className="text-on-surface-variant text-xs font-bold uppercase tracking-widest mb-4">{s.label}</p>
                <h3 className={`text-4xl font-extrabold font-headline ${s.color}`}>{s.value}</h3>
                <p className="text-on-surface-variant text-sm mt-1">{s.sub}</p>
              </div>
            ))}
          </div>

          <div className="bg-surface-container-lowest rounded-xl overflow-hidden shadow-sm">
            <div className="p-6 border-b border-outline-variant/10">
              <h3 className="font-bold text-lg font-headline">
                {isHR ? "All Reviews" : "My Review History"}
              </h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-surface-container-low">
                  <tr>
                    {(isHR
                      ? ["Employee", "Designation", "Period", "Score", "Status", "Review Date"]
                      : ["Period", "Score", "Status", "Review Date", "Notes"]
                    ).map((h) => (
                      <th key={h} className="px-6 py-4 text-xs font-bold text-on-surface-variant tracking-widest uppercase">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant/10">
                  {reviews.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="px-6 py-12 text-center">
                        <span className="material-symbols-outlined text-4xl text-outline block mb-2">query_stats</span>
                        <p className="text-on-surface-variant font-medium">No performance reviews yet.</p>
                      </td>
                    </tr>
                  ) : reviews.map((r) => (
                    <tr key={r.id} className="hover:bg-surface-container-high transition-colors cursor-pointer">
                      {isHR && (
                        <>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xs">{r.name?.charAt(0)}</div>
                              <span className="text-sm font-semibold text-on-surface">{r.name}</span>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-sm text-on-surface-variant">{r.designation || "—"}</td>
                        </>
                      )}
                      <td className="px-6 py-4 text-sm font-semibold text-on-surface">{r.period}</td>
                      <td className="px-6 py-4">
                        <span className={`px-2.5 py-1 rounded text-xs font-bold ${r.score ? "bg-secondary-container/30 text-on-secondary-container" : "bg-surface-container text-on-surface-variant"}`}>
                          {r.score ? `${r.score} / 5` : "—"}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold capitalize ${statusBg[r.status] || "bg-surface-container text-on-surface-variant"}`}>
                          {r.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-on-surface-variant">
                        {r.review_date ? new Date(r.review_date).toLocaleDateString() : "—"}
                      </td>
                      {!isHR && (
                        <td className="px-6 py-4 text-sm text-on-surface-variant max-w-[200px] truncate">
                          {r.notes || "—"}
                        </td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Employee score breakdown */}
          {!isHR && reviews.filter(r => r.score).length > 0 && (
            <div className="bg-surface-container-lowest rounded-xl p-8 shadow-sm border border-outline-variant/10">
              <h3 className="font-headline font-bold text-lg mb-6">Score Breakdown</h3>
              <div className="space-y-4">
                {reviews.filter(r => r.score).map((r) => (
                  <div key={r.id}>
                    <div className="flex justify-between text-sm font-semibold mb-1.5">
                      <span className="text-on-surface">{r.period}</span>
                      <span className="text-primary">{r.score} / 5</span>
                    </div>
                    <div className="h-2 bg-surface-container-low rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-primary to-primary-container rounded-full transition-all duration-700"
                        style={{ width: `${(r.score / 5) * 100}%` }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </DashboardLayout>
  );
}
