import React from "react";
import { Navigate } from "react-router-dom";
import { isAuthenticated, isTokenExpired, getUserRole } from "./authHelper";

/**
 * ProtectedRoute component
 * Wraps components that require authentication
 * Redirects to login if not authenticated or token expired
 */
const ProtectedRoute = ({ children, requiredRole }) => {
  if (!isAuthenticated() || isTokenExpired()) {
    // Clear expired token and redirect to login
    if (isTokenExpired()) {
      localStorage.removeItem("authToken");
    }
    return <Navigate to="/login" replace />;
  }

  // Check role if required
  if (requiredRole) {
    const userRole = getUserRole();
    if (userRole !== requiredRole) {
      return <Navigate to="/unauthorized" replace />;
    }
  }

  return children;
};

export default ProtectedRoute;
