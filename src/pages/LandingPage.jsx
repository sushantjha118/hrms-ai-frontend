import { useState } from "react";
import { Link } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

const features = [
  {
    icon: "person_search", border: "border-primary", iconBg: "bg-primary/10 text-primary",
    title: "AI-Powered Recruitment",
    desc: "Smart candidate scoring matches skills and culture fit automatically, cutting time-to-hire significantly.",
    badge: "Avg. Time to Hire", value: "18 Days",  badgeBg: "bg-secondary/5", badgeText: "text-secondary",
  },
  {
    icon: "monitoring", border: "border-secondary", iconBg: "bg-secondary/10 text-secondary",
    title: "Performance Insights",
    desc: "Track team health scores, review cycles, and individual growth — all in one place.",
    badge: "Team Health Score", value: "4.8 / 5",  badgeBg: "bg-tertiary/5", badgeText: "text-tertiary",
  },
  {
    icon: "event_available", border: "border-tertiary", iconBg: "bg-tertiary/10 text-tertiary",
    title: "Leave & Attendance",
    desc: "One-click leave approvals, real-time attendance tracking, and automated policy compliance.",
    badge: "Compliance Rate", value: "97%", badgeBg: "bg-primary/5", badgeText: "text-primary",
  },
];

const companies = [
  { name: "Stripe",    letter: "S", color: "bg-indigo-600" },
  { name: "Notion",    letter: "N", color: "bg-slate-800" },
  { name: "Figma",     letter: "F", color: "bg-pink-500" },
  { name: "Vercel",    letter: "V", color: "bg-black" },
  { name: "Linear",    letter: "L", color: "bg-violet-600" },
];

const plans = [
  {
    name: "Starter", price: "₹2,499", period: "/mo",
    features: ["Up to 25 employees", "Core HRIS Tools", "Leave & Attendance", "Email Support"],
    cta: "Get Started", highlight: false,
  },
  {
    name: "Growth", price: "₹7,999", period: "/mo",
    features: ["Up to 150 employees", "Advanced Analytics", "Performance Reviews", "Recruitment Module", "Priority Support"],
    cta: "Start Free Trial", highlight: true,
  },
  {
    name: "Enterprise", price: "Custom", period: "",
    features: ["Unlimited employees", "Custom Integrations", "Dedicated Account Manager", "SLA & Compliance"],
    cta: "Contact Sales", highlight: false,
  },
];

