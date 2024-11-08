import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

const Login = () => {
  const location = useLocation();
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Check the query parameter to determine if it's login or register mode
    const queryParams = new URLSearchParams(location.search);
    const mode = queryParams.get("mode");
    setIsRegister(mode === "register");
  }, [location]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = isRegister ? "/api/auth/register" : "/api/auth/login";
    try {
      const response = await axios.post(
        url,
        { email, password },
        { withCredentials: true }
      );
      alert(response.data);
      console.log("Response:", response);
      navigate("/profile");
    } catch (error) {
      alert(error.response?.data || "An error occurred");
      console.error("Error:", error);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-r from-blue-400 to-blue-600">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm">
        <h1 className="text-3xl font-bold mb-6 text-center text-blue-100">
          {isRegister ? "Register" : "Welcome Back"}
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-5">
            <label
              className="block text-gray-700 text-sm font-semibold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border rounded-lg w-full py-2 px-4 text-gray-700 focus:outline-none focus:border-blue-400"
              placeholder="Enter your email"
              autoComplete="email"
            />
          </div>
          <div className="mb-5">
            <label
              className="block text-gray-700 text-sm font-semibold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border rounded-lg w-full py-2 px-4 text-gray-700 focus:outline-none focus:border-blue-400"
              placeholder="Enter your password"
              autoComplete={isRegister ? "new-password" : "current-password"}
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg w-full hover:bg-blue-700 transition-colors"
          >
            {isRegister ? "Register" : "Login"}
          </button>
        </form>
        <button
          onClick={() => setIsRegister(!isRegister)}
          className="mt-4 text-blue-500 hover:underline"
        >
          {isRegister
            ? "Already have an account? Login"
            : "Don't have an account? Register"}
        </button>
      </div>
    </div>
  );
};

export default Login;
