import React from "react";
import { Navigate } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";

const UserRoute = ({ children }) => {
  const { authUser } = useAuthContext();

  if (!authUser) return <Navigate to="/login" />;
  if (authUser.role !== "customer") return <Navigate to="/" />;

  return children;
};

export default UserRoute;
