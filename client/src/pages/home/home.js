import stadium from "../../images/stadium.jpg";
import "./home.css";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import balls from "../../images/balls.jpg";
import yellowBoots2 from "../../images/yellowBoots2.jpg";
import jersey2 from "../../images/jersey2.png";
import girl from "../../images/girl.jpg";
import botak from "../../images/botak.jpg";
import arrowMan from "../../images/arrowMan.jpg";

const Home = () => {
   return (
      <div className="Home">
         <div className="imageContainer">
            {/* <h2 className="pageTitle">About Us</h2> */}
            {/* <img src={stadium} className="homeImage" /> */}
            <AliceCarousel autoPlay autoPlayInterval={2000} infinite="true">
               <p>
                  <img src={balls} alt="balls" className="sliderimg1" />
               </p>
               <p>
                  <img
                     src={yellowBoots2}
                     alt="yellowBoots"
                     className="sliderimg2"
                  />
               </p>
               <p>
                  <img src={jersey2} alt="jersey" className="sliderimg3" />
               </p>
            </AliceCarousel>
         </div>
         <div className="homeContainer">
            <header className="homeHeader">Home</header>
            <p>
               Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolores
               quae porro consequatur aliquam, incidunt eius magni provident,
               doloribus omnis minus temporibus perferendis nesciunt quam
               repellendus nulla nemo ipsum odit corrupti consequuntur possimus,
               vero mollitia velit ad consectetur. Alias, laborum excepturi
               nihil autem nemo numquam, ipsa architecto non, magni consequuntur
               quam.
            </p>
         </div>
         <div className="homeColumn">
            <br />
            <div className="homeCard">
               <img src={girl} alt="girl" className="member" />
               {/* <div className="cardContainer">
                  <h2 style={{ paddingLeft: "10px" }}>Super Girl</h2>
                  <p className="para">
                     Some text that describes me lorem ipsum ipsum lorem.
                  </p>
                  <p className="para">supergirl@gmail.com</p>
               </div> */}
            </div>
            <div className="homeCard">
               <img src={botak} alt="botak" className="member" />
               {/* <div className="cardContainer">
                  <h2 style={{ paddingLeft: "10px" }}>Botak</h2>
                  <p className="para">
                     Some text that describes me lorem ipsum ipsum lorem.
                  </p>
                  <p className="para">botak@gmail.com</p>
               </div> */}
            </div>
            <div className="homeCard">
               <img src={arrowMan} alt="arrowMan" className="member" />
            </div>
         </div>
         <div className="homeColumn">
            <div className="homeCard">
               <h2 style={{ paddingLeft: "10px" }}>Super Girl</h2>
               <p className="para">
                  Some text that describes me lorem ipsum ipsum lorem.
               </p>
               <p className="para">supergirl@gmail.com</p>
            </div>
            <div className="homeCard">
               <h2 style={{ paddingLeft: "10px" }}>Botak</h2>
               <p className="para">
                  Some text that describes me lorem ipsum ipsum lorem.
               </p>
               <p className="para">botak@gmail.com</p>
            </div>
            <div className="homeCard">
               <h2 style={{ paddingLeft: "10px" }}>Botak</h2>
               <p className="para">
                  Some text that describes me lorem ipsum ipsum lorem.
               </p>
               <p className="para">botak@gmail.com</p>
            </div>
         </div>
         {/* <div className="homeColumn2np">
            <br />
            <div className="card">
               <img src={botak} alt="botak" className="member" />
               <div className="cardContainer">
                  <h2 style={{ paddingLeft: "10px" }}>Botak</h2>
                  <p className="para">
                     Some text that describes me lorem ipsum ipsum lorem.
                  </p>
                  <p className="para">botak@gmail.com</p>
               </div>
            </div>
         </div> */}
         sd
      </div>
   );
};

export default Home;
