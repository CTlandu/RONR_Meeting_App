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
import DiscussionPage from "./discussionpage/DiscussionPage";
import MeetingHistory from "./MeetingHistory/MeetingHistory";

function App() {
  return (
    <Router>
      {/* <Navbar /> */}
      <Routes>
        <Route path="/" element={<Webhomepage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/prelogin" element={<Webhomepage />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/discussion" element={<DiscussionPage />} />
        <Route
          path="/profile"
          element={
            <Profile />
          }
        />
        <Route
          path="/createmeeting"
          element={
            <CreateMeeting />
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
