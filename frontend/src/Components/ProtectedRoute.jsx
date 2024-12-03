import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";

const ProtectedRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axios.get("/api/auth/check-auth");
        console.log("Auth check response:", response); // 调试用
        setIsAuthenticated(true);
      } catch (error) {
        console.log("Full error object:", error); // 调试用
        console.error("Authentication error:", {
          status: error.response?.status,
          message: error.response?.data?.message,
          cookies: document.cookie, // 调试用，检查cookie
        });
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
