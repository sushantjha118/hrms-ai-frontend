import DashboardLayout from "../../components/DashboardLayout";

const reviews = [
  { name: "Michael Chen", dept: "Engineering", date: "Oct 12, 2023", score: "4.9/5", scoreBg: "bg-secondary-container/30 text-on-secondary-container", status: "COMPLETED", statusBg: "bg-green-100 text-green-700" },
  { name: "Sarah Jenkins", dept: "Design", date: "Oct 15, 2023", score: "—", scoreBg: "bg-slate-100 text-slate-400", status: "Scheduled", statusBg: "bg-amber-100 text-amber-700" },
  { name: "Marcus Thompson", dept: "Marketing", date: "Oct 18, 2023", score: "4.2/5", scoreBg: "bg-secondary-container/30 text-on-secondary-container", status: "COMPLETED", statusBg: "bg-green-100 text-green-700" },
  { name: "Elena Rodriguez", dept: "Operations", date: "Oct 20, 2023", score: "—", scoreBg: "bg-slate-100 text-slate-400", status: "In Draft", statusBg: "bg-indigo-100 text-indigo-700" },
];

const months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
const heights = [40, 45, 55, 65, 60, 75, 85, 80, 90, 95, 0, 0];

const skills = [
  { label: "Technical Proficiency", pct: 98 },
  { label: "Team Leadership", pct: 92 },
  { label: "Communication", pct: 85 },
];

