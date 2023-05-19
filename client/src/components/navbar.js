import React, { useState, useEffect } from "react";
import "./NavBar.css";
import Home from "../pages/home/home";
import Login from "../pages/login/login";
import Register from "../pages/register/register";
import AboutUs from "../pages/aboutus/aboutUs";
import Profile from "../pages/profile/profile";
import authService from "../services/auth";
import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
// import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

function NavBar() {
   const [click, setClick] = useState(false);
   const [currentUser, setCurrentUser] = useState("");

   useEffect(() => {
      const user = authService.getCurrentUser();

      if (user) {
         // console.log("setttt");
         setCurrentUser(user);
      }
      window.scrollTo(0, 0);
   }, []);

   const logout = () => {
      authService.logout();
      console.log("clicked logout");
   };

   console.log("check menu", currentUser);
   const handleClick = () => {
      // window.scrollTo(0, 0);
      setClick(!click);
   };

   return (
      <BrowserRouter>
         <nav className="navbar">
            <div className="nav-container">
               <NavLink exact to="/" className="nav-logo">
                  UltraGo
                  <i className="fas fa-code"></i>
               </NavLink>

               {/* <NavLink exact to="/" className="nav-shop">
                  Jersey & Pants<i className="fas fa-code"></i>
               </NavLink>

               <NavLink exact to="/" className="nav-shop">
                  Shoes
                  <i className="fas fa-code"></i>
               </NavLink>

               <NavLink exact to="/" className="nav-shop">
                  Accessories
                  <i className="fas fa-code"></i>
               </NavLink> */}

               <ul className="nav-shop-ul">
                  <li className="nav-shop-item">
                     <NavLink exact to="/" className="nav-links">
                        Jersey & Pants<i className="fas fa-code"></i>
                     </NavLink>
                  </li>
                  <li className="nav-shop-item">
                     <NavLink exact to="/" className="nav-links">
                        Jersey & Pants<i className="fas fa-code"></i>
                     </NavLink>
                  </li>
                  <li className="nav-shop-item">
                     <NavLink exact to="/" className="nav-links">
                        Jersey & Pants<i className="fas fa-code"></i>
                     </NavLink>
                  </li>
               </ul>

               <ul className={click ? "nav-menu active" : "nav-menu"}>
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
                        <li className="nav-item-cart">
                           <NavLink
                              exact
                              to={"/cart"}
                              activeClassName="active"
                              className="nav-links"
                              onClick={handleClick}
                           >
                              <ShoppingCartIcon />
                           </NavLink>
                        </li>
                        <li className="nav-item">
                           <NavLink
                              exact
                              to={`/profile/${currentUser.username}`}
                              activeClassName="active"
                              className="nav-links"
                              onClick={handleClick}
                           >
                              {currentUser.username}
                           </NavLink>
                        </li>
                        <li className="nav-item">
                           <a
                              href="/"
                              activeClassName="active"
                              className="nav-links"
                              onClick={logout}
                           >
                              Logout
                           </a>
                        </li>
                     </>
                  ) : (
                     <>
                        <li className="nav-item-cart">
                           <NavLink
                              exact
                              to={"/login"}
                              activeClassName="active"
                              className="nav-links"
                              onClick={handleClick}
                           >
                              <ShoppingCartIcon />
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
            <Route exact path="/profile/:username" element={<Profile />} />
         </Routes>
      </BrowserRouter>
   );
}

export default NavBar;
