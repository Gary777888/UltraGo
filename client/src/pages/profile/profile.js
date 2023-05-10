import React, { useState, useEffect } from "react";
import userService from "../../services/user";
import authService from "../../services/auth";
import "./profile.css";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import Button from "@mui/material/Button";

import axios from "axios";

import captain from "../../images/captain.jpg";

const Profile = () => {
   window.scrollTo(0, 0);
   const [image, setImage] = useState("");
   const [fileName, setFileName] = useState("");
   const [data, setData] = useState([]);
   const [currentUser, setCurrentUser] = useState("");
   const [open, setOpen] = useState(false);
   const [successfulChanged, setSuccessfulChanged] = useState(false);

   useEffect(() => {
      const user = authService.getCurrentUser();

      if (user) {
         // console.log("setttt");
         setCurrentUser(user);
      }

      // console.log("user checkkkkk", user, currentUser)
      // userService
      //    .getUserPic(currentUser.username)
      //    .then((res) => {
      //       console.log("ressss check....", res);
      //       setData(res.data);
      //    })
      //    .catch((err) => {
      //       console.log(err);
      //    });
      axios
         .post("http://localhost:8000/api/getUserPic", user.username)
         .then((res) => {
            console.log("ressss check....", res);
            setData(res.data);
         })
         .catch((err) => {
            console.log("noooo", err);
            console.log("no check 2", user.username, user.profilePic);
         });
   }, []);

   const saveFile = (e) => {
      setImage(e.target.files[0]);
      setFileName(e.target.files[0].name);
   };

   const handleOpen = () => {
      setOpen(true);
   };

   const handleClose = () => {
      if (successfulChanged === true) {
         setOpen(false);
         window.location.reload();
      } else {
         setOpen(false);
      }
   };

   console.log("check data", data);
   const changeFile = async (e) => {
      const formData = new FormData();
      formData.append("image", image);
      formData.append("fileName", fileName);

      userService
         .upload(formData)
         .then((res) => {
            if (res.data.Status === "Success") {
               console.log("Succeded");
               setSuccessfulChanged(true);
               setOpen(false);
               window.location.reload();
            } else {
               console.log("Failed", res);
            }
         })
         .catch((err) => {
            console.log(err);
         });

      // axios
      //    .post("http://localhost:8000/api/upload", formData)
      //    .then((res) => {
      //       if (res.data.Status === "Success") {
      //          console.log("Succeded");
      //          setSuccessfulChanged(true);
      //          setOpen(false);
      //          window.location.reload();
      //       } else {
      //          console.log("Failed", res);
      //       }
      //    })
      //    .catch((err) => {
      //       console.log(err);
      //    });

      // try {
      //    userService.upload(formData).then((res) => {
      //       console.log(res);
      //    });
      //    console.log("success try");
      // } catch (ex) {
      //    console.log(ex);
      //    console.log("faillll");
      // }
   };

   return (
      <div className="Profile">
         <h2 className="pageTitle">{currentUser.username} Profile</h2>
         <br />
         <div className="imageContainer">
            <img
               src={"http://localhost:8000/images/" + data.profilePic}
               alt="ProfilePic"
               className="profilePic"
            />
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
               <br />
               <b>
                  <label className="labelProfile">Password: </label>
               </b>
            </div>
            <div className="profileInput">
               <input
                  className="inputProfile"
                  value={currentUser.name}
                  disabled
               ></input>
               <br />
               <input
                  className="inputProfile"
                  value={currentUser.username}
                  disabled
               ></input>
               <br />
               <input
                  className="inputProfile"
                  value={currentUser.email}
                  disabled
               ></input>
               <br />
               <input
                  className="inputProfile"
                  value="**************"
                  disabled
               ></input>
               <br />
               <br />
               <button className="changeImageButton" onClick={handleOpen}>
                  Change Picture
               </button>
               <Dialog open={open} onClose={handleClose}>
                  <DialogTitle className="changePicTitle">
                     Change Profile Picture
                  </DialogTitle>
                  <DialogContent>
                     <div
                        style={{
                           textAlign: "center",
                           marginTop: "10px",
                           marginBottom: "10px",
                        }}
                     >
                        <img
                           src={
                              "http://localhost:8000/images/" + data.profilePic
                           }
                           alt="ProfilePic"
                           className="profilePicPopUp"
                        />
                     </div>
                     <div>
                        <input
                           type="file"
                           className="chooseFileInput"
                           onChange={saveFile}
                        />
                        {/* <button
                           className="changePicButton"
                           onClick={changeFile}
                        >
                           Change Profile Picture
                        </button> */}
                     </div>
                  </DialogContent>

                  <DialogActions>
                     <Button
                        onClick={changeFile}
                        style={{
                           cursor: "pointer",
                           marginRight: "20rem",
                        }}
                     >
                        Change Picture
                     </Button>
                     <Button
                        onClick={handleClose}
                        style={{ cursor: "pointer" }}
                     >
                        Okay
                     </Button>
                  </DialogActions>
               </Dialog>
               <button className="editButton">Edit Profile</button>
            </div>
         </div>
      </div>
   );
};

export default Profile;
