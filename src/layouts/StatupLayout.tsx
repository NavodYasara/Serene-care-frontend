import React from "react";
import Sidebar2 from "../components/Sidebar/sidebar2";
import { Outlet } from "react-router-dom";
import HeaderWrapper from "../components/Navbar/HeaderWrapper";

const StartupLayout = () => {
  return (
    <div className="app root flex h-screen overflow-hidden">
      <div className="outerlayer bg-[#F1EFE8] h-screen w-full flex justify-center items-center p-4 md:p-6 overflow-hidden">
        <div className="inntercard content bg-[#ffffff] rounded-3xl w-[92vw] md:w-[75vw] lg:w-[65vw] max-w-[950px] h-[85vh] md:h-[80vh] max-h-[750px] shadow-2xl border border-neutral-100 overflow-y-auto custom-scrollbar">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default StartupLayout;
