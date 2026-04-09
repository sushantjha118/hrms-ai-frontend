import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import { AuthProvider } from "./context/AuthContext";

// Auth
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";

// Public
import LandingPage from "./pages/LandingPage";

// Admin
import AdminDashboard from "./pages/admin/AdminDashboard";
import UserManagement from "./pages/admin/UserManagement";

// HR
import HROverview from "./pages/hr/HROverview";
import LeaveManagement from "./pages/hr/LeaveManagement";
import PerformanceReviews from "./pages/hr/PerformanceReviews";
import RecruitmentManagement from "./pages/hr/RecruitmentManagement";
import AttendancePage from "./pages/hr/AttendancePage";

// Employee
import EmployeePortal from "./pages/employee/EmployeePortal";
import EmployeeDirectory from "./pages/employee/EmployeeDirectory";

// Candidate
import CandidatePortal from "./pages/candidate/CandidatePortal";

export default function App() {
  return (
    <ThemeProvider>
    <AuthProvider>
    <BrowserRouter>
      <Routes>
        {/* Public */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Admin */}
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/users" element={<UserManagement />} />

        {/* HR */}
        <Route path="/hr" element={<HROverview />} />
        <Route path="/leave" element={<LeaveManagement />} />
        <Route path="/performance" element={<PerformanceReviews />} />
        <Route path="/recruitment" element={<RecruitmentManagement />} />

        <Route path="/attendance" element={<AttendancePage />} />

        {/* Employee */}
        <Route path="/employee" element={<EmployeePortal />} />
        <Route path="/employees" element={<EmployeeDirectory />} />

        {/* Candidate */}
        <Route path="/candidate" element={<CandidatePortal />} />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
    </AuthProvider>
    </ThemeProvider>
  );
}
