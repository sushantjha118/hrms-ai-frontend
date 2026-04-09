import { useEffect, useState } from "react";
import DashboardLayout from "../../components/DashboardLayout";
import { useAuth } from "../../context/AuthContext";
import api from "../../services/api";

const tabs = ["Available Jobs", "My Applications"];

export default function CandidatePortal() {
  const { user }   = useAuth();
  const [jobs,     setJobs]     = useState([]);
  const [myApps,   setMyApps]   = useState([]);
  const [activeTab,setActiveTab]= useState(0);
  const [loading,  setLoading]  = useState(true);
  const [applying, setApplying] = useState(null);

  const fetchData = () => {
    setLoading(true);
    Promise.all([
      api.get("/recruitment/jobs?status=open"),
      api.get("/recruitment/applications/me"),
    ]).then(([jbs, apps]) => {
      setJobs(jbs.data);
      setMyApps(apps.data);
    }).finally(() => setLoading(false));
  };

  useEffect(() => { fetchData(); }, []);

  const applyJob = async (jobId) => {
    setApplying(jobId);
    try {
      await api.post("/recruitment/applications", { job_id: jobId });
      fetchData();
    } catch (e) {
      alert(e.response?.data?.error || "Failed to apply");
    } finally {
      setApplying(null);
    }
  };

  const appliedJobIds = new Set(myApps.map(a => a.job_id));

  const statusColor = { applied: "text-on-surface-variant bg-surface-container", screening: "text-amber-600 bg-amber-50", interviewing: "text-secondary bg-secondary/10", shortlisted: "text-primary bg-primary/10", offered: "text-green-700 bg-green-100", rejected: "text-error bg-error-container/20" };

  return (
    <DashboardLayout>
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 flex flex-col justify-center">
          <h1 className="font-headline font-extrabold text-4xl tracking-tight mb-4 text-on-surface">
            Find Your Next <span className="text-primary">Career Leap</span>
          </h1>
          <p className="text-on-surface-variant text-lg max-w-xl mb-6 leading-relaxed">
            Browse {jobs.length} open positions matched to your profile.
          </p>
          <div className="flex gap-4">
            <button className="bg-gradient-to-br from-primary to-primary-container text-on-primary px-6 py-3 rounded-xl font-medium shadow-lg active:scale-95 transition-all">Upload Resume</button>
            <button className="bg-surface-container-highest text-on-surface px-6 py-3 rounded-xl font-medium hover:bg-surface-variant transition-colors">Browse All</button>
          </div>
        </div>
        <div className="bg-surface-container-lowest p-8 rounded-xl shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <span className="material-symbols-outlined text-secondary">verified</span>
            <span className="font-headline font-bold text-sm text-secondary uppercase tracking-wider">Application Status</span>
          </div>
          <div className="flex items-end gap-3 mb-4">
            <span className="font-headline font-extrabold text-6xl text-primary">{myApps.length}</span>
            <span className="text-on-surface-variant pb-2 font-medium">Applications</span>
          </div>
          <div className="space-y-2">
            {["applied","interviewing","shortlisted","offered"].map(s => {
              const count = myApps.filter(a => a.status === s).length;
              return count > 0 ? (
                <div key={s} className="flex justify-between text-sm">
                  <span className="text-on-surface-variant capitalize">{s}</span>
                  <span className="font-bold text-on-surface">{count}</span>
                </div>
              ) : null;
            })}
          </div>
        </div>
      </section>

      <div className="flex items-center gap-8 border-b border-outline-variant/30">
        {tabs.map((tab, i) => (
          <button key={tab} onClick={() => setActiveTab(i)}
            className={`pb-4 px-2 font-medium transition-all ${activeTab === i ? "text-primary font-bold border-b-2 border-primary" : "text-on-surface-variant hover:text-primary"}`}>
            {tab} {i === 1 && `(${myApps.length})`}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-48">
          <span className="material-symbols-outlined animate-spin text-4xl text-primary">progress_activity</span>
        </div>
      ) : activeTab === 0 ? (
        <div className="space-y-4">
          {jobs.length === 0 ? (
            <p className="text-center text-on-surface-variant py-12">No open positions at the moment.</p>
          ) : jobs.map((job) => (
            <div key={job.id} className="bg-surface-container-lowest p-6 rounded-xl shadow-sm hover:translate-x-1 transition-transform cursor-pointer group">
              <div className="flex justify-between items-start mb-4">
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                    <span className="material-symbols-outlined">work</span>
                  </div>
                  <div>
                    <h3 className="font-headline font-bold text-lg group-hover:text-primary transition-colors">{job.title}</h3>
                    <div className="flex items-center gap-3 mt-1">
                      <span className="text-sm text-on-surface-variant flex items-center gap-1">
                        <span className="material-symbols-outlined text-sm">apartment</span>{job.department || "General"}
                      </span>
                      <span className="text-sm text-on-surface-variant flex items-center gap-1">
                        <span className="material-symbols-outlined text-sm">location_on</span>{job.location}
                      </span>
                    </div>
                  </div>
                </div>
                <span className="px-3 py-1 bg-surface-container text-on-surface-variant text-[10px] uppercase font-bold rounded">{job.employment_type}</span>
              </div>
              <div className="flex justify-between items-center mt-4">
                <p className="text-sm text-on-surface-variant line-clamp-1">{job.description}</p>
                {appliedJobIds.has(job.id) ? (
                  <span className="px-5 py-2 rounded-lg bg-surface-container text-on-surface-variant font-medium text-sm">Applied</span>
                ) : (
                  <button onClick={() => applyJob(job.id)} disabled={applying === job.id}
                    className="bg-primary text-on-primary px-5 py-2 rounded-lg font-medium text-sm hover:bg-primary-container transition-all active:scale-95 disabled:opacity-60">
                    {applying === job.id ? "Applying..." : "Quick Apply"}
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {myApps.length === 0 ? (
            <p className="text-center text-on-surface-variant py-12">No applications yet. Browse jobs and apply!</p>
          ) : myApps.map((app) => (
            <div key={app.id} className="bg-surface-container-lowest p-6 rounded-xl shadow-sm flex items-center justify-between">
              <div>
                <h4 className="font-bold text-on-surface">{app.job_title}</h4>
                <p className="text-xs text-on-surface-variant mt-1">Applied {new Date(app.applied_at).toLocaleDateString()}</p>
              </div>
              <div className="flex items-center gap-4">
                {app.ai_score && <span className="text-xs font-bold text-secondary">AI: {app.ai_score}%</span>}
                <span className={`px-3 py-1 rounded-full text-xs font-bold capitalize ${statusColor[app.status] || "bg-surface-container text-on-surface-variant"}`}>{app.status}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </DashboardLayout>
  );
}