export default function PerformanceReviews() {
  return (
    <DashboardLayout userName="Alex Rivera" userRole="HR Director">
      {/* Header */}
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-extrabold font-headline tracking-tight text-on-surface">Performance Intelligence</h2>
          <p className="text-on-surface-variant mt-1">Reviewing organizational health and individual achievements.</p>
        </div>
        <div className="flex gap-3">
          <button className="px-5 py-2.5 bg-surface-container-highest text-on-surface rounded-lg font-semibold text-sm hover:bg-surface-variant transition-colors">Export Report</button>
          <button className="px-5 py-2.5 bg-gradient-to-r from-primary to-primary-container text-white rounded-lg font-semibold text-sm shadow-lg shadow-indigo-200/50 hover:opacity-90 transition-all">Schedule Review</button>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12 md:col-span-4 bg-surface-container-lowest p-6 rounded-xl relative overflow-hidden">
          <div className="flex justify-between items-start mb-4">
            <p className="text-on-surface-variant text-xs font-bold uppercase tracking-widest">Team Health Score</p>
            <span className="material-symbols-outlined text-secondary">trending_up</span>
          </div>
          <div className="flex items-baseline gap-2 mb-2">
            <h3 className="text-5xl font-extrabold font-headline tracking-tighter text-on-surface">4.8</h3>
            <p className="text-secondary font-bold text-sm">+0.3 this quarter</p>
          </div>
          <div className="w-full h-1.5 bg-surface-container rounded-full overflow-hidden">
            <div className="h-full bg-secondary w-[88%] rounded-full"></div>
          </div>
        </div>
        <div className="col-span-12 md:col-span-4 bg-surface-container-lowest p-6 rounded-xl">
          <p className="text-on-surface-variant text-xs font-bold uppercase tracking-widest mb-4">Reviews Completed</p>
          <div className="flex items-center gap-6">
            <div className="flex-1">
              <h3 className="text-4xl font-extrabold font-headline text-on-surface">92<span className="text-xl font-medium text-slate-400">/104</span></h3>
              <p className="text-on-surface-variant text-sm mt-1">On schedule for Q3</p>
            </div>
            <div className="h-16 w-24">
              <svg className="w-full h-full text-primary overflow-visible" viewBox="0 0 100 40">
                <path d="M0,35 Q10,10 20,25 T40,15 T60,30 T80,5 T100,20" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="3" />
              </svg>
            </div>
          </div>
        </div>
        <div className="col-span-12 md:col-span-4 bg-surface-container-lowest p-1 rounded-xl bg-gradient-to-br from-indigo-100 to-cyan-50">
          <div className="bg-surface-container-lowest/80 backdrop-blur-md rounded-[10px] p-5 h-full border border-white/50">
            <div className="flex items-center gap-2 mb-3">
              <span className="material-symbols-outlined text-primary text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>auto_awesome</span>
              <span className="text-xs font-bold text-primary tracking-wide">AI PREDICTION</span>
            </div>
            <p className="text-on-surface font-medium text-sm leading-relaxed">
              Based on review data, <span className="text-indigo-600 font-bold">Retention Risk</span> in Creative Dept has decreased by 14% following new remote flexibility policies.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-8">
        {/* Table + Chart */}
        <div className="col-span-12 lg:col-span-8">
          <div className="bg-surface-container-lowest rounded-xl overflow-hidden">
            <div className="p-6 flex justify-between items-center">
              <h3 className="font-bold text-lg font-headline">Recent & Scheduled Reviews</h3>
              <div className="flex gap-2">
                {["All", "Pending", "Finalized"].map((f, i) => (
                  <button key={f} className={`text-xs font-bold px-3 py-1.5 rounded-full ${i === 0 ? "bg-primary text-white" : "text-on-surface-variant hover:bg-surface-container transition-colors"}`}>{f}</button>
                ))}
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-surface-container-low">
                  <tr>
                    {["Employee", "Dept", "Review Date", "Score", "Status"].map((h) => (
                      <th key={h} className="px-6 py-4 text-xs font-bold text-on-surface-variant tracking-widest uppercase">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {reviews.map((r) => (
                    <tr key={r.name} className="hover:bg-surface-container-high transition-colors cursor-pointer">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xs">{r.name.charAt(0)}</div>
                          <span className="text-sm font-semibold text-on-surface">{r.name}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-on-surface-variant">{r.dept}</td>
                      <td className="px-6 py-4 text-sm text-on-surface-variant">{r.date}</td>
                      <td className="px-6 py-4">
                        <span className={`px-2.5 py-1 rounded ${r.scoreBg} text-xs font-bold`}>{r.score}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold ${r.statusBg}`}>{r.status}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Bar Chart */}
          <div className="mt-8 bg-surface-container-lowest p-6 rounded-xl">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h3 className="font-bold text-lg font-headline text-on-surface">Performance Trends</h3>
                <p className="text-xs text-on-surface-variant">Average company performance across 12 months</p>
              </div>
            </div>
            <div className="h-64 flex items-end justify-between gap-2 px-2">
              {months.map((m, i) => (
                <div key={m} className="flex-1 flex flex-col items-center gap-2 group">
                  <div className="w-full bg-primary/20 rounded-t-lg transition-all group-hover:bg-primary/30" style={{ height: `${heights[i]}%` }}></div>
                  <span className="text-[10px] font-bold text-on-surface-variant">{m}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Detail Panel */}
        <div className="col-span-12 lg:col-span-4 space-y-8">
          <div className="bg-surface-container-lowest rounded-xl p-6 border border-indigo-50 shadow-xl shadow-indigo-100/20">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center text-primary font-bold text-xl">MC</div>
              <div>
                <h4 className="font-bold text-lg font-headline text-on-surface leading-tight">Michael Chen</h4>
                <p className="text-sm text-on-surface-variant">Lead Software Engineer</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="bg-surface-container-low p-4 rounded-lg">
                <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest mb-1">Star Rating</p>
                <div className="flex text-primary">
                  {[1, 2, 3, 4].map((s) => (
                    <span key={s} className="material-symbols-outlined text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                  ))}
                  <span className="material-symbols-outlined text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>star_half</span>
                </div>
              </div>
              <div className="bg-surface-container-low p-4 rounded-lg">
                <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest mb-1">Score</p>
                <p className="text-xl font-extrabold text-on-surface font-headline">4.92<span className="text-xs font-medium text-on-surface-variant">/5.0</span></p>
              </div>
            </div>
            <div className="bg-tertiary-container/5 border-l-4 border-tertiary p-5 rounded-r-xl mb-6">
              <div className="flex items-center gap-2 mb-3">
                <span className="material-symbols-outlined text-tertiary text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>psychology</span>
                <span className="text-xs font-bold text-tertiary uppercase tracking-tighter">AI Insight Summary</span>
              </div>
              <p className="text-sm text-on-surface leading-relaxed italic">
                "Exceeding expectations in technical leadership. Potential growth area: <span className="font-bold underline">Documentation consistency</span> across remote teams."
              </p>
            </div>
            <div className="space-y-4">
              {skills.map((s) => (
                <div key={s.label}>
                  <div className="flex justify-between text-xs font-bold mb-1.5">
                    <span>{s.label}</span>
                    <span className="text-primary">{s.pct}%</span>
                  </div>
                  <div className="h-1.5 bg-surface-container rounded-full">
                    <div className="h-full bg-primary rounded-full" style={{ width: `${s.pct}%` }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Deadlines */}
          <div className="bg-indigo-900 text-white p-6 rounded-xl shadow-xl shadow-indigo-200">
            <h4 className="font-bold text-lg mb-4 font-headline">Review Deadlines</h4>
            <div className="space-y-4">
              {[{ date: "OCT\n24", name: "Sarah Jenkins", sub: "Annual Salary Review", action: "Remind" }, { date: "OCT\n28", name: "Project Delta Team", sub: "Post-Launch Peer Feedback", action: "Setup" }].map((d) => (
                <div key={d.name} className="flex gap-4 items-start pb-4 border-b border-white/10 last:border-0 last:pb-0">
                  <div className="bg-white/10 p-2 rounded-lg text-xs font-bold w-12 text-center whitespace-pre-line">{d.date}</div>
                  <div>
                    <p className="text-sm font-bold leading-tight">{d.name}</p>
                    <p className="text-[11px] opacity-70">{d.sub}</p>
                  </div>
                  <button className="ml-auto text-xs font-bold text-secondary-fixed-dim underline">{d.action}</button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
