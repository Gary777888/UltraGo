import React from "react";
import "./Footer.css";
import {
   faMapMarker,
   faPhone,
   faEnvelope,
   faGlobe,
   faClock,
   faInstagram,
   faUser,
   instagram,
} from "@fortawesome/free-solid-svg-icons";
// import { faInstagram } from "@fortawesome/free-regular-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import AmericanexpressCardIcon from '../../assets/images/cards/americanexpress.png';
// import CirrusCardIcon from '../../assets/images/cards/cirrus.png';
// import MaterCardCardIcon from '../../assets/images/cards/mastercard.png';
// import PaypalCardIcon from '../../assets/images/cards/paypal.png';
// import VisaCardIcon from '../../assets/images/cards/visa.png';
import InstagramIcon from "../instagram.png";
import FacebookIcon from "../facebookicon.jpg";
import TwitterIcon from "../twitterIcon.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Footer() {
   const date = new Date();
   const dateyear = date.getFullYear();
   return (
      <div className="main-footer">
         <div className="main-footer-container">
            <div className="main-footer-content">
               <div className="row">
                  <div style={{ textAlign: "center" }}>
                     <h2>UltraGo</h2>
                     <p>
                        We are providing high quality services with 100%
                        satisfaction guarantee.
                     </p>
                     <div className="main-footer-payment">
                        <ul>
                           <li>
                              <a href="/">
                                 <img
                                    src={InstagramIcon}
                                    alt="InstaIcon"
                                    style={{ width: "40px" }}
                                 />
                              </a>
                           </li>
                           <li>
                              <a href="/">
                                 <img
                                    src={FacebookIcon}
                                    alt="FacebookIcon"
                                    style={{ width: "40px" }}
                                 />
                              </a>
                           </li>
                           <li>
                              <a href="/">
                                 <img
                                    src={TwitterIcon}
                                    alt="TwitterIcon"
                                    style={{ width: "40px" }}
                                 />
                              </a>
                           </li>
                        </ul>
                     </div>
                  </div>
                  {/* <div style={{ boxSizing: "borderBox" }}>
                     <h2>Contact us</h2>
                     <h5>
                        <FontAwesomeIcon
                           icon={faMapMarker}
                           className="footer-icons"
                        />
                        Empire Road, Somewhere , on Earth
                     </h5>
                     <h5>
                        <FontAwesomeIcon
                           icon={faPhone}
                           className="footer-icons"
                        />{" "}
                        +2111 555 555 54
                     </h5>
                     <h5>
                        <FontAwesomeIcon
                           icon={faEnvelope}
                           className="footer-icons"
                        />{" "}
                        info@claymastore.com
                     </h5>
                     <h5>
                        <FontAwesomeIcon
                           icon={faGlobe}
                           className="footer-icons"
                        />{" "}
                        www.claymastore.com
                     </h5>
                  </div> */}
                  {/* <div className="col-lg-4">
                     <h2>My Account</h2>
                     <h5>Shopping Cart</h5>
                     <h5>My Account</h5>
                     <h5>Checkout</h5>
                     <h5>Delivery</h5>
                     <h5>Your Orders</h5>
                  </div> */}
               </div>
            </div>
            <div className="row">
               <div className="main-footer-copyright">
                  <p>Copyright &copy; {dateyear}. All Right reserved.</p>
                  <hr />
               </div>
            </div>
         </div>
      </div>
   );
}
