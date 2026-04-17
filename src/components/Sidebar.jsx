import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const navConfig = {
  admin: [
    { to: "/admin",       icon: "dashboard",        label: "Dashboard" },
    { to: "/users",       icon: "manage_accounts",  label: "User Management" },
    { to: "/employees",   icon: "badge",            label: "Employees" },
    { to: "/recruitment", icon: "person_search",    label: "Recruitment" },
    { to: "/attendance",  icon: "schedule",         label: "Attendance" },
    { to: "/leave",       icon: "event_busy",       label: "Leave" },
    { to: "/performance", icon: "query_stats",      label: "Performance" },
  ],
  hr: [
    { to: "/hr",          icon: "dashboard",        label: "HR Overview" },
    { to: "/employees",   icon: "badge",            label: "Employee Directory" },
    { to: "/recruitment", icon: "person_search",    label: "Recruitment" },
    { to: "/attendance",  icon: "schedule",         label: "Attendance" },
    { to: "/leave",       icon: "event_busy",       label: "Leave" },
    { to: "/performance", icon: "query_stats",      label: "Performance" },
  ],
  employee: [
    { to: "/employee",    icon: "person",           label: "My Portal" },
    { to: "/employees",   icon: "badge",            label: "Employee Directory" },
    { to: "/attendance",  icon: "schedule",         label: "My Attendance" },
    { to: "/leave",       icon: "event_busy",       label: "Apply Leave" },
    { to: "/performance", icon: "query_stats",      label: "My Performance" },
  ],
  candidate: [
    { to: "/candidate",   icon: "work_outline",     label: "Job Board" },
  ],
};

const roleLabels = {
  admin: "Admin Portal", hr: "HR Portal",
  employee: "Employee Portal", candidate: "Candidate Portal",
};

export default function Sidebar({ collapsed, onToggle }) {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const role = user?.role || localStorage.getItem("userRole") || "employee";
  const navItems = navConfig[role] || navConfig.employee;

  const handleLogout = () => { logout(); navigate("/login"); };

  const activeClass = collapsed
    ? "flex items-center justify-center p-3 bg-surface-container-lowest text-primary rounded-lg shadow-sm border-l-4 border-primary"
    : "flex items-center gap-3 px-4 py-3 bg-surface-container-lowest text-primary rounded-lg shadow-sm border-l-4 border-primary font-medium";

  const inactiveClass = collapsed
    ? "flex items-center justify-center p-3 text-on-surface-variant hover:text-primary transition-colors duration-200"
    : "flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:text-primary hover:translate-x-1 transition-transform duration-200 font-medium";

  return (
    <aside className={`fixed left-0 top-0 h-screen z-50 flex flex-col p-4 gap-y-2 bg-surface-container-low transition-all duration-300 ${collapsed ? "w-16" : "w-64"}`}>
      {/* Logo + toggle */}
      <div className={`mb-6 flex items-center ${collapsed ? "justify-center" : "justify-between px-2"}`}>
        {!collapsed && (
          <div className="flex items-center gap-3">
            <img src="/assets/images/hrms-ai-logo.png" alt="HRMS AI" className="w-9 h-9 rounded-xl object-contain" />
            <div>
              <h1 className="text-xl font-extrabold tracking-tighter text-primary font-headline">HRMS AI</h1>
              <p className="text-xs text-on-surface-variant font-medium">{roleLabels[role]}</p>
            </div>
          </div>
        )}
        <button
          onClick={onToggle}
          className="p-1.5 rounded-lg text-on-surface-variant hover:text-primary hover:bg-surface-container transition-colors"
          title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          <span className="material-symbols-outlined text-xl">
            {collapsed ? "chevron_right" : "chevron_left"}
          </span>
        </button>
      </div>

      {/* Logo icon only when collapsed */}
      {collapsed && (
        <div className="flex justify-center mb-2">
          <img src="/assets/images/hrms-ai-logo.png" alt="HRMS AI" className="w-8 h-8 rounded-xl object-contain" />
        </div>
      )}

      <nav className="flex-1 space-y-1">
        {navItems.map(({ to, icon, label }) => (
          <NavLink key={to} to={to}
            end={["/admin", "/hr", "/employee", "/candidate"].includes(to)}
            title={collapsed ? label : undefined}
            className={({ isActive }) => isActive ? activeClass : inactiveClass}
          >
            <span className="material-symbols-outlined">{icon}</span>
            {!collapsed && <span className="font-headline">{label}</span>}
          </NavLink>
        ))}
      </nav>

      <div className="mt-auto pt-4 space-y-1">
        <NavLink to="/settings"
          title={collapsed ? "Settings" : undefined}
          className={({ isActive }) => isActive ? activeClass : inactiveClass}
        >
          <span className="material-symbols-outlined">settings</span>
          {!collapsed && <span className="font-headline">Settings</span>}
        </NavLink>
        <button onClick={handleLogout}
          title={collapsed ? "Logout" : undefined}
          className={`w-full text-on-surface-variant hover:text-error transition-colors font-medium ${collapsed ? "flex items-center justify-center p-3" : "flex items-center gap-3 px-4 py-3"}`}
        >
          <span className="material-symbols-outlined">logout</span>
          {!collapsed && <span className="font-headline">Logout</span>}
        </button>
        {!collapsed && <p className="text-[10px] text-outline text-center pt-3 pb-1">HRMS AI v1.0 · 2024</p>}
      </div>
    </aside>
  );
}
