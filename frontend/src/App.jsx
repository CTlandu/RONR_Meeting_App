import { useState } from "react";
import "./index.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Login/Login";
import Home from "./Home";
import Webhomepage from "./webhomepage/Webhomepage";
import Profile from "./profile/profile"
import CreateMeeting from "./CreateMeeting/CreateMeeting"
import ChooseRole from "./choose_role/choose_role";
import AboutUs from "./AboutUs/AboutUs";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/prelogin" element={<Webhomepage />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/createmeeting" element={<CreateMeeting />} />
        <Route path="/chooserole" element={<ChooseRole />} />
        <Route path="/about" element={<AboutUs />} />
      </Routes>
    </Router>
  );
}

export default App;