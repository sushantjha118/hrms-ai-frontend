import { useEffect, useState } from "react";
import DashboardLayout from "../../components/DashboardLayout";
import api from "../../services/api";

export default function PerformanceReviews() {
  const [reviews, setReviews] = useState([]);
  const [stats,   setStats]   = useState({ total: 0, completed: 0, avg_score: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([api.get("/performance"), api.get("/performance/stats")])
      .then(([rv, st]) => { setReviews(rv.data); setStats(st.data); })
      .finally(() => setLoading(false));
  }, []);

  const statusBg = { completed: "bg-green-100 text-green-700", scheduled: "bg-amber-100 text-amber-700", "in-draft": "bg-indigo-100 text-indigo-700" };

  return (
    <DashboardLayout>
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-extrabold font-headline tracking-tight text-on-surface">Performance Intelligence</h2>
          <p className="text-on-surface-variant mt-1">Reviewing organizational health and individual achievements.</p>
        </div>
        <button className="px-5 py-2.5 bg-gradient-to-r from-primary to-primary-container text-on-primary rounded-lg font-semibold text-sm shadow-lg hover:opacity-90 transition-all">
          Schedule Review
        </button>
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-64">
          <span className="material-symbols-outlined animate-spin text-4xl text-primary">progress_activity</span>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { label: "Team Health Score", value: stats.avg_score || 0, sub: "Avg out of 5.0", color: "text-secondary" },
              { label: "Reviews Completed",  value: `${stats.completed}/${stats.total}`, sub: "This cycle", color: "text-primary" },
              { label: "Total Reviews",      value: stats.total, sub: "All periods", color: "text-tertiary" },
            ].map((s) => (
              <div key={s.label} className="bg-surface-container-lowest p-6 rounded-xl shadow-sm">
                <p className="text-on-surface-variant text-xs font-bold uppercase tracking-widest mb-4">{s.label}</p>
                <h3 className={`text-4xl font-extrabold font-headline ${s.color}`}>{s.value}</h3>
                <p className="text-on-surface-variant text-sm mt-1">{s.sub}</p>
              </div>
            ))}
          </div>

          <div className="bg-surface-container-lowest rounded-xl overflow-hidden shadow-sm">
            <div className="p-6 flex justify-between items-center border-b border-outline-variant/10">
              <h3 className="font-bold text-lg font-headline">All Reviews</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-surface-container-low">
                  <tr>
                    {["Employee", "Designation", "Period", "Score", "Status", "Review Date"].map((h) => (
                      <th key={h} className="px-6 py-4 text-xs font-bold text-on-surface-variant tracking-widest uppercase">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant/10">
                  {reviews.length === 0 ? (
                    <tr><td colSpan={6} className="px-6 py-8 text-center text-on-surface-variant">No reviews found.</td></tr>
                  ) : reviews.map((r) => (
                    <tr key={r.id} className="hover:bg-surface-container-high transition-colors cursor-pointer">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xs">{r.name?.charAt(0)}</div>
                          <span className="text-sm font-semibold text-on-surface">{r.name}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-on-surface-variant">{r.designation}</td>
                      <td className="px-6 py-4 text-sm text-on-surface-variant">{r.period}</td>
                      <td className="px-6 py-4">
                        <span className={`px-2.5 py-1 rounded text-xs font-bold ${r.score ? "bg-secondary-container/30 text-on-secondary-container" : "bg-surface-container text-on-surface-variant"}`}>
                          {r.score ? `${r.score}/5` : "—"}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold capitalize ${statusBg[r.status] || "bg-surface-container text-on-surface-variant"}`}>{r.status}</span>
                      </td>
                      <td className="px-6 py-4 text-sm text-on-surface-variant">{r.review_date ? new Date(r.review_date).toLocaleDateString() : "—"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </DashboardLayout>
  );
}
