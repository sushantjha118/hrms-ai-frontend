import DashboardLayout from "../../components/DashboardLayout";

const quickActions = [
  { icon: "timer", label: "Clock Out" },
  { icon: "event_note", label: "Apply Leave" },
  { icon: "payments", label: "Salary Slip" },
  { icon: "forum", label: "Feedback" },
];

const schedule = [
  { month: "Oct", day: "24", title: "Weekly Sync - Design Team", time: "10:00 AM - 11:30 AM", icon: "schedule", active: true },
  { month: "Oct", day: "25", title: "1-on-1 Performance Review", time: "02:00 PM - 02:45 PM", icon: "video_call", active: false },
  { month: "Oct", day: "28", title: "AI Workshop: Next Gen HR", time: "Conference Room B", icon: "location_on", active: false },
];

const announcements = [
  { category: "Company Update", categoryColor: "text-indigo-500", title: "New Quarterly Benefits & Health Program", desc: "We are excited to announce a range of new health and wellness benefits starting next month...", time: "2h ago" },
  { category: "Events", categoryColor: "text-secondary", title: "Hackathon 2024: Innovate with Generative AI", desc: "Join the annual engineering hackathon and win prizes up to $5000 and direct project funding.", time: "Yesterday" },
];

export default function EmployeePortal() {
  return (
    <DashboardLayout userName="Alex Rivera" userRole="Senior Product Designer">
      {/* Welcome */}
      <div className="mb-4 flex items-end justify-between">
        <div>
          <h2 className="text-3xl font-extrabold tracking-tight text-on-surface mb-2 font-headline">Welcome back, Alex</h2>
          <p className="text-on-surface-variant flex items-center gap-2">
            <span className="material-symbols-outlined text-secondary text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
            Your personalized workspace is updated with your latest performance metrics.
          </p>
        </div>
        <div className="bg-white px-4 py-2 rounded-xl shadow-sm flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
          <span className="text-sm font-semibold text-slate-700">Clocked In: 08:45 AM</span>
        </div>
      </div>

      {/* Bento Grid */}
      <div className="grid grid-cols-12 gap-6">
        {/* Stats */}
        <div className="col-span-12 lg:col-span-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-surface-container-lowest p-6 rounded-xl shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <span className="p-2 bg-indigo-50 text-primary rounded-lg"><span className="material-symbols-outlined">event_available</span></span>
              <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">+4% this month</span>
            </div>
            <div>
              <p className="text-on-surface-variant text-sm font-medium mb-1">Total Attendance</p>
              <div className="flex items-baseline gap-2">
                <h3 className="text-3xl font-extrabold text-on-surface">21</h3>
                <span className="text-on-surface-variant text-sm font-medium">/ 24 Days</span>
              </div>
            </div>
          </div>
          <div className="bg-surface-container-lowest p-6 rounded-xl shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <span className="p-2 bg-amber-50 text-amber-600 rounded-lg"><span className="material-symbols-outlined">travel</span></span>
              <span className="text-[10px] font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full">Plan by Q4</span>
            </div>
            <div>
              <p className="text-on-surface-variant text-sm font-medium mb-1">Remaining Leaves</p>
              <div className="flex items-baseline gap-2">
                <h3 className="text-3xl font-extrabold text-on-surface">08</h3>
                <span className="text-on-surface-variant text-sm font-medium">Days</span>
              </div>
            </div>
          </div>
          <div className="bg-surface-container-lowest p-6 rounded-xl shadow-sm flex flex-col justify-between border-l-4 border-indigo-600 hover:shadow-md transition-shadow relative overflow-hidden">
            <div className="flex items-center justify-between mb-4">
              <span className="p-2 bg-secondary-container text-on-secondary-container rounded-lg">
                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>psychology</span>
              </span>
              <span className="text-[10px] font-bold text-secondary bg-secondary/10 px-2 py-0.5 rounded-full">AI Analysis</span>
            </div>
            <div>
              <p className="text-on-surface-variant text-sm font-medium mb-1">Current Performance</p>
              <div className="flex items-center gap-3">
                <h3 className="text-3xl font-extrabold text-on-surface tracking-tight">92%</h3>
                <div className="px-2 py-1 bg-secondary-container/30 border border-secondary/20 rounded-md">
                  <span className="text-[10px] font-bold text-secondary uppercase tracking-tight">High Performer</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="col-span-12 lg:col-span-4 bg-surface-container-lowest p-6 rounded-xl shadow-sm border border-slate-100 flex flex-col">
          <h3 className="text-lg font-bold text-on-surface mb-4 flex items-center gap-2 font-headline">
            <span className="material-symbols-outlined text-primary">bolt</span>
            Quick Actions
          </h3>
          <div className="grid grid-cols-2 gap-3">
            {quickActions.map((a) => (
              <button key={a.label} className="flex flex-col items-center justify-center p-4 rounded-xl bg-slate-50 hover:bg-indigo-50 hover:text-indigo-700 transition-all border border-transparent hover:border-indigo-100 group">
                <span className="material-symbols-outlined mb-2 text-slate-500 group-hover:text-indigo-600">{a.icon}</span>
                <span className="text-xs font-bold">{a.label}</span>
              </button>
            ))}
          </div>
          <button className="mt-4 w-full py-3 bg-primary text-white font-bold rounded-xl text-sm flex items-center justify-center gap-2 active:scale-[0.98] transition-all">
            Apply for New Role
            <span className="material-symbols-outlined text-sm">trending_up</span>
          </button>
        </div>

        {/* Schedule */}
        <div className="col-span-12 lg:col-span-5 bg-surface-container-lowest p-6 rounded-xl shadow-sm border border-slate-100">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-on-surface font-headline">My Schedule</h3>
            <div className="flex gap-2">
              <button className="p-1 hover:bg-slate-100 rounded-md transition-colors"><span className="material-symbols-outlined text-lg">chevron_left</span></button>
              <button className="p-1 hover:bg-slate-100 rounded-md transition-colors"><span className="material-symbols-outlined text-lg">chevron_right</span></button>
            </div>
          </div>
          <div className="space-y-4">
            {schedule.map((s) => (
              <div key={s.title} className={`flex items-start gap-4 p-4 rounded-xl ${s.active ? "bg-slate-50 border-l-4 border-indigo-400" : "hover:bg-slate-50 transition-colors"}`}>
                <div className="text-center min-w-[40px]">
                  <p className="text-xs font-bold text-slate-400 uppercase">{s.month}</p>
                  <p className="text-xl font-black text-slate-900 leading-none">{s.day}</p>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-bold text-slate-900">{s.title}</p>
                  <p className="text-xs text-slate-500 flex items-center gap-1 mt-1">
                    <span className="material-symbols-outlined text-xs">{s.icon}</span>
                    {s.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Announcements */}
        <div className="col-span-12 lg:col-span-7 bg-surface-container-lowest p-6 rounded-xl shadow-sm border border-slate-100 flex flex-col">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-on-surface font-headline">Announcements & Feed</h3>
            <button className="text-primary text-xs font-bold hover:underline">View All</button>
          </div>
          <div className="space-y-6">
            {announcements.map((a) => (
              <div key={a.title} className="flex gap-4 group">
                <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-indigo-50 flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined text-2xl">campaign</span>
                </div>
                <div className="flex-1 border-b border-slate-50 pb-4">
                  <div className="flex items-center justify-between mb-1">
                    <span className={`text-[10px] font-extrabold uppercase tracking-widest ${a.categoryColor}`}>{a.category}</span>
                    <span className="text-xs text-slate-400">{a.time}</span>
                  </div>
                  <h4 className="font-bold text-slate-900 group-hover:text-primary transition-colors">{a.title}</h4>
                  <p className="text-sm text-slate-500 line-clamp-1 mt-1">{a.desc}</p>
                </div>
              </div>
            ))}
            {/* AI Insight */}
            <div className="p-4 rounded-xl bg-tertiary-container/10 border-l-4 border-tertiary">
              <div className="flex items-center gap-2 mb-2">
                <span className="material-symbols-outlined text-tertiary text-lg">auto_awesome</span>
                <span className="text-xs font-bold text-tertiary uppercase tracking-wider">AI Performance Prediction</span>
              </div>
              <p className="text-sm text-on-surface leading-relaxed">
                Based on your current trajectory, you are on track for an <span className="font-bold text-tertiary">Exceeds Expectations</span> rating this quarter.
              </p>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
