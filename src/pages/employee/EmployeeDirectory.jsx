import { useEffect, useState } from "react";
import DashboardLayout from "../../components/DashboardLayout";
import { useAuth } from "../../context/AuthContext";
import api from "../../services/api";

export default function EmployeeDirectory() {
  const { user }    = useAuth();
  const isHR        = user?.role === "admin" || user?.role === "hr";
  const [employees, setEmployees] = useState([]);
  const [depts,     setDepts]     = useState([]);
  const [loading,   setLoading]   = useState(true);
  const [search,    setSearch]    = useState("");
  const [deptFilter,setDeptFilter]= useState("");

  useEffect(() => {
    if (isHR) {
      Promise.all([api.get("/employees"), api.get("/departments")])
        .then(([emp, dept]) => { setEmployees(emp.data); setDepts(dept.data); })
        .finally(() => setLoading(false));
    } else {
      // Non-HR: only departments available; employees list is restricted
      api.get("/departments")
        .then((dept) => setDepts(dept.data))
        .catch(() => {})
        .finally(() => setLoading(false));
    }
  }, [isHR]);

  const filtered = employees.filter((e) => {
    const matchSearch = !search || e.name?.toLowerCase().includes(search.toLowerCase()) || e.designation?.toLowerCase().includes(search.toLowerCase());
    const matchDept   = !deptFilter || e.department === deptFilter;
    return matchSearch && matchDept;
  });

  return (
    <DashboardLayout>
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-2 gap-4">
        <div>
          <h2 className="text-3xl font-extrabold tracking-tight text-on-surface mb-1 font-headline">Employee Directory</h2>
          <p className="text-on-surface-variant font-medium">Manage and explore your organization's talent ecosystem.</p>
        </div>
        <div className="flex gap-4">
          {[{ icon: "group", label: "Total Staff", value: employees.length, color: "bg-primary/10 text-primary" },
            { icon: "bolt",  label: "Active",      value: employees.filter(e=>e.status==="active").length, color: "bg-secondary/10 text-secondary" }
          ].map((s) => (
            <div key={s.label} className="bg-surface-container-lowest p-4 rounded-xl shadow-sm border border-outline-variant/10 flex items-center gap-4 min-w-[160px]">
              <div className={`w-10 h-10 rounded-full ${s.color} flex items-center justify-center`}>
                <span className="material-symbols-outlined">{s.icon}</span>
              </div>
              <div>
                <p className="text-[11px] font-bold text-on-surface-variant uppercase tracking-widest">{s.label}</p>
                <p className="text-2xl font-bold tracking-tight">{s.value}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex gap-8">
        <aside className="w-64 flex-shrink-0 space-y-4">
          <div className="bg-surface-container-lowest rounded-2xl p-6 shadow-sm border border-outline-variant/10">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-on-surface font-headline">Filters</h3>
              <button onClick={() => { setSearch(""); setDeptFilter(""); }} className="text-xs font-semibold text-primary hover:underline">Reset</button>
            </div>
            <div className="relative mb-4">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-sm">search</span>
              <input value={search} onChange={e => setSearch(e.target.value)}
                className="w-full pl-9 pr-3 py-2 bg-surface-container-low border-none rounded-lg text-sm focus:ring-2 ring-primary outline-none"
                placeholder="Search name..." />
            </div>
            <label className="text-[11px] font-bold text-on-surface-variant uppercase tracking-widest mb-2 block">Department</label>
            <div className="space-y-2">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="radio" name="dept" checked={deptFilter === ""} onChange={() => setDeptFilter("")} className="text-primary" />
                <span className="text-sm text-on-surface-variant">All</span>
              </label>
              {depts.map((d) => (
                <label key={d.id} className="flex items-center gap-2 cursor-pointer">
                  <input type="radio" name="dept" checked={deptFilter === d.name} onChange={() => setDeptFilter(d.name)} className="text-primary" />
                  <span className="text-sm text-on-surface-variant">{d.name}</span>
                </label>
              ))}
            </div>
          </div>
        </aside>

        <div className="flex-1">
          {loading ? (
            <div className="flex items-center justify-center h-64">
              <span className="material-symbols-outlined animate-spin text-4xl text-primary">progress_activity</span>
            </div>
          ) : !isHR ? (
            <div className="flex flex-col items-center justify-center h-64 text-center">
              <span className="material-symbols-outlined text-5xl text-outline mb-4">lock</span>
              <h3 className="font-headline font-bold text-lg text-on-surface mb-2">Access Restricted</h3>
              <p className="text-on-surface-variant text-sm max-w-sm">The full employee directory is only available to HR and Admin users. Contact your HR team for employee information.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filtered.map((emp) => (
                <div key={emp.id} className="bg-surface-container-lowest rounded-2xl p-6 shadow-sm border border-outline-variant/10 group hover:shadow-md transition-all duration-300">
                  <div className="flex items-start justify-between mb-4">
                    <div className="relative">
                      <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center text-primary font-bold text-xl">
                        {emp.name?.charAt(0)}
                      </div>
                      <div className={`absolute -bottom-1 -right-1 w-4 h-4 ${emp.status === "active" ? "bg-emerald-500" : "bg-outline"} border-2 border-surface-container-lowest rounded-full`}></div>
                    </div>
                    <button className="p-2 text-on-surface-variant hover:text-primary transition-colors">
                      <span className="material-symbols-outlined">more_horiz</span>
                    </button>
                  </div>
                  <div className="mb-4">
                    <h4 className="text-lg font-bold text-on-surface">{emp.name}</h4>
                    <p className="text-sm font-semibold text-primary">{emp.designation}</p>
                    <p className="text-[11px] font-bold text-on-surface-variant uppercase tracking-widest mt-1">{emp.department}</p>
                    {emp.location && <p className="text-xs text-on-surface-variant mt-1 flex items-center gap-1"><span className="material-symbols-outlined text-xs">location_on</span>{emp.location}</p>}
                  </div>
                  {emp.skills?.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {emp.skills.slice(0, 3).map((s) => (
                        <span key={s} className="px-2 py-0.5 bg-surface-container text-[10px] font-bold rounded text-on-surface-variant">{s}</span>
                      ))}
                      {emp.skills.length > 3 && <span className="px-2 py-0.5 bg-surface-container text-[10px] font-bold rounded text-on-surface-variant">+{emp.skills.length - 3}</span>}
                    </div>
                  )}
                  <div className="pt-4 border-t border-outline-variant/10 flex items-center justify-between">
                    <span className={`text-xs font-bold capitalize ${emp.status === "active" ? "text-emerald-600" : "text-on-surface-variant"}`}>{emp.status}</span>
                    <span className="text-xs text-on-surface-variant">{emp.employment_type}</span>
                  </div>
                </div>
              ))}
              {filtered.length === 0 && (
                <div className="col-span-3 text-center py-16 text-on-surface-variant">No employees found.</div>
              )}
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
