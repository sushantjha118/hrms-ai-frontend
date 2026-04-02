import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/login");
  };

  return (
    <div className="bg-surface font-body text-on-surface min-h-screen flex items-center justify-center p-0 md:p-6 lg:p-12">
      <div className="w-full max-w-7xl mx-auto flex flex-col md:flex-row bg-surface-container-lowest rounded-xl shadow-2xl overflow-hidden min-h-[850px]">

        {/* Left Panel */}
        <div className="relative hidden md:flex md:w-5/12 lg:w-1/2 flex-col justify-end p-12 overflow-hidden bg-primary">
          <div className="absolute inset-0 z-0 bg-gradient-to-t from-primary via-primary/40 to-transparent"></div>
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-8">
              <span className="material-symbols-outlined text-secondary-fixed text-4xl" style={{ fontVariationSettings: "'FILL' 1" }}>auto_awesome</span>
              <span className="font-headline font-extrabold text-2xl text-on-primary tracking-tight">Kinetic AI</span>
            </div>
            <div className="bg-white/10 backdrop-blur-md p-8 rounded-xl border border-white/10 ai-glow">
              <p className="text-xl lg:text-2xl font-headline font-semibold text-white leading-relaxed mb-6 italic">
                "Kinetic AI transformed how we scale our teams - it feels less like software and more like a strategic partner."
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-primary-fixed flex items-center justify-center text-primary font-bold text-lg">SJ</div>
                <div>
                  <p className="font-bold text-on-primary">Sarah Jenkins</p>
                  <p className="text-sm text-on-primary-container">HR Director at TechCorp</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Panel - Form */}
        <div className="w-full md:w-7/12 lg:w-1/2 p-8 lg:p-16 flex flex-col justify-center">
          <div className="max-w-md mx-auto w-full">
            {/* Mobile Logo */}
            <div className="md:hidden flex items-center gap-2 mb-8">
              <span className="material-symbols-outlined text-primary text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>auto_awesome</span>
              <span className="font-headline font-extrabold text-xl text-primary tracking-tight">Kinetic AI</span>
            </div>

            <header className="mb-10">
              <h1 className="text-3xl lg:text-4xl font-headline font-bold text-on-surface mb-2 tracking-tight">Get started</h1>
              <p className="text-on-surface-variant">Join the future of intelligent talent management.</p>
            </header>

            {/* Social SSO */}
            <div className="space-y-4 mb-8">
              <button className="w-full flex items-center justify-center gap-3 px-6 py-3 border border-outline-variant rounded-lg font-medium text-on-surface hover:bg-surface-container transition-colors duration-200">
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05" />
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                </svg>
                Sign Up with Google
              </button>
              <button className="w-full flex items-center justify-center gap-3 px-6 py-3 border border-outline-variant rounded-lg font-medium text-on-surface hover:bg-surface-container transition-colors duration-200">
                <span className="material-symbols-outlined text-on-surface-variant">key</span>
                Sign Up with SSO
              </button>
            </div>

            <div className="relative flex items-center mb-8">
              <div className="flex-grow border-t border-outline-variant/50"></div>
              <span className="flex-shrink mx-4 text-xs font-semibold text-outline uppercase tracking-widest">Or with email</span>
              <div className="flex-grow border-t border-outline-variant/50"></div>
            </div>

            {/* Form */}
            <form className="space-y-5" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-on-surface-variant uppercase tracking-wider ml-1">Full Name</label>
                  <input className="w-full px-4 py-3 bg-surface-container-low border-transparent focus:border-primary focus:ring-0 rounded-lg text-on-surface transition-all" placeholder="Alex Rivera" type="text" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-on-surface-variant uppercase tracking-wider ml-1">Work Email</label>
                  <input className="w-full px-4 py-3 bg-surface-container-low border-transparent focus:border-primary focus:ring-0 rounded-lg text-on-surface transition-all" placeholder="alex@company.com" type="email" />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-on-surface-variant uppercase tracking-wider ml-1">Company Name</label>
                  <input className="w-full px-4 py-3 bg-surface-container-low border-transparent focus:border-primary focus:ring-0 rounded-lg text-on-surface transition-all" placeholder="Acme Inc." type="text" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-on-surface-variant uppercase tracking-wider ml-1">Role</label>
                  <select className="w-full px-4 py-3 bg-surface-container-low border-transparent focus:border-primary focus:ring-0 rounded-lg text-on-surface appearance-none transition-all">
                    <option disabled value="">Select your role</option>
                    <option>Admin</option>
                    <option>HR Manager</option>
                    <option>Recruiter</option>
                    <option>Department Head</option>
                    <option>Other</option>
                  </select>
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-on-surface-variant uppercase tracking-wider ml-1">Create Password</label>
                <div className="relative">
                  <input className="w-full px-4 py-3 bg-surface-container-low border-transparent focus:border-primary focus:ring-0 rounded-lg text-on-surface transition-all" placeholder="••••••••" type={showPassword ? "text" : "password"} />
                  <button className="absolute right-4 top-1/2 -translate-y-1/2 text-outline" type="button" onClick={() => setShowPassword(!showPassword)}>
                    <span className="material-symbols-outlined text-xl">{showPassword ? "visibility_off" : "visibility"}</span>
                  </button>
                </div>
                <div className="pt-2 px-1">
                  <div className="flex gap-1.5 h-1 w-full">
                    <div className="flex-1 bg-primary rounded-full"></div>
                    <div className="flex-1 bg-primary rounded-full"></div>
                    <div className="flex-1 bg-primary rounded-full"></div>
                    <div className="flex-1 bg-surface-container-highest rounded-full"></div>
                  </div>
                  <div className="flex justify-between items-center mt-2">
                    <p className="text-[10px] font-semibold text-primary uppercase tracking-tighter">Strength: Strong</p>
                    <p className="text-[10px] text-on-surface-variant italic">Must be at least 8 characters</p>
                  </div>
                </div>
              </div>
              <div className="pt-4">
                <button className="w-full bg-indigo-gradient text-white font-headline font-bold py-4 rounded-lg shadow-lg shadow-primary/20 hover:shadow-primary/40 active:scale-[0.98] transition-all flex items-center justify-center gap-2 group" type="submit">
                  Create Account
                  <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>
                </button>
              </div>
            </form>

            <footer className="mt-10 text-center">
              <p className="text-sm text-on-surface-variant">
                Already have an account?{" "}
                <Link to="/login" className="text-primary font-bold hover:underline ml-1">Log in</Link>
              </p>
              <p className="mt-6 text-[11px] text-outline leading-relaxed px-4">
                By signing up, you agree to our{" "}
                <a href="#terms" className="underline">Terms of Service</a> and{" "}
                <a href="#privacy" className="underline">Privacy Policy</a>.
              </p>
            </footer>
          </div>
        </div>
      </div>

      {/* AI Insight Badge */}
      <div className="fixed bottom-8 right-8 hidden lg:flex items-center gap-3 bg-white border-l-4 border-tertiary p-4 rounded-lg shadow-xl animate-pulse">
        <div className="w-10 h-10 rounded-full bg-tertiary-container/10 flex items-center justify-center">
          <span className="material-symbols-outlined text-tertiary">psychology</span>
        </div>
        <div>
          <p className="text-xs font-bold text-tertiary uppercase tracking-wider">AI Insight</p>
          <p className="text-xs text-on-surface-variant">Setup takes less than 2 minutes.</p>
        </div>
      </div>
    </div>
  );
}
