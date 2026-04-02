import DashboardLayout from "../../components/DashboardLayout";

const stats = [
  { label: "Total Users", value: "1,284", icon: "groups", color: "bg-primary/5 text-primary" },
  { label: "Active Now", value: "842", icon: "bolt", color: "bg-secondary/5 text-secondary", border: "border-l-4 border-secondary", valueColor: "text-secondary" },
  { label: "New this month", value: "42", icon: "trending_up", color: "bg-tertiary/5 text-tertiary" },
  { label: "Avg Engagement", value: "92%", icon: "monitoring", color: "bg-indigo-50 text-indigo-400" },
];

const users = [
  { initials: "SM", bg: "bg-indigo-100 text-primary", name: "Sarah Miller", email: "sarah.m@HRMS.ai", role: "Senior Designer", roleBg: "bg-indigo-50 text-primary", dept: "Product Design", status: "Active", statusColor: "text-secondary", dot: "bg-secondary", lastActive: "2 mins ago" },
  { initials: "JH", bg: "bg-teal-100 text-teal-600", name: "James Huang", email: "j.huang@HRMS.ai", role: "Tech Lead", roleBg: "bg-slate-100 text-slate-600", dept: "Engineering", status: "Active", statusColor: "text-secondary", dot: "bg-secondary", lastActive: "14 mins ago" },
  { initials: "EP", bg: "bg-amber-100 text-amber-600", name: "Elena Petrov", email: "elena.p@HRMS.ai", role: "Strategist", roleBg: "bg-indigo-50 text-primary", dept: "Marketing", status: "Pending", statusColor: "text-tertiary", dot: "bg-tertiary", lastActive: "Never" },
  { initials: "DW", bg: "bg-slate-200 text-slate-500", name: "David Wilson", email: "d.wilson@HRMS.ai", role: "Analyst", roleBg: "bg-slate-100 text-slate-600", dept: "Finance", status: "Inactive", statusColor: "text-slate-500", dot: "bg-slate-300", lastActive: "3 days ago" },
];

