import "./aboutUs.css";
import arrowMan from "../../images/arrowMan.jpg";
import girl from "../../images/botak.jpg";
import botak from "../../images/girl.jpg";

const AboutUs = () => {
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
            <br />
            <h3 className="header">Our vision</h3>
            <p className="sentences">
               To bring inspiration and innovative to every athlete in the
               world.
            </p>
            <br />
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
                  <img src={arrowMan} alt="arrowMan" className="member" />
               </div>
            </div>
         </div>
      </div>
   );
};

export default AboutUs;
