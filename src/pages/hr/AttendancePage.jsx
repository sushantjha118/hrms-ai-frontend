import { useState } from "react";
import DashboardLayout from "../../components/DashboardLayout";

// --- Static Data ---
const stats = [
  { icon: "how_to_reg", iconBg: "bg-primary/10 text-primary", label: "Present Today", value: "1,142", badge: "92%", badgeColor: "text-emerald-600 bg-emerald-50" },
  { icon: "person_off", iconBg: "bg-error/10 text-error", label: "Absent Today", value: "58", badge: "-4%", badgeColor: "text-error bg-error-container/30" },
  { icon: "schedule", iconBg: "bg-amber-50 text-amber-600", label: "Late Arrivals", value: "24", badge: "Today", badgeColor: "text-amber-600 bg-amber-50" },
  { icon: "psychology", iconBg: "bg-secondary/10 text-secondary", label: "AI Punctuality Score", value: "87%", badge: "+3%", badgeColor: "text-secondary bg-secondary/10" },
];

const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const weekData = [96, 94, 98, 91, 95, 72, 68]; // attendance % per day

const records = [
  { initials: "AR", bg: "bg-indigo-100 text-primary", name: "Alex Rivera", dept: "Engineering", checkIn: "08:45 AM", checkOut: "06:10 PM", hours: "9h 25m", status: "Present", statusColor: "text-emerald-600 bg-emerald-50", dot: "bg-emerald-500" },
  { initials: "MC", bg: "bg-teal-100 text-teal-600", name: "Maya Chen", dept: "Design", checkIn: "09:32 AM", checkOut: "05:55 PM", hours: "8h 23m", status: "Late", statusColor: "text-amber-600 bg-amber-50", dot: "bg-amber-500" },
  { initials: "JS", bg: "bg-purple-100 text-purple-600", name: "Jordan Smyth", dept: "People & Culture", checkIn: "—", checkOut: "—", hours: "—", status: "Absent", statusColor: "text-error bg-error-container/30", dot: "bg-error" },
  { initials: "EV", bg: "bg-rose-100 text-rose-600", name: "Elena Vasquez", dept: "Marketing", checkIn: "08:58 AM", checkOut: "06:00 PM", hours: "9h 02m", status: "Present", statusColor: "text-emerald-600 bg-emerald-50", dot: "bg-emerald-500" },
  { initials: "TW", bg: "bg-sky-100 text-sky-600", name: "Thomas Wright", dept: "Sales", checkIn: "09:05 AM", checkOut: "05:30 PM", hours: "8h 25m", status: "Present", statusColor: "text-emerald-600 bg-emerald-50", dot: "bg-emerald-500" },
  { initials: "RK", bg: "bg-amber-100 text-amber-600", name: "Rachel Kim", dept: "Engineering", checkIn: "10:15 AM", checkOut: "07:00 PM", hours: "8h 45m", status: "Late", statusColor: "text-amber-600 bg-amber-50", dot: "bg-amber-500" },
];

const deptBreakdown = [
  { label: "Engineering", present: 38, total: 42, pct: 90, color: "bg-primary" },
  { label: "Design", present: 17, total: 18, pct: 94, color: "bg-secondary" },
  { label: "Marketing", present: 28, total: 31, pct: 90, color: "bg-primary-container" },
  { label: "Sales", present: 50, total: 55, pct: 91, color: "bg-tertiary-container" },
  { label: "People & Culture", present: 10, total: 12, pct: 83, color: "bg-amber-400" },
];

const tabs = ["All", "Present", "Absent", "Late"];

