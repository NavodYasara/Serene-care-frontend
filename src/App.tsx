import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Auth
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./routes/ProtectedRoute";

// Public pages
import Home from "./pages/Home/Home";
import Register from "./pages/Register/Register";
import Login from "./pages/Login/Login";
import Unauthorized from "./pages/Unauthorized/Unauthorized";
import AuthLayout from "./layouts/AuthLayout";

// Layouts (kept for reference / legacy routes)
import Layout2 from "./layouts/Layout2";
import MUI from "./layouts/MUI";
// ── ADMIN pages ──────────────────────────────────────────────────────────────
import AdminDashboard from "./pages/ADMIN/Dashboard/AdminDashboard";
import ManageStaff from "./pages/ADMIN/ManageStaff/ManageStaff";

// ── CAREGIVER pages ───────────────────────────────────────────────────────────
import CaregiverDashboard from "./pages/CAREGIVER/Dashboard/CaregiverDashboard";
import CaregiverProfile from "./pages/CAREGIVER/Profile/CaregiverProfile";

// ── CARETAKER (patient) pages ─────────────────────────────────────────────────
import CaretakerDashboard from "./pages/CARETAKER/Dashboard/CaretakerDashboard";
import Report from "./pages/CARETAKER/Report/Report";
import ServiceRequests from "./pages/CARETAKER/ServiceRequests/ServiceRequests";
import Payment from "./pages/CARETAKER/Payment/Payment";
import Feedback from "./pages/CARETAKER/Feedback/Feedback";
import MasterLayout from "./layouts/MasterLayout";
import AccDashboard from "./pages/accountant/AccDashboard";
import OnboardForm from "./pages/CARETAKER/Dashboard/onboard";
import StartupLayout from "./layouts/StatupLayout";

function App(): React.JSX.Element {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<MasterLayout />}>
            <Route path="/sandbox" />
          </Route>
          <Route element={<StartupLayout />}>
            <Route path="/onboard" element={<OnboardForm />} />
          </Route>

          {/* ── Public routes ─────────────────────────────────────────── */}
          <Route element={<AuthLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/Home" element={<Home />} />
            <Route path="/Register" element={<Register />} />
            <Route path="/Login" element={<Login />} />
            <Route path="/Unauthorized" element={<Unauthorized />} />
          </Route>

          {/* Legacy layout routes */}
          <Route path="/Layout2" element={<Layout2 />} />
          <Route path="/MUI" element={<MUI />} />

          {/* ── ADMIN only ────────────────────────────────────────────── */}
          <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
            <Route path="/AdminDashboard" element={<AdminDashboard />} />
            <Route path="/ManageStaff" element={<ManageStaff />} />
          </Route>

          {/* ── CAREGIVER only ────────────────────────────────────────── */}
          <Route element={<ProtectedRoute allowedRoles={["caregiver"]} />}>
            <Route
              path="/CaregiverDashboard"
              element={<CaregiverDashboard />}
            />
            <Route path="/CaregiverProfile" element={<CaregiverProfile />} />
          </Route>

          {/* ── CARETAKER (patient) only ──────────────────────────────── */}
          <Route element={<ProtectedRoute allowedRoles={["caretaker"]} />}>
            <Route
              path="/CaretakerDashboard"
              element={<CaretakerDashboard />}
            />
            <Route path="/ServiceRequests" element={<ServiceRequests />} />
            <Route path="/Feedback" element={<Feedback />} />
            <Route path="/Report" element={<Report />} />
            <Route path="/Payment" element={<Payment />} />
          </Route>

          {/* ── Catch-all → redirect to login ─────────────────────────── */}
          <Route path="*" element={<Navigate to="/Login" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
