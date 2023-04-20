import React, { useState } from "react";
import "./NavBar.css";
import Home from "../pages/home";
import Login from "../pages/login/login";
import Register from "../pages/register/register";
import AboutUs from "../pages/aboutUs";
import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";

function NavBar() {
   const [click, setClick] = useState(false);

   const handleClick = () => setClick(!click);
   return (
      <BrowserRouter>
         <nav className="navbar">
            <div className="nav-container">
               <NavLink exact to="/" className="nav-logo">
                  UltraGo
                  <i className="fas fa-code"></i>
               </NavLink>

               <ul className={click ? "nav-menu active" : "nav-menu"}>
                  <li className="nav-item">
                     <NavLink
                        exact
                        to={"/"}
                        activeClassName="active"
                        className="nav-links"
                        onClick={handleClick}
                     >
                        Home
                     </NavLink>
                  </li>
                  <li className="nav-item">
                     <NavLink
                        exact
                        to={"/aboutUs"}
                        activeClassName="active"
                        className="nav-links"
                        onClick={handleClick}
                     >
                        AboutUs
                     </NavLink>
                  </li>
                  <li className="nav-item">
                     <NavLink
                        exact
                        to={"/register"}
                        activeClassName="active"
                        className="nav-links"
                        onClick={handleClick}
                     >
                        Sign Up
                     </NavLink>
                  </li>
                  <li className="nav-item">
                     <NavLink
                        exact
                        to={"/login"}
                        activeClassName="active"
                        className="nav-links"
                        onClick={handleClick}
                     >
                        Login
                     </NavLink>
                  </li>
               </ul>
               <div className="nav-icon" onClick={handleClick}>
                  <i className={click ? "fas fa-times" : "fas fa-bars"}></i>
               </div>
            </div>
         </nav>
         <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/aboutUs" element={<AboutUs />} />
            <Route exact path="/register" element={<Register />} />
            <Route exact path="/login" element={<Login />} />
         </Routes>
      </BrowserRouter>
   );
}

export default NavBar;
