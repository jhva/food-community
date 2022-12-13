import "./App.css";
import api from "./api/api";
import { useEffect } from "react";
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import Home from "./Home";
import LoginComplete from "./LoginComplete";
import Kakao from "./components/Kakao";
import React, { useState } from "react";
function App() {
  const [show, setIsShow] = useState(false);
  return (
    <Router>
      <Routes>
        <Route path="/asdf" element={<Home />} />

        <Route
          path="/auth/kakao/callback"
          element={<Kakao show={show} setIsShow={setIsShow} />}
        />
      </Routes>
    </Router>
  );
}

export default App;
