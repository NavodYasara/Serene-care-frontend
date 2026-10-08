import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import {
  FaHeartbeat,
  FaClipboardList,
  FaChartBar,
  FaCommentDots,
  FaCreditCard,
} from "react-icons/fa";
import { FiSettings, FiLogOut } from "react-icons/fi";

const Sidebar2 = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); // clears context state + localStorage
    navigate("/Login");
  };

  return (
    <div className="sidebar h-screen w-64 bg-[#0f4c43] text-white flex flex-col justify-between p-6">
      {/* Top Section */}
      <div>
        {/* Header / Title */}
        <div className="text-center pb-6 border-b border-white/20">
          <h1 className="text-3xl font-semibold tracking-widest leading-tight">
            Serene
          </h1>
          <h1 className="text-3xl font-semibold tracking-widest leading-tight">
            Care
          </h1>
        </div>

        {/* Navigation Links */}
        <nav className="mt-8 flex flex-col gap-6">
          <NavLink
            to="/CaretakerDashboard"
            className={({ isActive }) =>
              `flex items-center gap-4 text-lg font-medium cursor-pointer transition-colors ${
                isActive ? "text-teal-300 font-bold" : "text-white hover:text-teal-300"
              }`
            }
          >
            <FaHeartbeat className="text-teal-400 text-xl" />
            <span>Dashboard</span>
          </NavLink>

          <NavLink
            to="/ServiceRequests"
            className={({ isActive }) =>
              `flex items-center gap-4 text-lg font-medium cursor-pointer transition-colors ${
                isActive ? "text-teal-300 font-bold" : "text-white hover:text-teal-300"
              }`
            }
          >
            <FaClipboardList className="text-teal-400 text-xl" />
            <span>Service Requests</span>
          </NavLink>

          <NavLink
            to="/Feedback"
            className={({ isActive }) =>
              `flex items-center gap-4 text-lg font-medium cursor-pointer transition-colors ${
                isActive ? "text-teal-300 font-bold" : "text-white hover:text-teal-300"
              }`
            }
          >
            <FaCommentDots className="text-teal-400 text-xl" />
            <span>Feedbacks</span>
          </NavLink>

          <NavLink
            to="/Report"
            className={({ isActive }) =>
              `flex items-center gap-4 text-lg font-medium cursor-pointer transition-colors ${
                isActive ? "text-teal-300 font-bold" : "text-white hover:text-teal-300"
              }`
            }
          >
            <FaChartBar className="text-teal-400 text-xl" />
            <span>Reports</span>
          </NavLink>

          <NavLink
            to="/Payment"
            className={({ isActive }) =>
              `flex items-center gap-4 text-lg font-medium cursor-pointer transition-colors ${
                isActive ? "text-teal-300 font-bold" : "text-white hover:text-teal-300"
              }`
            }
          >
            <FaCreditCard className="text-teal-400 text-xl" />
            <span>Payment</span>
          </NavLink>
        </nav>
      </div>

      {/* Bottom Section */}
      <div className="border-t border-white/20 pt-6 flex flex-col gap-6">
        <div className="flex items-center gap-4 text-lg font-medium cursor-pointer hover:text-teal-300 transition-colors">
          <FiSettings className="text-xl" />
          <span>Settings</span>
        </div>

        <div
          onClick={handleLogout}
          className="flex items-center gap-4 text-lg font-medium cursor-pointer hover:text-red-300 transition-colors"
        >
          <FiLogOut className="text-xl" />
          <span>Logout</span>
        </div>
      </div>
    </div>
  );
};

export default Sidebar2;
