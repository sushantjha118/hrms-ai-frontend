import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { useAuth } from "../context/AuthContext";

const roleBadgeConfig = {
  admin:     { label: "Admin",     color: "bg-primary/10 text-primary" },
  hr:        { label: "HR",        color: "bg-secondary/10 text-secondary" },
  employee:  { label: "Employee",  color: "bg-tertiary/10 text-tertiary" },
  candidate: { label: "Candidate", color: "bg-surface-container text-on-surface-variant" },
};

const NOTIFICATIONS = [
  { id: 1, icon: "event_busy",   color: "text-amber-500",  title: "Leave request pending",       sub: "Marcus Chen — 5 days vacation",        time: "2m ago",  unread: true },
  { id: 2, icon: "person_add",   color: "text-primary",    title: "New candidate applied",        sub: "Jordan Lee — Senior Frontend Architect", time: "18m ago", unread: true },
  { id: 3, icon: "check_circle", color: "text-secondary",  title: "Leave approved",               sub: "Elena Rodriguez — Sick leave",          time: "1h ago",  unread: true },
  { id: 4, icon: "query_stats",  color: "text-tertiary",   title: "Performance review due",       sub: "Sarah Jenkins — Q4 review",             time: "3h ago",  unread: false },
  { id: 5, icon: "campaign",     color: "text-on-surface-variant", title: "New announcement posted", sub: "Q4 Performance Review Cycle Begins", time: "Yesterday", unread: false },
];