export default function LandingPage() {
  const { dark, toggle } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="bg-surface text-on-surface overflow-x-hidden">
      {/* Nav */}
      <header className="w-full top-0 sticky z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center glass-effect">
          <div className="text-xl font-bold text-primary font-headline flex items-center gap-2">
            <img src="/assets/images/hrms-ai-logo.png" alt="HRMS AI" className="w-8 h-8 rounded-lg object-contain" />
            HRMS AI
          </div>
          {/* <nav className="hidden md:flex gap-8 items-center">
            <a href="#features" className="text-on-surface-variant font-semibold text-sm hover:text-primary transition-colors">Features</a>
            <a href="#pricing"  className="text-on-surface-variant font-semibold text-sm hover:text-primary transition-colors">Pricing</a>
            <a href="#about"    className="text-on-surface-variant font-semibold text-sm hover:text-primary transition-colors">About</a>
          </nav> */}
          <div className="flex items-center gap-3">
            <button onClick={toggle} className="p-2 text-on-surface-variant hover:bg-surface-container rounded-full transition-colors" title="Toggle theme">
              <span className="material-symbols-outlined text-lg">{dark ? "light_mode" : "dark_mode"}</span>
            </button>
            <Link to="/login" className="hidden sm:block font-semibold text-sm text-on-surface-variant hover:text-primary transition-colors">Sign in</Link>
            <Link to="/register" className="bg-primary text-on-primary px-4 py-2 rounded-lg font-semibold text-sm hover:bg-primary-container transition-all">Get started</Link>
          </div>
        </div>
      </header>

      <main>
        {/* Hero */}
        <section className="relative pt-24 pb-28 overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-gradient-to-b from-primary/10 to-transparent rounded-full blur-3xl -z-10 pointer-events-none"></div>
          <div className="max-w-7xl mx-auto px-6 text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-primary/10 text-primary rounded-full text-xs font-bold mb-6 tracking-wide">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
              Now with AI-powered workforce insights
            </div>
            <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight mb-6 font-headline text-on-surface leading-tight">
              The smarter way to<br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary-container">manage your people</span>
            </h1>
            <p className="max-w-xl mx-auto text-lg text-on-surface-variant mb-10 leading-relaxed">
              HRMS AI brings together recruitment, attendance, leave, and performance into one clean, fast platform your team will actually use.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center items-center mb-16">
              <Link to="/register" className="px-7 py-3.5 bg-primary text-on-primary font-bold rounded-xl shadow-lg shadow-primary/20 hover:bg-primary-container transition-all active:scale-95">
                Start for free
              </Link>
              <a href="#features" className="px-7 py-3.5 bg-surface-container-lowest text-on-surface font-semibold rounded-xl border border-outline-variant/30 hover:bg-surface-container transition-all flex items-center gap-2">
                <span className="material-symbols-outlined text-lg">arrow_downward</span>
                See how it works
              </a>
            </div>

            {/* Real dashboard mockup */}
            <div className="relative mx-auto max-w-5xl">
              <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-2xl blur-xl"></div>
              <div className="relative bg-surface-container-lowest rounded-2xl overflow-hidden shadow-2xl border border-outline-variant/20">
                {/* Fake browser bar */}
                <div className="flex items-center gap-2 px-4 py-3 bg-surface-container border-b border-outline-variant/10">
                  <span className="w-3 h-3 rounded-full bg-error/60"></span>
                  <span className="w-3 h-3 rounded-full bg-amber-400/60"></span>
                  <span className="w-3 h-3 rounded-full bg-secondary/60"></span>
                  <div className="flex-1 mx-4 bg-surface-container-low rounded-md px-3 py-1 text-xs text-on-surface-variant text-center">app.hrmsai.com/admin</div>
                </div>
                {/* Mini dashboard preview */}
                <div className="p-6 bg-surface-container-low/30">
                  <div className="grid grid-cols-4 gap-3 mb-4">
                    {[
                      { label: "Employees", value: "1,248", icon: "groups",      color: "text-primary" },
                      { label: "Present",   value: "1,142", icon: "how_to_reg",  color: "text-secondary" },
                      { label: "On Leave",  value: "8",     icon: "event_busy",  color: "text-amber-500" },
                      { label: "Open Jobs", value: "5",     icon: "work",        color: "text-tertiary" },
                    ].map((s) => (
                      <div key={s.label} className="bg-surface-container-lowest rounded-xl p-4 shadow-sm">
                        <div className="flex items-center justify-between mb-2">
                          <span className={`material-symbols-outlined text-lg ${s.color}`}>{s.icon}</span>
                        </div>
                        <p className="text-xl font-extrabold text-on-surface font-headline">{s.value}</p>
                        <p className="text-[10px] text-on-surface-variant font-medium uppercase tracking-wider">{s.label}</p>
                      </div>
                    ))}
                  </div>
                  <div className="grid grid-cols-3 gap-3">
                    <div className="col-span-2 bg-surface-container-lowest rounded-xl p-4 shadow-sm">
                      <p className="text-xs font-bold text-on-surface-variant mb-3">Weekly Attendance</p>
                      <div className="flex items-end gap-2 h-16">
                        {[82, 91, 95, 88, 93, 70, 65].map((h, i) => (
                          <div key={i} className="flex-1 rounded-t-sm bg-gradient-to-t from-primary to-primary-container opacity-80" style={{ height: `${h}%` }}></div>
                        ))}
                      </div>
                      <div className="flex justify-between mt-2">
                        {["M","T","W","T","F","S","S"].map((d, i) => (
                          <span key={i} className="flex-1 text-center text-[9px] text-on-surface-variant font-bold">{d}</span>
                        ))}
                      </div>
                    </div>
                    <div className="bg-surface-container-lowest rounded-xl p-4 shadow-sm">
                      <p className="text-xs font-bold text-on-surface-variant mb-3">Leave Requests</p>
                      <div className="space-y-2">
                        {[{ name: "M. Chen", status: "Pending", color: "text-amber-500" }, { name: "E. Rodriguez", status: "Approved", color: "text-secondary" }, { name: "J. Smith", status: "Pending", color: "text-amber-500" }].map((r) => (
                          <div key={r.name} className="flex items-center justify-between">
                            <span className="text-[10px] font-medium text-on-surface">{r.name}</span>
                            <span className={`text-[9px] font-bold ${r.color}`}>{r.status}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Social proof */}
        <section className="py-14 border-y border-outline-variant/10">
          <div className="max-w-7xl mx-auto px-6">
            <p className="text-center text-xs font-bold text-outline uppercase tracking-[0.2em] mb-10">Trusted by teams at</p>
            <div className="flex flex-wrap justify-center items-center gap-10 md:gap-16">
              {companies.map((c) => (
                <div key={c.name} className="flex items-center gap-2.5 opacity-50 hover:opacity-100 transition-opacity grayscale hover:grayscale-0">
                  <div className={`w-7 h-7 rounded-lg ${c.color} flex items-center justify-center text-white font-black text-sm`}>{c.letter}</div>
                  <span className="font-bold text-on-surface-variant text-base tracking-tight">{c.name}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-28 bg-surface" id="features">
          <div className="max-w-7xl mx-auto px-6">
            <div className="mb-16 text-center">
              <h2 className="text-4xl font-bold mb-4 font-headline">Everything your HR team needs</h2>
              <p className="text-on-surface-variant max-w-lg mx-auto">Built for modern teams — from 10 to 10,000 employees.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {features.map((f) => (
                <div key={f.title} className={`bg-surface-container-lowest p-8 rounded-2xl border-l-4 ${f.border} hover:-translate-y-1 transition-transform duration-200`}>
                  <div className={`w-11 h-11 ${f.iconBg} rounded-xl flex items-center justify-center mb-5`}>
                    <span className="material-symbols-outlined">{f.icon}</span>
                  </div>
                  <h3 className="text-lg font-bold mb-2 font-headline">{f.title}</h3>
                  <p className="text-on-surface-variant text-sm leading-relaxed mb-6">{f.desc}</p>
                  <div className={`py-2.5 px-4 ${f.badgeBg} rounded-lg flex items-center justify-between`}>
                    <span className={`text-xs font-bold ${f.badgeText}`}>{f.badge}</span>
                    <span className={`font-bold text-sm ${f.badgeText}`}>{f.value}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonial */}
        <section className="py-20 bg-surface-container-low" id="about">
          <div className="max-w-3xl mx-auto px-6 text-center">
            <div className="flex justify-center mb-4">
              {[1,2,3,4,5].map((s) => (
                <span key={s} className="material-symbols-outlined text-amber-400 text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
              ))}
            </div>
            <blockquote className="text-2xl font-headline font-semibold text-on-surface leading-relaxed mb-6">
              "HRMS AI cut our HR admin time in half. Leave approvals, attendance tracking, and performance reviews — all in one place."
            </blockquote>
            <div className="flex items-center justify-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">S</div>
              <div className="text-left">
                <p className="font-bold text-sm text-on-surface">Sarah Jenkins</p>
                <p className="text-xs text-on-surface-variant">HR Director, TechCorp India</p>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing */}
        {/* <section className="py-28 bg-surface" id="pricing">
          <div className="max-w-7xl mx-auto px-6">
            <div className="mb-16 text-center">
              <h2 className="text-4xl font-bold mb-4 font-headline">Simple, honest pricing</h2>
              <p className="text-on-surface-variant">No hidden fees. Cancel anytime.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end">
              {plans.map((p) => (
                <div key={p.name} className={`bg-surface-container-lowest p-8 rounded-2xl shadow-sm relative ${p.highlight ? "border-2 border-primary scale-105 shadow-xl" : "border border-outline-variant/10"}`}>
                  {p.highlight && (
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-primary text-on-primary text-[10px] font-black px-4 py-1 rounded-full uppercase tracking-widest">Most Popular</div>
                  )}
                  <h3 className={`text-lg font-bold mb-2 font-headline ${p.highlight ? "text-primary" : "text-on-surface-variant"}`}>{p.name}</h3>
                  <div className="flex items-baseline gap-1 mb-6">
                    <span className="text-4xl font-extrabold text-on-surface">{p.price}</span>
                    {p.period && <span className="text-on-surface-variant text-sm">{p.period}</span>}
                  </div>
                  <ul className="space-y-3 mb-8">
                    {p.features.map((item) => (
                      <li key={item} className="flex items-center gap-2.5 text-sm text-on-surface-variant">
                        <span className="material-symbols-outlined text-primary text-lg">check_circle</span>{item}
                      </li>
                    ))}
                  </ul>
                  <Link to="/register"
                    className={`block w-full py-3 rounded-xl font-bold text-center transition-all ${p.highlight ? "bg-primary text-on-primary shadow-lg shadow-primary/25 hover:opacity-90" : "bg-surface-container-high text-on-surface hover:bg-surface-container-highest"}`}>
                    {p.cta}
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section> */}

        {/* CTA */}
        <section className="py-24 bg-surface-container-low">
          <div className="max-w-3xl mx-auto px-6 text-center">
            <h2 className="text-4xl font-bold font-headline mb-4">Ready to get started?</h2>
            <p className="text-on-surface-variant mb-8">Join hundreds of companies already using HRMS AI to manage their workforce.</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link to="/register" className="px-8 py-3.5 bg-primary text-on-primary font-bold rounded-xl hover:bg-primary-container transition-all shadow-lg shadow-primary/20 active:scale-95">
                Create free account
              </Link>
              <Link to="/login" className="px-8 py-3.5 bg-surface-container-lowest text-on-surface font-semibold rounded-xl border border-outline-variant/20 hover:bg-surface-container transition-all">
                Sign in instead
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-10 border-t border-outline-variant/20">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-3">
            <img src="/assets/images/hrms-ai-logo.png" alt="HRMS AI" className="w-7 h-7 rounded-lg object-contain" />
            <span className="font-bold text-primary font-headline">HRMS AI</span>
            <span className="text-on-surface-variant text-xs">© {new Date().getFullYear()} HRMS AI. All rights reserved.</span>
          </div>
          <div className="flex gap-6 text-sm text-on-surface-variant">
            <a href="#privacy" className="hover:text-primary transition-colors">Privacy</a>
            <a href="#terms"   className="hover:text-primary transition-colors">Terms</a>
            <a href="mailto:support@hrmsai.com" className="hover:text-primary transition-colors">Support</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
