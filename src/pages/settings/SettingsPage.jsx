import { useState } from "react";
import DashboardLayout from "../../components/DashboardLayout";
import { useAuth } from "../../context/AuthContext";
import { useTheme } from "../../context/ThemeContext";

export default function SettingsPage() {
  const { user }       = useAuth();
  const { dark, toggle } = useTheme();
  const [saved, setSaved] = useState(false);
  const [tab, setTab]   = useState("profile");

  const [form, setForm] = useState({
    name:  user?.name  || "",
    email: user?.email || "",
    phone: "",
    location: "",
  });

  const [notifPrefs, setNotifPrefs] = useState({
    leave_requests:   true,
    new_candidates:   true,
    performance_due:  true,
    announcements:    false,
    system_alerts:    true,
  });

  const handleSave = (e) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const tabs = [
    { id: "profile",       icon: "person",        label: "Profile" },
    { id: "security",      icon: "lock",          label: "Security" },
    { id: "notifications", icon: "notifications", label: "Notifications" },
    { id: "appearance",    icon: "palette",       label: "Appearance" },
  ];

  return (
    <DashboardLayout>
      <div>
        <h2 className="text-3xl font-extrabold font-headline tracking-tight text-on-surface">Settings</h2>
        <p className="text-on-surface-variant mt-1">Manage your account preferences and configuration.</p>
      </div>

      <div className="flex gap-8">
        {/* Sidebar tabs */}
        <aside className="w-56 flex-shrink-0">
          <nav className="space-y-1">
            {tabs.map((t) => (
              <button key={t.id} onClick={() => setTab(t.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                  tab === t.id
                    ? "bg-primary/10 text-primary font-semibold"
                    : "text-on-surface-variant hover:bg-surface-container hover:text-on-surface"
                }`}>
                <span className="material-symbols-outlined text-lg">{t.icon}</span>
                {t.label}
              </button>
            ))}
          </nav>
        </aside>

        {/* Content */}
        <div className="flex-1 max-w-2xl">
          {tab === "profile" && (
            <div className="bg-surface-container-lowest rounded-2xl p-8 shadow-sm border border-outline-variant/10">
              <h3 className="font-headline font-bold text-lg mb-6">Profile Information</h3>
              <form onSubmit={handleSave} className="space-y-5">
                {/* Avatar */}
                <div className="flex items-center gap-5 mb-6">
                  <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center text-primary font-bold text-3xl">
                    {user?.name?.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <button type="button" className="px-4 py-2 bg-surface-container text-on-surface text-sm font-semibold rounded-lg hover:bg-surface-container-high transition-colors">
                      Change Photo
                    </button>
                    <p className="text-xs text-on-surface-variant mt-1.5">JPG, PNG up to 2MB</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-1.5">Full Name</label>
                    <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="w-full px-4 py-2.5 bg-surface-container-low rounded-lg text-sm text-on-surface border-none outline-none focus:ring-2 focus:ring-primary/30" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-1.5">Email</label>
                    <input value={form.email} disabled
                      className="w-full px-4 py-2.5 bg-surface-container rounded-lg text-sm text-on-surface-variant border-none outline-none cursor-not-allowed" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-1.5">Phone</label>
                    <input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      placeholder="+1 555 000 0000"
                      className="w-full px-4 py-2.5 bg-surface-container-low rounded-lg text-sm text-on-surface border-none outline-none focus:ring-2 focus:ring-primary/30" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-1.5">Location</label>
                    <input value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })}
                      placeholder="City, Country"
                      className="w-full px-4 py-2.5 bg-surface-container-low rounded-lg text-sm text-on-surface border-none outline-none focus:ring-2 focus:ring-primary/30" />
                  </div>
                </div>

                <div className="flex items-center gap-3 pt-2">
                  <button type="submit"
                    className="px-6 py-2.5 bg-primary text-on-primary font-bold text-sm rounded-xl hover:opacity-90 transition-all active:scale-95">
                    Save Changes
                  </button>
                  {saved && (
                    <span className="flex items-center gap-1.5 text-sm font-semibold text-secondary">
                      <span className="material-symbols-outlined text-lg">check_circle</span> Saved successfully
                    </span>
                  )}
                </div>
              </form>
            </div>
          )}

          {tab === "security" && (
            <div className="bg-surface-container-lowest rounded-2xl p-8 shadow-sm border border-outline-variant/10">
              <h3 className="font-headline font-bold text-lg mb-6">Security</h3>
              <form onSubmit={handleSave} className="space-y-5">
                {[
                  { label: "Current Password", placeholder: "••••••••" },
                  { label: "New Password",     placeholder: "Min. 8 characters" },
                  { label: "Confirm Password", placeholder: "Repeat new password" },
                ].map((f) => (
                  <div key={f.label}>
                    <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-1.5">{f.label}</label>
                    <input type="password" placeholder={f.placeholder}
                      className="w-full px-4 py-2.5 bg-surface-container-low rounded-lg text-sm text-on-surface border-none outline-none focus:ring-2 focus:ring-primary/30" />
                  </div>
                ))}
                <div className="flex items-center gap-3 pt-2">
                  <button type="submit" className="px-6 py-2.5 bg-primary text-on-primary font-bold text-sm rounded-xl hover:opacity-90 transition-all active:scale-95">
                    Update Password
                  </button>
                  {saved && (
                    <span className="flex items-center gap-1.5 text-sm font-semibold text-secondary">
                      <span className="material-symbols-outlined text-lg">check_circle</span> Password updated
                    </span>
                  )}
                </div>
              </form>

              <div className="mt-8 pt-8 border-t border-outline-variant/10">
                <h4 className="font-bold text-sm mb-1">Active Sessions</h4>
                <p className="text-xs text-on-surface-variant mb-4">You're currently signed in on this device.</p>
                <div className="flex items-center justify-between p-4 bg-surface-container-low rounded-xl">
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-on-surface-variant">computer</span>
                    <div>
                      <p className="text-sm font-semibold text-on-surface">Windows — Chrome</p>
                      <p className="text-xs text-on-surface-variant">Current session • localhost</p>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-secondary bg-secondary/10 px-2 py-1 rounded-full">Active</span>
                </div>
              </div>
            </div>
          )}

          {tab === "notifications" && (
            <div className="bg-surface-container-lowest rounded-2xl p-8 shadow-sm border border-outline-variant/10">
              <h3 className="font-headline font-bold text-lg mb-2">Notification Preferences</h3>
              <p className="text-sm text-on-surface-variant mb-6">Choose what you want to be notified about.</p>
              <div className="space-y-4">
                {Object.entries(notifPrefs).map(([key, val]) => {
                  const labels = {
                    leave_requests:  { title: "Leave Requests",       sub: "When someone applies or reviews a leave" },
                    new_candidates:  { title: "New Candidates",       sub: "When a new application is submitted" },
                    performance_due: { title: "Performance Reviews",  sub: "Reminders for upcoming review deadlines" },
                    announcements:   { title: "Announcements",        sub: "Company-wide announcements and updates" },
                    system_alerts:   { title: "System Alerts",        sub: "Important system and security notifications" },
                  };
                  const l = labels[key];
                  return (
                    <div key={key} className="flex items-center justify-between py-3 border-b border-outline-variant/10 last:border-0">
                      <div>
                        <p className="text-sm font-semibold text-on-surface">{l.title}</p>
                        <p className="text-xs text-on-surface-variant">{l.sub}</p>
                      </div>
                      <button onClick={() => setNotifPrefs((p) => ({ ...p, [key]: !p[key] }))}
                        className={`relative w-11 h-6 rounded-full transition-colors ${val ? "bg-primary" : "bg-outline-variant"}`}>
                        <span className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${val ? "translate-x-5" : "translate-x-0.5"}`}></span>
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {tab === "appearance" && (
            <div className="bg-surface-container-lowest rounded-2xl p-8 shadow-sm border border-outline-variant/10">
              <h3 className="font-headline font-bold text-lg mb-6">Appearance</h3>
              <div className="space-y-6">
                <div>
                  <p className="text-sm font-semibold text-on-surface mb-3">Theme</p>
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { label: "Light", icon: "light_mode",  active: !dark },
                      { label: "Dark",  icon: "dark_mode",   active: dark  },
                    ].map((t) => (
                      <button key={t.label} onClick={() => { if (t.active !== (dark && t.label === "Dark" || !dark && t.label === "Light")) toggle(); }}
                        className={`flex items-center gap-3 p-4 rounded-xl border-2 transition-all ${t.active ? "border-primary bg-primary/5" : "border-outline-variant/20 hover:border-outline-variant"}`}>
                        <span className={`material-symbols-outlined ${t.active ? "text-primary" : "text-on-surface-variant"}`}>{t.icon}</span>
                        <span className={`font-semibold text-sm ${t.active ? "text-primary" : "text-on-surface-variant"}`}>{t.label}</span>
                        {t.active && <span className="ml-auto material-symbols-outlined text-primary text-lg">check_circle</span>}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="pt-4 border-t border-outline-variant/10">
                  <p className="text-sm font-semibold text-on-surface mb-1">Language</p>
                  <p className="text-xs text-on-surface-variant mb-3">Interface language</p>
                  <select className="bg-surface-container-low border-none rounded-lg px-4 py-2.5 text-sm text-on-surface focus:ring-2 focus:ring-primary/30 outline-none">
                    <option>English (US)</option>
                    <option>English (UK)</option>
                    <option>Hindi</option>
                  </select>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
