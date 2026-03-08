import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Sidebar from "./Components/Sidebar";

import Home from "./Pages/Home";
import Register from "./Pages/Register";
import Login from "./Pages/Login";

import Layout2 from "./Layouts/Layout2";
import MUI from "./Layouts/MUI";

import AdminDashboard from "./Pages/ADMIN/AdminDashboard";
import ManageStaff from "./Pages/ADMIN/ManageStaff";

import CaregiverDashboard from "./Pages/CAREGIVER/CaregiverDashboard";
import CaregiverProfile from "./Pages/CAREGIVER/CaregiverProfile";

import CaregiverDetail from "./Pages/CARETAKER/CaregiverDetail";

import CaretakerDashboard from "./Pages/CARETAKER/CaretakerDashboard";
import Report from "./Pages/CARETAKER/Report";
import CtRequirement from "./Pages/CARETAKER/CtRequirement";
import Payment from "./Pages/CARETAKER/Payment";
import Feedback from "./Pages/CARETAKER/Feedback";

import ManagerDashboard from "./Pages/MANAGER/ManagerDashboard";
import Careplan from "./Pages/MANAGER/Careplan";
import NewPlan from "./Pages/MANAGER/NewPlan";
import WaitingPlan from "./Pages/MANAGER/WaitingPlan";
import AcceptedPlan from "./Pages/MANAGER/AcceptedPlan";
import { useEffect } from "react";

import Testfunction from "./Pages/testmodule.jsx";

function App() {
  
  
  const [userType1, setUserType] = useState("");
  // userType is obtained from local storage
  useEffect(() => {
    const userTypeFromStorage = localStorage.getItem("userDetails");
    if (userTypeFromStorage) {
      setUserType(userTypeFromStorage.userType);
      console.log(userType1);
    }
  }, []);


  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="Home" element={<Home />} />
        <Route path="Register" element={<Register />} />
        <Route path="Login" element={<Login />} />

        <Route path="Layout" element={<Layout />} />

        <Route path="AccDashboard" element={<AccDashboard />} />

        <Route path="AdminDashboard" element={<AdminDashboard />} />
        <Route path="ManageStaff" element={<ManageStaff />} />

        <Route path="CaregiverDashboard" element={<CaregiverDashboard />} />
        <Route path="CaregiverProfile" element={<CaregiverProfile />} />

        <Route path="CaregiverDetail" element={<CaregiverDetail />} />

        <Route path="CaretakerDashboard" element={<CaretakerDashboard />} />
        <Route path="Report" element={<Report />} />
        <Route path="Payment" element={<Payment />} />
        <Route path="Feedback" element={<Feedback />} />

        <Route path="ManagerDashboard" element={<ManagerDashboard />} />
        <Route path="ManageStaff" element={<ManageStaff />} />

        {/* Pass userType to Sidebar */}
        <Route path="*" element={<Sidebar userType={userType} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
