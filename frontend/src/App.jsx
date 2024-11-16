import { useState } from "react";
import "./index.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Login/Login";
import Home from "./Home";
import Webhomepage from "./webhomepage/Webhomepage";
import Profile from "./profile/profile";
import CreateMeeting from "./CreateMeeting/CreateMeeting";
import ChooseRole from "./choose_role/choose_role";
import AboutUs from "./AboutUs/AboutUs";
import ProtectedRoute from "./Components/ProtectedRoute";
import DiscussionPage from "./discussionpage/DiscussionPage"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Webhomepage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/prelogin" element={<Webhomepage />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/discussion" element={<DiscussionPage />} />
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
      </Routes>
    </Router>
  );
}

export default App;
