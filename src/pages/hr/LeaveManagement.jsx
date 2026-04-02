import DashboardLayout from "../../components/DashboardLayout";

const leaveRequests = [
  { initials: "MC", name: "Marcus Chen", role: "Senior Engineer", type: "Vacation", typeBg: "bg-indigo-50 text-indigo-700", dates: "Oct 12 - Oct 18, 2023", duration: "5 Days", status: "Pending", statusColor: "text-amber-600 bg-amber-50", dot: "bg-amber-600", actions: true },
  { initials: "ER", name: "Elena Rodriguez", role: "UX Designer", type: "Sick", typeBg: "bg-secondary-container/20 text-on-secondary-container", dates: "Oct 10 - Oct 11, 2023", duration: "2 Days", status: "Approved", statusColor: "text-emerald-600 bg-emerald-50", dot: "bg-emerald-600", actions: false },
  { initials: "JS", name: "Jordan Smith", role: "Marketing Lead", type: "Personal", typeBg: "bg-slate-100 text-slate-600", dates: "Oct 14, 2023", duration: "1 Day", status: "Pending", statusColor: "text-amber-600 bg-amber-50", dot: "bg-amber-600", actions: true },
  { initials: "RW", name: "Robert Wilson", role: "Data Scientist", type: "Vacation", typeBg: "bg-indigo-50 text-indigo-700", dates: "Oct 01 - Oct 05, 2023", duration: "5 Days", status: "Rejected", statusColor: "text-error bg-error-container/20", dot: "bg-error", actions: false },
];

