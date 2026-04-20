import { useEffect, useState } from "react";
import DashboardLayout from "../../components/DashboardLayout";
import { SkeletonText, SkeletonAvatar } from "../../components/Skeleton";
import api from "../../services/api";

const ROLES = ["admin", "hr", "employee", "candidate"];

function AddUserModal({ onClose, onSuccess }) {
  const [form, setForm]       = useState({ name: "", email: "", password: "", role: "employee", status: "active" });
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!form.name || !form.email || !form.password) { setError("All fields are required."); return; }
    if (form.password.length < 8) { setError("Password must be at least 8 characters."); return; }
    setLoading(true);
    try {
      await api.post("/auth/register", form);
      onSuccess();
      onClose();
    } catch (err) {
      setError(err.response?.data?.error || "Failed to create user.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-surface-container-lowest rounded-2xl shadow-2xl w-full max-w-md p-6 border border-outline-variant/20">
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-headline font-bold text-lg text-on-surface">Add New User</h3>
          <button onClick={onClose} className="text-on-surface-variant hover:text-on-surface transition-colors">
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        {error && (
          <div className="mb-4 p-3 rounded-lg bg-error-container/30 text-sm text-error font-medium">{error}</div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-1.5">Full Name</label>
            <input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })}
              placeholder="e.g. John Smith"
              className="w-full px-4 py-2.5 bg-surface-container-low rounded-lg text-sm text-on-surface border-none outline-none focus:ring-2 focus:ring-primary/30" />
          </div>

          <div>
            <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-1.5">Email Address</label>
            <input type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })}
              placeholder="john@company.com"
              className="w-full px-4 py-2.5 bg-surface-container-low rounded-lg text-sm text-on-surface border-none outline-none focus:ring-2 focus:ring-primary/30" />
          </div>

          <div>
            <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-1.5">Password</label>
            <input type="password" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })}
              placeholder="Min. 8 characters"
              className="w-full px-4 py-2.5 bg-surface-container-low rounded-lg text-sm text-on-surface border-none outline-none focus:ring-2 focus:ring-primary/30" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-1.5">Role</label>
              <select value={form.role} onChange={e => setForm({ ...form, role: e.target.value })}
                className="w-full px-4 py-2.5 bg-surface-container-low rounded-lg text-sm text-on-surface border-none outline-none focus:ring-2 focus:ring-primary/30">
                {ROLES.map(r => <option key={r} value={r}>{r.charAt(0).toUpperCase() + r.slice(1)}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-1.5">Status</label>
              <select value={form.status} onChange={e => setForm({ ...form, status: e.target.value })}
                className="w-full px-4 py-2.5 bg-surface-container-low rounded-lg text-sm text-on-surface border-none outline-none focus:ring-2 focus:ring-primary/30">
                <option value="active">Active</option>
                <option value="pending">Pending</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
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
                : <span className="material-symbols-outlined text-lg">person_add</span>
              }
              {loading ? "Creating..." : "Create User"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function UserManagement() {
  const [users,    setUsers]    = useState([]);
  const [loading,  setLoading]  = useState(true);
  const [filter,   setFilter]   = useState("all");
  const [showModal,setShowModal]= useState(false);

  const fetchUsers = () => {
    setLoading(true);
    api.get("/auth/users").then(r => setUsers(r.data)).finally(() => setLoading(false));
  };

  useEffect(() => { fetchUsers(); }, []);

  const toggleStatus = async (u) => {
    await api.put(`/auth/users/${u.id}`, { is_active: !u.is_active, status: u.is_active ? "inactive" : "active" });
    fetchUsers();
  };

  const filtered = filter === "all" ? users : users.filter(u => u.role === filter);

  const statusDot  = { active: "bg-secondary", inactive: "bg-outline", pending: "bg-tertiary" };
  const statusText = { active: "text-secondary", inactive: "text-outline", pending: "text-tertiary" };

  return (
    <DashboardLayout>
      {showModal && <AddUserModal onClose={() => setShowModal(false)} onSuccess={fetchUsers} />}

      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h2 className="text-3xl font-extrabold font-headline tracking-tight text-on-surface">User Management</h2>
          <p className="text-on-surface-variant mt-1 text-sm">Manage all user accounts and roles.</p>
        </div>
        <button onClick={() => setShowModal(true)}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-primary to-primary-container text-on-primary font-bold text-sm shadow-lg hover:opacity-90 active:scale-95 transition-all">
          <span className="material-symbols-outlined text-[20px]">person_add</span> Add User
        </button>
      </div>

      {/* Role filter tabs */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        {["all", ...ROLES].map((r) => (
          <button key={r} onClick={() => setFilter(r)}
            className={`py-3 rounded-xl text-sm font-bold capitalize transition-all ${filter === r ? "bg-primary text-on-primary shadow-lg" : "bg-surface-container-lowest text-on-surface-variant hover:bg-surface-container"}`}>
            {r === "all" ? `All (${users.length})` : `${r} (${users.filter(u => u.role === r).length})`}
          </button>
        ))}
      </div>

      <div className="bg-surface-container-lowest rounded-2xl overflow-hidden shadow-sm">
        {loading ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-surface-container-low/30">
                <tr>{["Name","Email","Role","Status","Joined","Actions"].map(h => <th key={h} className="px-6 py-4"><SkeletonText className="h-3 w-16" /></th>)}</tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/10">
                {Array.from({ length: 6 }).map((_, i) => (
                  <tr key={i}>
                    <td className="px-6 py-4"><div className="flex items-center gap-3"><SkeletonAvatar /><SkeletonText className="h-3 w-24" /></div></td>
                    {[1,2,3,4,5].map(j => <td key={j} className="px-6 py-4"><SkeletonText className="h-3 w-16" /></td>)}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-surface-container-low/30">
                  {["Name", "Email", "Role", "Status", "Joined", "Actions"].map((h) => (
                    <th key={h} className={`px-6 py-4 text-[11px] font-bold text-on-surface-variant uppercase tracking-widest ${h === "Actions" ? "text-right" : ""}`}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/10">
                {filtered.length === 0 ? (
                  <tr><td colSpan={6} className="px-6 py-12 text-center text-on-surface-variant">No users found.</td></tr>
                ) : filtered.map((u) => (
                  <tr key={u.id} className="group hover:bg-surface-container-low/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xs">
                          {u.name.charAt(0).toUpperCase()}
                        </div>
                        <p className="text-sm font-bold text-on-surface">{u.name}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-on-surface-variant">{u.email}</td>
                    <td className="px-6 py-4">
                      <span className="px-2.5 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-bold uppercase">{u.role}</span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <span className={`w-2 h-2 rounded-full ${statusDot[u.status] || "bg-outline"}`}></span>
                        <span className={`text-xs font-semibold capitalize ${statusText[u.status] || "text-outline"}`}>{u.status}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-xs text-on-surface-variant">{new Date(u.created_at).toLocaleDateString()}</td>
                    <td className="px-6 py-4 text-right">
                      <button onClick={() => toggleStatus(u)}
                        className={`text-xs font-bold px-3 py-1.5 rounded-lg transition-colors ${u.is_active ? "text-error hover:bg-error-container/20" : "text-secondary hover:bg-secondary/10"}`}>
                        {u.is_active ? "Deactivate" : "Activate"}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        <div className="px-6 py-4 border-t border-outline-variant/10 flex items-center justify-between">
          <p className="text-xs text-on-surface-variant font-medium">
            Showing <span className="text-on-surface font-bold">{filtered.length}</span> of <span className="text-on-surface font-bold">{users.length}</span> users
          </p>
        </div>
      </div>
    </DashboardLayout>
  );
}
