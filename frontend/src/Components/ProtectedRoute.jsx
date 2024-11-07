import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = document.cookie.includes("token"); // 检查是否有 token
  console.log("Is Authenticated:", isAuthenticated); // 添加调试信息

  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
