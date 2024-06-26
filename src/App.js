import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Sidebar from "./Components/Sidebar";

import Home from "./Pages/Home";
import Register from "./Pages/Register";
import Login from "./Pages/Login";

import Layout from "./Layouts/Layout";

import AccDashboard from "./Pages/ACCOUNTANT/AccDashboard";

import AdminDashboard from "./Pages/ADMIN/AdminDashboard";
import UserManagement from "./Pages/ADMIN/UserManagement";

import CaregiverDashboard from "./Pages/CAREGIVER/CaregiverDashboard";
import CaregiverProfile from "./Pages/CAREGIVER/CaregiverProfile";

import CaregiverDetail from "./Pages/CARETAKER/CaregiverDetail";
import Careplan from "./Pages/CARETAKER/Careplan";
import CaretakerDashboard from "./Pages/CARETAKER/CaretakerDashboard";
import Report from "./Pages/CARETAKER/Report";

import CaregiverAllocation from "./Pages/MANAGER/CaregiverAllocation";
import ManagerDashboard from "./Pages/MANAGER/ManagerDashboard";
import ManageStaff from "./Pages/MANAGER/ManageStaff";


function App() {
  // userType is obtained from some authentication mechanism
  const [userType, setUserType] = useState("manager");

  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Home />} />
        <Route path="Home" element={<Home />} />
        <Route path="Register" element={<Register />} />
        <Route path="Login" element={<Login />} />

        <Route path="Layout" element={<Layout/>} />

        <Route path="AccDashboard" element={<AccDashboard />} />

        <Route path="AdminDashboard" element={<AdminDashboard />} />
        <Route path="UserManagement" element={<UserManagement />} />

        <Route path="CaregiverDashboard" element={<CaregiverDashboard />} />
        <Route path="CaregiverProfile" element={<CaregiverProfile />} />

        <Route path="CaregiverDetail" element={<CaregiverDetail />} />
        <Route path="Careplan" element={<Careplan />} />
        <Route path="CaretakerDashboard" element={<CaretakerDashboard />} />
        <Route path="Report" element={<Report />} />

        <Route path="CaregiverAllocation" element={<CaregiverAllocation />} />
        <Route path="ManagerDashboard" element={<ManagerDashboard />} />
        <Route path="ManageStaff" element={<ManageStaff/>} />

        {/* Pass userType to Sidebar */}
        <Route path="*" element={<Sidebar userType={userType} />} />
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;