export default function LeaveManagement() {
  return (
    <DashboardLayout userName="Sarah Jenkins" userRole="HR Director">
      {/* Header */}
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-extrabold text-indigo-700 tracking-tight font-headline">Leave Management</h2>
          <p className="text-on-surface-variant mt-1">Review and manage organizational time-off requests.</p>
        </div>
        <div className="flex items-center bg-surface-container-low p-1 rounded-xl">
          <button className="px-4 py-2 text-sm font-semibold rounded-lg bg-white shadow-sm text-indigo-600">List View</button>
          <button className="px-4 py-2 text-sm font-medium text-on-surface-variant hover:text-indigo-600 transition-colors">Calendar View</button>
        </div>
      </div>

      {/* Stats */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-surface-container-lowest p-6 rounded-xl shadow-sm flex flex-col gap-4">
          <div className="flex justify-between items-start">
            <span className="material-symbols-outlined p-2 bg-indigo-50 text-indigo-600 rounded-lg">pending_actions</span>
            <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2 py-1 rounded-full">+12% vs last month</span>
          </div>
          <div>
            <p className="text-on-surface-variant text-sm font-medium">Pending Approvals</p>
            <h3 className="text-4xl font-extrabold mt-1">24</h3>
          </div>
        </div>
        <div className="bg-surface-container-lowest p-6 rounded-xl shadow-sm flex flex-col gap-4">
          <div className="flex justify-between items-start">
            <span className="material-symbols-outlined p-2 bg-cyan-50 text-secondary rounded-lg">group_off</span>
            <div className="flex -space-x-2">
              {["SM", "ER", "+5"].map((a) => (
                <div key={a} className="w-6 h-6 rounded-full border-2 border-white bg-slate-200 text-[8px] flex items-center justify-center font-bold text-slate-600">{a}</div>
              ))}
            </div>
          </div>
          <div>
            <p className="text-on-surface-variant text-sm font-medium">On Leave Today</p>
            <h3 className="text-4xl font-extrabold mt-1 text-secondary">08</h3>
          </div>
        </div>
        <div className="bg-surface-container-lowest p-6 rounded-xl shadow-sm flex flex-col gap-4 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-1 h-full bg-tertiary"></div>
          <div className="flex justify-between items-start">
            <span className="material-symbols-outlined p-2 bg-orange-50 text-tertiary rounded-lg">analytics</span>
            <div className="px-2 py-1 bg-tertiary-container/20 text-tertiary text-[10px] font-bold rounded-full uppercase tracking-tighter flex items-center gap-1">
              <span className="material-symbols-outlined text-xs">auto_awesome</span> AI Insight
            </div>
          </div>
          <div>
            <p className="text-on-surface-variant text-sm font-medium">Monthly Requests</p>
            <h3 className="text-4xl font-extrabold mt-1">142</h3>
            <p className="text-xs text-tertiary mt-2 italic">Trending 8% higher than usual for Q3.</p>
          </div>
        </div>
      </section>

      {/* Table */}
      <section className="bg-surface-container-lowest rounded-xl shadow-sm overflow-hidden">
        <div className="px-6 py-5 flex justify-between items-center bg-white border-b border-slate-50">
          <h4 className="font-bold text-lg font-headline">Active Leave Requests</h4>
          <div className="flex gap-2">
            <button className="flex items-center gap-2 px-3 py-1.5 border border-slate-200 rounded-lg text-sm font-medium hover:bg-slate-50 transition-colors">
              <span className="material-symbols-outlined text-sm">filter_list</span> Filter
            </button>
            <button className="flex items-center gap-2 px-3 py-1.5 border border-slate-200 rounded-lg text-sm font-medium hover:bg-slate-50 transition-colors">
              <span className="material-symbols-outlined text-sm">download</span> Export
            </button>
          </div>
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
              {leaveRequests.map((r) => (
                <tr key={r.name} className="hover:bg-surface-container-high transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold text-xs">{r.initials}</div>
                      <div>
                        <p className="font-semibold text-sm">{r.name}</p>
                        <p className="text-xs text-on-surface-variant">{r.role}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded text-[11px] font-bold ${r.typeBg} uppercase`}>{r.type}</span>
                  </td>
                  <td className="px-6 py-4 text-sm font-medium">{r.dates}</td>
                  <td className="px-6 py-4 text-sm text-on-surface-variant">{r.duration}</td>
                  <td className="px-6 py-4">
                    <span className={`flex items-center gap-1.5 text-xs font-semibold ${r.statusColor} px-2.5 py-1 rounded-full w-fit`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${r.dot}`}></span> {r.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className={`flex justify-end gap-2 ${r.actions ? "opacity-0 group-hover:opacity-100 transition-opacity" : ""}`}>
                      {r.actions ? (
                        <>
                          <button className="p-2 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors" title="Approve">
                            <span className="material-symbols-outlined">check_circle</span>
                          </button>
                          <button className="p-2 text-error hover:bg-error-container/20 rounded-lg transition-colors" title="Reject">
                            <span className="material-symbols-outlined">cancel</span>
                          </button>
                        </>
                      ) : (
                        <button className="p-2 text-slate-400 hover:bg-slate-50 rounded-lg transition-colors">
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
        <div className="px-6 py-4 border-t border-slate-50 flex justify-between items-center text-sm text-on-surface-variant">
          <p>Showing 1-10 of 42 requests</p>
          <div className="flex gap-2">
            <button className="p-1.5 hover:bg-slate-50 rounded-md transition-colors"><span className="material-symbols-outlined text-lg">chevron_left</span></button>
            <button className="p-1.5 hover:bg-slate-50 rounded-md transition-colors"><span className="material-symbols-outlined text-lg">chevron_right</span></button>
          </div>
        </div>
      </section>

      {/* Bottom */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-indigo-900 text-white rounded-xl p-8 relative overflow-hidden shadow-xl">
          <h4 className="text-xl font-bold mb-6 font-headline">Team Availability: Next 7 Days</h4>
          <div className="space-y-4">
            {[["Monday, Oct 09", "Fully Staffed", "text-sm font-bold bg-white/10 px-2 py-1 rounded"], ["Tuesday, Oct 10", "2 On Leave", "text-sm font-bold text-secondary-container"], ["Wednesday, Oct 11", "1 On Leave", "text-sm font-bold text-secondary-container"]].map(([day, status, cls]) => (
              <div key={day} className="flex items-center justify-between">
                <span className="text-indigo-200">{day}</span>
                <span className={cls}>{status}</span>
              </div>
            ))}
            <div className="flex items-center justify-between border-t border-white/10 pt-4">
              <span className="font-bold">Summary</span>
              <p className="text-sm text-indigo-100 text-right max-w-[200px]">No major project conflicts detected by AI.</p>
            </div>
          </div>
        </div>
        <div className="bg-surface-container-low rounded-xl p-8 border border-slate-100 flex flex-col justify-center">
          <h4 className="text-lg font-bold mb-2 font-headline">Policy Compliance</h4>
          <p className="text-on-surface-variant text-sm mb-6">92% of requests align with current team capacity rules.</p>
          <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
            <div className="bg-gradient-to-r from-primary to-secondary w-[92%] h-full"></div>
          </div>
          <div className="mt-8 flex gap-4">
            <div className="flex-1 text-center py-4 bg-white rounded-xl shadow-sm">
              <p className="text-[10px] uppercase font-bold text-on-surface-variant tracking-widest mb-1">Avg Response Time</p>
              <p className="text-2xl font-extrabold text-indigo-600">4.2h</p>
            </div>
            <div className="flex-1 text-center py-4 bg-white rounded-xl shadow-sm">
              <p className="text-[10px] uppercase font-bold text-on-surface-variant tracking-widest mb-1">Auto-Approved</p>
              <p className="text-2xl font-extrabold text-secondary">15%</p>
            </div>
          </div>
        </div>
      </section>
    </DashboardLayout>
  );
}
