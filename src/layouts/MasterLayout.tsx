import React from "react";
import { useState } from "react";
import Sidebar2 from "../components/Sidebar/sidebar2";
import { Outlet } from "react-router-dom";
import HeaderWrapper from "../components/Navbar/HeaderWrapper";
import { UserProfileProvider } from "../context/UserProfileContext";

const MasterLayout = () => {
  return (
    <UserProfileProvider>
      <div className="app root flex h-screen overflow-hidden">
        <Sidebar2 />
        <div className="bg-[#F1EFE8] h-screen w-full flex flex-col overflow-hidden">
          <HeaderWrapper />
          <div className="content bg-[#ffffff] rounded-3xl flex-1 overflow-y-auto m-3 custom-scrollbar">
            <Outlet />
          </div>
        </div>
      </div>
    </UserProfileProvider>
  );
};

export default MasterLayout;
