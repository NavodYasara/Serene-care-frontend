import React from "react";
import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarFooter,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
} from "cdbreact";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Sidebar = (): React.JSX.Element => {
  const { userType, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = (): void => {
    logout(); // clears context state + localStorage
    navigate("/Login");
  };

  const getSidebarMenu = (): React.JSX.Element | null => {
    switch (userType) {
      case "admin":
        return (
          <>
            <NavLink to="/AdminDashboard">
              <CDBSidebarMenuItem icon="columns">Dashboard</CDBSidebarMenuItem>
            </NavLink>
            <NavLink to="/ManageStaff">
              <CDBSidebarMenuItem icon="table">Manage Staff</CDBSidebarMenuItem>
            </NavLink>
          </>
        );

      case "caregiver":
        return (
          <>
            <NavLink to="/CaregiverDashboard">
              <CDBSidebarMenuItem icon="columns">Dashboard</CDBSidebarMenuItem>
            </NavLink>
            <NavLink to="/CaregiverProfile">
              <CDBSidebarMenuItem icon="user">My Profile</CDBSidebarMenuItem>
            </NavLink>
          </>
        );

      case "caretaker":
        return (
          <>
            <NavLink to="/CaretakerDashboard">
              <CDBSidebarMenuItem icon="columns">Dashboard</CDBSidebarMenuItem>
            </NavLink>
            <NavLink to="/ServiceRequests">
              <CDBSidebarMenuItem icon="concierge-bell">
                Service Requests
              </CDBSidebarMenuItem>
            </NavLink>
            <NavLink to="/Feedback">
              <CDBSidebarMenuItem icon="comment-dots">
                Feedbacks
              </CDBSidebarMenuItem>
            </NavLink>
            <NavLink to="/Report">
              <CDBSidebarMenuItem icon="chart-line">Reports</CDBSidebarMenuItem>
            </NavLink>
            <NavLink to="/Payment">
              <CDBSidebarMenuItem icon="credit-card">
                Payment
              </CDBSidebarMenuItem>
            </NavLink>
          </>
        );

      case "manager":
        return (
          <>
            <NavLink to="/ManagerDashboard">
              <CDBSidebarMenuItem icon="columns">Dashboard</CDBSidebarMenuItem>
            </NavLink>
            <NavLink to="/newTask">
              <CDBSidebarMenuItem icon="plus-circle">
                New Plan
              </CDBSidebarMenuItem>
            </NavLink>
            <NavLink to="/waitingPlan">
              <CDBSidebarMenuItem icon="clock">
                Assigned Plans
              </CDBSidebarMenuItem>
            </NavLink>
            <NavLink to="/Finalized">
              <CDBSidebarMenuItem icon="check-circle">
                Finalized Plans
              </CDBSidebarMenuItem>
            </NavLink>
            <NavLink to="/appoinment">
              <CDBSidebarMenuItem icon="table">
                Create Care Plan
              </CDBSidebarMenuItem>
            </NavLink>
          </>
        );

      default:
        return null;
    }
  };

  const roleLabel: Record<string, string> = {
    admin: "Admin Panel",
    caregiver: "Caregiver Panel",
    caretaker: "Patient Panel",
    manager: "Manager Panel",
  };

  return (
    <div className="sidebar-container">
      <div
        style={{ display: "flex", height: "100vh", overflow: "scroll initial" }}
      >
        <CDBSidebar textColor="#fff" backgroundColor="#333">
          <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large" />}>
            <a
              href="/"
              className="text-decoration-none"
              style={{ color: "inherit" }}
            >
              {userType && roleLabel[userType] ? roleLabel[userType] : "Serene Care"}
            </a>
          </CDBSidebarHeader>

          <CDBSidebarContent className="sidebar-content">
            <CDBSidebarMenu>{getSidebarMenu()}</CDBSidebarMenu>
          </CDBSidebarContent>

          <CDBSidebarFooter style={{ textAlign: "center" }}>
            <div style={{ padding: "20px 5px" }}>
              <div onClick={handleLogout} style={{ cursor: "pointer" }}>
                <CDBSidebarMenuItem icon="sign-out-alt">
                  Logout
                </CDBSidebarMenuItem>
              </div>
            </div>
          </CDBSidebarFooter>
        </CDBSidebar>
      </div>
    </div>
  );
};

export default Sidebar;
