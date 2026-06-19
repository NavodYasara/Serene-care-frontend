import Navbar from "../components/Navbar/Navbar";
import Sidebar from "../components/Sidebar/Sidebar";
import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <>
      <div style={{ flex: 1 }}>
        <div className="mgd-main" style={{ padding: "20px" }}>
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default AuthLayout;
