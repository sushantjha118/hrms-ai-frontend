import { useState } from "react";
import DashboardLayout from "../../components/DashboardLayout";

const jobs = [
  { icon: "code", iconBg: "bg-primary/10 text-primary", title: "Senior Frontend Architect", dept: "Product Engineering", location: "Remote (Global)", match: "92%", matchBg: "bg-secondary-container/20 text-on-secondary-container", tags: ["Full-time", "AI Ops"] },
  { icon: "database", iconBg: "bg-secondary/10 text-secondary", title: "Lead AI Research Engineer", dept: "Workforce AI Labs", location: "San Francisco, CA", match: "88%", matchBg: "bg-secondary-container/20 text-on-secondary-container", tags: ["On-site", "Machine Learning"] },
  { icon: "palette", iconBg: "bg-tertiary/10 text-tertiary", title: "UI/UX Designer (Product)", dept: "Design Experience", location: "London, UK", match: "75%", matchBg: "bg-surface-container-highest text-on-surface-variant", tags: ["Hybrid", "Figma"] },
];

const applications = [
  { icon: "check", iconBg: "bg-primary", iconColor: "text-on-primary", status: "Interview Scheduled", statusColor: "text-primary", title: "Lead Software Engineer", sub: "Tomorrow, 10:30 AM via Google Meet" },
  { icon: "auto_awesome", iconBg: "bg-secondary", iconColor: "text-on-secondary", status: "AI Scoring in Progress", statusColor: "text-secondary", title: "Product Manager", sub: "Analyzing experience vs requirements" },
  { icon: "schedule", iconBg: "bg-surface-container-highest", iconColor: "text-on-surface-variant", status: "Applied", statusColor: "text-on-surface-variant", title: "Technical Writer", sub: "3 days ago • HR review pending" },
];

const tabs = ["Available Jobs", "Application Status", "Saved Roles"];

