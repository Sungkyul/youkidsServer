import React from "react";
// import logo from './logo.svg';
// import { Route, Routes } from "react-router-dom";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login";
import Join_Name from "./pages/Join_Name";
import Join_ID from "./pages/Join_ID";
import Join_PW from "./pages/Join_PW";
import Join_Profile from "./pages/Join_Profile";
import Join_Terms from "./pages/Join_Terms";
import Join_Done from "./pages/Join_Done";
import Home from "./pages/Home";
import Search from "./pages/Search";
import Noti from "./pages/Noti";
import Album from "./pages/Album";
import Favorites from "./pages/Favorites";
import HiddenAlbum from "./pages/HiddenAlbum";
import DeletedAlbum from "./pages/DeletedAlbum";
import Share_Loading from "./pages/Share_Loading";
import Share_Done from "./pages/Share_Done";
import Down_Code from "./pages/Down_Code";
import Down_Face from "./pages/Down_Face";
import Amazon from "./pages/Amazon";
import Test from "./pages/Test";
import Notice from "./pages/Notice";
import Setting from "./pages/Setting";
import UserSettings from "./pages/UserSettings";
import CustomerService from "./pages/CustomerSerivce";
import UpdateSuggestion from "./pages/UpdateSuggestion";
import Guide from "./pages/Guide";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/Login" element={<Login />} />
          <Route path="/Join_Name" element={<Join_Name />} />
          <Route path="/Join_ID" element={<Join_ID />} />
          <Route path="/Join_PW" element={<Join_PW />} />
          <Route path="/Join_Profile" element={<Join_Profile />} />
          <Route path="/Join_Terms" element={<Join_Terms />} />
          <Route path="/Join_Done" element={<Join_Done />} />
          <Route path="/Home/" element={<Home />} />
          <Route path="/Search" element={<Search />} />
          <Route path="/Noti" element={<Noti />} />
          <Route path="/Album" element={<Album />} />
          <Route path="/Favorites" element={<Favorites />} />
          <Route path="/HiddenAlbum" element={<HiddenAlbum />} />
          <Route path="/DeletedAlbum" element={<DeletedAlbum />} />
          <Route path="/Share_Loading" element={<Share_Loading />} />
          <Route path="/Share_Done" element={<Share_Done />} />
          <Route path="/Down_Code" element={<Down_Code />} />
          <Route path="/Down_Face" element={<Down_Face />} />
          <Route path="/Amazon" element={<Amazon />} />
          <Route path="/Test" element={<Test />} />
          <Route path="/Notice" element={<Notice />} />
          <Route path="/Setting" element={<Setting />} />
          <Route path="/UserSettings" element={<UserSettings />} />
          <Route path="/CustomerService" element={<CustomerService />} />
          <Route path="/UpdateSuggestion" element={<UpdateSuggestion />} />
          <Route path="/Guide" element={<Guide />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
