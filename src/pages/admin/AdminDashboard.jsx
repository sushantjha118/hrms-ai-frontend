import DashboardLayout from "../../components/DashboardLayout";

const stats = [
  { icon: "groups", bg: "bg-primary-container/10 text-primary", label: "Total Employees", value: "1,200", badge: "+12%", badgeColor: "text-green-600 bg-green-50" },
  { icon: "work", bg: "bg-secondary-container/20 text-secondary", label: "Active Jobs", value: "45", badge: "Active", badgeColor: "text-indigo-600 bg-indigo-50" },
  { icon: "verified", bg: "bg-tertiary-container/10 text-tertiary", label: "Attendance", value: "98%", badge: "Peak", badgeColor: "text-on-surface-variant bg-surface-container-low" },
  { icon: "payments", bg: "bg-primary/10 text-primary", label: "Monthly Revenue", value: "$250k", badge: "Target", badgeColor: "text-green-600 bg-green-50" },
];

const activities = [
  { icon: "person_add", title: "New employee added:", highlight: "Marcus Holloway", sub: "Joined Engineering Team • 14 mins ago" },
  { icon: "description", title: "Annual Compliance Report Generated", sub: "Auto-triggered by AI Engine • 2 hours ago" },
  { icon: "security", title: "System Audit Completed", sub: "0 security vulnerabilities found • 5 hours ago" },
  { icon: "mail", title: "Broadcast email sent to", highlight: "All Staff", sub: "Subject: Q3 Roadmap • Yesterday at 4:30 PM" },
];

const roles = [
  { label: "Engineering", pct: 42, color: "bg-primary" },
  { label: "Design", pct: 18, color: "bg-secondary" },
  { label: "Marketing", pct: 25, color: "bg-primary-container" },
  { label: "Sales", pct: 15, color: "bg-tertiary-container" },
];

