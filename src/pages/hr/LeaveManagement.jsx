import { useEffect, useState } from "react";
import DashboardLayout from "../../components/DashboardLayout";
import api from "../../services/api";

export default function LeaveManagement() {
  const [leaves,  setLeaves]  = useState([]);
  const [stats,   setStats]   = useState({ pending: 0, on_leave_today: 0, monthly_requests: 0 });
  const [loading, setLoading] = useState(true);

  const fetchData = () => {
    setLoading(true);
    Promise.all([api.get("/leaves"), api.get("/leaves/stats")])
      .then(([lv, st]) => { setLeaves(lv.data); setStats(st.data); })
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetchData(); }, []);

  const review = async (id, action) => {
    await api.put(`/leaves/${id}/review`, { action });
    fetchData();
  };

  const statusColor = { pending: "text-amber-600 bg-amber-50", approved: "text-emerald-600 bg-emerald-50", rejected: "text-error bg-error-container/20" };
  const statusDot   = { pending: "bg-amber-600", approved: "bg-emerald-600", rejected: "bg-error" };
  const typeColor   = { vacation: "bg-indigo-50 text-indigo-700", sick: "bg-cyan-50 text-secondary", personal: "bg-slate-100 text-slate-600", maternity: "bg-pink-50 text-pink-600", unpaid: "bg-orange-50 text-orange-600" };

  return (
    <DashboardLayout>
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-extrabold text-primary tracking-tight font-headline">Leave Management</h2>
          <p className="text-on-surface-variant mt-1">Review and manage organizational time-off requests.</p>
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-64">
          <span className="material-symbols-outlined animate-spin text-4xl text-primary">progress_activity</span>
        </div>
      ) : (
        <>
          <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: "pending_actions", label: "Pending Approvals",  value: stats.pending,           color: "text-primary bg-indigo-50" },
              { icon: "group_off",       label: "On Leave Today",     value: stats.on_leave_today,    color: "text-secondary bg-cyan-50" },
              { icon: "analytics",       label: "Monthly Requests",   value: stats.monthly_requests,  color: "text-tertiary bg-orange-50" },
            ].map((s) => (
              <div key={s.label} className="bg-surface-container-lowest p-6 rounded-xl shadow-sm flex flex-col gap-4">
                <span className={`material-symbols-outlined p-2 rounded-lg w-fit ${s.color}`}>{s.icon}</span>
                <div>
                  <p className="text-on-surface-variant text-sm font-medium">{s.label}</p>
                  <h3 className="text-4xl font-extrabold mt-1">{s.value}</h3>
                </div>
              </div>
            ))}
          </section>

          <section className="bg-surface-container-lowest rounded-xl shadow-sm overflow-hidden">
            <div className="px-6 py-5 flex justify-between items-center border-b border-outline-variant/10">
              <h4 className="font-bold text-lg font-headline">All Leave Requests</h4>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-surface-container-low/50">
                  <tr>
                    {["Employee", "Leave Type", "Dates", "Duration", "Status", "Actions"].map((h) => (
                      <th key={h} className={`px-6 py-4 text-xs font-bold text-on-surface-variant uppercase tracking-wider ${h === "Actions" ? "text-right" : ""}`}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {leaves.length === 0 ? (
                    <tr><td colSpan={6} className="px-6 py-8 text-center text-on-surface-variant">No leave requests found.</td></tr>
                  ) : leaves.map((r) => (
                    <tr key={r.id} className="hover:bg-surface-container-high transition-colors group">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xs">{r.name?.charAt(0)}</div>
                          <div>
                            <p className="font-semibold text-sm">{r.name}</p>
                            <p className="text-xs text-on-surface-variant">{r.designation}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 rounded text-[11px] font-bold uppercase ${typeColor[r.leave_type] || "bg-slate-100 text-slate-600"}`}>{r.leave_type}</span>
                      </td>
                      <td className="px-6 py-4 text-sm font-medium">{r.start_date} → {r.end_date}</td>
                      <td className="px-6 py-4 text-sm text-on-surface-variant">{r.duration_days} day(s)</td>
                      <td className="px-6 py-4">
                        <span className={`flex items-center gap-1.5 text-xs font-semibold ${statusColor[r.status]} px-2.5 py-1 rounded-full w-fit capitalize`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${statusDot[r.status]}`}></span>{r.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex justify-end gap-2">
                          {r.status === "pending" ? (
                            <>
                              <button onClick={() => review(r.id, "approved")} className="p-2 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors" title="Approve">
                                <span className="material-symbols-outlined">check_circle</span>
                              </button>
                              <button onClick={() => review(r.id, "rejected")} className="p-2 text-error hover:bg-error-container/20 rounded-lg transition-colors" title="Reject">
                                <span className="material-symbols-outlined">cancel</span>
                              </button>
                            </>
                          ) : (
                            <button className="p-2 text-on-surface-variant hover:bg-surface-container rounded-lg transition-colors">
                              <span className="material-symbols-outlined">visibility</span>
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </>
      )}
    </DashboardLayout>
  );
}