export default function AttendancePage() {
  const [activeTab, setActiveTab] = useState(0);

  const filtered = records.filter((r) => {
    if (activeTab === 0) return true;
    if (activeTab === 1) return r.status === "Present";
    if (activeTab === 2) return r.status === "Absent";
    if (activeTab === 3) return r.status === "Late";
    return true;
  });

  return (
    <DashboardLayout userName="Sarah Jenkins" userRole="HR Director">

      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="text-3xl font-extrabold font-headline tracking-tight text-on-surface">Attendance Overview</h2>
          <p className="text-on-surface-variant mt-1">Real-time workforce presence tracking for today.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-surface-container-highest text-on-surface font-semibold text-sm hover:bg-slate-200 transition-colors">
            <span className="material-symbols-outlined text-[18px]">download</span>
            Export
          </button>
          <button className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-primary to-primary-container text-white font-bold text-sm shadow-lg shadow-primary/20 hover:opacity-90 active:scale-95 transition-all">
            <span className="material-symbols-outlined text-[18px]">add_circle</span>
            Mark Attendance
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((s) => (
          <div key={s.label} className="bg-surface-container-lowest p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-4">
              <div className={`p-3 ${s.iconBg} rounded-xl`}>
                <span className="material-symbols-outlined">{s.icon}</span>
              </div>
              <span className={`text-xs font-bold px-2 py-1 rounded-full ${s.badgeColor}`}>{s.badge}</span>
            </div>
            <h3 className="text-sm font-semibold text-on-surface-variant mb-1">{s.label}</h3>
            <p className="text-3xl font-extrabold font-headline tracking-tighter text-on-surface">{s.value}</p>
          </div>
        ))}
      </section>

      {/* Middle Section: Chart + AI Insight + Dept Breakdown */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* Weekly Attendance Bar Chart */}
        <div className="lg:col-span-2 bg-surface-container-lowest p-8 rounded-xl shadow-sm">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h3 className="text-lg font-bold font-headline">Weekly Attendance Rate</h3>
              <p className="text-sm text-on-surface-variant">Daily presence percentage across the organisation</p>
            </div>
            <select className="bg-surface-container-low border-none text-xs font-semibold rounded-lg px-4 py-2 focus:ring-0">
              <option>This Week</option>
              <option>Last Week</option>
              <option>Last Month</option>
            </select>
          </div>
          <div className="flex items-end justify-between gap-3 h-48">
            {weekDays.map((day, i) => (
              <div key={day} className="flex-1 flex flex-col items-center gap-2 group">
                <span className="text-[10px] font-bold text-on-surface-variant opacity-0 group-hover:opacity-100 transition-opacity">
                  {weekData[i]}%
                </span>
                <div className="w-full relative rounded-t-lg overflow-hidden bg-surface-container-low" style={{ height: "100%" }}>
                  <div
                    className={`absolute bottom-0 w-full rounded-t-lg transition-all duration-500 ${i < 5 ? "bg-gradient-to-t from-primary to-primary-container" : "bg-surface-container-high"}`}
                    style={{ height: `${weekData[i]}%` }}
                  ></div>
                </div>
                <span className={`text-[11px] font-bold ${i === 3 ? "text-primary" : "text-on-surface-variant"}`}>{day}</span>
              </div>
            ))}
          </div>
          <div className="mt-6 flex items-center justify-between text-xs font-medium text-on-surface-variant border-t border-slate-50 pt-4">
            <span>Weekly Average: <span className="font-bold text-on-surface">87.7%</span></span>
            <span>Target: <span className="font-bold text-primary">90%</span></span>
          </div>
        </div>

        {/* AI Insight + Dept Breakdown stacked */}
        <div className="flex flex-col gap-6">
          {/* AI Insight */}
          <div className="bg-gradient-to-br from-slate-900 to-indigo-950 p-6 rounded-xl shadow-xl text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-secondary opacity-20 blur-3xl rounded-full"></div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-2 h-2 bg-secondary-container rounded-full animate-pulse"></div>
              <span className="text-[10px] uppercase tracking-widest font-bold text-secondary-container">AI Live Insight</span>
            </div>
            <h4 className="text-base font-headline font-bold mb-3">Attendance Pattern Alert</h4>
            <p className="text-indigo-100 text-xs leading-relaxed mb-4">
              Late arrivals in <span className="font-bold text-white underline decoration-secondary-container">Engineering</span> have increased by <span className="text-secondary-container font-bold">18%</span> this week. Likely correlated with the new sprint cycle start.
            </p>
            <div className="bg-white/10 p-3 rounded-xl backdrop-blur-sm">
              <p className="text-[10px] font-semibold mb-1">Recommended Action:</p>
              <p className="text-[10px] text-indigo-100 italic">"Consider adjusting the Engineering standup to 9:30 AM to improve on-time rates."</p>
            </div>
            <button className="mt-5 w-full py-2.5 rounded-lg bg-secondary-container text-on-secondary-container font-headline font-bold text-xs uppercase tracking-widest hover:bg-white transition-colors">
              View Full Analysis
            </button>
          </div>

          {/* Dept Breakdown */}
          <div className="bg-surface-container-lowest p-6 rounded-xl shadow-sm flex-1">
            <h3 className="text-sm font-bold font-headline mb-5">By Department</h3>
            <div className="space-y-4">
              {deptBreakdown.map((d) => (
                <div key={d.label} className="space-y-1.5">
                  <div className="flex justify-between text-xs font-bold text-on-surface-variant">
                    <span>{d.label}</span>
                    <span>{d.present}/{d.total} <span className="text-on-surface">({d.pct}%)</span></span>
                  </div>
                  <div className="h-1.5 w-full bg-surface-container-low rounded-full overflow-hidden">
                    <div className={`h-full ${d.color} rounded-full`} style={{ width: `${d.pct}%` }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Attendance Records Table */}
      <section className="bg-surface-container-lowest rounded-xl shadow-sm overflow-hidden">
        <div className="px-6 py-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-50">
          <h4 className="font-bold text-lg font-headline">Today's Attendance Log</h4>
          {/* Tabs */}
          <div className="flex items-center bg-surface-container-low p-1 rounded-xl gap-1">
            {tabs.map((t, i) => (
              <button
                key={t}
                onClick={() => setActiveTab(i)}
                className={`px-4 py-1.5 text-xs font-bold rounded-lg transition-all ${activeTab === i ? "bg-white shadow-sm text-primary" : "text-on-surface-variant hover:text-on-surface"}`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-surface-container-low/50">
              <tr>
                {["Employee", "Department", "Check In", "Check Out", "Hours", "Status", "Actions"].map((h) => (
                  <th key={h} className={`px-6 py-4 text-xs font-bold text-on-surface-variant uppercase tracking-wider ${h === "Actions" ? "text-right" : ""}`}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((r) => (
                <tr key={r.name} className="hover:bg-surface-container-high transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <div className={`w-9 h-9 rounded-full ${r.bg} flex items-center justify-center font-bold text-xs`}>{r.initials}</div>
                        <span className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 ${r.dot} border-2 border-white rounded-full`}></span>
                      </div>
                      <p className="font-semibold text-sm text-on-surface">{r.name}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-on-surface-variant">{r.dept}</td>
                  <td className="px-6 py-4 text-sm font-medium text-on-surface">{r.checkIn}</td>
                  <td className="px-6 py-4 text-sm font-medium text-on-surface">{r.checkOut}</td>
                  <td className="px-6 py-4 text-sm text-on-surface-variant">{r.hours}</td>
                  <td className="px-6 py-4">
                    <span className={`flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full w-fit ${r.statusColor}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${r.dot}`}></span>
                      {r.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="p-2 text-slate-300 hover:text-primary transition-colors opacity-0 group-hover:opacity-100">
                      <span className="material-symbols-outlined">more_vert</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="px-6 py-4 border-t border-slate-50 flex items-center justify-between text-sm text-on-surface-variant">
          <p>Showing <span className="font-bold text-on-surface">{filtered.length}</span> of <span className="font-bold text-on-surface">{records.length}</span> records</p>
          <div className="flex gap-2">
            <button className="p-1.5 hover:bg-slate-50 rounded-md transition-colors"><span className="material-symbols-outlined text-lg">chevron_left</span></button>
            <button className="px-3 py-1 rounded-lg bg-primary text-white text-xs font-bold shadow-sm">1</button>
            <button className="px-3 py-1 rounded-lg text-slate-500 hover:bg-slate-50 text-xs font-bold">2</button>
            <button className="p-1.5 hover:bg-slate-50 rounded-md transition-colors"><span className="material-symbols-outlined text-lg">chevron_right</span></button>
          </div>
        </div>
      </section>

      {/* Bottom: Clock-in Timeline + Policy Compliance */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">

        {/* Clock-in Timeline */}
        <div className="bg-surface-container-lowest p-8 rounded-xl shadow-sm">
          <h3 className="text-lg font-bold font-headline mb-6">Clock-In Timeline</h3>
          <div className="space-y-5 relative before:absolute before:left-[19px] before:top-2 before:bottom-2 before:w-[2px] before:bg-outline-variant/30">
            {[
              { time: "08:30 – 09:00", label: "Early Arrivals", count: 312, color: "bg-primary", textColor: "text-primary" },
              { time: "09:00 – 09:30", label: "On Time", count: 680, color: "bg-secondary", textColor: "text-secondary" },
              { time: "09:30 – 10:00", label: "Slightly Late", count: 98, color: "bg-amber-400", textColor: "text-amber-600" },
              { time: "10:00+", label: "Late Arrivals", count: 52, color: "bg-error", textColor: "text-error" },
            ].map((item) => (
              <div key={item.label} className="relative pl-10 flex items-center justify-between">
                <div className={`absolute left-0 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full ${item.color}/10 flex items-center justify-center z-10`}>
                  <div className={`w-3 h-3 rounded-full ${item.color}`}></div>
                </div>
                <div>
                  <p className="text-sm font-bold text-on-surface">{item.label}</p>
                  <p className="text-xs text-on-surface-variant">{item.time}</p>
                </div>
                <span className={`text-lg font-extrabold font-headline ${item.textColor}`}>{item.count}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Policy Compliance */}
        <div className="bg-surface-container-low rounded-xl p-8 border border-slate-100 flex flex-col justify-between">
          <div>
            <h3 className="text-lg font-bold font-headline mb-2">Policy Compliance</h3>
            <p className="text-on-surface-variant text-sm mb-6">87% of employees met the on-time arrival policy today.</p>
            <div className="w-full bg-slate-200 h-2.5 rounded-full overflow-hidden mb-8">
              <div className="bg-gradient-to-r from-primary to-secondary h-full rounded-full" style={{ width: "87%" }}></div>
            </div>
            {/* AI Insight strip */}
            <div className="p-4 rounded-xl bg-tertiary-container/10 border-l-4 border-tertiary mb-6">
              <div className="flex items-center gap-2 mb-1">
                <span className="material-symbols-outlined text-tertiary text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>auto_awesome</span>
                <span className="text-[10px] font-bold text-tertiary uppercase tracking-wider">AI Prediction</span>
              </div>
              <p className="text-xs text-on-surface-variant leading-relaxed">
                Based on current trends, attendance compliance is projected to reach <span className="font-bold text-tertiary">91%</span> by end of month if the Engineering standup is rescheduled.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4">
            {[
              { label: "Avg Check-In", value: "09:02 AM", color: "text-primary" },
              { label: "Avg Hours", value: "8h 44m", color: "text-secondary" },
              { label: "Overtime", value: "14 staff", color: "text-tertiary" },
            ].map((m) => (
              <div key={m.label} className="text-center py-4 bg-white rounded-xl shadow-sm">
                <p className="text-[10px] uppercase font-bold text-on-surface-variant tracking-widest mb-1">{m.label}</p>
                <p className={`text-lg font-extrabold font-headline ${m.color}`}>{m.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

    </DashboardLayout>
  );
}
