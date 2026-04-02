import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const roles = [
  { value: "admin", icon: "admin_panel_settings", label: "Admin" },
  { value: "hr", icon: "badge", label: "HR" },
  { value: "employee", icon: "person", label: "Employee" },
  { value: "candidate", icon: "person_search", label: "Candidate" },
];

const roleRoutes = {
  admin: "/admin",
  hr: "/hr",
  employee: "/employee",
  candidate: "/candidate",
};

export default function LoginPage() {
  const [selectedRole, setSelectedRole] = useState("admin");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(roleRoutes[selectedRole]);
  };

  return (
    <div className="bg-background font-body text-on-surface min-h-screen flex flex-col">
      <main className="flex-grow flex items-center justify-center p-6 sm:p-12 relative overflow-hidden">
        <div className="absolute top-[-10%] left-[-5%] w-[40%] h-[40%] bg-primary-fixed/30 rounded-full blur-[120px] -z-10"></div>
        <div className="absolute bottom-[-10%] right-[-5%] w-[30%] h-[30%] bg-secondary-fixed/20 rounded-full blur-[100px] -z-10"></div>

        <div className="w-full max-w-[440px]">
          {/* Brand */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br from-primary to-primary-container mb-4 shadow-lg shadow-primary/20 ai-glow">
              <span className="material-symbols-outlined text-on-primary text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>auto_awesome</span>
            </div>
            <h1 className="font-headline text-2xl font-extrabold tracking-tight text-on-surface mb-2">HRMS AI Workspace</h1>
            <p className="text-on-surface-variant font-medium">Welcome back. Enter your credentials to continue.</p>
          </div>

          {/* Login Card */}
          <div className="bg-surface-container-lowest rounded-xl shadow-[0_32px_64px_-12px_rgba(53,37,205,0.08)] p-8 border border-outline-variant/10">
            <form className="space-y-6" onSubmit={handleSubmit}>
              {/* Email */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-on-surface-variant ml-1" htmlFor="email">Email Address</label>
                <div className="relative group">
                  <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-xl transition-colors group-focus-within:text-primary">mail</span>
                  <input
                    className="w-full pl-10 pr-4 py-3 bg-surface-container-low border-0 ring-1 ring-inset ring-outline-variant/30 rounded-lg focus:ring-2 focus:ring-primary focus:bg-surface-container-lowest transition-all duration-200 outline-none text-on-surface placeholder:text-outline/60"
                    id="email" name="email" placeholder="name@company.ai" required type="email"
                  />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-2">
                <div className="flex justify-between items-center px-1">
                  <label className="block text-sm font-semibold text-on-surface-variant" htmlFor="password">Password</label>
                  <a href="#forgot" className="text-xs font-semibold text-primary hover:text-primary-container transition-colors">Forgot password?</a>
                </div>
                <div className="relative group">
                  <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-xl transition-colors group-focus-within:text-primary">lock</span>
                  <input
                    className="w-full pl-10 pr-10 py-3 bg-surface-container-low border-0 ring-1 ring-inset ring-outline-variant/30 rounded-lg focus:ring-2 focus:ring-primary focus:bg-surface-container-lowest transition-all duration-200 outline-none text-on-surface placeholder:text-outline/60"
                    id="password" name="password" placeholder="••••••••" required type={showPassword ? "text" : "password"}
                  />
                  <button className="absolute right-3 top-1/2 -translate-y-1/2 text-outline hover:text-on-surface transition-colors" type="button" onClick={() => setShowPassword(!showPassword)}>
                    <span className="material-symbols-outlined text-xl">{showPassword ? "visibility_off" : "visibility"}</span>
                  </button>
                </div>
              </div>

              {/* Role Selection */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-on-surface-variant ml-1">Account Role</label>
                <div className="grid grid-cols-2 gap-3">
                  {roles.map((role) => (
                    <label
                      key={role.value}
                      className={`relative flex items-center p-3 rounded-lg cursor-pointer hover:bg-surface-container transition-all ${selectedRole === role.value ? "border-2 border-primary bg-primary/5" : "bg-surface-container-low border-2 border-transparent"}`}
                    >
                      <input className="sr-only" name="role" type="radio" value={role.value} checked={selectedRole === role.value} onChange={() => setSelectedRole(role.value)} />
                      <span className={`material-symbols-outlined mr-2 text-lg ${selectedRole === role.value ? "text-primary" : "text-outline"}`}>{role.icon}</span>
                      <span className={`text-xs font-semibold ${selectedRole === role.value ? "text-on-surface" : "text-on-surface-variant"}`}>{role.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Submit */}
              <button className="w-full py-4 bg-gradient-to-r from-primary to-primary-container text-on-primary font-bold rounded-lg shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 active:scale-[0.98] transition-all duration-200 flex items-center justify-center gap-2" type="submit">
                <span>Sign In</span>
                <span className="material-symbols-outlined text-xl">arrow_forward</span>
              </button>
            </form>

            {/* Divider */}
            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-outline-variant/30"></div>
              </div>
              <div className="relative flex justify-center text-xs uppercase tracking-widest font-bold">
                <span className="bg-surface-container-lowest px-4 text-outline">or connect with</span>
              </div>
            </div>

            {/* SSO */}
            <button className="w-full py-3 bg-surface-container-low hover:bg-surface-container transition-colors rounded-lg flex items-center justify-center gap-3 group">
              <span className="material-symbols-outlined text-on-surface-variant">key</span>
              <span className="text-sm font-semibold text-on-surface-variant group-hover:text-on-surface">Continue with SSO</span>
            </button>
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
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-sm">support_agent</span>
          <span>Need help? Contact support@HRMS.ai</span>
        </div>
      </footer>
    </div>
  );
}
