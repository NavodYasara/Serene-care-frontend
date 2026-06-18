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

const Sidebar = () => {
  const { userType, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); // clears context state + localStorage
    navigate("/Login");
  };

  const getSidebarMenu = () => {
    switch (userType) {
      case "admin":
        return (
          <>
            <NavLink exact to="/AdminDashboard" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="columns">Dashboard</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/ManageStaff" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="table">Manage Staff</CDBSidebarMenuItem>
            </NavLink>
          </>
        );

      case "caregiver":
        return (
          <>
            <NavLink
              exact
              to="/CaregiverDashboard"
              activeClassName="activeClicked"
            >
              <CDBSidebarMenuItem icon="columns">Dashboard</CDBSidebarMenuItem>
            </NavLink>
            <NavLink
              exact
              to="/CaregiverProfile"
              activeClassName="activeClicked"
            >
              <CDBSidebarMenuItem icon="user">My Profile</CDBSidebarMenuItem>
            </NavLink>
          </>
        );

      case "caretaker":
        return (
          <>
            <NavLink
              exact
              to="/CaretakerDashboard"
              activeClassName="activeClicked"
            >
              <CDBSidebarMenuItem icon="columns">Dashboard</CDBSidebarMenuItem>
            </NavLink>
            <NavLink
              exact
              to="/ServiceRequests"
              activeClassName="activeClicked"
            >
              <CDBSidebarMenuItem icon="concierge-bell">
                Service Requests
              </CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/Feedback" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="comment-dots">
                Feedbacks
              </CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/Report" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="chart-line">Reports</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/Payment" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="credit-card">
                Payment
              </CDBSidebarMenuItem>
            </NavLink>
          </>
        );

      case "manager":
        return (
          <>
            <NavLink
              exact
              to="/ManagerDashboard"
              activeClassName="activeClicked"
            >
              <CDBSidebarMenuItem icon="columns">Dashboard</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/newTask" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="plus-circle">
                New Plan
              </CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/waitingPlan" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="clock">
                Assigned Plans
              </CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/Finalized" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="check-circle">
                Finalized Plans
              </CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/appoinment" activeClassName="activeClicked">
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

  const roleLabel = {
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
              {roleLabel[userType] || "Serene Care"}
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