export default function TopBar() {
  const { dark, toggle }  = useTheme();
  const { user, logout }  = useAuth();
  const navigate          = useNavigate();
  const [notifOpen, setNotifOpen]   = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [search, setSearch]         = useState("");
  const [notifications, setNotifications] = useState(NOTIFICATIONS);
  const notifRef   = useRef(null);
  const profileRef = useRef(null);

  const name  = user?.name  || "User";
  const role  = user?.role  || localStorage.getItem("userRole") || "employee";
  const badge = roleBadgeConfig[role] || roleBadgeConfig.employee;
  const unreadCount = notifications.filter((n) => n.unread).length;

  // Close dropdowns on outside click
  useEffect(() => {
    const handler = (e) => {
      if (notifRef.current && !notifRef.current.contains(e.target)) setNotifOpen(false);
      if (profileRef.current && !profileRef.current.contains(e.target)) setProfileOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const markAllRead = () => setNotifications((n) => n.map((x) => ({ ...x, unread: false })));

  const roleRoutes = { admin: "/admin", hr: "/hr", employee: "/employee", candidate: "/candidate" };

  return (
    <header className="flex items-center justify-between px-8 h-16 sticky top-0 z-40 bg-surface-container-lowest/80 backdrop-blur-md border-b border-outline-variant/20 shadow-sm">
      {/* Left — Search */}
      <div className="flex items-center gap-6">
        <div className="relative">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-[18px]">search</span>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter" && search.trim()) { navigate("/employees"); setSearch(""); } }}
            className="pl-9 pr-4 py-2 bg-surface-container-low border-none rounded-full w-72 text-sm focus:ring-2 focus:ring-primary/20 transition-all outline-none text-on-surface placeholder:text-outline"
            placeholder="Search employees, leaves..."
            type="text"
          />
          {search && (
            <button onClick={() => setSearch("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-outline hover:text-on-surface">
              <span className="material-symbols-outlined text-sm">close</span>
            </button>
          )}
        </div>
      </div>

      {/* Right — Actions */}
      <div className="flex items-center gap-2">
        {/* Theme toggle */}
        <button onClick={toggle} className="p-2 text-on-surface-variant hover:bg-surface-container rounded-full transition-colors" title={dark ? "Switch to light" : "Switch to dark"}>
          <span className="material-symbols-outlined">{dark ? "light_mode" : "dark_mode"}</span>
        </button>

        {/* Notifications */}
        <div className="relative" ref={notifRef}>
          <button onClick={() => { setNotifOpen((o) => !o); setProfileOpen(false); }}
            className="p-2 text-on-surface-variant hover:bg-surface-container rounded-full transition-colors relative">
            <span className="material-symbols-outlined">notifications</span>
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-error rounded-full border-2 border-surface-container-lowest flex items-center justify-center text-[8px] font-bold text-white">
                {unreadCount}
              </span>
            )}
          </button>

          {notifOpen && (
            <div className="absolute right-0 top-12 w-80 bg-surface-container-lowest rounded-2xl shadow-2xl border border-outline-variant/20 overflow-hidden z-50">
              <div className="flex items-center justify-between px-4 py-3 border-b border-outline-variant/10">
                <h3 className="font-headline font-bold text-sm text-on-surface">Notifications</h3>
                {unreadCount > 0 && (
                  <button onClick={markAllRead} className="text-xs font-semibold text-primary hover:underline">Mark all read</button>
                )}
              </div>
              <div className="max-h-72 overflow-y-auto">
                {notifications.map((n) => (
                  <div key={n.id} onClick={() => setNotifications((prev) => prev.map((x) => x.id === n.id ? { ...x, unread: false } : x))}
                    className={`flex items-start gap-3 px-4 py-3 cursor-pointer hover:bg-surface-container transition-colors ${n.unread ? "bg-primary/3" : ""}`}>
                    <div className={`w-8 h-8 rounded-full bg-surface-container flex items-center justify-center flex-shrink-0 mt-0.5`}>
                      <span className={`material-symbols-outlined text-sm ${n.color}`}>{n.icon}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className={`text-sm leading-tight ${n.unread ? "font-semibold text-on-surface" : "font-medium text-on-surface-variant"}`}>{n.title}</p>
                      <p className="text-xs text-on-surface-variant truncate mt-0.5">{n.sub}</p>
                      <p className="text-[10px] text-outline mt-1">{n.time}</p>
                    </div>
                    {n.unread && <span className="w-2 h-2 rounded-full bg-primary flex-shrink-0 mt-2"></span>}
                  </div>
                ))}
              </div>
              <div className="px-4 py-3 border-t border-outline-variant/10">
                <button className="w-full text-xs font-bold text-primary hover:underline text-center">View all notifications</button>
              </div>
            </div>
          )}
        </div>

        <div className="h-6 w-[1px] bg-outline-variant/30 mx-1"></div>

        {/* Profile dropdown */}
        <div className="relative" ref={profileRef}>
          <button onClick={() => { setProfileOpen((o) => !o); setNotifOpen(false); }}
            className="flex items-center gap-2.5 pl-2 pr-3 py-1.5 rounded-xl hover:bg-surface-container transition-colors">
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm">
              {name.charAt(0).toUpperCase()}
            </div>
            <div className="text-left hidden sm:block">
              <p className="text-xs font-bold text-on-surface leading-tight">{name}</p>
              <p className="text-[10px] text-on-surface-variant capitalize">{role}</p>
            </div>
            <span className="material-symbols-outlined text-outline text-sm">expand_more</span>
          </button>

          {profileOpen && (
            <div className="absolute right-0 top-12 w-52 bg-surface-container-lowest rounded-2xl shadow-2xl border border-outline-variant/20 overflow-hidden z-50">
              <div className="px-4 py-3 border-b border-outline-variant/10">
                <p className="font-bold text-sm text-on-surface">{name}</p>
                <p className="text-xs text-on-surface-variant">{user?.email}</p>
                <span className={`inline-block mt-1.5 text-[10px] font-bold px-2 py-0.5 rounded-full ${badge.color}`}>{badge.label}</span>
              </div>
              <div className="py-1">
                <button onClick={() => { navigate(roleRoutes[role]); setProfileOpen(false); }}
                  className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-colors">
                  <span className="material-symbols-outlined text-lg">dashboard</span> Dashboard
                </button>
                <button className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-colors">
                  <span className="material-symbols-outlined text-lg">manage_accounts</span> Account Settings
                </button>
              </div>
              <div className="py-1 border-t border-outline-variant/10">
                <button onClick={() => { logout(); navigate("/login"); }}
                  className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-error hover:bg-error-container/20 transition-colors">
                  <span className="material-symbols-outlined text-lg">logout</span> Sign out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
