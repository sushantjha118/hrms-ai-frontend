import DashboardLayout from "../../components/DashboardLayout";

const stats = [
  { icon: "event_busy", iconBg: "bg-indigo-50 text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white", label: "Pending Leaves", value: "12", badge: "8%", badgeColor: "text-error", sub: "Action Required" },
  { icon: "person_add", iconBg: "bg-cyan-50 text-secondary group-hover:bg-secondary group-hover:text-white", label: "New Candidates", value: "28", badge: "14%", badgeColor: "text-secondary", sub: "In Pipeline" },
  { icon: "video_chat", iconBg: "bg-orange-50 text-tertiary group-hover:bg-tertiary group-hover:text-white", label: "Interviews Today", value: "5", badge: "Today", badgeColor: "text-on-surface-variant", sub: "Next: 2:00 PM" },
];

const activities = [
  { name: "Alex Rivera", role: "Senior Product Designer", status: "Offered", statusColor: "text-indigo-600", match: "98%", time: "2 hours ago" },
  { name: "Sophia Chen", role: "Full Stack Developer", status: "Interviewing", statusColor: "text-secondary", match: "84%", time: "5 hours ago" },
  { name: "Jordan Smith", role: "Marketing Lead", status: "Shortlisted", statusColor: "text-indigo-600", match: "92%", time: "Yesterday" },
];

