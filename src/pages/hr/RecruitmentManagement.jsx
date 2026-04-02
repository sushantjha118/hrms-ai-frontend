import DashboardLayout from "../../components/DashboardLayout";

const candidates = [
  { name: "Elena Rodriguez", location: "San Francisco, CA", role: "Lead UI Engineer", score: 94, scoreBg: "bg-secondary-container/10 text-secondary border border-secondary-container/20", status: "Shortlisted", statusBg: "bg-primary/10 text-primary", active: true },
  { name: "Marcus Chen", location: "Seattle, WA", role: "Fullstack Architect", score: 82, scoreBg: "bg-slate-100 text-slate-500", status: "Pending", statusBg: "bg-slate-100 text-slate-500", active: false },
  { name: "Sarah Jenkins", location: "Austin, TX", role: "Senior UX Designer", score: 76, scoreBg: "bg-slate-100 text-slate-500", status: "Pending", statusBg: "bg-slate-100 text-slate-500", active: false },
  { name: "David Wright", location: "Denver, CO", role: "Product Manager", score: 41, scoreBg: "bg-error-container/20 text-error", status: "Rejected", statusBg: "bg-error-container/40 text-error", active: false },
];

const skillBars = [
  { label: "Technical Skills Match", pct: 95 },
  { label: "Industry Experience", pct: 88 },
  { label: "Culture Fit Prediction", pct: 92 },
];

