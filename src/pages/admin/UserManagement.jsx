import { useEffect, useState } from "react";
import DashboardLayout from "../../components/DashboardLayout";
import api from "../../services/api";

export default function UserManagement() {
  const [users,   setUsers]   = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter,  setFilter]  = useState("all");

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

  const statusDot = { active: "bg-secondary", inactive: "bg-outline", pending: "bg-tertiary" };
  const statusText = { active: "text-secondary", inactive: "text-outline", pending: "text-tertiary" };

  return (
    <DashboardLayout>
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h2 className="text-3xl font-extrabold font-headline tracking-tight text-on-surface">User Management</h2>
          <p className="text-on-surface-variant mt-1 text-sm">Manage all user accounts and roles.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-primary to-primary-container text-on-primary font-bold text-sm shadow-lg hover:scale-[0.98] transition-all">
            <span className="material-symbols-outlined text-[20px]">person_add</span> Add User
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {["all","admin","hr","employee","candidate"].slice(0,4).map((r) => (
          <button key={r} onClick={() => setFilter(r)}
            className={`p-4 rounded-xl text-sm font-bold capitalize transition-all ${filter === r ? "bg-primary text-on-primary shadow-lg" : "bg-surface-container-lowest text-on-surface-variant hover:bg-surface-container"}`}>
            {r === "all" ? `All (${users.length})` : `${r} (${users.filter(u=>u.role===r).length})`}
          </button>
        ))}
      </div>

      <div className="bg-surface-container-lowest rounded-2xl overflow-hidden shadow-sm">
        {loading ? (
          <div className="flex items-center justify-center h-48">
            <span className="material-symbols-outlined animate-spin text-4xl text-primary">progress_activity</span>
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
                {filtered.map((u) => (
                  <tr key={u.id} className="group hover:bg-surface-container-low/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xs">
                          {u.name.charAt(0)}
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
          <p className="text-xs text-on-surface-variant font-medium">Showing <span className="text-on-surface font-bold">{filtered.length}</span> of <span className="text-on-surface font-bold">{users.length}</span> users</p>
        </div>
      </div>
    </DashboardLayout>
  );
}
