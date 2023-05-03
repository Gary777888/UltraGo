import { Link } from "react-router-dom";

import "./home.css";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import soccerEquipment from "../../images/soccerEquipment.jpg";
import argentina from "../../images/argentina.jpg";
import singapore from "../../images/singapore.png";
import jersey from "../../images/jersey.jpg";
import soccerBoots from "../../images/soccerBoots.png";
import accessories from "../../images/accessories.png";
import redball from "../../images/redball.jpg";
import nikeBoots from "../../images/nikeboots.jpg";
import blackball from "../../images/blackball.jpg";
import limitedjersey from "../../images/limitedjersey.jpg";

import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

const Home = () => {
   window.scrollTo(0, 0);
   const items = [
      <img src={argentina} alt="argentina" className="sliderimg1" />,
      <img src={singapore} alt="singapore" className="sliderimg2" />,
      <img
         src={soccerEquipment}
         alt="soccerEquipments"
         className="sliderimg3"
      />,
   ];

   const renderNextButton = ({ isDisabled }) => {
      return (
         <ArrowForwardIosIcon
            style={{
               position: "absolute",
               right: 0,
               top: 240,
               // backgroundColor: "lightgrey",
               color: "orange",
               fontSize: "40px",
            }}
         />
      );
   };

   const renderPrevButton = ({ isDisabled }) => {
      return (
         <ArrowBackIosIcon
            style={{
               position: "absolute",
               left: 0,
               top: 240,
               // backgroundColor: "lightgrey",
               color: "orange",
               fontSize: "40px",
            }}
         />
      );
   };

   return (
      <div className="Home">
         <div className="imageContainer">
            <AliceCarousel
               autoPlay
               autoPlayInterval={2000}
               animationType="fadeout"
               infinite="true"
               renderPrevButton={renderPrevButton}
               renderNextButton={renderNextButton}
            >
               {items}
            </AliceCarousel>
         </div>
         <div className="homeContainer">
            <header className="homeHeader">Our New Arrivals</header>
            <br />
            <p
               style={{
                  textAlign: "center",
                  fontFamily: "Cursive",
                  fontSize: "18px",
               }}
            >
               Don't miss these new arrivals in our store now!!
            </p>
            <br />
         </div>
         <div className="homeColumn">
            <br />
            <div className="homeCard">
               <img src={jersey} alt="jersey" className="member" />
            </div>
            <div className="homeCard">
               <img src={soccerBoots} alt="soccerBoots" className="member" />
            </div>
            <div className="homeCard">
               <img src={accessories} alt="accessories" className="member" />
            </div>
         </div>
         <div className="homeColumn">
            <div className="homeCard">
               <h2 style={{ paddingLeft: "10px" }}>
                  Jersey & Pants Collection
               </h2>
               <p className="para">
                  Some text that describes me lorem ipsum ipsum lorem.
               </p>
               <Link to="/jerseypantsCollection">
                  <button className="homeButton">Shop J & P</button>
               </Link>
            </div>
            <div className="homeCard">
               <h2 style={{ paddingLeft: "10px" }}>
                  Football Boots Collection
               </h2>
               <p className="para">
                  Some text that describes me lorem ipsum ipsum lorem.
               </p>
               <Link to="/shoesCollection">
                  <button className="homeButton">Shop S</button>
               </Link>
            </div>
            <div className="homeCard">
               <h2 style={{ paddingLeft: "10px" }}>Accessories Collection</h2>
               <p className="para">
                  Some text that describes me lorem ipsum ipsum lorem.
               </p>
               <Link to="/accessoriesCollection">
                  <button className="homeButton">Shop A</button>
               </Link>
            </div>
         </div>
         <br />
         <br />
         <br />
         <header className="homeHeader">Limited Edition</header>
         <br />
         <p
            style={{
               textAlign: "center",
               fontFamily: "Cursive",
               fontSize: "18px",
            }}
         >
            Hurry Up while stocks last!!!
         </p>
         <br />
         <div className="homeColumn2">
            <br />
            <div className="productCard">
               <a href="redball">
                  <img src={redball} alt="redball" className="product" />
               </a>
               <h4 style={{ paddingLeft: "10px" }}>Price: $99</h4>
            </div>
            <div className="productCard">
               <a href="/nikeBoots">
                  <img src={nikeBoots} alt="nikeBoots" className="product" />
               </a>
               <h4 style={{ paddingLeft: "10px" }}>Price: $199</h4>
            </div>
            <div className="productCard">
               <a href="/blackball">
                  <img
                     src={limitedjersey}
                     alt="limitedjersey"
                     className="product"
                  />
               </a>
               <h4 style={{ paddingLeft: "10px" }}>Price: $139</h4>
            </div>
            <div className="productCard">
               <a href="/blackball">
                  <img src={blackball} alt="blackball" className="product" />
               </a>
               <h4 style={{ paddingLeft: "10px" }}>Price: $99</h4>
            </div>
         </div>
         <br />
         <br />
         <br />
      </div>
   );
};

export default Home;
