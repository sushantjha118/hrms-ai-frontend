export default function TopBar({ userName = "Alexander Vance", userRole = "Head of Operations", userAvatar = null }) {
  return (
    <header className="flex items-center justify-between px-8 h-16 sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-slate-100 shadow-sm">
      <div className="flex items-center gap-8">
        <div className="relative group">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">search</span>
          <input
            className="pl-10 pr-4 py-2 bg-surface-container-low border-none rounded-full w-80 text-sm focus:ring-2 focus:ring-primary/20 transition-all"
            placeholder="Search analytics, employees..."
            type="text"
          />
        </div>
        <nav className="hidden md:flex gap-6">
          <a href="#analytics" className="text-indigo-600 font-semibold border-b-2 border-indigo-600 text-sm font-headline tracking-tight">Analytics</a>
          <a href="#reports" className="text-slate-500 hover:text-slate-900 text-sm font-headline tracking-tight transition-colors">Reports</a>
        </nav>
      </div>

      <div className="flex items-center gap-4">
        <button className="p-2 text-slate-500 hover:bg-slate-50 rounded-full transition-colors relative">
          <span className="material-symbols-outlined">notifications</span>
          <span className="absolute top-2 right-2 w-2 h-2 bg-error rounded-full border-2 border-white"></span>
        </button>
        <button className="p-2 text-slate-500 hover:bg-slate-50 rounded-full transition-colors">
          <span className="material-symbols-outlined">chat_bubble</span>
        </button>
        <div className="h-8 w-[1px] bg-slate-200 mx-2"></div>
        <div className="flex items-center gap-3 pl-2">
          <div className="text-right">
            <p className="text-xs font-bold text-on-surface font-headline uppercase tracking-wider">{userName}</p>
            <p className="text-[10px] text-on-surface-variant font-medium">{userRole}</p>
          </div>
          {userAvatar ? (
            <img alt="User profile" className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-sm" src={userAvatar} />
          ) : (
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
              {userName.charAt(0)}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
