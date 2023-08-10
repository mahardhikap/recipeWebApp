import React from "react";
import { Navigate } from "react-router-dom";

const AuthChecker = ({ children }) => {
  let token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/login" replace="true" />;
  }
  return children;
};

export default AuthChecker;