export default function CandidatePortal() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <DashboardLayout userName="Jordan Lee" userRole="Candidate">
      {/* Hero */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 flex flex-col justify-center">
          <h1 className="font-headline font-extrabold text-4xl tracking-tight mb-4 text-on-surface">
            Find Your Next <span className="text-primary">Career Leap</span>
          </h1>
          <p className="text-on-surface-variant text-lg max-w-xl mb-8 leading-relaxed">
            Our AI-driven portal matches your unique skills with the perfect opportunities, helping you land your dream role with precision.
          </p>
          <div className="flex gap-4">
            <button className="bg-gradient-to-br from-primary to-primary-container text-on-primary px-6 py-3 rounded-xl font-medium shadow-lg active:scale-95 transition-all">Upload New Resume</button>
            <button className="bg-surface-container-highest text-on-surface px-6 py-3 rounded-xl font-medium hover:bg-surface-variant transition-colors">Browse Categories</button>
          </div>
        </div>

        {/* AI Score Card */}
        <div className="bg-surface-container-lowest p-8 rounded-xl shadow-sm relative overflow-hidden">
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-6">
              <span className="material-symbols-outlined text-secondary">verified</span>
              <span className="font-headline font-bold text-sm text-secondary uppercase tracking-wider">AI Skill Match</span>
            </div>
            <div className="flex items-end gap-3 mb-4">
              <span className="font-headline font-extrabold text-6xl text-primary">85%</span>
              <span className="text-on-surface-variant pb-2 font-medium">Match Score</span>
            </div>
            <div className="w-full bg-surface-container-high h-2 rounded-full mb-6">
              <div className="h-2 bg-gradient-to-r from-primary to-secondary rounded-full" style={{ width: "85%" }}></div>
            </div>
            <div className="bg-tertiary-container/10 border-l-4 border-tertiary p-4 rounded-r-lg">
              <p className="text-sm font-medium text-tertiary mb-1">Recommendation</p>
              <p className="text-xs text-on-surface-variant leading-relaxed">Add more details about your <strong>React Server Components</strong> experience to increase score for Senior Engineering roles.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Tabs */}
      <div className="flex items-center gap-8 border-b border-outline-variant/30">
        {tabs.map((tab, i) => (
          <button
            key={tab}
            onClick={() => setActiveTab(i)}
            className={`pb-4 px-2 font-medium transition-all ${activeTab === i ? "text-primary font-bold border-b-2 border-primary" : "text-on-surface-variant hover:text-primary"}`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Job Listings */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="font-headline font-bold text-xl">Top Matches for You</h2>
            <span className="text-sm text-on-surface-variant">Showing 24 results</span>
          </div>
          {jobs.map((job) => (
            <div key={job.title} className="bg-surface-container-lowest p-6 rounded-xl shadow-sm hover:translate-x-1 transition-transform cursor-pointer group">
              <div className="flex justify-between items-start mb-4">
                <div className="flex gap-4">
                  <div className={`w-12 h-12 rounded-lg ${job.iconBg} flex items-center justify-center`}>
                    <span className="material-symbols-outlined">{job.icon}</span>
                  </div>
                  <div>
                    <h3 className="font-headline font-bold text-lg group-hover:text-primary transition-colors">{job.title}</h3>
                    <div className="flex items-center gap-3 mt-1">
                      <span className="text-sm text-on-surface-variant flex items-center gap-1">
                        <span className="material-symbols-outlined text-sm">apartment</span> {job.dept}
                      </span>
                      <span className="text-sm text-on-surface-variant flex items-center gap-1">
                        <span className="material-symbols-outlined text-sm">location_on</span> {job.location}
                      </span>
                    </div>
                  </div>
                </div>
                <div className={`${job.matchBg} px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 ai-glow`}>
                  <span className="material-symbols-outlined text-xs" style={{ fontVariationSettings: "'FILL' 1" }}>bolt</span>
                  {job.match} Match
                </div>
              </div>
              <div className="flex justify-between items-center mt-6">
                <div className="flex gap-2">
                  {job.tags.map((t) => (
                    <span key={t} className="px-2 py-1 bg-surface-container text-on-surface-variant text-[10px] uppercase font-bold rounded">{t}</span>
                  ))}
                </div>
                <button className="bg-primary text-on-primary px-5 py-2 rounded-lg font-medium text-sm hover:bg-primary-container transition-all active:scale-95">Quick Apply</button>
              </div>
            </div>
          ))}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Application Status */}
          <div className="bg-surface-container-low p-6 rounded-xl">
            <h2 className="font-headline font-bold text-lg mb-6">Recent Applications</h2>
            <div className="space-y-6 relative before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-[2px] before:bg-outline-variant/30">
              {applications.map((app) => (
                <div key={app.title} className="relative pl-8">
                  <div className={`absolute left-0 top-1 w-6 h-6 rounded-full ${app.iconBg} flex items-center justify-center z-10 shadow-md`}>
                    <span className={`material-symbols-outlined text-[14px] ${app.iconColor}`} style={{ fontVariationSettings: "'wght' 700" }}>{app.icon}</span>
                  </div>
                  <div>
                    <p className={`text-xs font-bold ${app.statusColor} uppercase tracking-tighter mb-1`}>{app.status}</p>
                    <h4 className="text-sm font-bold text-on-surface leading-tight">{app.title}</h4>
                    <p className="text-xs text-on-surface-variant mt-1">{app.sub}</p>
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full mt-8 py-3 text-sm font-bold text-primary border border-primary/20 rounded-xl hover:bg-primary/5 transition-colors">View All Applications</button>
          </div>

          {/* Market Insights */}
          <div className="bg-gradient-to-br from-primary to-primary-container p-6 rounded-xl text-on-primary shadow-xl relative overflow-hidden">
            <div className="relative z-10">
              <h3 className="font-headline font-bold text-lg mb-2">Job Market Insights</h3>
              <p className="text-primary-fixed-dim text-sm mb-6 leading-relaxed">Roles in <strong>Data Engineering</strong> are seeing a 40% increase in salary offers this month.</p>
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-secondary-fixed cursor-pointer hover:underline">
                Explore Trends <span className="material-symbols-outlined text-xs">arrow_forward</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
