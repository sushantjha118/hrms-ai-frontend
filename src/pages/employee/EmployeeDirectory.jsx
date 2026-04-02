import DashboardLayout from "../../components/DashboardLayout";

const employees = [
  { name: "Alex Rivera", role: "Senior Software Engineer", dept: "Product Engineering", deptIcon: "layers", skills: ["TypeScript", "Kubernetes", "+3"], status: "online" },
  { name: "Maya Chen", role: "Senior Product Designer", dept: "Experience Team", deptIcon: "palette", skills: ["Figma", "Prototyping", "User Research"], status: "online", badge: "High Performer" },
  { name: "Jordan Smyth", role: "HR Business Partner", dept: "People & Culture", deptIcon: "supervised_user_circle", skills: ["Employee Relations", "Coaching"], status: "away", statusLabel: "Away (Vacation)" },
  { name: "Elena Vasquez", role: "Head of Marketing", dept: "Growth & Brand", deptIcon: "campaign", skills: ["Strategy", "Analytics"], status: "online" },
  { name: "Thomas Wright", role: "Sales Operations Lead", dept: "Global Sales", deptIcon: "payments", skills: ["Salesforce", "Forecasting"], status: "online" },
];

const statusColors = { online: "bg-emerald-500", away: "bg-amber-400" };

