// import React from 'react';
// import logo from './logo.svg';
// import { Route, Routes } from "react-router-dom";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login";
import Join_ID from "./pages/Join_ID";
import Join_PW from "./pages/Join_PW";
import Join_Name from "./pages/Join_Name";
import Join_Profile from "./pages/Join_Profile";
import Join_Face from "./pages/Join_Face";
import Join_Done from "./pages/Join_Done";
import Home from "./pages/Home";
import Search from "./pages/Search";
import Noti from "./pages/Noti";
import Album from "./pages/Album";
import Share_Loading from "./pages/Share_Loading";
import Share_Code from "./pages/Share_Code";
import Share_Done from "./pages/Share_Done";
import Down_Code from "./pages/Down_Code";
import Down_Face from "./pages/Down_Face";
import Amazon from "./pages/Amazon";
import Test from "./pages/Test";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/Login" element={<Login />} />
          <Route path="/Join_ID" element={<Join_ID />} />
          <Route path="/Join_PW" element={<Join_PW />} />
          <Route path="/Join_Name" element={<Join_Name />} />
          <Route path="/Join_Profile" element={<Join_Profile />} />
          <Route path="/Join_Face" element={<Join_Face />} />
          <Route path="/Join_Done" element={<Join_Done />} />
          <Route path="/Home" element={<Home />} />
          <Route path="/Search" element={<Search />} />
          <Route path="/Noti" element={<Noti />} />
          <Route path="/Album" element={<Album />} />
          <Route path="/Share_Loading" element={<Share_Loading />} />
          <Route path="/Share_Code" element={<Share_Code />} />
          <Route path="/Share_Done" element={<Share_Done />} />
          <Route path="/Down_Code" element={<Down_Code />} />
          <Route path="/Down_Face" element={<Down_Face />} />
          <Route path="/Amazon" element={<Amazon />} />
          <Route path="/Test" element={<Test />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
