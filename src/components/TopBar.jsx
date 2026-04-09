import { useTheme } from "../context/ThemeContext";
import { useAuth } from "../context/AuthContext";

const roleBadgeConfig = {
  admin:     { label: "Admin",     color: "bg-primary/10 text-primary" },
  hr:        { label: "HR",        color: "bg-secondary/10 text-secondary" },
  employee:  { label: "Employee",  color: "bg-tertiary/10 text-tertiary" },
  candidate: { label: "Candidate", color: "bg-slate-100 text-slate-600" },
};

export default function TopBar({ userRole = "" }) {
  const { dark, toggle } = useTheme();
  const { user } = useAuth();

  const name  = user?.name  || "User";
  const role  = user?.role  || localStorage.getItem("userRole") || "employee";
  const badge = roleBadgeConfig[role] || roleBadgeConfig.employee;

  return (
    <header className="flex items-center justify-between px-8 h-16 sticky top-0 z-40 bg-surface-container-lowest/80 backdrop-blur-md border-b border-outline-variant/20 shadow-sm">
      <div className="flex items-center gap-8">
        <div className="relative group">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline">search</span>
          <input className="pl-10 pr-4 py-2 bg-surface-container-low border-none rounded-full w-80 text-sm focus:ring-2 focus:ring-primary/20 transition-all"
            placeholder="Search analytics, employees..." type="text" />
        </div>
        <nav className="hidden md:flex gap-6">
          <a href="#analytics" className="text-primary font-semibold border-b-2 border-primary text-sm font-headline tracking-tight">Analytics</a>
          <a href="#reports" className="text-on-surface-variant hover:text-on-surface text-sm font-headline tracking-tight transition-colors">Reports</a>
        </nav>
      </div>

      <div className="flex items-center gap-4">
        <button onClick={toggle} className="p-2 text-on-surface-variant hover:bg-surface-container rounded-full transition-colors" title="Toggle theme">
          <span className="material-symbols-outlined">{dark ? "light_mode" : "dark_mode"}</span>
        </button>
        <button className="p-2 text-on-surface-variant hover:bg-surface-container rounded-full transition-colors relative">
          <span className="material-symbols-outlined">notifications</span>
          <span className="absolute top-2 right-2 w-2 h-2 bg-error rounded-full border-2 border-surface-container-lowest"></span>
        </button>
        <button className="p-2 text-on-surface-variant hover:bg-surface-container rounded-full transition-colors">
          <span className="material-symbols-outlined">chat_bubble</span>
        </button>
        <div className="h-8 w-[1px] bg-outline-variant/30 mx-2"></div>
        <div className="flex items-center gap-3 pl-2">
          <div className="text-right">
            <p className="text-xs font-bold text-on-surface font-headline uppercase tracking-wider">{name}</p>
            <p className="text-[10px] text-on-surface-variant font-medium">{userRole || role}</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
            {name.charAt(0).toUpperCase()}
          </div>
          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${badge.color}`}>{badge.label}</span>
        </div>
      </div>
    </header>
  );
}
