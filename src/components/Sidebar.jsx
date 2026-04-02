import { NavLink } from "react-router-dom";

const navItems = [
  { to: "/admin", icon: "dashboard", label: "Dashboard" },
  { to: "/employees", icon: "badge", label: "Employees" },
  { to: "/recruitment", icon: "person_search", label: "Recruitment" },
  { to: "/attendance", icon: "schedule", label: "Attendance" },
  { to: "/leave", icon: "event_busy", label: "Leave" },
  { to: "/performance", icon: "query_stats", label: "Performance" },
];

export default function Sidebar() {
  return (
    <aside className="fixed left-0 top-0 h-screen w-64 z-50 flex flex-col p-4 gap-y-2 bg-slate-50">
      <div className="mb-8 px-4 flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-primary-container flex items-center justify-center text-white">
          <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>auto_awesome</span>
        </div>
        <div>
          <h1 className="text-xl font-extrabold tracking-tighter text-primary font-headline">Workforce AI</h1>
          <p className="text-xs text-on-surface-variant font-medium">Management Portal</p>
        </div>
      </div>

      <nav className="flex-1 space-y-1">
        {navItems.map(({ to, icon, label }) => (
          <NavLink
            key={to}
            to={to}
            end={to === "/admin"}
            className={({ isActive }) =>
              isActive
                ? "flex items-center gap-3 px-4 py-3 bg-white text-indigo-700 rounded-lg shadow-sm border-l-4 border-indigo-600 font-medium"
                : "flex items-center gap-3 px-4 py-3 text-slate-500 hover:text-indigo-600 hover:translate-x-1 transition-transform duration-200 font-medium"
            }
          >
            <span className="material-symbols-outlined">{icon}</span>
            <span className="font-headline">{label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="mt-auto pt-6 space-y-1">
        <button className="w-full mb-4 py-3 px-4 rounded-xl bg-gradient-to-br from-primary to-primary-container text-white font-headline font-bold text-sm shadow-lg hover:opacity-90 transition-opacity flex items-center justify-center gap-2">
          <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>bolt</span>
          Launch AI Audit
        </button>
        <a href="#support" className="flex items-center gap-3 px-4 py-3 text-slate-500 hover:text-indigo-600 transition-colors font-medium">
          <span className="material-symbols-outlined">help</span>
          <span className="font-headline">Support</span>
        </a>
        <a href="#settings" className="flex items-center gap-3 px-4 py-3 text-slate-500 hover:text-indigo-600 transition-colors font-medium">
          <span className="material-symbols-outlined">settings</span>
          <span className="font-headline">Settings</span>
        </a>
      </div>
    </aside>
  );
}
