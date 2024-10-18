import { useState } from "react";
import "./index.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Login/Login";
import Home from "./Home";
import Webhomepage from "./webhomepage/Webhomepage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/webhome" element={<Webhomepage />} />
      </Routes>
    </Router>
  );
}

export default App;
