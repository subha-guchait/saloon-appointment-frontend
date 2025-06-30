import React from "react";
import { Navigate } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";

const StaffRoute = ({ children }) => {
  const { authUser } = useAuthContext();

  if (!authUser) return <Navigate to="/login" />;
  if (authUser.role !== "staff") return <Navigate to="/" />;

  return children;
};

export default StaffRoute;
