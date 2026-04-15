import React, { useState, useEffect } from "react";
import Navbar from "../Components/Navbar/Navbar";
import "../App.css";
import Sidebar from "../Components/Sidebar";

function Layout({ children }) {
  const [isFixed, setIsFixed] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    function handleScroll() {
      setIsFixed(window.scrollY >= 100);
    }
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  function toggleSidebar() {
    setIsSidebarOpen((prev) => !prev);
  }

  return (
    <>
      <div className="main">
        <div className={`navbar-part ${isFixed ? "fixed" : ""}`}>
          <Navbar onMenuClick={toggleSidebar} />
        </div>
        <div className="row page-part">
          <div className={`col-2 sidebar-part ${isSidebarOpen ? "open" : ""}`}>
            {/* Sidebar reads userType from AuthContext — no prop needed */}
            <Sidebar />
          </div>
          <div className="col-10 content-part">
            {children}
          </div>
        </div>
      </div>
    </>
  );
}

export default Layout;
