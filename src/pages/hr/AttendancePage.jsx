import { useEffect, useState } from "react";
import DashboardLayout from "../../components/DashboardLayout";
import api from "../../services/api";

const tabs = ["All", "Present", "Absent", "Late"];

export default function AttendancePage() {
  const [records,   setRecords]   = useState([]);
  const [stats,     setStats]     = useState({ total_employees: 0, present: 0, absent: 0, late: 0 });
  const [weekly,    setWeekly]    = useState([]);
  const [activeTab, setActiveTab] = useState(0);
  const [loading,   setLoading]   = useState(true);

  useEffect(() => {
    Promise.all([
      api.get("/attendance/today"),
      api.get("/attendance/stats"),
      api.get("/attendance/weekly"),
    ]).then(([rec, st, wk]) => {
      setRecords(rec.data);
      setStats(st.data);
      setWeekly(wk.data);
    }).finally(() => setLoading(false));
  }, []);

  const filtered = records.filter((r) => {
    if (activeTab === 0) return true;
    if (activeTab === 1) return r.status === "present";
    if (activeTab === 2) return r.status === "absent";
    if (activeTab === 3) return r.status === "late";
    return true;
  });

  const statCards = [
    { icon: "how_to_reg", iconBg: "bg-primary/10 text-primary",   label: "Present Today",  value: stats.present,          badge: stats.total_employees ? `${Math.round(stats.present/stats.total_employees*100)}%` : "0%", badgeColor: "text-emerald-600 bg-emerald-50" },
    { icon: "person_off",  iconBg: "bg-error/10 text-error",       label: "Absent Today",   value: stats.absent,           badge: "Today",  badgeColor: "text-error bg-error-container/30" },
    { icon: "schedule",    iconBg: "bg-amber-50 text-amber-600",   label: "Late Arrivals",  value: stats.late,             badge: "Today",  badgeColor: "text-amber-600 bg-amber-50" },
    { icon: "groups",      iconBg: "bg-secondary/10 text-secondary",label: "Total Employees",value: stats.total_employees,  badge: "Active", badgeColor: "text-secondary bg-secondary/10" },
  ];

  const statusColor = { present: "text-emerald-600 bg-emerald-50", absent: "text-error bg-error-container/30", late: "text-amber-600 bg-amber-50" };
  const statusDot   = { present: "bg-emerald-500", absent: "bg-error", late: "bg-amber-500" };

  return (
    <DashboardLayout>
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="text-3xl font-extrabold font-headline tracking-tight text-on-surface">Attendance Overview</h2>
          <p className="text-on-surface-variant mt-1">Real-time workforce presence tracking for today.</p>
        </div>
        <button className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-primary to-primary-container text-on-primary font-bold text-sm shadow-lg hover:opacity-90 transition-all">
          <span className="material-symbols-outlined text-[18px]">add_circle</span> Mark Attendance
        </button>
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-64">
          <span className="material-symbols-outlined animate-spin text-4xl text-primary">progress_activity</span>
        </div>
      ) : (
        <>
          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {statCards.map((s) => (
              <div key={s.label} className="bg-surface-container-lowest p-6 rounded-xl shadow-sm">
                <div className="flex justify-between items-start mb-4">
                  <div className={`p-3 ${s.iconBg} rounded-xl`}><span className="material-symbols-outlined">{s.icon}</span></div>
                  <span className={`text-xs font-bold px-2 py-1 rounded-full ${s.badgeColor}`}>{s.badge}</span>
                </div>
                <h3 className="text-sm font-semibold text-on-surface-variant mb-1">{s.label}</h3>
                <p className="text-3xl font-extrabold font-headline tracking-tighter text-on-surface">{s.value}</p>
              </div>
            ))}
          </section>

          {weekly.length > 0 && (
            <section className="bg-surface-container-lowest p-8 rounded-xl shadow-sm">
              <h3 className="text-lg font-bold font-headline mb-6">Weekly Attendance Rate</h3>
              <div className="flex items-end justify-between gap-3 h-48">
                {weekly.map((d, i) => (
                  <div key={d.day} className="flex-1 flex flex-col items-center gap-2 group">
                    <span className="text-[10px] font-bold text-on-surface-variant opacity-0 group-hover:opacity-100 transition-opacity">{d.percentage}%</span>
                    <div className="w-full relative rounded-t-lg overflow-hidden bg-surface-container-low" style={{ height: "100%" }}>
                      <div className={`absolute bottom-0 w-full rounded-t-lg transition-all duration-500 ${d.percentage > 0 ? "bg-gradient-to-t from-primary to-primary-container" : "bg-surface-container-high"}`}
                        style={{ height: `${d.percentage}%` }}></div>
                    </div>
                    <span className="text-[11px] font-bold text-on-surface-variant">{d.day}</span>
                  </div>
                ))}
              </div>
            </section>
          )}

          <section className="bg-surface-container-lowest rounded-xl shadow-sm overflow-hidden">
            <div className="px-6 py-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-outline-variant/10">
              <h4 className="font-bold text-lg font-headline">Today's Attendance Log</h4>
              <div className="flex items-center bg-surface-container-low p-1 rounded-xl gap-1">
                {tabs.map((t, i) => (
                  <button key={t} onClick={() => setActiveTab(i)}
                    className={`px-4 py-1.5 text-xs font-bold rounded-lg transition-all ${activeTab === i ? "bg-surface-container-lowest shadow-sm text-primary" : "text-on-surface-variant hover:text-on-surface"}`}>
                    {t}
                  </button>
                ))}
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-surface-container-low/50">
                  <tr>
                    {["Employee", "Department", "Check In", "Check Out", "Hours", "Status"].map((h) => (
                      <th key={h} className="px-6 py-4 text-xs font-bold text-on-surface-variant uppercase tracking-wider">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filtered.length === 0 ? (
                    <tr><td colSpan={6} className="px-6 py-8 text-center text-on-surface-variant">No records found.</td></tr>
                  ) : filtered.map((r) => (
                    <tr key={r.id} className="hover:bg-surface-container-high transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="relative">
                            <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xs">{r.name?.charAt(0)}</div>
                            <span className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 ${statusDot[r.status] || "bg-outline"} border-2 border-surface-container-lowest rounded-full`}></span>
                          </div>
                          <p className="font-semibold text-sm text-on-surface">{r.name}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-on-surface-variant">{r.department || "—"}</td>
                      <td className="px-6 py-4 text-sm font-medium text-on-surface">{r.check_in || "—"}</td>
                      <td className="px-6 py-4 text-sm font-medium text-on-surface">{r.check_out || "—"}</td>
                      <td className="px-6 py-4 text-sm text-on-surface-variant">{r.hours_worked || "—"}</td>
                      <td className="px-6 py-4">
                        <span className={`flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full w-fit capitalize ${statusColor[r.status] || "text-on-surface-variant bg-surface-container"}`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${statusDot[r.status] || "bg-outline"}`}></span>
                          {r.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="px-6 py-4 border-t border-outline-variant/10 text-sm text-on-surface-variant">
              Showing <span className="font-bold text-on-surface">{filtered.length}</span> of <span className="font-bold text-on-surface">{records.length}</span> records
            </div>
          </section>
        </>
      )}
    </DashboardLayout>
  );
}
