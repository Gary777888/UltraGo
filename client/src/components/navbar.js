import React, { useState, useEffect } from "react";
import "./NavBar.css";
import Home from "../pages/home/home";
import Login from "../pages/login/login";
import Register from "../pages/register/register";
import AboutUs from "../pages/aboutus/aboutUs";
import authService from "../services/auth";
import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";

function NavBar() {
   const [click, setClick] = useState(false);
   const [currentUser, setCurrentUser] = useState("");

   // const navigate = useNavigate();

   useEffect(() => {
      const user = authService.getCurrentUser();

      if (user) {
         // console.log("setttt");
         setCurrentUser(user);
      }
   }, []);

   const logout = () => {
      // window.location.reload();
      authService.logout();
      console.log("clicked logout");
      // navigate("/");
   };

   console.log("check menu", currentUser);
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
                  {currentUser ? (
                     <>
                        <li className="nav-item">
                           <NavLink
                              exact
                              to={"/profile"}
                              activeClassName="active"
                              className="nav-links"
                              onClick={handleClick}
                           >
                              {currentUser.username}
                           </NavLink>
                        </li>
                        <li className="nav-item">
                           {/* <NavLink
                              exact
                              onClick={logout}
                              to={"/"}
                              activeClassName="active"
                              className="nav-links"
                           > */}
                           <a
                              href="/"
                              activeClassName="active"
                              className="nav-links"
                              onClick={logout}
                           >
                              Logout
                           </a>
                           {/* </NavLink> */}
                        </li>
                     </>
                  ) : (
                     <>
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
                     </>
                  )}
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
