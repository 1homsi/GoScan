import React from "react";
import {
  Routes,
  Route,
  useNavigate
} from "react-router-dom";
import NavBar from "./Components/Navbar/navBar";
import { auth } from "./firebase";


//Screen imports
import Home from "./Screens/Home/Home";
import Intro from "./Screens/Intro/IntroPage";
import Login from "./Screens/Login/Login";
import Register from "./Screens/Register/Register";
import Add from "./Screens/Add/Add";
import Edit from "./Screens/Edit/Edit";


export default function App() {
  let navigate = useNavigate();
  let user = auth.currentUser;

  return (
    <div>
      <NavBar navigate={navigate} />
      <Routes>
        <Route index element={<Intro navigate={navigate} />} />
        <Route path="/shop/:id" element={<Home navigate={navigate} user={user?.displayName} />} />
        <Route path="/login" element={<Login navigate={navigate} />} />
        {/* {
          user &&
            user.email === "homsimohamad17@gmail.com" ? (
            <> */}
        <Route path="/register" element={<Register navigate={navigate} />} />
        {/* </>
          ) : <></>
        } */}
        <Route path="/add" element={<Add navigate={navigate} />} />
        <Route path="/edit/:id" element={<Edit navigate={navigate} />} />
      </Routes>
    </div>
  );
}

