import { useEffect, useState } from "react";
import DashboardLayout from "../../components/DashboardLayout";
import { SkeletonStatCard, SkeletonText, SkeletonBox, SkeletonAvatar, SkeletonDetailPanel } from "../../components/Skeleton";
import api from "../../services/api";

function PostJobModal({ onClose, onSuccess }) {
  const [depts,    setDepts]    = useState([]);
  const [loading,  setLoading]  = useState(false);
  const [error,    setError]    = useState("");
  const [form, setForm] = useState({
    title: "", department_id: "", location: "",
    employment_type: "full-time", description: "", requirements: "", status: "open",
  });

  useEffect(() => {
    api.get("/departments").then(r => setDepts(r.data)).catch(() => {});
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!form.title) { setError("Job title is required."); return; }
    setLoading(true);
    try {
      await api.post("/recruitment/jobs", form);
      onSuccess();
      onClose();
    } catch (err) {
      setError(err.response?.data?.error || "Failed to post job.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-surface-container-lowest rounded-2xl shadow-2xl w-full max-w-lg p-6 border border-outline-variant/20 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-headline font-bold text-lg text-on-surface">Post New Job</h3>
          <button onClick={onClose} className="text-on-surface-variant hover:text-on-surface transition-colors">
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        {error && (
          <div className="mb-4 p-3 rounded-lg bg-error-container/30 text-sm text-error font-medium">{error}</div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-1.5">Job Title *</label>
            <input value={form.title} onChange={e => setForm({ ...form, title: e.target.value })}
              placeholder="e.g. Senior Frontend Engineer"
              className="w-full px-4 py-2.5 bg-surface-container-low rounded-lg text-sm text-on-surface border-none outline-none focus:ring-2 focus:ring-primary/30" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-1.5">Department</label>
              <select value={form.department_id} onChange={e => setForm({ ...form, department_id: e.target.value })}
                className="w-full px-4 py-2.5 bg-surface-container-low rounded-lg text-sm text-on-surface border-none outline-none focus:ring-2 focus:ring-primary/30">
                <option value="">Select department</option>
                {depts.map(d => <option key={d.id} value={d.id}>{d.name}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-1.5">Employment Type</label>
              <select value={form.employment_type} onChange={e => setForm({ ...form, employment_type: e.target.value })}
                className="w-full px-4 py-2.5 bg-surface-container-low rounded-lg text-sm text-on-surface border-none outline-none focus:ring-2 focus:ring-primary/30">
                <option value="full-time">Full-time</option>
                <option value="part-time">Part-time</option>
                <option value="contract">Contract</option>
                <option value="hybrid">Hybrid</option>
                <option value="remote">Remote</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-1.5">Location</label>
              <input value={form.location} onChange={e => setForm({ ...form, location: e.target.value })}
                placeholder="e.g. Remote, Mumbai"
                className="w-full px-4 py-2.5 bg-surface-container-low rounded-lg text-sm text-on-surface border-none outline-none focus:ring-2 focus:ring-primary/30" />
            </div>
            <div>
              <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-1.5">Status</label>
              <select value={form.status} onChange={e => setForm({ ...form, status: e.target.value })}
                className="w-full px-4 py-2.5 bg-surface-container-low rounded-lg text-sm text-on-surface border-none outline-none focus:ring-2 focus:ring-primary/30">
                <option value="open">Open</option>
                <option value="draft">Draft</option>
                <option value="closed">Closed</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-1.5">Job Description</label>
            <textarea value={form.description} onChange={e => setForm({ ...form, description: e.target.value })}
              rows={3} placeholder="Describe the role and responsibilities..."
              className="w-full px-4 py-2.5 bg-surface-container-low rounded-lg text-sm text-on-surface border-none outline-none focus:ring-2 focus:ring-primary/30 resize-none" />
          </div>

          <div>
            <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-1.5">Requirements</label>
            <textarea value={form.requirements} onChange={e => setForm({ ...form, requirements: e.target.value })}
              rows={3} placeholder="List required skills and experience..."
              className="w-full px-4 py-2.5 bg-surface-container-low rounded-lg text-sm text-on-surface border-none outline-none focus:ring-2 focus:ring-primary/30 resize-none" />
          </div>

          <div className="flex gap-3 pt-2">
            <button type="button" onClick={onClose}
              className="flex-1 px-4 py-2.5 rounded-xl border border-outline-variant/30 text-sm font-semibold text-on-surface-variant hover:bg-surface-container-low transition-all">
              Cancel
            </button>
            <button type="submit" disabled={loading}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-primary text-on-primary text-sm font-bold hover:opacity-90 transition-all disabled:opacity-60">
              {loading
                ? <span className="material-symbols-outlined animate-spin text-lg">progress_activity</span>
                : <span className="material-symbols-outlined text-lg">work</span>
              }
              {loading ? "Posting..." : "Post Job"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function RecruitmentManagement() {
  const [candidates,  setCandidates]  = useState([]);
  const [jobs,        setJobs]        = useState([]);
  const [stats,       setStats]       = useState({ open_jobs: 0, total_applications: 0, shortlisted: 0, interviewing: 0 });
  const [selected,    setSelected]    = useState(null);
  const [loading,     setLoading]     = useState(true);
  const [showPostJob, setShowPostJob] = useState(false);

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

  const statusBg = {
    shortlisted:  "bg-primary/10 text-primary",
    applied:      "bg-surface-container text-on-surface-variant",
    interviewing: "bg-secondary/10 text-secondary",
    offered:      "bg-green-100 text-green-700",
    rejected:     "bg-error-container/40 text-error",
    screening:    "bg-amber-100 text-amber-700",
  };
  const scoreBg = (s) => s >= 80
    ? "bg-secondary-container/10 text-secondary border border-secondary-container/20"
    : s >= 60 ? "bg-surface-container text-on-surface-variant"
    : "bg-error-container/20 text-error";

  return (
    <DashboardLayout>
      {showPostJob && <PostJobModal onClose={() => setShowPostJob(false)} onSuccess={fetchData} />}

      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-extrabold font-headline tracking-tight text-on-surface">Candidate Pool</h2>
          <p className="text-on-surface-variant mt-1">Reviewing {stats.total_applications} active applications</p>
        </div>
        <button onClick={() => setShowPostJob(true)}
          className="flex items-center gap-2 px-5 py-2.5 bg-primary text-on-primary font-bold text-sm rounded-xl shadow-lg hover:opacity-90 active:scale-95 transition-all">
          <span className="material-symbols-outlined text-lg">add</span> Post Job
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {loading
          ? Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="bg-surface-container-lowest p-4 rounded-xl shadow-sm">
                <SkeletonText className="h-3 w-24 mb-2" />
                <SkeletonText className="h-7 w-12" />
              </div>
            ))
          : [
              { label: "Open Jobs",          value: stats.open_jobs },
              { label: "Total Applications", value: stats.total_applications },
              { label: "Shortlisted",        value: stats.shortlisted },
              { label: "Interviewing",       value: stats.interviewing },
            ].map((s) => (
              <div key={s.label} className="bg-surface-container-lowest p-4 rounded-xl shadow-sm">
                <p className="text-xs font-bold text-on-surface-variant uppercase tracking-widest mb-1">{s.label}</p>
                <p className="text-2xl font-extrabold text-on-surface">{s.value}</p>
              </div>
            ))
        }
      </div>

      {loading ? (
        <div className="flex gap-8">
          <div className="flex-1 space-y-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="grid grid-cols-12 items-center px-6 py-5 rounded-xl bg-surface-container-lowest shadow-sm">
                <div className="col-span-4 flex items-center gap-4">
                  <SkeletonAvatar size="w-10 h-10" />
                  <div className="space-y-1.5"><SkeletonText className="h-3 w-24" /><SkeletonText className="h-2.5 w-32" /></div>
                </div>
                <div className="col-span-3"><SkeletonText className="h-3 w-28" /></div>
                <div className="col-span-2"><SkeletonBox className="h-6 w-16 rounded-full" /></div>
                <div className="col-span-2"><SkeletonBox className="h-5 w-20 rounded-full" /></div>
                <div className="col-span-1"><SkeletonText className="h-3 w-8 ml-auto" /></div>
              </div>
            ))}
          </div>
          <SkeletonDetailPanel />
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
              <div className="text-center py-16">
                <span className="material-symbols-outlined text-5xl text-outline block mb-3">person_search</span>
                <p className="text-on-surface-variant font-medium">No applications yet.</p>
                <p className="text-sm text-outline mt-1">Post a job to start receiving applications.</p>
              </div>
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
                  <span className={`px-3 py-1 ${statusBg[c.status] || "bg-surface-container text-on-surface-variant"} text-[10px] font-bold uppercase tracking-wider rounded-full`}>{c.status}</span>
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
                <p className="text-xs font-bold text-on-surface-variant uppercase tracking-widest mb-2">Update Status</p>
                <select value={selected.status}
                  onChange={(e) => updateStatus(selected.id, e.target.value)}
                  className="w-full bg-surface-container-low border-none rounded-lg px-3 py-2 text-sm font-semibold text-on-surface focus:ring-2 focus:ring-primary outline-none">
                  {["applied","screening","interviewing","shortlisted","offered","rejected"].map(s => (
                    <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>
                  ))}
                </select>
              </div>
              <div className="mt-auto grid grid-cols-2 gap-3">
                <button onClick={() => updateStatus(selected.id, "rejected")}
                  className="py-3 border border-error text-error font-bold rounded-xl hover:bg-error/5 transition-all flex items-center justify-center gap-2">
                  <span className="material-symbols-outlined text-lg">close</span> Reject
                </button>
                <button onClick={() => updateStatus(selected.id, "shortlisted")}
                  className="py-3 bg-primary text-on-primary font-bold rounded-xl shadow-lg hover:opacity-90 transition-all flex items-center justify-center gap-2">
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
