import { Link } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

export default function LandingPage() {
  const { dark, toggle } = useTheme();
  return (
    <div className="bg-surface text-on-surface overflow-x-hidden">
      {/* TopNavBar */}
      <header className="w-full top-0 sticky z-50 bg-transparent">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center glass-effect">
          <div className="text-xl font-bold text-primary font-headline flex items-center gap-2">
            <img src="/assets/images/hrms-ai-logo.png" alt="HRMS AI" className="w-8 h-8 rounded-lg object-contain" />
            HRMS AI
          </div>
          <nav className="hidden md:flex gap-8 items-center">
            <a href="#product" className="text-primary font-bold border-b-2 border-primary font-headline font-semibold text-sm transition-colors">Product</a>
            <a href="#features" className="text-on-surface-variant font-headline font-semibold text-sm hover:text-primary transition-colors">Features</a>
            <a href="#pricing" className="text-on-surface-variant font-headline font-semibold text-sm hover:text-primary transition-colors">Pricing</a>
          </nav>
          <div className="flex items-center gap-4">
            <button onClick={toggle} className="p-2 text-on-surface-variant hover:bg-surface-container rounded-full transition-colors" title="Toggle theme">
              <span className="material-symbols-outlined">{dark ? "light_mode" : "dark_mode"}</span>
            </button>
            <Link to="/login" className="font-headline font-semibold text-sm text-on-surface-variant hover:text-primary transition-colors">Login</Link>
            <Link to="/register" className="bg-primary text-on-primary px-5 py-2.5 rounded-lg font-headline font-semibold text-sm hover:bg-primary-container transition-all">Sign Up</Link>
          </div>
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section className="relative pt-20 pb-32 overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary-fixed text-on-primary-fixed-variant rounded-full text-xs font-bold mb-6 tracking-wide uppercase">
              <span className="material-symbols-outlined text-[14px]" style={{ fontVariationSettings: "'FILL' 1" }}>bolt</span>
              Introducing The Cognitive Canvas
            </div>
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary-container font-headline">
              The Future of HR <br />is Cognitive
            </h1>
            <p className="max-w-2xl mx-auto text-lg md:text-xl text-on-surface-variant mb-12 leading-relaxed">
              Experience the world's first AI-native Human Resource Management System. We turn fragmented data into intelligent workflows.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-20">
              <Link to="/register" className="px-8 py-4 bg-gradient-to-br from-primary to-primary-container text-white font-bold rounded-xl shadow-lg shadow-primary/20 hover:scale-105 transition-all">
                Start Free Trial
              </Link>
              <button className="px-8 py-4 bg-surface-container-lowest text-on-surface font-bold rounded-xl border border-outline-variant hover:bg-surface-container-low transition-all flex items-center gap-2">
                <span className="material-symbols-outlined">play_circle</span>
                Watch Demo
              </button>
            </div>

            {/* Dashboard Mockup */}
            <div className="relative group mx-auto max-w-5xl">
              <div className="absolute -inset-1 bg-gradient-to-r from-primary to-secondary rounded-[2rem] blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
              <div className="relative bg-surface-container-lowest rounded-2xl overflow-hidden shadow-2xl border border-outline-variant/20">
                <div className="w-full h-64 bg-gradient-to-br from-primary/5 to-secondary/5 flex items-center justify-center">
                  <p className="text-on-surface-variant font-medium">Dashboard Preview</p>
                </div>
                {/* AI Insight Overlay */}
                <div className="absolute bottom-6 right-6 max-w-xs p-5 glass-effect rounded-xl ai-glow border-l-4 border-tertiary text-left">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="material-symbols-outlined text-tertiary text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>psychology</span>
                    <span className="text-[10px] font-bold text-tertiary uppercase tracking-widest">Cognitive Insight</span>
                  </div>
                  <p className="text-xs font-medium text-on-surface leading-snug">
                    Retention probability increased by <span className="text-secondary font-bold">14%</span> across the Engineering department after last week's adjustment.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Social Proof */}
        <section className="py-16 bg-surface-container-low overflow-hidden">
          <div className="max-w-7xl mx-auto px-6">
            <p className="text-center text-sm font-bold text-outline uppercase tracking-[0.2em] mb-12">Empowering the world's most innovative teams</p>
            <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24 opacity-60 grayscale hover:grayscale-0 transition-all">
              <div className="text-2xl font-bold tracking-tighter text-on-surface-variant italic">VERTEX</div>
              <div className="text-2xl font-black tracking-widest text-on-surface-variant uppercase">nexus</div>
              <div className="text-2xl font-semibold tracking-tight text-on-surface-variant">Lumina.co</div>
              <div className="text-2xl font-medium text-on-surface-variant flex items-center gap-1">
                <span className="w-6 h-6 bg-on-surface-variant rounded-full"></span>Sphere
              </div>
              <div className="text-2xl font-bold text-on-surface-variant">QUANTUM</div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-32 bg-surface" id="features">
          <div className="max-w-7xl mx-auto px-6">
            <div className="mb-20 text-center">
              <h2 className="text-4xl font-bold mb-4 font-headline">Redefining the Employee Lifecycle</h2>
              <p className="text-on-surface-variant max-w-xl mx-auto">Our cognitive engine works silently in the background, predicting needs before they become requests.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { icon: "person_search", border: "border-primary", iconBg: "bg-primary/10 text-primary", title: "AI-Powered Recruitment", desc: "Our proprietary talent scoring engine matches skills and cultural markers with 94% precision, reducing time-to-hire by 40%.", badge: "Efficiency Score", value: "+28%", badgeBg: "bg-secondary-container/10", badgeText: "text-secondary" },
                { icon: "monitoring", border: "border-secondary", iconBg: "bg-secondary/10 text-secondary", title: "Cognitive Performance Insights", desc: "Beyond standard reviews. HRMS AI analyzes engagement patterns and output velocity to provide real-time coaching triggers.", badge: "Sentiment Delta", value: "Stable", badgeBg: "bg-tertiary-container/10", badgeText: "text-tertiary" },
                { icon: "auto_awesome", border: "border-tertiary", iconBg: "bg-tertiary/10 text-tertiary", title: "Automated Employee Experience", desc: "From seamless onboarding to personalized benefit management, our AI handles the logistics so you can focus on the people.", badge: "Autopilot Active", value: "92%", badgeBg: "bg-primary-container/10", badgeText: "text-primary" },
              ].map((f) => (
                <div key={f.title} className={`bg-surface-container-lowest p-8 rounded-xl border-l-4 ${f.border} transition-transform hover:-translate-y-2`}>
                  <div className={`w-12 h-12 ${f.iconBg} rounded-lg flex items-center justify-center mb-6`}>
                    <span className="material-symbols-outlined">{f.icon}</span>
                  </div>
                  <h3 className="text-xl font-bold mb-3 font-headline">{f.title}</h3>
                  <p className="text-on-surface-variant text-sm leading-relaxed mb-6">{f.desc}</p>
                  <div className={`py-3 px-4 ${f.badgeBg} rounded-lg flex items-center justify-between`}>
                    <span className={`text-xs font-bold ${f.badgeText}`}>{f.badge}</span>
                    <span className={`font-bold ${f.badgeText}`}>{f.value}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section className="py-32 bg-surface-container-low" id="pricing">
          <div className="max-w-7xl mx-auto px-6">
            <div className="mb-20 text-center">
              <h2 className="text-4xl font-bold mb-4 font-headline">Simple, Transparent Scaling</h2>
              <p className="text-on-surface-variant">Choose the plan that grows with your organization.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-end">
              {/* Starter */}
              <div className="bg-surface-container-lowest p-10 rounded-xl shadow-sm border border-outline-variant/10">
                <div className="mb-8">
                  <h3 className="text-lg font-bold text-on-surface-variant mb-2 font-headline">Starter</h3>
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-extrabold text-on-surface">$49</span>
                    <span className="text-on-surface-variant">/mo</span>
                  </div>
                </div>
                <ul className="space-y-4 mb-10">
                  {["Up to 25 employees", "Core HRIS Tools", "Basic AI Recruitment"].map((item) => (
                    <li key={item} className="flex items-center gap-3 text-sm text-on-surface-variant">
                      <span className="material-symbols-outlined text-primary text-lg">check_circle</span>{item}
                    </li>
                  ))}
                </ul>
                <button className="w-full py-4 rounded-xl font-bold bg-surface-container-high text-on-surface hover:bg-surface-container-highest transition-colors">Choose Starter</button>
              </div>
              {/* Growth */}
              <div className="bg-surface-container-lowest p-10 rounded-2xl shadow-xl border-2 border-primary relative transform scale-105">
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-white text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest">Most Popular</div>
                <div className="mb-8">
                  <h3 className="text-lg font-bold text-primary mb-2 font-headline">Growth</h3>
                  <div className="flex items-baseline gap-1">
                    <span className="text-5xl font-extrabold text-on-surface">$199</span>
                    <span className="text-on-surface-variant">/mo</span>
                  </div>
                </div>
                <ul className="space-y-4 mb-10">
                  {["Up to 150 employees", "Advanced AI Analytics", "Automated Performance", "24/7 Dedicated Support"].map((item) => (
                    <li key={item} className="flex items-center gap-3 text-sm font-semibold">
                      <span className="material-symbols-outlined text-primary text-lg">check_circle</span>{item}
                    </li>
                  ))}
                </ul>
                <button className="w-full py-4 rounded-xl font-bold bg-gradient-to-br from-primary to-primary-container text-white shadow-lg shadow-primary/30 hover:scale-[1.02] transition-transform">Get Started Free</button>
              </div>
              {/* Enterprise */}
              <div className="bg-surface-container-lowest p-10 rounded-xl shadow-sm border border-outline-variant/10">
                <div className="mb-8">
                  <h3 className="text-lg font-bold text-on-surface-variant mb-2 font-headline">Enterprise</h3>
                  <span className="text-4xl font-extrabold text-on-surface">Custom</span>
                </div>
                <ul className="space-y-4 mb-10">
                  {["Unlimited employees", "Full Custom AI Training", "Dedicated Account Lead"].map((item) => (
                    <li key={item} className="flex items-center gap-3 text-sm text-on-surface-variant">
                      <span className="material-symbols-outlined text-primary text-lg">check_circle</span>{item}
                    </li>
                  ))}
                </ul>
                <button className="w-full py-4 rounded-xl font-bold bg-surface-container-high text-on-surface hover:bg-surface-container-highest transition-colors">Contact Sales</button>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 bg-surface">
          <div className="max-w-5xl mx-auto px-6">
            <div className="bg-on-surface rounded-[2.5rem] p-12 md:p-20 text-center relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary opacity-20 blur-[100px] -mr-32 -mt-32"></div>
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary opacity-20 blur-[100px] -ml-32 -mb-32"></div>
              <h2 className="text-3xl md:text-5xl font-bold text-surface mb-8 relative z-10 font-headline">Ready to evolve your workspace?</h2>
              <p className="text-surface-variant/70 text-lg mb-12 max-w-xl mx-auto relative z-10">Join 2,500+ companies already building the future with HRMS AI.</p>
              <div className="flex flex-col sm:flex-row justify-center gap-4 relative z-10">
                <Link to="/register" className="px-10 py-5 bg-surface-container-lowest text-on-surface font-bold rounded-xl hover:bg-surface-container transition-colors">Get Started Now</Link>
                <button className="px-10 py-5 border border-outline-variant text-on-primary font-bold rounded-xl hover:bg-surface-container/20 transition-colors">View All Features</button>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-12 border-t border-outline-variant/30">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-8">
            <span className="text-xl font-bold text-primary font-headline flex items-center gap-2">
            <img src="/assets/images/hrms-ai-logo.png" alt="HRMS AI" className="w-8 h-8 rounded-lg object-contain" />
            HRMS AI
          </span>
            <p className="text-on-surface-variant text-xs">© 2024 HRMS AI Inc. All rights reserved.</p>
          </div>
          <div className="flex gap-8 text-sm font-medium text-on-surface-variant">
            <a href="#privacy" className="hover:text-primary">Privacy Policy</a>
            <a href="#terms" className="hover:text-primary">Terms of Service</a>
            <a href="#twitter" className="hover:text-primary">Twitter</a>
            <a href="#linkedin" className="hover:text-primary">LinkedIn</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