export default function UserManagement() {
  return (
    <DashboardLayout userName="Alex Rivera" userRole="Administrator">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <nav className="flex items-center gap-2 text-xs font-medium text-slate-400 mb-2">
            <span>Organization</span>
            <span className="material-symbols-outlined text-[14px]">chevron_right</span>
            <span className="text-primary">Employees</span>
          </nav>
          <h2 className="text-3xl font-extrabold font-headline tracking-tight text-on-surface">User Management</h2>
          <p className="text-on-surface-variant mt-1 text-sm max-w-md">Orchestrate your workforce permissions and monitor engagement across all departments.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-surface-container-highest text-on-surface font-semibold text-sm hover:bg-slate-200 transition-colors">
            <span className="material-symbols-outlined text-[20px]">file_download</span> Export
          </button>
          <button className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-primary to-primary-container text-white font-bold text-sm shadow-lg shadow-indigo-100 hover:scale-[0.98] transition-all">
            <span className="material-symbols-outlined text-[20px]">person_add</span> Add User
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {stats.map((s) => (
          <div key={s.label} className={`bg-surface-container-lowest p-5 rounded-xl flex items-center justify-between ${s.border || ""}`}>
            <div>
              <p className="text-xs font-semibold text-slate-500 mb-1">{s.label}</p>
              <h4 className={`text-2xl font-bold font-headline ${s.valueColor || ""}`}>{s.value}</h4>
            </div>
            <div className={`w-10 h-10 rounded-lg ${s.color} flex items-center justify-center`}>
              <span className="material-symbols-outlined">{s.icon}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Table Card */}
      <div className="bg-surface-container-lowest rounded-2xl overflow-hidden shadow-sm">
        {/* Filters */}
        <div className="p-6 flex flex-col md:flex-row md:items-center gap-4 justify-between border-b border-slate-50">
          <div className="flex items-center gap-2">
            {["All Users", "Administrators", "Editors"].map((f, i) => (
              <button key={f} className={`px-4 py-2 rounded-lg text-xs font-bold ${i === 0 ? "bg-indigo-50 text-primary" : "text-slate-500 hover:bg-slate-50"}`}>{f}</button>
            ))}
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <select className="appearance-none bg-surface-container-low border-none rounded-lg py-2 pl-4 pr-10 text-xs font-semibold text-on-surface focus:ring-2 focus:ring-primary/10 transition-all cursor-pointer">
                <option>Filter by Role</option>
                <option>Engineering</option>
                <option>Design</option>
                <option>Marketing</option>
              </select>
              <span className="material-symbols-outlined absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none text-sm">expand_more</span>
            </div>
            <div className="relative">
              <select className="appearance-none bg-surface-container-low border-none rounded-lg py-2 pl-4 pr-10 text-xs font-semibold text-on-surface focus:ring-2 focus:ring-primary/10 transition-all cursor-pointer">
                <option>Filter by Status</option>
                <option>Active</option>
                <option>Inactive</option>
                <option>Pending</option>
              </select>
              <span className="material-symbols-outlined absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none text-sm">expand_more</span>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-container-low/30">
                {["Name", "Role", "Department", "Status", "Last Active", "Actions"].map((h) => (
                  <th key={h} className={`px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest ${h === "Actions" ? "text-right" : ""}`}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {users.map((u) => (
                <tr key={u.name} className="group hover:bg-slate-50/80 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <input className="rounded text-primary focus:ring-primary/20 border-slate-200" type="checkbox" />
                      <div className={`w-9 h-9 rounded-full ${u.bg} flex items-center justify-center font-bold text-xs`}>{u.initials}</div>
                      <div>
                        <p className="text-sm font-bold text-on-surface">{u.name}</p>
                        <p className="text-xs text-slate-400">{u.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-full ${u.roleBg} text-[10px] font-bold uppercase`}>{u.role}</span>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm text-on-surface-variant font-medium">{u.dept}</p>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <span className={`w-2 h-2 rounded-full ${u.dot}`}></span>
                      <span className={`text-xs font-semibold ${u.statusColor}`}>{u.status}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-xs text-on-surface-variant">{u.lastActive}</p>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="p-2 text-slate-300 hover:text-primary transition-colors">
                      <span className="material-symbols-outlined">more_vert</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="px-6 py-4 border-t border-slate-50 flex items-center justify-between">
          <p className="text-xs text-slate-400 font-medium">Showing <span className="text-on-surface font-bold">1-4</span> of <span className="text-on-surface font-bold">1,284</span> users</p>
          <div className="flex items-center gap-1">
            <button className="p-1.5 rounded-lg text-slate-300 hover:text-primary transition-colors">
              <span className="material-symbols-outlined">chevron_left</span>
            </button>
            {[1, 2, 3].map((p) => (
              <button key={p} className={`px-3 py-1 rounded-lg text-xs font-bold transition-colors ${p === 1 ? "bg-primary text-white shadow-sm" : "text-slate-500 hover:bg-slate-50"}`}>{p}</button>
            ))}
            <button className="p-1.5 rounded-lg text-slate-400 hover:text-primary transition-colors">
              <span className="material-symbols-outlined">chevron_right</span>
            </button>
          </div>
        </div>
      </div>

      {/* AI Insight */}
      <div className="bg-surface-container-low/50 p-6 rounded-2xl border-l-4 border-tertiary flex items-start gap-5">
        <div className="w-12 h-12 rounded-xl bg-tertiary-container/10 flex items-center justify-center flex-shrink-0">
          <span className="material-symbols-outlined text-tertiary" style={{ fontVariationSettings: "'FILL' 1" }}>auto_awesome</span>
        </div>
        <div>
          <h5 className="text-sm font-bold text-on-surface mb-1">AI Talent Optimization Insight</h5>
          <p className="text-sm text-on-surface-variant leading-relaxed">We noticed a 15% drop in platform activity within the <span className="text-tertiary font-bold">Product Design</span> team this week. Suggest scheduling a sync or checking if team members require additional resource access.</p>
          <button className="mt-3 text-xs font-bold text-tertiary flex items-center gap-1 hover:underline">
            View Detailed Analytics <span className="material-symbols-outlined text-sm">arrow_forward</span>
          </button>
        </div>
      </div>
    </DashboardLayout>
  );
}
