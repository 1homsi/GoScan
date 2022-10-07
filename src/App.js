import React from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import NavBar from "./Components/Navbar/navBar";
import { auth } from "./firebase";

//Screen imports
import Home from "./Screens/Home/Home";
import LoggedIn from "./Screens/LoggedIn/LoggedIn";
import Login from "./Screens/Login/Login";
import Register from "./Screens/Register/Register";
import Admin from "./Screens/Admin/Admin";
import Intro from "./Screens/IntroScreen/intro";

export default function App() {
  let navigate = useNavigate();
  let user = auth.currentUser;

  return (
    <div>
      <NavBar navigate={navigate} />
      <Routes>
        <Route index element={<Intro navigate={navigate} />} />
        <Route
          path="/home"
          element={<Home navigate={navigate} user={user?.displayName} />}
        />
        <Route path="/register" element={<Register navigate={navigate} />} />
        <Route path="/login" element={<Login navigate={navigate} />} />
        <Route path="/carowner" element={<LoggedIn navigate={navigate} />} />
        <Route path="/admin" element={<Admin navigate={navigate} />} />
      </Routes>
    </div>
  );
}
