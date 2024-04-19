// import React from 'react';
// import logo from './logo.svg';
// import { Route, Routes } from "react-router-dom";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Album from "./pages/Album";
import Join_ID from "./pages/Join_ID";
import Join_PW from "./pages/Join_PW";
import Join_PWO from "./pages/Join_PWO";
import Join_Name from "./pages/Join_Name";
import Join_Profile from "./pages/Join_Profile";
import Join_Face from "./pages/Join_Face";
import Login from "./pages/Login";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/Album" element={<Album />} />
          <Route path="/Join_ID" element={<Join_ID />} />
          <Route path="/Join_PW" element={<Join_PW />} />
          <Route path="/Join_PWO" element={<Join_PWO />} />
          <Route path="/Join_Name" element={<Join_Name />} />
          <Route path="/Join_Profile" element={<Join_Profile />} />
          <Route path="/Join_Face" element={<Join_Face />} />
          <Route path="/Login" element={<Login />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
