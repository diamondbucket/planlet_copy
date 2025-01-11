import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ element }) => {
  const token = localStorage.getItem("token"); // Check if the user is authenticated

  if (!token) {
    return <Navigate to="/login" replace />; // Redirect to login if not authenticated
  }

  return element; // Render the protected component if authenticated
};

export default ProtectedRoute;
