import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

interface ProtectedRouteProps {
  allowedRoles?: string[];
  redirectPath?: string;
}

const ProtectedRoute = ({
  allowedRoles = [],
  redirectPath = "/Login",
}: ProtectedRouteProps): React.JSX.Element | null => {
  const { isAuthenticated, userType, loading } = useAuth();

  // While restoring auth state from localStorage, render nothing to avoid flicker
  if (loading) {
    return null;
  }

  // Not logged in at all → go to Login
  if (!isAuthenticated) {
    return <Navigate to={redirectPath} replace />;
  }

  // Logged in but wrong role → show Unauthorized page
  if (allowedRoles.length > 0 && userType && !allowedRoles.includes(userType)) {
    return <Navigate to="/Unauthorized" replace />;
  }

  // Authorised — render child routes
  return <Outlet />;
};

export default ProtectedRoute;
