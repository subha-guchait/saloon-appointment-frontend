import React from "react";
import { Navigate } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";

const AdminRoute = ({ children }) => {
  const { authUser } = useAuthContext();

  if (!authUser) return <Navigate to="/login" />;
  if (authUser.role !== "admin") return <Navigate to="/" />;

  return children;
};

export default AdminRoute;
