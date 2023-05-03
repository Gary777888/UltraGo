import React, { useState, useEffect } from "react";
import userService from "../../services/auth";
import authService from "../../services/auth";
import "./profile.css";

import captain from "../../images/captain.jpg";

const Profile = () => {
   window.scrollTo(0, 0);
   const [image, setImage] = useState("");
   const [fileName, setFileName] = useState("");

   const saveFile = (e) => {
      setImage(e.target.files[0]);
      setFileName(e.target.files[0].name);
   };

   const changeFile = async (e) => {
      const formData = new FormData();
      formData.append("image", image);
      formData.append("fileName", fileName);
      try {
         await userService.upload(formData).then((res) => {
            console.log(res);
         });
         console.log("success try");
      } catch (ex) {
         console.log(ex);
         console.log("faillll");
      }
   };

   const [currentUser, setCurrentUser] = useState("");

   useEffect(() => {
      const user = authService.getCurrentUser();

      if (user) {
         // console.log("setttt");
         setCurrentUser(user);
      }
   }, []);

   return (
      <div className="Profile">
         <h2 className="pageTitle">{currentUser.username} Profile</h2>
         <br />
         <div className="profileContainer">
            {/* <div className="profilePic"> */}
            <img src={captain} alt="captain" className="userPicture" />
            {/* </div> */}
            <input
               type="file"
               className="chooseFileInput"
               onChange={saveFile}
            />
            <button className="changePicButton" onClick={changeFile}>
               Change Profile Picture
            </button>
         </div>
         <br />
         <div className="profileContainer">
            <div className="profileInfo">
               <b>
                  <label className="labelProfile">Name: </label>
               </b>
               <br />
               <b>
                  <label className="labelProfile">Username: </label>
               </b>
               <br />
               <b>
                  <label className="labelProfile">Email: </label>
               </b>
            </div>
            <div className="profileInput">
               <input className="inputProfile"></input>
               <input className="inputProfile"></input>
               <input className="inputProfile"></input>
               <button className="editButton">Edit Profile</button>
            </div>
         </div>
         sss
      </div>
   );
};

export default Profile;
