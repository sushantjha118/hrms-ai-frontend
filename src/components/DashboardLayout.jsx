import Sidebar from "./Sidebar";
import TopBar from "./TopBar";

export default function DashboardLayout({ children, userName, userRole, userAvatar }) {
  return (
    <div className="bg-surface text-on-surface">
      <Sidebar />
      <main className="ml-64 min-h-screen">
        <TopBar userName={userName} userRole={userRole} userAvatar={userAvatar} />
        <div className="p-10 space-y-10">{children}</div>
      </main>
      {/* Floating AI Assistant */}
      <div className="fixed bottom-8 right-8 z-50">
        <button className="w-16 h-16 rounded-full bg-primary shadow-2xl shadow-primary/40 flex items-center justify-center text-white group hover:scale-110 active:scale-95 transition-all">
          <span className="material-symbols-outlined text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>auto_awesome</span>
          <div className="absolute right-full mr-4 bg-white px-4 py-2 rounded-xl shadow-xl border border-slate-100 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
            <p className="text-xs font-bold text-primary font-headline">How can I help with HR today?</p>
          </div>
        </button>
      </div>
    </div>
  );
}