export default function AdminDashboard() {
  return (
    <DashboardLayout userName="Alexander Vance" userRole="Head of Operations">
      {/* Welcome */}
      <section>
        <h2 className="text-3xl font-extrabold font-headline tracking-tight text-on-surface mb-1">Morning, Alexander</h2>
        <p className="text-on-surface-variant font-medium">Here's your workforce summary for today.</p>
      </section>

      {/* Stats Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((s) => (
          <div key={s.label} className="bg-surface-container-lowest p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-4">
              <div className={`p-3 ${s.bg} rounded-xl`}>
                <span className="material-symbols-outlined">{s.icon}</span>
              </div>
              <span className={`text-xs font-bold ${s.badgeColor} px-2 py-1 rounded-full`}>{s.badge}</span>
            </div>
            <h3 className="text-sm font-semibold text-on-surface-variant mb-1">{s.label}</h3>
            <p className="text-3xl font-extrabold font-headline tracking-tighter text-on-surface">{s.value}</p>
          </div>
        ))}
      </section>

      {/* Analytics */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Chart */}
        <div className="lg:col-span-2 bg-surface-container-lowest p-8 rounded-xl shadow-sm">
          <div className="flex justify-between items-center mb-10">
            <div>
              <h3 className="text-lg font-bold font-headline">Hiring Trends</h3>
              <p className="text-sm text-on-surface-variant">Annual candidate growth analytics</p>
            </div>
            <select className="bg-surface-container-low border-none text-xs font-semibold rounded-lg px-4 py-2 focus:ring-0">
              <option>Last 12 Months</option>
              <option>Last 6 Months</option>
            </select>
          </div>
          <div className="relative h-64 w-full">
            <svg className="w-full h-full" viewBox="0 0 1000 400">
              <defs>
                <linearGradient id="indigoGradient" x1="0" x2="1" y1="0" y2="0">
                  <stop offset="0%" stopColor="#3525cd" />
                  <stop offset="100%" stopColor="#00687a" />
                </linearGradient>
              </defs>
              <path d="M0,350 Q250,300 500,200 T1000,100" fill="none" stroke="url(#indigoGradient)" strokeWidth="4" />
              <circle cx="500" cy="200" fill="#3525cd" r="6" />
            </svg>
            <div className="absolute top-[170px] left-[480px] bg-on-surface text-white text-[10px] px-2 py-1 rounded-md shadow-xl">
              Peak Hiring: 84 Candidates
            </div>
          </div>
          <div className="flex justify-between mt-4 px-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
            {["Jan", "Mar", "May", "Jul", "Sep", "Nov"].map((m) => <span key={m}>{m}</span>)}
          </div>
        </div>

        {/* AI Insight Panel */}
        <div className="bg-gradient-to-br from-slate-900 to-indigo-950 p-8 rounded-xl shadow-xl text-white relative overflow-hidden flex flex-col justify-between">
          <div className="absolute top-0 right-0 w-32 h-32 bg-secondary opacity-20 blur-3xl rounded-full"></div>
          <div>
            <div className="flex items-center gap-2 mb-6">
              <div className="w-2 h-2 bg-secondary-container rounded-full animate-pulse"></div>
              <span className="text-[10px] uppercase tracking-widest font-bold text-secondary-container">AI Live Insight</span>
            </div>
            <h4 className="text-xl font-headline font-bold mb-4">Talent Retention Alert</h4>
            <p className="text-indigo-100 text-sm leading-relaxed mb-6">
              Based on recent patterns, high turnover risk detected in the{" "}
              <span className="font-bold text-white underline decoration-secondary-container">Engineering Department</span>. Current sentiment score: 4.2/10.
            </p>
            <div className="bg-white/10 ai-glow p-4 rounded-xl backdrop-blur-sm">
              <p className="text-xs font-semibold mb-2">Recommended Action:</p>
              <p className="text-xs text-indigo-100 italic">"Schedule quarterly review sessions and analyze compensation parity across mid-level roles."</p>
            </div>
          </div>
          <button className="mt-8 py-3 rounded-lg bg-secondary-container text-on-secondary-container font-headline font-bold text-xs uppercase tracking-widest hover:bg-white transition-colors">
            Deep Dive Analysis
          </button>
        </div>
      </section>

      {/* Bottom Section */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Role Distribution */}
        <div className="bg-surface-container-lowest p-8 rounded-xl shadow-sm flex flex-col">
          <h3 className="text-lg font-bold font-headline mb-6">Role Distribution</h3>
          <div className="space-y-6 flex-1">
            {roles.map((r) => (
              <div key={r.label} className="space-y-2">
                <div className="flex justify-between text-xs font-bold text-on-surface-variant">
                  <span>{r.label}</span><span>{r.pct}%</span>
                </div>
                <div className="h-2 w-full bg-surface-container-low rounded-full overflow-hidden">
                  <div className={`h-full ${r.color} rounded-full`} style={{ width: `${r.pct}%` }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activities */}
        <div className="lg:col-span-2 bg-surface-container-lowest p-8 rounded-xl shadow-sm">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-lg font-bold font-headline">Recent System Activities</h3>
            <button className="text-xs font-bold text-primary hover:underline">View All</button>
          </div>
          <div className="space-y-6">
            {activities.map((a, i) => (
              <div key={i} className="flex items-center gap-4 group">
                <div className="w-10 h-10 rounded-full bg-surface-container-low flex items-center justify-center text-on-surface-variant group-hover:bg-primary-fixed group-hover:text-primary transition-colors">
                  <span className="material-symbols-outlined">{a.icon}</span>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold">
                    {a.title}{" "}
                    {a.highlight && <span className="text-primary font-bold">{a.highlight}</span>}
                  </p>
                  <p className="text-[10px] text-on-surface-variant font-medium">{a.sub}</p>
                </div>
                <button className="p-2 text-slate-300 hover:text-on-surface transition-colors">
                  <span className="material-symbols-outlined">more_vert</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>
    </DashboardLayout>
  );
}
