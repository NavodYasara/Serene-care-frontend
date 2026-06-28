import React from "react";
import {
  FaHeartbeat,
  FaUsers,
  FaRegCalendarAlt,
  FaClipboardList,
  FaChartBar,
} from "react-icons/fa";
import { FiSettings, FiLogOut } from "react-icons/fi";

const Sidebar2 = () => {
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
          <div className="flex items-center gap-4 text-lg font-medium cursor-pointer hover:text-teal-300 transition-colors">
            <FaHeartbeat className="text-teal-400 text-xl" />
            <span>Dashboard</span>
          </div>
        </nav>
        <nav className="mt-8 flex flex-col gap-6">
          <div className="flex items-center gap-4 text-lg font-medium cursor-pointer hover:text-teal-300 transition-colors">
            <FaClipboardList className="text-teal-400 text-xl" />
            <span>My Plan</span>
          </div>
        </nav>
        <nav className="mt-8 flex flex-col gap-6">
          <div className="flex items-center gap-4 text-lg font-medium cursor-pointer hover:text-teal-300 transition-colors">
            <FaRegCalendarAlt className="text-teal-400 text-xl" />
            <span>Schedule</span>
          </div>
        </nav>
        <nav className="mt-8 flex flex-col gap-6">
          <div className="flex items-center gap-4 text-lg font-medium cursor-pointer hover:text-teal-300 transition-colors">
            <FaChartBar className="text-teal-400 text-xl" />
            <span>Reports</span>
          </div>
        </nav>
      </div>

      {/* Bottom Section */}
      <div className="border-t border-white/20 pt-6 flex flex-col gap-6">
        <div className="flex items-center gap-4 text-lg font-medium cursor-pointer hover:text-teal-300 transition-colors">
          <FiSettings className="text-xl" />
          <span>Settings</span>
        </div>

        {/* Add the logout item here */}
      </div>
    </div>
  );
};

export default Sidebar2;
