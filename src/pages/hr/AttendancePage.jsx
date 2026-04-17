import { useEffect, useState, useRef } from "react";
import DashboardLayout from "../../components/DashboardLayout";
import { useAuth } from "../../context/AuthContext";
import api from "../../services/api";

const tabs = ["All", "Present", "Absent", "Late"];
const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const DAYS = ["S", "M", "T", "W", "T", "F", "S"];

export default function AttendancePage() {
  const { user } = useAuth();
  const isHR = user?.role === "admin" || user?.role === "hr";

  const [view, setView] = useState("calendar");
  const [records, setRecords] = useState([]);
  const [stats, setStats] = useState({ total_employees: 0, present: 0, absent: 0, late: 0 });
  const [weekly, setWeekly] = useState([]);
  const [activeTab, setActiveTab] = useState(0);
  const [loading, setLoading] = useState(true);
  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState("");

  // Import modal state
  const [importModal, setImportModal] = useState(false);
  const [importFile, setImportFile] = useState(null);
  const [importResult, setImportResult] = useState(null);
  const [importing, setImporting] = useState(false);
  const [employees, setEmployees] = useState([]);
  const fileInputRef = useRef();

  const fetchHRData = () => {
    return Promise.all([
      api.get("/attendance/today"),
      api.get("/attendance/stats"),
      api.get("/attendance/weekly"),
    ]).then(([rec, st, wk]) => {
      setRecords(rec.data);
      setStats(st.data);
      setWeekly(wk.data);
    });
  };

  useEffect(() => {
    if (isHR) {
      fetchHRData()
        .then(() => api.get("/employees").then(r => setEmployees(r.data)).catch(() => {}))
        .finally(() => setLoading(false));
    } else {
      api.get("/attendance/me")
        .then((res) => setRecords(res.data))
        .finally(() => setLoading(false));
    }
  }, [isHR]);

  const handleImport = async () => {
    if (!importFile) return;
    setImporting(true);
    setImportResult(null);
    const form = new FormData();
    form.append("file", importFile);
    try {
      const res = await api.post("/attendance/import", form, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setImportResult({ success: true, ...res.data });
      await fetchHRData();
    } catch (err) {
      setImportResult({ success: false, error: err.response?.data?.error || "Import failed" });
    } finally {
      setImporting(false);
    }
  };

  const closeImportModal = () => {
    setImportModal(false);
    setImportFile(null);
    setImportResult(null);
  };

  const downloadSampleCSV = () => {
    const today = new Date().toISOString().split("T")[0];
    const rows = [
      "employee_id,date,status,check_in,check_out,hours_worked",
      ...employees.slice(0, 3).map((e, i) => {
        const statuses = ["present", "late", "absent"];
        const checkIns  = ["09:00", "09:45", ""];
        const checkOuts = ["18:00", "18:00", ""];
        const hours     = ["9", "8.25", ""];
        return `${e.id},${today},${statuses[i]},${checkIns[i]},${checkOuts[i]},${hours[i]}`;
      }),
    ];
    if (employees.length === 0) {
      rows.push("1," + today + ",present,09:00,18:00,9");
    }
    const blob = new Blob([rows.join("\n")], { type: "text/csv" });
    const url  = URL.createObjectURL(blob);
    const a    = document.createElement("a");
    a.href     = url;
    a.download = "attendance_sample.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  const filtered = records.filter((r) => {
    if (activeTab === 0) return true;
    if (activeTab === 1) return r.status === "present";
    if (activeTab === 2) return r.status === "absent";
    if (activeTab === 3) return r.status === "late";
    return true;
  });

  const myPresent = records.filter(r => r.status === "present").length;
  const myLate = records.filter(r => r.status === "late").length;
  const myAbsent = records.filter(r => r.status === "absent").length;

  const statCards = isHR ? [
    { icon: "how_to_reg", iconBg: "bg-primary/10 text-primary", label: "Present Today", value: stats.present, badge: stats.total_employees ? `${Math.round(stats.present / stats.total_employees * 100)}%` : "0%", badgeColor: "text-emerald-600 bg-emerald-50" },
    { icon: "person_off", iconBg: "bg-error/10 text-error", label: "Absent Today", value: stats.absent, badge: "Today", badgeColor: "text-error bg-error-container/30" },
    { icon: "schedule", iconBg: "bg-amber-50 text-amber-600", label: "Late Arrivals", value: stats.late, badge: "Today", badgeColor: "text-amber-600 bg-amber-50" },
    { icon: "groups", iconBg: "bg-secondary/10 text-secondary", label: "Total Employees", value: stats.total_employees, badge: "Active", badgeColor: "text-secondary bg-secondary/10" },
  ] : [
    { icon: "how_to_reg", iconBg: "bg-primary/10 text-primary", label: "Days Present", value: myPresent, badge: "Total", badgeColor: "text-emerald-600 bg-emerald-50" },
    { icon: "schedule", iconBg: "bg-amber-50 text-amber-600", label: "Late Arrivals", value: myLate, badge: "Total", badgeColor: "text-amber-600 bg-amber-50" },
    { icon: "person_off", iconBg: "bg-error/10 text-error", label: "Absent Days", value: myAbsent, badge: "Total", badgeColor: "text-error bg-error-container/30" },
    { icon: "calendar_month", iconBg: "bg-secondary/10 text-secondary", label: "Total Records", value: records.length, badge: "Logged", badgeColor: "text-secondary bg-secondary/10" },
  ];

  const statusColor = { present: "text-emerald-600 bg-emerald-50", absent: "text-error bg-error-container/30", late: "text-amber-600 bg-amber-50" };
  const statusDot = { present: "bg-emerald-500", absent: "bg-error", late: "bg-amber-500" };

  // Calendar logic
  const getDaysInMonth = (y, m) => new Date(y, m + 1, 0).getDate();
  const getFirstDayOfMonth = (y, m) => new Date(y, m, 1).getDay();

  const renderCalendar = (monthIndex) => {
    const daysInMonth = getDaysInMonth(year, monthIndex);
    const firstDay = getFirstDayOfMonth(year, monthIndex);
    const days = [];

    for (let i = 0; i < firstDay; i++) days.push(null);
    for (let d = 1; d <= daysInMonth; d++) days.push(d);

    const monthRecords = records.filter((r) => {
      if (!r.date) return false;
      const rd = new Date(r.date);
      return rd.getFullYear() === year && rd.getMonth() === monthIndex;
    });

    const getRecordForDay = (day) => {
      const dateStr = `${year}-${String(monthIndex + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
      return monthRecords.find((r) => r.date === dateStr);
    };

    return (
      <div className="bg-surface-container-lowest rounded-2xl p-6 shadow-sm border border-outline-variant/10">
        <h3 className="font-headline font-bold text-lg mb-4 text-on-surface">{MONTHS[monthIndex]}</h3>
        <div className="grid grid-cols-7 gap-1">
          {DAYS.map((d, di) => (
            <div key={di} className="text-center text-xs font-bold text-on-surface-variant py-2">{d}</div>
          ))}
          {days.map((day, i) => {
            if (!day) return <div key={`empty-${i}`} className="aspect-square"></div>;
            const rec = getRecordForDay(day);
            const isWeekend = (firstDay + day - 1) % 7 === 0 || (firstDay + day - 1) % 7 === 6;
            const isToday = new Date().getDate() === day && new Date().getMonth() === monthIndex && new Date().getFullYear() === year;

            return (
              <div key={day} className={`aspect-square border rounded-lg p-2 text-left transition-all hover:shadow-md ${
                isToday ? "border-primary bg-primary/5" :
                rec?.status === "present" ? "border-emerald-200 bg-emerald-50/50" :
                rec?.status === "late" ? "border-amber-200 bg-amber-50/50" :
                rec?.status === "absent" ? "border-error/20 bg-error-container/10" :
                isWeekend ? "bg-surface-container-low/30 border-outline-variant/10" :
                "border-outline-variant/10 bg-surface-container-lowest"
              }`}>
                <div className="flex items-start justify-between mb-1">
                  <span className={`text-xs font-bold ${isToday ? "text-primary" : "text-on-surface"}`}>{day}</span>
                  {rec && (
                    <span className={`material-symbols-outlined text-[14px] ${
                      rec.status === "present" ? "text-emerald-600" :
                      rec.status === "late" ? "text-amber-600" :
                      "text-error"
                    }`} style={{ fontVariationSettings: "'FILL' 1" }}>
                      {rec.status === "present" ? "check_circle" : rec.status === "late" ? "schedule" : "cancel"}
                    </span>
                  )}
                  {isWeekend && !rec && (
                    <span className="material-symbols-outlined text-[12px] text-outline">event_busy</span>
                  )}
                </div>
                {rec && (
                  <div className="text-[9px] space-y-0.5">
                    <p className={`font-bold capitalize ${
                      rec.status === "present" ? "text-emerald-700" :
                      rec.status === "late" ? "text-amber-700" :
                      "text-error"
                    }`}>{rec.status}</p>
                    {rec.check_in && <p className="text-on-surface-variant">In: {rec.check_in}</p>}
                    {rec.check_out && <p className="text-on-surface-variant">Out: {rec.check_out}</p>}
                    {rec.hours_worked && <p className="text-on-surface font-semibold">{rec.hours_worked}</p>}
                  </div>
                )}
                {isWeekend && !rec && (
                  <p className="text-[9px] text-outline font-medium mt-1">Weekend</p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <DashboardLayout>
      {/* Import Modal */}
      {importModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="bg-surface-container-lowest rounded-2xl shadow-2xl w-full max-w-md p-6 border border-outline-variant/20">
            <div className="flex items-center justify-between mb-5">
              <h3 className="font-headline font-bold text-lg text-on-surface">Import Attendance</h3>
              <button onClick={closeImportModal} className="text-on-surface-variant hover:text-on-surface transition-colors">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            {/* Format hint */}
            <div className="bg-surface-container-low rounded-xl p-4 mb-4 text-sm">
              <p className="font-semibold text-on-surface mb-2">Required columns:</p>
              <div className="grid grid-cols-2 gap-1 text-xs text-on-surface-variant mb-2">
                <span><span className="font-mono text-primary">employee_id</span> — number</span>
                <span><span className="font-mono text-primary">date</span> — YYYY-MM-DD</span>
                <span><span className="font-mono text-primary">status</span> — present/absent/late</span>
                <span><span className="font-mono text-secondary">check_in</span> — HH:MM (optional)</span>
                <span><span className="font-mono text-secondary">check_out</span> — HH:MM (optional)</span>
                <span><span className="font-mono text-secondary">hours_worked</span> — e.g. "9" (optional)</span>
              </div>
              {employees.length > 0 && (
                <p className="text-xs text-on-surface-variant border-t border-outline-variant/20 pt-2 mt-1">
                  <span className="font-semibold text-on-surface">Valid employee IDs in your system:</span>{" "}
                  {employees.slice(0, 6).map(e => e.id).join(", ")}{employees.length > 6 ? " ..." : ""}
                </p>
              )}
              <button onClick={downloadSampleCSV}
                className="mt-3 flex items-center gap-1.5 text-xs font-bold text-primary hover:underline">
                <span className="material-symbols-outlined text-sm">download</span>
                Download sample CSV with real employee IDs
              </button>
            </div>

            {/* File drop zone */}
            <div
              onClick={() => fileInputRef.current?.click()}
              className={`border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-all ${
                importFile ? "border-primary bg-primary/5" : "border-outline-variant/40 hover:border-primary/50 hover:bg-surface-container-low"
              }`}
            >
              <span className="material-symbols-outlined text-3xl text-primary mb-2 block">upload_file</span>
              {importFile ? (
                <p className="text-sm font-semibold text-primary">{importFile.name}</p>
              ) : (
                <p className="text-sm text-on-surface-variant">Click to select a CSV or Excel file</p>
              )}
              <input
                ref={fileInputRef}
                type="file"
                accept=".csv,.xlsx,.xls"
                className="hidden"
                onChange={(e) => { setImportFile(e.target.files[0] || null); setImportResult(null); }}
              />
            </div>

            {/* Result */}
            {importResult && (
              <div className={`mt-4 p-5 rounded-xl border-2 ${importResult.success ? "bg-emerald-50/50 border-emerald-200" : "bg-error-container/20 border-error/30"}`}>
                {importResult.success ? (
                  <>
                    <div className="flex items-center gap-2 mb-3">
                      <span className="material-symbols-outlined text-emerald-600 text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                      <p className="font-bold text-emerald-800">Import Complete</p>
                    </div>
                    <div className="grid grid-cols-3 gap-3 mb-3">
                      <div className="text-center p-2 bg-white/60 rounded-lg">
                        <p className="text-2xl font-extrabold text-emerald-700">{importResult.inserted}</p>
                        <p className="text-[10px] font-bold text-emerald-600 uppercase tracking-wider">Inserted</p>
                      </div>
                      <div className="text-center p-2 bg-white/60 rounded-lg">
                        <p className="text-2xl font-extrabold text-secondary">{importResult.updated}</p>
                        <p className="text-[10px] font-bold text-secondary uppercase tracking-wider">Updated</p>
                      </div>
                      <div className="text-center p-2 bg-white/60 rounded-lg">
                        <p className="text-2xl font-extrabold text-error">{importResult.failed?.length ?? 0}</p>
                        <p className="text-[10px] font-bold text-error uppercase tracking-wider">Failed</p>
                      </div>
                    </div>
                    {importResult.failed?.length > 0 && (
                      <details className="mt-3">
                        <summary className="text-xs font-bold text-error cursor-pointer hover:underline">View {importResult.failed.length} error(s)</summary>
                        <ul className="mt-2 space-y-1 text-xs text-error max-h-32 overflow-y-auto">
                          {importResult.failed.map((f, i) => {
                            const msg = f.error.includes("ForeignKeyViolation")
                              ? `Employee ID ${f.error.match(/employee_id\)=\((\d+)\)/)?.[1] || "?"} does not exist`
                              : f.error.includes("invalid literal")
                              ? "Invalid data format"
                              : f.error.length > 80 ? f.error.substring(0, 80) + "..." : f.error;
                            return <li key={i}>Row {f.row}: {msg}</li>;
                          })}
                        </ul>
                      </details>
                    )}
                  </>
                ) : (
                  <>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="material-symbols-outlined text-error text-xl">error</span>
                      <p className="font-bold text-error">Import Failed</p>
                    </div>
                    <p className="text-sm text-error">{importResult.error}</p>
                  </>
                )}
              </div>
            )}

            <div className="flex gap-3 mt-5">
              <button onClick={closeImportModal}
                className="flex-1 px-4 py-2.5 rounded-xl border border-outline-variant/30 text-sm font-semibold text-on-surface-variant hover:bg-surface-container-low transition-all">
                Cancel
              </button>
              <button onClick={handleImport} disabled={!importFile || importing}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-primary text-on-primary text-sm font-bold hover:opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed">
                {importing ? (
                  <span className="material-symbols-outlined animate-spin text-lg">progress_activity</span>
                ) : (
                  <span className="material-symbols-outlined text-lg">upload</span>
                )}
                {importing ? "Importing..." : "Import"}
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="text-3xl font-extrabold font-headline tracking-tight text-on-surface">
            {isHR ? "Attendance Overview" : "My Attendance"}
          </h2>
          <p className="text-on-surface-variant mt-1">
            {isHR ? "Real-time workforce presence tracking." : "Your personal attendance history."}
          </p>
        </div>
        <div className="flex items-center gap-3 flex-wrap">
          {/* View toggle */}
          <div className="flex items-center bg-surface-container-low p-1 rounded-xl">
            <button onClick={() => setView("calendar")}
              className={`flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-lg transition-all ${view === "calendar" ? "bg-surface-container-lowest shadow-sm text-primary" : "text-on-surface-variant hover:text-on-surface"}`}>
              <span className="material-symbols-outlined text-lg">calendar_month</span>
              Calendar View
            </button>
            <button onClick={() => setView("list")}
              className={`flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-lg transition-all ${view === "list" ? "bg-surface-container-lowest shadow-sm text-primary" : "text-on-surface-variant hover:text-on-surface"}`}>
              <span className="material-symbols-outlined text-lg">list</span>
              List View
            </button>
          </div>
          {isHR && (
            <>
              <button onClick={() => setImportModal(true)}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-surface-container-low border border-outline-variant/30 text-on-surface font-bold text-sm hover:bg-surface-container transition-all">
                <span className="material-symbols-outlined text-[18px]">upload_file</span> Import CSV/Excel
              </button>
              <button className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-primary to-primary-container text-on-primary font-bold text-sm shadow-lg hover:opacity-90 transition-all">
                <span className="material-symbols-outlined text-[18px]">add_circle</span> Mark Attendance
              </button>
            </>
          )}
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-64">
          <span className="material-symbols-outlined animate-spin text-4xl text-primary">progress_activity</span>
        </div>
      ) : (
        <>
          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {statCards.map((s) => (
              <div key={s.label} className="bg-surface-container-lowest px-5 py-4 rounded-xl shadow-sm flex items-center gap-4">
                <div className={`p-2.5 ${s.iconBg} rounded-xl flex-shrink-0`}>
                  <span className="material-symbols-outlined text-xl">{s.icon}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-xs font-semibold text-on-surface-variant truncate">{s.label}</h3>
                  <p className="text-2xl font-extrabold font-headline tracking-tighter text-on-surface leading-tight">{s.value}</p>
                </div>
                <span className={`text-xs font-bold px-2 py-1 rounded-full flex-shrink-0 ${s.badgeColor}`}>{s.badge}</span>
              </div>
            ))}
          </section>

          {view === "calendar" ? (
            <>
              {/* Year/Month filters */}
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <label className="text-sm font-semibold text-on-surface-variant">Year:</label>
                  <select value={year} onChange={(e) => setYear(Number(e.target.value))}
                    className="bg-surface-container-low border-none rounded-lg px-3 py-2 text-sm font-semibold text-on-surface focus:ring-2 focus:ring-primary/20 outline-none">
                    {[2024, 2025, 2026].map((y) => <option key={y} value={y}>{y}</option>)}
                  </select>
                </div>
                <div className="flex items-center gap-2">
                  <label className="text-sm font-semibold text-on-surface-variant">Month:</label>
                  <select value={month} onChange={(e) => setMonth(e.target.value === "" ? "" : Number(e.target.value))}
                    className="bg-surface-container-low border-none rounded-lg px-3 py-2 text-sm font-semibold text-on-surface focus:ring-2 focus:ring-primary/20 outline-none">
                    <option value="">All Months</option>
                    {MONTHS.map((m, i) => <option key={i} value={i}>{m}</option>)}
                  </select>
                </div>
              </div>

              {/* Calendar grid */}
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                {month === "" ? (
                  MONTHS.map((_, i) => <div key={i}>{renderCalendar(i)}</div>)
                ) : (
                  <div className="xl:col-span-2">{renderCalendar(month)}</div>
                )}
              </div>

              {/* Legend */}
              <div className="bg-surface-container-lowest rounded-xl p-6 shadow-sm border border-outline-variant/10">
                <h4 className="font-bold text-sm mb-4 text-on-surface">Legend</h4>
                <div className="flex flex-wrap gap-6">
                  {[
                    { icon: "check_circle", color: "text-emerald-600", bg: "bg-emerald-50", label: "Present" },
                    { icon: "schedule", color: "text-amber-600", bg: "bg-amber-50", label: "Late" },
                    { icon: "cancel", color: "text-error", bg: "bg-error-container/30", label: "Absent" },
                    { icon: "event_busy", color: "text-outline", bg: "bg-surface-container-low", label: "Weekend / Holiday" },
                  ].map((item) => (
                    <div key={item.label} className="flex items-center gap-2">
                      <div className={`w-8 h-8 rounded-lg ${item.bg} flex items-center justify-center`}>
                        <span className={`material-symbols-outlined text-sm ${item.color}`} style={{ fontVariationSettings: "'FILL' 1" }}>{item.icon}</span>
                      </div>
                      <span className="text-sm text-on-surface-variant">{item.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </>
          ) : (
            <>
              {/* List View */}
              <section className="bg-surface-container-lowest rounded-xl shadow-sm overflow-hidden">
                <div className="px-6 py-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-outline-variant/10">
                  <h4 className="font-bold text-lg font-headline">
                    {isHR ? "Today's Attendance Log" : "My Attendance History"}
                  </h4>
                  <div className="flex items-center bg-surface-container-low p-1 rounded-xl gap-1">
                    {tabs.map((t, i) => (
                      <button key={t} onClick={() => setActiveTab(i)}
                        className={`px-4 py-1.5 text-xs font-bold rounded-lg transition-all ${activeTab === i ? "bg-surface-container-lowest shadow-sm text-primary" : "text-on-surface-variant hover:text-on-surface"}`}>
                        {t}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead className="bg-surface-container-low/50">
                      <tr>
                        {(isHR
                          ? ["Employee", "Department", "Check In", "Check Out", "Hours", "Status"]
                          : ["Date", "Check In", "Check Out", "Hours", "Status"]
                        ).map((h) => (
                          <th key={h} className="px-6 py-4 text-xs font-bold text-on-surface-variant uppercase tracking-wider">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {filtered.length === 0 ? (
                        <tr><td colSpan={6} className="px-6 py-8 text-center text-on-surface-variant">No records found.</td></tr>
                      ) : filtered.map((r) => (
                        <tr key={r.id} className="hover:bg-surface-container-high transition-colors">
                          {isHR ? (
                            <>
                              <td className="px-6 py-4">
                                <div className="flex items-center gap-3">
                                  <div className="relative">
                                    <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xs">{r.name?.charAt(0)}</div>
                                    <span className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 ${statusDot[r.status] || "bg-outline"} border-2 border-surface-container-lowest rounded-full`}></span>
                                  </div>
                                  <p className="font-semibold text-sm text-on-surface">{r.name}</p>
                                </div>
                              </td>
                              <td className="px-6 py-4 text-sm text-on-surface-variant">{r.department || "—"}</td>
                            </>
                          ) : (
                            <td className="px-6 py-4 text-sm font-medium text-on-surface">{r.date ? new Date(r.date).toLocaleDateString() : "—"}</td>
                          )}
                          <td className="px-6 py-4 text-sm font-medium text-on-surface">{r.check_in || "—"}</td>
                          <td className="px-6 py-4 text-sm font-medium text-on-surface">{r.check_out || "—"}</td>
                          <td className="px-6 py-4 text-sm text-on-surface-variant">{r.hours_worked || "—"}</td>
                          <td className="px-6 py-4">
                            <span className={`flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full w-fit capitalize ${statusColor[r.status] || "text-on-surface-variant bg-surface-container"}`}>
                              <span className={`w-1.5 h-1.5 rounded-full ${statusDot[r.status] || "bg-outline"}`}></span>
                              {r.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="px-6 py-4 border-t border-outline-variant/10 text-sm text-on-surface-variant">
                  Showing <span className="font-bold text-on-surface">{filtered.length}</span> of <span className="font-bold text-on-surface">{records.length}</span> records
                </div>
              </section>
            </>
          )}
        </>
      )}
    </DashboardLayout>
  );
}
