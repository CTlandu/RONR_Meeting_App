import { useState } from "react";
import "./index.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Login/Login";
import Home from "./Home";
import Webhomepage from "./webhomepage/Webhomepage";
<<<<<<< HEAD
import Profile from "./profile/profile";
import CreateMeeting from "./CreateMeeting/CreateMeeting";
import ChooseRole from "./choose_role/choose_role";
import AboutUs from "./AboutUs/AboutUs";
import ProtectedRoute from "./Components/ProtectedRoute";
=======
import Profile from "./profile/profile"
import Review from "./Review/review";
>>>>>>> 945d6bb (a)

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Webhomepage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/prelogin" element={<Webhomepage />} />
<<<<<<< HEAD
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
=======
        <Route path="/profile" element={<Profile />} />
        <Route path="/review" element={<Review />} />
>>>>>>> 945d6bb (a)
      </Routes>
    </Router>
  );
}

export default App;
