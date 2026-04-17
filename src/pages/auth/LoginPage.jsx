import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext";
import { useAuth } from "../../context/AuthContext";
import api from "../../services/api";

const roles = [
  { value: "admin",     icon: "admin_panel_settings", label: "Admin" },
  { value: "hr",        icon: "badge",                label: "HR" },
  { value: "employee",  icon: "person",               label: "Employee" },
  { value: "candidate", icon: "person_search",        label: "Candidate" },
];

const roleRoutes = { admin: "/admin", hr: "/hr", employee: "/employee", candidate: "/candidate" };

export default function LoginPage() {
  const [selectedRole, setSelectedRole] = useState("admin");
  const [showPassword, setShowPassword]  = useState(false);
  const [loading, setLoading]            = useState(false);
  const [error, setError]                = useState("");
  const navigate  = useNavigate();
  const { login } = useAuth();
  const { dark, toggle } = useTheme();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    const form = new FormData(e.target);
    try {
      const { data } = await api.post("/auth/login", {
        email:    form.get("email"),
        password: form.get("password"),
      });
      login(data.user, data.token);
      navigate(roleRoutes[data.user.role]);
    } catch (err) {
      setError(err.response?.data?.error || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-background font-body text-on-surface min-h-screen flex flex-col">
      <main className="flex-grow flex items-center justify-center p-6 sm:p-12 relative overflow-hidden">
        <div className="absolute top-[-10%] left-[-5%] w-[40%] h-[40%] bg-primary-fixed/30 rounded-full blur-[120px] -z-10"></div>
        <div className="absolute bottom-[-10%] right-[-5%] w-[30%] h-[30%] bg-secondary-fixed/20 rounded-full blur-[100px] -z-10"></div>

        <div className="w-full max-w-[440px]">
          <div className="text-center mb-10">
            <img src="/assets/images/hrms-ai-logo.png" alt="HRMS AI" className="w-14 h-14 rounded-xl object-contain mx-auto mb-4 shadow-lg shadow-primary/20" />
            <h1 className="font-headline text-2xl font-extrabold tracking-tight text-on-surface mb-2">HRMS AI Workspace</h1>
            <p className="text-on-surface-variant font-medium">Welcome back. Enter your credentials to continue.</p>
          </div>

          <div className="bg-surface-container-lowest rounded-xl shadow-[0_32px_64px_-12px_rgba(53,37,205,0.08)] p-8 border border-outline-variant/10">
            {error && (
              <div className="mb-4 p-3 rounded-lg bg-error-container/30 border border-error/20 text-sm text-error font-medium">
                {error}
              </div>
            )}
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-on-surface-variant ml-1" htmlFor="email">Email Address</label>
                <div className="relative group">
                  <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-xl transition-colors group-focus-within:text-primary">mail</span>
                  <input className="w-full pl-10 pr-4 py-3 bg-surface-container-low border-0 ring-1 ring-inset ring-outline-variant/30 rounded-lg focus:ring-2 focus:ring-primary focus:bg-surface-container-lowest transition-all duration-200 outline-none text-on-surface placeholder:text-outline/60"
                    id="email" name="email" placeholder="name@company.ai" required type="email" />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center px-1">
                  <label className="block text-sm font-semibold text-on-surface-variant" htmlFor="password">Password</label>
                  <a href="#forgot" className="text-xs font-semibold text-primary hover:text-primary-container transition-colors">Forgot password?</a>
                </div>
                <div className="relative group">
                  <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-xl transition-colors group-focus-within:text-primary">lock</span>
                  <input className="w-full pl-10 pr-10 py-3 bg-surface-container-low border-0 ring-1 ring-inset ring-outline-variant/30 rounded-lg focus:ring-2 focus:ring-primary focus:bg-surface-container-lowest transition-all duration-200 outline-none text-on-surface placeholder:text-outline/60"
                    id="password" name="password" placeholder="••••••••" required type={showPassword ? "text" : "password"} />
                  <button className="absolute right-3 top-1/2 -translate-y-1/2 text-outline hover:text-on-surface transition-colors" type="button" onClick={() => setShowPassword(!showPassword)}>
                    <span className="material-symbols-outlined text-xl">{showPassword ? "visibility_off" : "visibility"}</span>
                  </button>
                </div>
              </div>

              {/* Role Selection removed — role is determined by backend */}

              <button disabled={loading}
                className="w-full py-4 bg-gradient-to-r from-primary to-primary-container text-on-primary font-bold rounded-lg shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 active:scale-[0.98] transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-60"
                type="submit">
                {loading ? <span className="material-symbols-outlined animate-spin text-xl">progress_activity</span> : <><span>Sign In</span><span className="material-symbols-outlined text-xl">arrow_forward</span></>}
              </button>
            </form>
          </div>

          <p className="mt-8 text-center text-sm font-medium text-on-surface-variant">
            Don't have an account?{" "}
            <Link to="/register" className="text-primary font-bold hover:underline underline-offset-4 decoration-2 transition-all">Sign up for a free trial</Link>
          </p>
        </div>
      </main>

      <footer className="p-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs font-semibold text-outline px-12">
        <div className="flex items-center gap-6">
          <a href="#privacy" className="hover:text-on-surface transition-colors">Privacy Policy</a>
          <a href="#terms" className="hover:text-on-surface transition-colors">Terms of Service</a>
        </div>
        <div className="flex items-center gap-4">
          <button onClick={toggle} className="p-2 text-outline hover:bg-surface-container rounded-full transition-colors" title="Toggle theme">
            <span className="material-symbols-outlined text-lg">{dark ? "light_mode" : "dark_mode"}</span>
          </button>
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-sm">support_agent</span>
            <span>Need help? Contact support@HRMS.ai</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