export default function RecruitmentManagement() {
  return (
    <DashboardLayout userName="James Wilson" userRole="Recruitment Lead">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-extrabold font-headline tracking-tight text-on-surface">Candidate Pool</h2>
          <p className="text-on-surface-variant mt-1">Reviewing 48 active applications for Senior Engineering roles</p>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 px-4 py-2 bg-surface-container-lowest text-on-surface font-semibold text-sm rounded-lg hover:bg-surface-container transition-colors">
            <span className="material-symbols-outlined text-lg">filter_list</span> Filter
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-primary text-on-primary font-bold text-sm rounded-lg shadow-sm hover:opacity-90 active:scale-95 transition-all">
            <span className="material-symbols-outlined text-lg">add</span> Add Candidate
          </button>
        </div>
      </div>

      <div className="flex gap-8">
        {/* Candidate List */}
        <div className="flex-1 space-y-4">
          {/* Header */}
          <div className="grid grid-cols-12 px-6 py-2 text-on-surface-variant text-[11px] font-bold uppercase tracking-widest">
            <div className="col-span-4">Candidate</div>
            <div className="col-span-3">Role Applied</div>
            <div className="col-span-2">AI Score</div>
            <div className="col-span-2">Status</div>
            <div className="col-span-1 text-right">Action</div>
          </div>
          {candidates.map((c) => (
            <div key={c.name} className={`grid grid-cols-12 items-center px-6 py-5 rounded-xl shadow-sm transition-all group ${c.active ? "bg-surface-container-lowest border-l-4 border-primary" : "bg-surface-container-lowest/50 hover:bg-surface-container-lowest"}`}>
              <div className="col-span-4 flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">{c.name.charAt(0)}</div>
                <div>
                  <h4 className="font-headline font-bold text-sm">{c.name}</h4>
                  <p className="text-xs text-on-surface-variant">{c.location}</p>
                </div>
              </div>
              <div className="col-span-3">
                <span className="text-sm font-medium text-on-surface">{c.role}</span>
              </div>
              <div className="col-span-2">
                <div className={`inline-flex items-center gap-2 px-3 py-1 ${c.scoreBg} rounded-full`}>
                  <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>bolt</span>
                  <span className="text-sm font-bold font-headline">{c.score}</span>
                </div>
              </div>
              <div className="col-span-2">
                <span className={`px-3 py-1 ${c.statusBg} text-[10px] font-bold uppercase tracking-wider rounded-full`}>{c.status}</span>
              </div>
              <div className="col-span-1 text-right">
                <button className="text-primary font-bold text-xs hover:underline">View Detail</button>
              </div>
            </div>
          ))}
        </div>

        {/* Detail Sidebar */}
        <aside className="w-[380px] bg-white border-l border-slate-100 p-8 rounded-xl flex flex-col gap-8 shadow-sm">
          {/* Profile */}
          <div className="flex flex-col items-center text-center">
            <div className="relative mb-4">
              <div className="w-24 h-24 rounded-2xl bg-primary/10 flex items-center justify-center text-primary font-bold text-3xl">E</div>
              <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-secondary rounded-full flex items-center justify-center text-white border-4 border-white">
                <span className="material-symbols-outlined text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>auto_awesome</span>
              </div>
            </div>
            <h3 className="text-2xl font-extrabold font-headline tracking-tight text-on-surface">Elena Rodriguez</h3>
            <p className="text-on-surface-variant font-medium">Lead UI Engineer • 8+ Years Exp.</p>
          </div>

          {/* AI Score */}
          <div className="bg-surface-container-low rounded-2xl p-6 relative overflow-hidden border-l-4 border-secondary">
            <div className="flex justify-between items-start mb-6">
              <div>
                <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-secondary">AI Candidate Insight</span>
                <h4 className="font-headline font-bold text-lg mt-1">Deep Match Profile</h4>
              </div>
              <div className="text-3xl font-extrabold font-headline text-secondary">94<span className="text-sm font-medium">%</span></div>
            </div>
            <div className="space-y-4">
              {skillBars.map((s) => (
                <div key={s.label}>
                  <div className="flex justify-between text-xs font-bold mb-1.5 uppercase tracking-wide">
                    <span>{s.label}</span>
                    <span className="text-secondary">{s.pct}%</span>
                  </div>
                  <div className="h-1.5 w-full bg-slate-200 rounded-full overflow-hidden">
                    <div className="h-full bg-secondary rounded-full" style={{ width: `${s.pct}%` }}></div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 pt-4 border-t border-slate-200/50">
              <p className="text-xs text-on-surface-variant leading-relaxed">
                <span className="font-bold text-on-surface">AI Summary:</span> Elena shows exceptional proficiency in React and Tailwind CSS frameworks. Her tenure at high-growth tech firms indicates strong adaptability.
              </p>
            </div>
          </div>

          {/* Documents */}
          <div className="space-y-4">
            <h4 className="font-headline font-bold text-sm flex items-center gap-2">
              <span className="material-symbols-outlined text-lg">description</span> Documents
            </h4>
            <div className="flex items-center gap-4 p-4 rounded-xl border border-outline-variant/30 hover:border-primary/30 transition-colors cursor-pointer group">
              <div className="w-12 h-12 bg-error-container/20 text-error flex items-center justify-center rounded-lg">
                <span className="material-symbols-outlined text-3xl">picture_as_pdf</span>
              </div>
              <div className="flex-1">
                <p className="text-sm font-bold truncate">Rodriguez_Resume_2024.pdf</p>
                <p className="text-[10px] text-on-surface-variant font-medium">Updated 2 days ago • 2.4 MB</p>
              </div>
              <span className="material-symbols-outlined text-slate-400 group-hover:text-primary transition-colors">download</span>
            </div>
          </div>

          {/* Actions */}
          <div className="mt-auto grid grid-cols-2 gap-4">
            <button className="py-3 px-4 border border-error text-error font-bold rounded-xl hover:bg-error/5 transition-all flex items-center justify-center gap-2">
              <span className="material-symbols-outlined text-lg">close</span> Reject
            </button>
            <button className="py-3 px-4 bg-primary text-white font-bold rounded-xl shadow-lg shadow-primary/25 hover:opacity-90 active:scale-95 transition-all flex items-center justify-center gap-2">
              <span className="material-symbols-outlined text-lg">check</span> Shortlist
            </button>
          </div>
        </aside>
      </div>
    </DashboardLayout>
  );
}
