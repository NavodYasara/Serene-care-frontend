import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

/**
 * ProtectedRoute
 *
 * Usage in App.js:
 *   <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
 *     <Route path="/AdminDashboard" element={<AdminDashboard />} />
 *   </Route>
 *
 * Props:
 *   allowedRoles  — array of role strings allowed to access the nested routes
 *   redirectPath  — where to redirect unauthenticated users (default: /Login)
 */
const ProtectedRoute = ({
  allowedRoles = [],
  redirectPath = "/Login",
}) => {
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
  if (allowedRoles.length > 0 && !allowedRoles.includes(userType)) {
    return <Navigate to="/Unauthorized" replace />;
  }

  // Authorised — render child routes
  return <Outlet />;
};

export default ProtectedRoute;
