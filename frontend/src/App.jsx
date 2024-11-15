import { useState } from "react";
import "./index.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Login from "./Login/Login";
import Home from "./Home";
import Webhomepage from "./webhomepage/Webhomepage";
import Profile from "./profile/profile";
import CreateMeeting from "./CreateMeeting/CreateMeeting";
import ChooseRole from "./choose_role/choose_role";
import AboutUs from "./AboutUs/AboutUs";
import ProtectedRoute from "./Components/ProtectedRoute";
import MeetingHistory from "./MeetingHistory/MeetingHistory";

function Navbar() {
  return (
    <nav className="bg-blue-600 p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-2xl font-bold">EON RONR</div>
        <ul className="flex space-x-6">
          <li>
            <Link
              to="/"
              className="text-white hover:text-yellow-300 transition duration-300 px-4 py-2 rounded-full shadow-md"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/about"
              className="text-white hover:text-yellow-300 transition duration-300 px-4 py-2 rounded-full shadow-md"
            >
              About Us
            </Link>
          </li>
          <li>
            <Link
              to="/profile"
              className="text-white hover:text-yellow-300 transition duration-300 px-4 py-2 rounded-full shadow-md"
            >
              Profile
            </Link>
          </li>
          <li>
            <Link
              to="/createmeeting"
              className="text-white hover:text-yellow-300 transition duration-300 px-4 py-2 rounded-full shadow-md"
            >
              Create Meeting
            </Link>
          </li>
          <li>
            <Link
              to="/chooserole"
              className="text-white hover:text-yellow-300 transition duration-300 px-4 py-2 rounded-full shadow-md"
            >
              Choose Role
            </Link>
          </li>
          <li>
            <Link
              to="/meetinghistory"
              className="text-white hover:text-yellow-300 transition duration-300 px-4 py-2 rounded-full shadow-md"
            >
              Meeting History
            </Link>
          </li>
          <li>
            <Link
              to="/login"
              className="text-white hover:text-yellow-300 transition duration-300 px-4 py-2 rounded-full shadow-md"
            >
              Login
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Webhomepage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/prelogin" element={<Webhomepage />} />
        <Route path="/about" element={<AboutUs />} />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/createmeeting"
          element={
            <ProtectedRoute>
              <CreateMeeting />
            </ProtectedRoute>
          }
        />
        <Route
          path="/chooserole"
          element={
            <ProtectedRoute>
              <ChooseRole />
            </ProtectedRoute>
          }
        />
        <Route
          path="/meetinghistory"
          element={
            <ProtectedRoute>
              <MeetingHistory />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
