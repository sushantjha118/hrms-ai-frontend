import { NavLink, useNavigate } from "react-router-dom";

const navConfig = {
  admin: [
    { to: "/admin", icon: "dashboard", label: "Dashboard" },
    { to: "/users", icon: "manage_accounts", label: "User Management" },
    { to: "/employees", icon: "badge", label: "Employees" },
    { to: "/recruitment", icon: "person_search", label: "Recruitment" },
    { to: "/attendance", icon: "schedule", label: "Attendance" },
    { to: "/leave", icon: "event_busy", label: "Leave" },
    { to: "/performance", icon: "query_stats", label: "Performance" },
  ],
  hr: [
    { to: "/hr", icon: "dashboard", label: "HR Overview" },
    { to: "/employees", icon: "badge", label: "Employee Directory" },
    { to: "/recruitment", icon: "person_search", label: "Recruitment" },
    { to: "/attendance", icon: "schedule", label: "Attendance" },
    { to: "/leave", icon: "event_busy", label: "Leave" },
    { to: "/performance", icon: "query_stats", label: "Performance" },
  ],
  employee: [
    { to: "/employee", icon: "person", label: "My Portal" },
    { to: "/employees", icon: "badge", label: "Employee Directory" },
    { to: "/attendance", icon: "schedule", label: "My Attendance" },
    { to: "/leave", icon: "event_busy", label: "Apply Leave" },
    { to: "/performance", icon: "query_stats", label: "My Performance" },
  ],
  candidate: [
    { to: "/candidate", icon: "work_outline", label: "Job Board" },
  ],
};

const roleLabels = {
  admin: "Admin Portal",
  hr: "HR Portal",
  employee: "Employee Portal",
  candidate: "Candidate Portal",
};

export default function Sidebar() {
  const navigate = useNavigate();
  const role = localStorage.getItem("userRole") || "employee";
  const navItems = navConfig[role] || navConfig.employee;

  const handleLogout = () => {
    localStorage.removeItem("userRole");
    navigate("/login");
  };

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 z-50 flex flex-col p-4 gap-y-2 bg-surface-container-low">
      <div className="mb-8 px-4 flex items-center gap-3">
        <img src="/assets/images/hrms-ai-logo.png" alt="HRMS AI" className="w-10 h-10 rounded-xl object-contain" />
        <div>
          <h1 className="text-xl font-extrabold tracking-tighter text-primary font-headline">HRMS AI</h1>
          <p className="text-xs text-on-surface-variant font-medium">{roleLabels[role]}</p>
        </div>
      </div>

      <nav className="flex-1 space-y-1">
        {navItems.map(({ to, icon, label }) => (
          <NavLink
            key={to}
            to={to}
            end={to === "/admin" || to === "/hr" || to === "/employee" || to === "/candidate"}
            className={({ isActive }) =>
              isActive
                ? "flex items-center gap-3 px-4 py-3 bg-surface-container-lowest text-primary rounded-lg shadow-sm border-l-4 border-primary font-medium"
                : "flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:text-primary hover:translate-x-1 transition-transform duration-200 font-medium"
            }
          >
            <span className="material-symbols-outlined">{icon}</span>
            <span className="font-headline">{label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="mt-auto pt-6 space-y-1">
        {role === "admin" && (
          <button className="w-full mb-4 py-3 px-4 rounded-xl bg-gradient-to-br from-primary to-primary-container text-on-primary font-headline font-bold text-sm shadow-lg hover:opacity-90 transition-opacity flex items-center justify-center gap-2">
            <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>bolt</span>
            Launch AI Audit
          </button>
        )}
        <a href="#settings" className="flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:text-primary transition-colors font-medium">
          <span className="material-symbols-outlined">settings</span>
          <span className="font-headline">Settings</span>
        </a>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:text-error transition-colors font-medium"
        >
          <span className="material-symbols-outlined">logout</span>
          <span className="font-headline">Logout</span>
        </button>
      </div>
    </aside>
  );
}