export default function HROverview() {
  return (
    <DashboardLayout userName="Sarah Jenkins" userRole="HR Director">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-on-surface mb-2 font-headline">Dashboard Overview</h2>
          <p className="text-on-surface-variant">Welcome back, Sarah. Here's what needs your attention today.</p>
        </div>
        {/* AI Insight */}
        <div className="bg-white rounded-xl p-4 shadow-sm border-l-4 border-tertiary flex items-center gap-4 max-w-md bg-gradient-to-r from-white to-tertiary-fixed/10">
          <div className="flex-shrink-0 w-10 h-10 rounded-full bg-tertiary-fixed flex items-center justify-center">
            <span className="material-symbols-outlined text-tertiary" style={{ fontVariationSettings: "'FILL' 1" }}>psychology</span>
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-bold uppercase tracking-widest text-tertiary">AI Prediction</span>
              <span className="px-2 py-0.5 rounded-full bg-secondary-container text-on-secondary-container text-[10px] font-bold">Overall Team Performance: High</span>
            </div>
            <p className="text-xs text-on-surface-variant leading-relaxed">Retention probability is up by 12% following the recent performance review cycle.</p>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((s) => (
          <div key={s.label} className="bg-surface-container-lowest p-6 rounded-xl shadow-sm group hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-4">
              <div className={`p-2 rounded-lg ${s.iconBg} transition-colors`}>
                <span className="material-symbols-outlined">{s.icon}</span>
              </div>
              <span className={`text-xs font-medium ${s.badgeColor} flex items-center gap-1`}>
                <span className="material-symbols-outlined text-sm">trending_up</span> {s.badge}
              </span>
            </div>
            <p className="text-on-surface-variant text-sm font-medium mb-1">{s.label}</p>
            <h3 className="text-4xl font-extrabold tracking-tight text-on-surface">{s.value}</h3>
            <div className="mt-4 pt-4 border-t border-slate-50 flex items-center justify-between">
              <span className="text-[10px] text-slate-400 uppercase tracking-wider font-bold">{s.sub}</span>
              <span className="material-symbols-outlined text-indigo-300 text-sm">arrow_forward_ios</span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* Recruitment Funnel */}
          <section className="bg-surface-container-lowest rounded-xl p-8 shadow-sm">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h3 className="text-lg font-bold text-on-surface font-headline">Recruitment Summary</h3>
                <p className="text-sm text-on-surface-variant">Active hiring pipelines and candidate health</p>
              </div>
              <button className="text-sm font-bold text-indigo-600 flex items-center gap-2 hover:underline">
                View Detailed Funnel <span className="material-symbols-outlined text-sm">open_in_new</span>
              </button>
            </div>
            <div className="relative py-10 flex flex-col items-center">
              <div className="w-full max-w-md space-y-1">
                {[
                  { label: "Sourced (450)", text: "100% Potential", mx: "mx-0", bg: "bg-indigo-600/10", textColor: "text-indigo-700" },
                  { label: "Screening (120)", text: "26% Conversion", mx: "mx-4", bg: "bg-indigo-600/30", textColor: "text-indigo-800" },
                  { label: "Interviews (45)", text: "37% Conversion", mx: "mx-8", bg: "bg-indigo-600/50", textColor: "text-indigo-50" },
                  { label: "Offers (12)", text: "Target Reached", mx: "mx-12", bg: "bg-indigo-600 rounded-b-xl shadow-lg", textColor: "text-white" },
                ].map((row) => (
                  <div key={row.label} className="flex items-center group">
                    <div className="w-24 text-right pr-4 text-xs font-bold text-on-surface-variant">{row.label}</div>
                    <div className={`flex-1 ${row.mx} h-12 ${row.bg} flex items-center justify-center relative`}>
                      <span className={`relative z-10 text-xs font-bold ${row.textColor}`}>{row.text}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-8 grid grid-cols-2 gap-4">
              <div className="p-4 rounded-xl border border-slate-100 flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-secondary-container flex items-center justify-center text-on-secondary-container">
                  <span className="material-symbols-outlined">work</span>
                </div>
                <div>
                  <p className="text-[10px] uppercase font-bold text-on-surface-variant tracking-wider">Active Listings</p>
                  <p className="text-xl font-bold">24 Positions</p>
                </div>
              </div>
              <div className="p-4 rounded-xl border border-slate-100 flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-primary-fixed-dim flex items-center justify-center text-on-primary-fixed-variant">
                  <span className="material-symbols-outlined">timer</span>
                </div>
                <div>
                  <p className="text-[10px] uppercase font-bold text-on-surface-variant tracking-wider">Avg. Time to Hire</p>
                  <p className="text-xl font-bold">18 Days</p>
                </div>
              </div>
            </div>
          </section>

          {/* Recent Activity */}
          <section className="bg-surface-container-lowest rounded-xl p-8 shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-bold text-on-surface font-headline">Recent Hiring Activity</h3>
              <button className="p-2 hover:bg-slate-50 rounded-lg transition-colors">
                <span className="material-symbols-outlined text-slate-400">more_horiz</span>
              </button>
            </div>
            <div className="space-y-6">
              {activities.map((a) => (
                <div key={a.name} className="flex items-center justify-between group cursor-pointer">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
                      <span className="material-symbols-outlined">person</span>
                    </div>
                    <div>
                      <p className="text-sm font-bold text-on-surface">{a.name}</p>
                      <p className="text-xs text-on-surface-variant">{a.role} • <span className={a.statusColor}>{a.status}</span></p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-medium text-on-surface-variant">{a.time}</p>
                    <p className="text-[10px] font-bold text-tertiary-container uppercase">AI Match: {a.match}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Sidebar */}
        <div className="space-y-8">
          {/* Upcoming Interviews */}
          <section className="bg-surface-container-lowest rounded-xl p-6 shadow-sm">
            <h3 className="text-sm font-bold text-on-surface mb-6 flex items-center gap-2 font-headline">
              <span className="material-symbols-outlined text-indigo-600 text-lg">calendar_today</span>
              Upcoming Interviews
            </h3>
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-slate-50 border-l-4 border-indigo-500">
                <p className="text-xs font-bold text-indigo-600 mb-1">10:30 AM - 11:30 AM</p>
                <p className="text-sm font-bold text-on-surface">Technical Interview</p>
                <p className="text-xs text-on-surface-variant">Candidate: Michael Wu</p>
              </div>
              <div className="p-4 rounded-xl bg-slate-50 border-l-4 border-cyan-500">
                <p className="text-xs font-bold text-secondary mb-1">2:00 PM - 3:00 PM</p>
                <p className="text-sm font-bold text-on-surface">Culture Fit</p>
                <p className="text-xs text-on-surface-variant">Candidate: Emma Watson</p>
              </div>
            </div>
            <button className="w-full mt-6 py-2 rounded-lg border-2 border-slate-100 text-xs font-bold text-on-surface-variant hover:bg-slate-50 transition-colors">
              View Full Schedule
            </button>
          </section>

          {/* AI Talent Trends */}
          <section className="bg-gradient-to-br from-indigo-900 to-indigo-700 rounded-xl p-6 shadow-lg text-white">
            <div className="flex items-center gap-2 mb-6">
              <span className="material-symbols-outlined text-cyan-300" style={{ fontVariationSettings: "'FILL' 1" }}>insights</span>
              <h3 className="text-sm font-bold uppercase tracking-widest text-indigo-200 font-headline">Talent Trends</h3>
            </div>
            <p className="text-2xl font-bold mb-2 font-headline">Engaged Workforce</p>
            <p className="text-xs text-indigo-100 leading-relaxed opacity-80 mb-6">Your team's collaboration index has grown by 18% this quarter. AI recommends initiating the 'Leadership Fast-Track' for 3 key members.</p>
            <div className="space-y-3">
              <div className="w-full bg-white/10 rounded-full h-1.5">
                <div className="bg-cyan-400 h-1.5 rounded-full" style={{ width: "82%" }}></div>
              </div>
              <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-wider text-indigo-200">
                <span>Current Pulse</span><span>82% Excellent</span>
              </div>
            </div>
            <button className="w-full mt-8 py-3 bg-white text-indigo-900 rounded-xl text-sm font-bold hover:bg-indigo-50 transition-colors">
              Generate Report
            </button>
          </section>
        </div>
      </div>
    </DashboardLayout>
  );
}
