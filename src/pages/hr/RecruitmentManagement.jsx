import { useEffect, useState } from "react";
import DashboardLayout from "../../components/DashboardLayout";
import api from "../../services/api";

export default function RecruitmentManagement() {
  const [candidates, setCandidates] = useState([]);
  const [jobs,       setJobs]       = useState([]);
  const [stats,      setStats]      = useState({ open_jobs: 0, total_applications: 0, shortlisted: 0, interviewing: 0 });
  const [selected,   setSelected]   = useState(null);
  const [loading,    setLoading]    = useState(true);

  const fetchData = () => {
    setLoading(true);
    Promise.all([
      api.get("/recruitment/applications"),
      api.get("/recruitment/jobs"),
      api.get("/recruitment/jobs/stats"),
    ]).then(([apps, jbs, st]) => {
      setCandidates(apps.data);
      setJobs(jbs.data);
      setStats(st.data);
      if (apps.data.length > 0) setSelected(apps.data[0]);
    }).finally(() => setLoading(false));
  };

  useEffect(() => { fetchData(); }, []);

  const updateStatus = async (appId, status) => {
    await api.put(`/recruitment/applications/${appId}`, { status });
    fetchData();
  };

  const statusBg = { shortlisted: "bg-primary/10 text-primary", applied: "bg-slate-100 text-slate-500", interviewing: "bg-secondary/10 text-secondary", offered: "bg-green-100 text-green-700", rejected: "bg-error-container/40 text-error", screening: "bg-amber-100 text-amber-700" };
  const scoreBg  = (s) => s >= 80 ? "bg-secondary-container/10 text-secondary border border-secondary-container/20" : s >= 60 ? "bg-slate-100 text-slate-500" : "bg-error-container/20 text-error";

  return (
    <DashboardLayout>
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-extrabold font-headline tracking-tight text-on-surface">Candidate Pool</h2>
          <p className="text-on-surface-variant mt-1">Reviewing {stats.total_applications} active applications</p>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 px-4 py-2 bg-primary text-on-primary font-bold text-sm rounded-lg shadow-sm hover:opacity-90 transition-all">
            <span className="material-symbols-outlined text-lg">add</span> Post Job
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Open Jobs",        value: stats.open_jobs },
          { label: "Total Applications",value: stats.total_applications },
          { label: "Shortlisted",      value: stats.shortlisted },
          { label: "Interviewing",     value: stats.interviewing },
        ].map((s) => (
          <div key={s.label} className="bg-surface-container-lowest p-4 rounded-xl shadow-sm">
            <p className="text-xs font-bold text-on-surface-variant uppercase tracking-widest mb-1">{s.label}</p>
            <p className="text-2xl font-extrabold text-on-surface">{s.value}</p>
          </div>
        ))}
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-64">
          <span className="material-symbols-outlined animate-spin text-4xl text-primary">progress_activity</span>
        </div>
      ) : (
        <div className="flex gap-8">
          <div className="flex-1 space-y-4">
            <div className="grid grid-cols-12 px-6 py-2 text-on-surface-variant text-[11px] font-bold uppercase tracking-widest">
              <div className="col-span-4">Candidate</div>
              <div className="col-span-3">Role Applied</div>
              <div className="col-span-2">AI Score</div>
              <div className="col-span-2">Status</div>
              <div className="col-span-1 text-right">Action</div>
            </div>
            {candidates.length === 0 ? (
              <p className="text-center text-on-surface-variant py-8">No applications yet.</p>
            ) : candidates.map((c) => (
              <div key={c.id} onClick={() => setSelected(c)}
                className={`grid grid-cols-12 items-center px-6 py-5 rounded-xl shadow-sm transition-all cursor-pointer ${selected?.id === c.id ? "bg-surface-container-lowest border-l-4 border-primary" : "bg-surface-container-lowest/50 hover:bg-surface-container-lowest"}`}>
                <div className="col-span-4 flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">{c.candidate_name?.charAt(0)}</div>
                  <div>
                    <h4 className="font-headline font-bold text-sm">{c.candidate_name}</h4>
                    <p className="text-xs text-on-surface-variant">{c.candidate_email}</p>
                  </div>
                </div>
                <div className="col-span-3 text-sm font-medium text-on-surface">{c.job_title}</div>
                <div className="col-span-2">
                  {c.ai_score ? (
                    <div className={`inline-flex items-center gap-1 px-3 py-1 ${scoreBg(c.ai_score)} rounded-full`}>
                      <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>bolt</span>
                      <span className="text-sm font-bold">{c.ai_score}</span>
                    </div>
                  ) : <span className="text-on-surface-variant text-sm">—</span>}
                </div>
                <div className="col-span-2">
                  <span className={`px-3 py-1 ${statusBg[c.status] || "bg-slate-100 text-slate-500"} text-[10px] font-bold uppercase tracking-wider rounded-full`}>{c.status}</span>
                </div>
                <div className="col-span-1 text-right">
                  <button className="text-primary font-bold text-xs hover:underline">View</button>
                </div>
              </div>
            ))}
          </div>

          {selected && (
            <aside className="w-[340px] bg-surface-container-lowest border border-outline-variant/20 p-8 rounded-xl flex flex-col gap-6 shadow-sm">
              <div className="flex flex-col items-center text-center">
                <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center text-primary font-bold text-3xl mb-3">
                  {selected.candidate_name?.charAt(0)}
                </div>
                <h3 className="text-xl font-extrabold font-headline text-on-surface">{selected.candidate_name}</h3>
                <p className="text-on-surface-variant font-medium text-sm">{selected.job_title}</p>
              </div>
              {selected.ai_score && (
                <div className="bg-surface-container-low rounded-xl p-5 border-l-4 border-secondary">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-[10px] uppercase font-bold tracking-widest text-secondary">AI Match Score</span>
                    <span className="text-2xl font-extrabold text-secondary">{selected.ai_score}%</span>
                  </div>
                  <div className="h-1.5 w-full bg-outline-variant/30 rounded-full">
                    <div className="h-full bg-secondary rounded-full" style={{ width: `${selected.ai_score}%` }}></div>
                  </div>
                </div>
              )}
              <div>
                <p className="text-xs font-bold text-on-surface-variant uppercase tracking-widest mb-2">Status</p>
                <select value={selected.status}
                  onChange={(e) => updateStatus(selected.id, e.target.value)}
                  className="w-full bg-surface-container-low border-none rounded-lg px-3 py-2 text-sm font-semibold text-on-surface focus:ring-2 focus:ring-primary">
                  {["applied","screening","interviewing","shortlisted","offered","rejected"].map(s => (
                    <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>
                  ))}
                </select>
              </div>
              <div className="mt-auto grid grid-cols-2 gap-3">
                <button onClick={() => updateStatus(selected.id, "rejected")} className="py-3 border border-error text-error font-bold rounded-xl hover:bg-error/5 transition-all flex items-center justify-center gap-2">
                  <span className="material-symbols-outlined text-lg">close</span> Reject
                </button>
                <button onClick={() => updateStatus(selected.id, "shortlisted")} className="py-3 bg-primary text-on-primary font-bold rounded-xl shadow-lg hover:opacity-90 transition-all flex items-center justify-center gap-2">
                  <span className="material-symbols-outlined text-lg">check</span> Shortlist
                </button>
              </div>
            </aside>
          )}
        </div>
      )}
    </DashboardLayout>
  );
}
