import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Auth
import { AuthProvider } from "./auth/AuthContext";
import ProtectedRoute   from "./auth/ProtectedRoute";

// Public pages
import Home        from "./Pages/Home";
import Register    from "./Pages/Register";
import Login       from "./Pages/Login";
import Unauthorized from "./Pages/Unauthorized";

// Layouts (kept for reference / legacy routes)
import Layout2 from "./Layouts/Layout2";
import MUI     from "./Layouts/MUI";

// ── ADMIN pages ──────────────────────────────────────────────────────────────
import AdminDashboard from "./Pages/ADMIN/AdminDashboard";
import ManageStaff    from "./Pages/ADMIN/ManageStaff";

// ── CAREGIVER pages ───────────────────────────────────────────────────────────
import CaregiverDashboard from "./Pages/CAREGIVER/CaregiverDashboard";
import CaregiverProfile   from "./Pages/CAREGIVER/CaregiverProfile";

// ── CARETAKER (patient) pages ─────────────────────────────────────────────────
import CaretakerDashboard from "./Pages/CARETAKER/CaretakerDashboard";
import Report             from "./Pages/CARETAKER/Report";
import ServiceRequests    from "./Pages/CARETAKER/ServiceRequests";
import Payment            from "./Pages/CARETAKER/Payment";
import Feedback           from "./Pages/CARETAKER/Feedback";

// ── MANAGER pages ─────────────────────────────────────────────────────────────
import ManagerDashboard from "./Pages/MANAGER/ManagerDashboard";
import Careplan         from "./Pages/MANAGER/Careplan";
import NewPlan          from "./Pages/MANAGER/NewPlan";
import WaitingPlan      from "./Pages/MANAGER/WaitingPlan";
import AcceptedPlan     from "./Pages/MANAGER/AcceptedPlan";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* ── Public routes ─────────────────────────────────────────── */}
          <Route path="/"        element={<Home />} />
          <Route path="/Home"    element={<Home />} />
          <Route path="/Register" element={<Register />} />
          <Route path="/Login"    element={<Login />} />
          <Route path="/Unauthorized" element={<Unauthorized />} />

          {/* Legacy layout routes */}
          <Route path="/Layout2" element={<Layout2 />} />
          <Route path="/MUI"     element={<MUI />} />

          {/* ── ADMIN only ────────────────────────────────────────────── */}
          <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
            <Route path="/AdminDashboard" element={<AdminDashboard />} />
            <Route path="/ManageStaff"    element={<ManageStaff />} />
          </Route>

          {/* ── CAREGIVER only ────────────────────────────────────────── */}
          <Route element={<ProtectedRoute allowedRoles={["caregiver"]} />}>
            <Route path="/CaregiverDashboard" element={<CaregiverDashboard />} />
            <Route path="/CaregiverProfile"   element={<CaregiverProfile />} />
          </Route>

          {/* ── CARETAKER (patient) only ──────────────────────────────── */}
          <Route element={<ProtectedRoute allowedRoles={["caretaker"]} />}>
            <Route path="/CaretakerDashboard" element={<CaretakerDashboard />} />
            <Route path="/ServiceRequests"    element={<ServiceRequests />} />
            <Route path="/Feedback"           element={<Feedback />} />
            <Route path="/Report"             element={<Report />} />
            <Route path="/Payment"            element={<Payment />} />
          </Route>

          {/* ── MANAGER only ──────────────────────────────────────────── */}
          <Route element={<ProtectedRoute allowedRoles={["manager"]} />}>
            <Route path="/ManagerDashboard" element={<ManagerDashboard />} />
            <Route path="/Careplan"         element={<Careplan />} />
            <Route path="/newTask"          element={<NewPlan />} />
            <Route path="/waitingPlan"      element={<WaitingPlan />} />
            <Route path="/Finalized"        element={<AcceptedPlan />} />
          </Route>

          {/* ── Catch-all → redirect to login ─────────────────────────── */}
          <Route path="*" element={<Navigate to="/Login" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
