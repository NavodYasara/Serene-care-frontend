import React from "react";
import { Outlet, useLocation } from "react-router-dom";

const StartupLayout = () => {
  const location = useLocation();

  // Determine title dynamically based on the current route
  const getGreetingTitle = () => {
    switch (location.pathname) {
      case "/onboard-step3":
        return "WELCOME tHE GREETING LINE";
      default:
        return "We would like to know about U";
    }
  };

  return (
    <div className="app root flex h-screen overflow-hidden">
      <div className="bg-[#F1EFE8] h-screen w-full flex flex-col justify-center items-center p-4 md:p-6 overflow-y-auto">
        {/* Title above the card */}
        <h1 className="font-['Red_Hat_Display'] font-medium text-3xl md:text-4xl text-[#1D1D1D] mb-8 text-center tracking-tight">
          {getGreetingTitle()}
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
