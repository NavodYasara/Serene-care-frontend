import React from "react";
import Sidebar2 from "../components/Sidebar/sidebar2";
import { Outlet } from "react-router-dom";
import HeaderWrapper from "../components/Navbar/HeaderWrapper";

const StartupLayout = () => {
  return (
    <div className="app root flex h-screen overflow-hidden">
      <div className="bg-[#F1EFE8] h-screen w-full flex flex-col justify-center items-center p-4 md:p-6 overflow-y-auto">
        {/* Title above the card */}
        <h1 className="font-['Red_Hat_Display'] font-medium text-3xl md:text-4xl text-[#1D1D1D] mb-8 text-center tracking-tight">
          We would like to know about U
        </h1>

        {/* Responsive Content Card */}
        <div className="content bg-[#ffffff] rounded-3xl w-full max-w-[972px] h-[621px] max-h-[70vh] shadow-[0_8px_30px_rgb(0,0,0,0.03)] overflow-y-auto custom-scrollbar flex flex-col">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default StartupLayout;