export default function EmployeeDirectory() {
  return (
    <DashboardLayout userName="Sarah Jenkins" userRole="HR Director">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-2 gap-4">
        <div>
          <h2 className="text-3xl font-extrabold tracking-tight text-on-surface mb-1 font-headline">Employee Directory</h2>
          <p className="text-on-surface-variant font-medium">Manage and explore your organization's talent ecosystem.</p>
        </div>
        <div className="flex gap-4">
          {[{ icon: "group", label: "Total Staff", value: "1,248", color: "bg-primary/10 text-primary" }, { icon: "bolt", label: "New Hires", value: "24", color: "bg-secondary/10 text-secondary" }].map((s) => (
            <div key={s.label} className="bg-surface-container-lowest p-4 rounded-xl shadow-sm border border-slate-50 flex items-center gap-4 min-w-[180px]">
              <div className={`w-10 h-10 rounded-full ${s.color} flex items-center justify-center`}>
                <span className="material-symbols-outlined">{s.icon}</span>
              </div>
              <div>
                <p className="text-[11px] font-bold text-slate-500 uppercase tracking-widest">{s.label}</p>
                <p className="text-2xl font-bold tracking-tight">{s.value}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex gap-8">
        {/* Filters Sidebar */}
        <aside className="w-72 flex-shrink-0 space-y-6">
          <div className="bg-surface-container-lowest rounded-2xl p-6 shadow-sm border border-slate-50">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-bold text-on-surface font-headline">Filters</h3>
              <button className="text-xs font-semibold text-primary hover:underline">Reset</button>
            </div>
            {/* Department */}
            <div className="mb-6">
              <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-3 block">Department</label>
              <div className="space-y-2">
                {[{ label: "Engineering", count: 42, checked: true }, { label: "Product Design", count: 18 }, { label: "Marketing", count: 31 }, { label: "Sales", count: 55 }].map((d) => (
                  <label key={d.label} className="flex items-center gap-3 cursor-pointer group">
                    <input defaultChecked={d.checked} className="w-4 h-4 rounded text-primary focus:ring-primary border-slate-200" type="checkbox" />
                    <span className="text-sm text-on-surface-variant group-hover:text-on-surface transition-colors">{d.label}</span>
                    <span className="ml-auto text-[10px] font-bold px-1.5 py-0.5 bg-slate-100 rounded text-slate-500">{d.count}</span>
                  </label>
                ))}
              </div>
            </div>
            {/* Location */}
            <div className="mb-6">
              <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-3 block">Location</label>
              <select className="w-full bg-surface-container-low border-none rounded-lg text-sm p-2.5 focus:ring-2 ring-primary">
                <option>All Locations</option>
                <option>San Francisco, CA</option>
                <option>New York, NY</option>
                <option>Remote - Global</option>
                <option>London, UK</option>
              </select>
            </div>
            {/* Skills */}
            <div>
              <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-3 block">Skill Tags</label>
              <div className="flex flex-wrap gap-2">
                {["React", "Python", "UI Design", "AWS", "Growth", "Node.js"].map((skill, i) => (
                  <button key={skill} className={`px-2.5 py-1 text-[10px] font-bold rounded-full border ${i === 0 ? "bg-primary/10 text-primary border-primary/20" : "bg-slate-100 text-slate-600 border-slate-200 hover:border-primary/30 transition-colors"}`}>
                    {skill}
                  </button>
                ))}
              </div>
            </div>
          </div>
          {/* AI Tip */}
          <div className="bg-tertiary-container/10 border-l-4 border-tertiary rounded-xl p-5 relative overflow-hidden">
            <p className="text-xs font-bold text-tertiary mb-2 flex items-center gap-2">
              <span className="material-symbols-outlined text-sm">psychology</span>
              AI RECRUITMENT TIP
            </p>
            <p className="text-xs text-on-surface-variant leading-relaxed font-medium">
              Engineering team has high skill density in Frontend. Consider hiring specialized <span className="text-tertiary font-bold">DevOps</span> for upcoming projects.
            </p>
          </div>
        </aside>

        {/* Employee Grid */}
        <div className="flex-1">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {employees.map((emp) => (
              <div key={emp.name} className="bg-surface-container-lowest rounded-2xl p-6 shadow-sm border border-slate-50 group hover:shadow-md transition-all duration-300">
                <div className="flex items-start justify-between mb-4">
                  <div className="relative">
                    <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center text-primary font-bold text-xl">
                      {emp.name.charAt(0)}
                    </div>
                    <div className={`absolute -bottom-1 -right-1 w-4 h-4 ${statusColors[emp.status]} border-2 border-white rounded-full`}></div>
                  </div>
                  <button className="p-2 text-slate-400 hover:text-primary transition-colors">
                    <span className="material-symbols-outlined">more_horiz</span>
                  </button>
                </div>
                <div className="mb-4">
                  <h4 className="text-lg font-bold text-on-surface">{emp.name}</h4>
                  <p className="text-sm font-semibold text-primary">{emp.role}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="material-symbols-outlined text-[14px] text-slate-400">{emp.deptIcon}</span>
                    <p className="text-[11px] font-bold text-slate-500 uppercase tracking-widest">{emp.dept}</p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {emp.skills.map((s) => (
                    <span key={s} className="px-2 py-0.5 bg-slate-100 text-[10px] font-bold rounded text-slate-600">{s}</span>
                  ))}
                </div>
                <div className="pt-4 border-t border-slate-50 flex items-center justify-between">
                  <a href="#profile" className="text-sm font-bold text-primary flex items-center gap-1 group/link">
                    View Profile
                    <span className="material-symbols-outlined text-sm group-hover/link:translate-x-1 transition-transform">arrow_forward</span>
                  </a>
                  {emp.badge && (
                    <div className="bg-secondary/10 px-2 py-1 rounded flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-secondary text-[12px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                      <span className="text-[10px] font-bold text-secondary">{emp.badge}</span>
                    </div>
                  )}
                  {emp.statusLabel && <span className="text-[10px] font-bold text-slate-400 italic">{emp.statusLabel}</span>}
                </div>
              </div>
            ))}

            {/* New Vacancy Card */}
            <div className="bg-primary/5 rounded-2xl p-6 shadow-sm border-dashed border-2 border-primary/10 group hover:shadow-md transition-all duration-300 flex flex-col items-center justify-center text-center">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-3">
                <span className="material-symbols-outlined text-3xl">person_add</span>
              </div>
              <h4 className="font-bold text-on-surface">New Vacancy</h4>
              <p className="text-xs text-on-surface-variant mb-4 px-4 leading-relaxed">Our AI suggests a Frontend Specialist for the 'Experience' team based on current workload.</p>
              <button className="bg-primary text-white px-4 py-2 rounded-lg text-xs font-bold shadow-lg shadow-primary/20 hover:scale-[1.02] transition-transform">
                Open Position
              </button>
            </div>
          </div>

          {/* Pagination */}
          <div className="mt-12 flex items-center justify-between">
            <p className="text-sm text-on-surface-variant font-medium">Showing <span className="font-bold text-on-surface">1</span> to <span className="font-bold text-on-surface">12</span> of <span className="font-bold text-on-surface">1,248</span> employees</p>
            <div className="flex gap-2">
              <button className="w-10 h-10 flex items-center justify-center rounded-xl bg-surface-container-lowest border border-slate-100 text-slate-400 hover:text-primary transition-colors">
                <span className="material-symbols-outlined">chevron_left</span>
              </button>
              {[1, 2, 3].map((p) => (
                <button key={p} className={`w-10 h-10 flex items-center justify-center rounded-xl font-bold ${p === 1 ? "bg-primary text-white shadow-lg shadow-primary/20" : "bg-surface-container-lowest border border-slate-100 text-slate-600 hover:bg-slate-50"}`}>{p}</button>
              ))}
              <span className="w-10 h-10 flex items-center justify-center text-slate-400">...</span>
              <button className="w-10 h-10 flex items-center justify-center rounded-xl bg-surface-container-lowest border border-slate-100 text-slate-400 hover:text-primary transition-colors">
                <span className="material-symbols-outlined">chevron_right</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
