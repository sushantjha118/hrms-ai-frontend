import { useEffect, useState } from "react";
import DashboardLayout from "../../components/DashboardLayout";
import { useAuth } from "../../context/AuthContext";
import { SkeletonStatCardTall, SkeletonTable, SkeletonText, SkeletonAvatar } from "../../components/Skeleton";
import api from "../../services/api";

const typeColor = {
  vacation: "bg-indigo-50 text-indigo-700",
  sick:     "bg-cyan-50 text-secondary",
  personal: "bg-surface-container text-on-surface-variant",
  maternity:"bg-pink-50 text-pink-600",
  unpaid:   "bg-orange-50 text-orange-600",
};
const statusColor = { pending: "text-amber-600 bg-amber-50", approved: "text-emerald-600 bg-emerald-50", rejected: "text-error bg-error-container/20" };
const statusDot   = { pending: "bg-amber-600", approved: "bg-emerald-600", rejected: "bg-error" };

export default function LeaveManagement() {
  const { user }  = useAuth();
  const isHR      = user?.role === "admin" || user?.role === "hr";

  const [leaves,   setLeaves]   = useState([]);
  const [stats,    setStats]    = useState({ pending: 0, on_leave_today: 0, monthly_requests: 0 });
  const [loading,  setLoading]  = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [formError,  setFormError]  = useState("");
  const [formSuccess,setFormSuccess]= useState("");
  const [form, setForm] = useState({ leave_type: "vacation", start_date: "", end_date: "", reason: "" });

  const fetchData = () => {
    setLoading(true);
    if (isHR) {
      Promise.all([api.get("/leaves"), api.get("/leaves/stats")])
        .then(([lv, st]) => { setLeaves(lv.data); setStats(st.data); })
        .finally(() => setLoading(false));
    } else {
      api.get("/leaves/me")
        .then((res) => setLeaves(res.data))
        .finally(() => setLoading(false));
    }
  };

  useEffect(() => { fetchData(); }, [isHR]);

  const review = async (id, action) => {
    await api.put(`/leaves/${id}/review`, { action });
    fetchData();
  };

  const applyLeave = async (e) => {
    e.preventDefault();
    setFormError("");
    setFormSuccess("");
    if (!form.start_date || !form.end_date) { setFormError("Please select start and end dates."); return; }
    if (new Date(form.end_date) < new Date(form.start_date)) { setFormError("End date must be after start date."); return; }
    setSubmitting(true);
    try {
      await api.post("/leaves", form);
      setFormSuccess("Leave request submitted successfully!");
      setForm({ leave_type: "vacation", start_date: "", end_date: "", reason: "" });
      setShowForm(false);
      fetchData();
    } catch (err) {
      setFormError(err.response?.data?.error || "Failed to submit leave request.");
    } finally {
      setSubmitting(false);
    }
  };

  // Employee personal stats
  const myPending  = leaves.filter(l => l.status === "pending").length;
  const myApproved = leaves.filter(l => l.status === "approved").length;
  const myRejected = leaves.filter(l => l.status === "rejected").length;

  return (
    <DashboardLayout>
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-extrabold text-primary tracking-tight font-headline">
            {isHR ? "Leave Management" : "My Leaves"}
          </h2>
          <p className="text-on-surface-variant mt-1">
            {isHR ? "Review and manage organizational time-off requests." : "Track and apply for your time off."}
          </p>
        </div>
        {!isHR && (
          <button onClick={() => setShowForm((v) => !v)}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-primary to-primary-container text-on-primary font-bold text-sm shadow-lg hover:opacity-90 transition-all">
            <span className="material-symbols-outlined text-lg">{showForm ? "close" : "add"}</span>
            {showForm ? "Cancel" : "Apply for Leave"}
          </button>
        )}
      </div>

      {loading ? (
        <>
          <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {Array.from({ length: 3 }).map((_, i) => <SkeletonStatCardTall key={i} />)}
          </section>
          <div className="bg-surface-container-lowest rounded-xl shadow-sm overflow-hidden">
            <div className="px-6 py-5 border-b border-outline-variant/10"><SkeletonText className="h-5 w-40" /></div>
            <table className="w-full">
              <thead className="bg-surface-container-low/50">
                <tr>{Array.from({length:6}).map((_,i)=><th key={i} className="px-6 py-4"><SkeletonText className="h-3 w-16" /></th>)}</tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/10">
                {Array.from({ length: 5 }).map((_, i) => (
                  <tr key={i}>
                    <td className="px-6 py-4"><div className="flex items-center gap-3"><SkeletonAvatar /><div className="space-y-1.5"><SkeletonText className="h-3 w-24" /><SkeletonText className="h-2.5 w-16" /></div></div></td>
                    {Array.from({length:5}).map((_,j)=><td key={j} className="px-6 py-4"><SkeletonText className="h-3 w-16" /></td>)}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      ) : (
        <>
          {/* Stats */}
          <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {(isHR ? [
              { icon: "pending_actions", label: "Pending Approvals", value: stats.pending,          color: "text-primary bg-indigo-50" },
              { icon: "group_off",       label: "On Leave Today",    value: stats.on_leave_today,   color: "text-secondary bg-cyan-50" },
              { icon: "analytics",       label: "Monthly Requests",  value: stats.monthly_requests, color: "text-tertiary bg-orange-50" },
            ] : [
              { icon: "pending_actions", label: "Pending",  value: myPending,  color: "text-amber-600 bg-amber-50" },
              { icon: "check_circle",    label: "Approved", value: myApproved, color: "text-emerald-600 bg-emerald-50" },
              { icon: "cancel",          label: "Rejected", value: myRejected, color: "text-error bg-error-container/20" },
            ]).map((s) => (
              <div key={s.label} className="bg-surface-container-lowest p-6 rounded-xl shadow-sm flex flex-col gap-4">
                <span className={`material-symbols-outlined p-2 rounded-lg w-fit ${s.color}`}>{s.icon}</span>
                <div>
                  <p className="text-on-surface-variant text-sm font-medium">{s.label}</p>
                  <h3 className="text-4xl font-extrabold mt-1">{s.value}</h3>
                </div>
              </div>
            ))}
          </section>

          {/* Apply Leave Form (employee only) */}
          {!isHR && showForm && (
            <div className="bg-surface-container-lowest rounded-2xl p-8 shadow-sm border border-outline-variant/10">
              <h3 className="font-headline font-bold text-lg mb-6">Apply for Leave</h3>
              {formError   && <div className="mb-4 p-3 rounded-lg bg-error-container/30 text-sm text-error font-medium">{formError}</div>}
              {formSuccess  && <div className="mb-4 p-3 rounded-lg bg-emerald-50 text-sm text-emerald-700 font-medium">{formSuccess}</div>}
              <form onSubmit={applyLeave} className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-1.5">Leave Type</label>
                  <select value={form.leave_type} onChange={(e) => setForm({ ...form, leave_type: e.target.value })}
                    className="w-full px-4 py-2.5 bg-surface-container-low rounded-lg text-sm text-on-surface border-none outline-none focus:ring-2 focus:ring-primary/30">
                    <option value="vacation">Vacation</option>
                    <option value="sick">Sick Leave</option>
                    <option value="personal">Personal</option>
                    <option value="maternity">Maternity / Paternity</option>
                    <option value="unpaid">Unpaid Leave</option>
                  </select>
                </div>
                <div className="md:col-span-1"></div>
                <div>
                  <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-1.5">Start Date</label>
                  <input type="date" value={form.start_date} onChange={(e) => setForm({ ...form, start_date: e.target.value })}
                    className="w-full px-4 py-2.5 bg-surface-container-low rounded-lg text-sm text-on-surface border-none outline-none focus:ring-2 focus:ring-primary/30" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-1.5">End Date</label>
                  <input type="date" value={form.end_date} onChange={(e) => setForm({ ...form, end_date: e.target.value })}
                    className="w-full px-4 py-2.5 bg-surface-container-low rounded-lg text-sm text-on-surface border-none outline-none focus:ring-2 focus:ring-primary/30" />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-1.5">Reason <span className="text-outline font-normal normal-case">(optional)</span></label>
                  <textarea value={form.reason} onChange={(e) => setForm({ ...form, reason: e.target.value })}
                    rows={3} placeholder="Briefly describe the reason for your leave..."
                    className="w-full px-4 py-2.5 bg-surface-container-low rounded-lg text-sm text-on-surface border-none outline-none focus:ring-2 focus:ring-primary/30 resize-none" />
                </div>
                <div className="md:col-span-2 flex items-center gap-3">
                  <button type="submit" disabled={submitting}
                    className="px-6 py-2.5 bg-primary text-on-primary font-bold text-sm rounded-xl hover:opacity-90 transition-all active:scale-95 disabled:opacity-60 flex items-center gap-2">
                    {submitting && <span className="material-symbols-outlined animate-spin text-lg">progress_activity</span>}
                    Submit Request
                  </button>
                  <button type="button" onClick={() => setShowForm(false)} className="px-6 py-2.5 bg-surface-container text-on-surface font-semibold text-sm rounded-xl hover:bg-surface-container-high transition-colors">
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Leave Table */}
          <section className="bg-surface-container-lowest rounded-xl shadow-sm overflow-hidden">
            <div className="px-6 py-5 flex justify-between items-center border-b border-outline-variant/10">
              <h4 className="font-bold text-lg font-headline">
                {isHR ? "All Leave Requests" : "My Leave History"}
              </h4>
              <span className="text-xs text-on-surface-variant font-medium">{leaves.length} total</span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-surface-container-low/50">
                  <tr>
                    {(isHR
                      ? ["Employee", "Leave Type", "Dates", "Duration", "Status", "Actions"]
                      : ["Leave Type", "Dates", "Duration", "Reason", "Status"]
                    ).map((h) => (
                      <th key={h} className={`px-6 py-4 text-xs font-bold text-on-surface-variant uppercase tracking-wider ${h === "Actions" ? "text-right" : ""}`}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {leaves.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="px-6 py-12 text-center">
                        <span className="material-symbols-outlined text-4xl text-outline block mb-2">event_busy</span>
                        <p className="text-on-surface-variant font-medium">No leave requests yet.</p>
                        {!isHR && <button onClick={() => setShowForm(true)} className="mt-3 text-sm font-bold text-primary hover:underline">Apply for leave</button>}
                      </td>
                    </tr>
                  ) : leaves.map((r) => (
                    <tr key={r.id} className="hover:bg-surface-container-high transition-colors group">
                      {isHR && (
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xs">{r.name?.charAt(0)}</div>
                            <div>
                              <p className="font-semibold text-sm">{r.name}</p>
                              <p className="text-xs text-on-surface-variant">{r.designation}</p>
                            </div>
                          </div>
                        </td>
                      )}
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 rounded text-[11px] font-bold uppercase ${typeColor[r.leave_type] || "bg-surface-container text-on-surface-variant"}`}>{r.leave_type}</span>
                      </td>
                      <td className="px-6 py-4 text-sm font-medium text-on-surface">{r.start_date} → {r.end_date}</td>
                      <td className="px-6 py-4 text-sm text-on-surface-variant">{r.duration_days} day(s)</td>
                      {!isHR && (
                        <td className="px-6 py-4 text-sm text-on-surface-variant max-w-[180px] truncate">{r.reason || "—"}</td>
                      )}
                      <td className="px-6 py-4">
                        <span className={`flex items-center gap-1.5 text-xs font-semibold ${statusColor[r.status]} px-2.5 py-1 rounded-full w-fit capitalize`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${statusDot[r.status]}`}></span>{r.status}
                        </span>
                      </td>
                      {isHR && (
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
                      )}
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
