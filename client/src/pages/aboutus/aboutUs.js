import "./aboutUs.css";
import arrowMan from "../../images/arrowMan.jpg";
import botak from "../../images/botak.jpg";
import girl from "../../images/girl.jpg";
import captain from "../../images/captain.jpg";

const AboutUs = () => {
   window.scrollTo(0, 0);

   return (
      <div className="AboutUs">
         <div className="titleContainer">
            <h2 className="pageTitle">About Us</h2>
         </div>
         <div className="container">
            <h3 className="header">Our mission</h3>
            <p className="sentences">
               To Improve Every Life through Innovative Giving in Education,
               Community, and the Environment.
            </p>
            {/* <br /> */}
            <h3 className="header">Our vision</h3>
            <p className="sentences">
               To bring inspiration and innovative to every athlete in the
               world.
            </p>
            {/* <br /> */}
            <h3 className="header">Our core values</h3>
            <p className="sentences">
               Integrity, Accountability, Diligence, Perseverance, and
               Discipline.
            </p>
            <br />
            <h3 className="header">Our team</h3>
            <div className="column">
               <br />
               <div className="card">
                  <img src={captain} alt="captain" className="member" />
                  <div className="cardContainer">
                     <h2 style={{ paddingLeft: "10px" }}>Captain</h2>
                     <p className="para">
                        Some text that describes me lorem ipsum ipsum lorem.
                     </p>
                     <p className="para">captain@gmail.com</p>
                  </div>
               </div>
            </div>
            <div className="column">
               <br />
               <div className="card">
                  <img src={girl} alt="girl" className="member" />
                  <div className="cardContainer">
                     <h2 style={{ paddingLeft: "10px" }}>Super Girl</h2>
                     <p className="para">
                        Some text that describes me lorem ipsum ipsum lorem.
                     </p>
                     <p className="para">supergirl@gmail.com</p>
                  </div>
               </div>
            </div>
            <div className="column">
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
            </div>
         </div>
         <div className="headerContainer">
            <br />
            <br />
            <h3 className="contactHeader">Contact Us</h3>
            <p style={{ paddingLeft: "20px", fontSize: "20px" }}>
               Phone no: 612340987
            </p>
            <p style={{ paddingLeft: "20px", fontSize: "20px" }}>
               Email: UltraGo@business.com
            </p>
            <p style={{ paddingLeft: "20px", fontSize: "20px" }}>
               Location: Ang Mo Kio 31
            </p>
         </div>
      </div>
   );
};

export default AboutUs;
