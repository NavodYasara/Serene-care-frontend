import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Auth
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute   from "./routes/ProtectedRoute";

// Public pages
import Home        from "./pages/Home/Home";
import Register    from "./pages/Register/Register";
import Login       from "./pages/Login/Login";
import Unauthorized from "./pages/Unauthorized/Unauthorized";

// Layouts (kept for reference / legacy routes)
import Layout2 from "./layouts/Layout2";
import MUI     from "./layouts/MUI";

// ── ADMIN pages ──────────────────────────────────────────────────────────────
import AdminDashboard from "./pages/admin/Dashboard/AdminDashboard";
import ManageStaff    from "./pages/admin/ManageStaff/ManageStaff";

// ── CAREGIVER pages ───────────────────────────────────────────────────────────
import CaregiverDashboard from "./pages/caregiver/Dashboard/CaregiverDashboard";
import CaregiverProfile   from "./pages/caregiver/Profile/CaregiverProfile";

// ── CARETAKER (patient) pages ─────────────────────────────────────────────────
import CaretakerDashboard from "./pages/caretaker/Dashboard/CaretakerDashboard";
import Report             from "./pages/caretaker/Report/Report";
import ServiceRequests    from "./pages/caretaker/ServiceRequests/ServiceRequests";
import Payment            from "./pages/caretaker/Payment/Payment";
import Feedback           from "./pages/caretaker/Feedback/Feedback";

// ── MANAGER pages ─────────────────────────────────────────────────────────────
import ManagerDashboard from "./pages/manager/Dashboard/ManagerDashboard";
import Careplan         from "./pages/manager/Careplan/Careplan";
import NewPlan          from "./pages/manager/NewPlan/NewPlan";
import WaitingPlan      from "./pages/manager/WaitingPlan/WaitingPlan";
import AcceptedPlan     from "./pages/manager/AcceptedPlan/AcceptedPlan";

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
