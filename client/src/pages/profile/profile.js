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
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useParams } from "react-router-dom";
import { type } from "@testing-library/user-event/dist/type";

const Profile = () => {
   window.scrollTo(0, 0);
   const [image, setImage] = useState("");
   const [fileName, setFileName] = useState("");
   const [data, setData] = useState([]);
   const [currentUser, setCurrentUser] = useState("");
   const [open, setOpen] = useState(false);
   const [successfulChanged, setSuccessfulChanged] = useState(false);
   const [open2, setOpen2] = useState(false);
   const [message, setMessage] = useState("");

   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const [name, setName] = useState("");
   const [passwordcheck, setPasswordcheck] = useState(false);
   const [emailcheck, setEmailcheck] = useState(false);

   const [emailEmpty, setEmailEmpty] = useState(true);
   const [passwordEmpty, setPasswordEmpty] = useState(true);

   // const [currentUserDetails, setCurrentUserDetails] = useState("");

   const { username } = useParams();

   // const valueName = currentUser[0].name;

   useEffect(() => {
      // const user = authService.getCurrentUser();
      // if (user) {
      //    // console.log("setttt");
      //    setCurrentUser(user);
      // }

      getUserProfile(username);
      getUserPic(username);
   }, [username]);

   console.log("username check...", username);
   console.log("current user check...", currentUser);
   // console.log("fkfkfkfkf", typeof currentUser[0].name);
   const getUserPic = async (username) => {
      await userService
         .getUserPic(username)
         .then((res) => {
            console.log("ressss check....", res);
            setData(res.data);
         })
         .catch((err) => {
            console.log(err);
         });
   };

   const getUserProfile = async (username) => {
      await userService
         .getUser(username)
         .then((res) => {
            setCurrentUser(res.data);
            // setCurrentUserDetails(res.data);
            console.log("check getuser res...", res.data);
         })
         .catch((err) => {
            console.log("errroroorr", err);
         });
   };

   // console.log("CurrentUserDetails...", currentUserDetails);
   const saveFile = (e) => {
      if (!e.target.files[0]) {
         setImage("");
         setFileName("");
      } else {
         setImage(e.target.files[0]);
         setFileName(e.target.files[0].name);
      }
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
   console.log("image checkkkk", image);
   const changeFile = async (e) => {
      const formData = new FormData();
      formData.append("image", image);
      formData.append("fileName", fileName);
      formData.append("username", username);
      console.log("inside..form...", formData);

      if (image || fileName !== "") {
         axios
            .post("http://localhost:8000/api/upload", formData)
            .then((res) => {
               if (res.data.Status === "Success") {
                  console.log("Succeded");
                  setSuccessfulChanged(true);
                  // localStorage.setItem(
                  //    currentUser.profilePic,
                  //    JSON.stringify(data)
                  // );
                  setOpen(false);
                  window.location.reload();
               } else {
                  console.log("Failed", res);
               }
            })
            .catch((err) => {
               console.log(err);
            });
      } else {
         alert("Empty");
      }
      // userService
      //    .upload(formData)
      //    .then((res) => {
      //       console.log("LOLOLOLOLLOL");
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

   const handleOpen2 = () => {
      setOpen2(true);
   };

   const handleClose2 = () => {
      setOpen2(false);
   };

   const onChangeEmail = (e) => {
      const check = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
      const ValidationEmail = check.test(e.target.value);
      if (e.target.length) {
         setEmailEmpty(false);
         if (ValidationEmail === false) {
            setEmailcheck(false);
         } else {
            setEmailcheck(true);
            const EMAIL = e.target.value;
            setEmail(EMAIL);
            console.log("email check", EMAIL, email);
         }
      } else {
         setEmailEmpty(true);
         // e.target.value = currentUser.email;
      }
   };

   const onChangePassword = (e) => {
      const check =
         /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,10}$/;
      const ValidationPassword = check.test(e.target.value);
      if (e.target.length) {
         setPasswordEmpty(false);
         if (ValidationPassword === false) {
            setPasswordcheck(false);
            console.log("error password..", password, e.target.value);
         } else {
            setPasswordcheck(true);
            const PASSWORD = e.target.value;
            setPassword(PASSWORD);
            console.log("password check", PASSWORD, password);
         }
      } else {
         setPasswordEmpty(false);
         // e.target.value = currentUser.password;
      }
   };

   const onChangeName = (e) => {
      const NAME = e.target.value;
      setName(NAME);
      console.log("name check", NAME, name);
   };

   const changedProfile = (e) => {
      e.preventDefault();
      if (passwordcheck === false && passwordEmpty === false) {
         setMessage(
            "The password must be 6 - 10 characters and contains one alphabet, one capital letter, one number and one special character."
         );
         // alert(message);
         toast.error(message);
      } else if (emailcheck === false && emailEmpty === false) {
         setMessage("The email is not in correct format");
         // alert(message);
         toast.error(message);
      } else {
         userService
            .editProfile(email, password, name, username)
            .then((res) => {
               setMessage(res.data);
               // alert(message);
               toast.success(message);
               setOpen2(false);
               setTimeout(function () {
                  window.location.reload();
               }, 3000);
            })
            .catch((error) => {
               console.log("error backend...", error);
               if (error.response.status === 404) {
                  setMessage("API Error");
                  console.log("failll error 1", error.response.data);
                  alert(message);
                  // toast.error(message);
               } else if (error.response.status === 409) {
                  setMessage(error.response.data);
                  console.log("failll error 2", error.response.data);
                  alert(message);
                  // toast.error(message);
               } else {
                  setMessage(error.config.message);
                  console.log("failll error 3", error);
                  // alert(message);
                  toast.error(message);
               }
            });
      }
   };

   return (
      <div className="Profile">
         <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
         />
         <h2 className="pageTitle">{username} Profile</h2>
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
                  value={username}
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
                        Cancel
                     </Button>
                  </DialogActions>
               </Dialog>
               <button className="editButton" onClick={handleOpen2}>
                  Edit Profile
               </button>
               <Dialog open={open2} onClose={handleClose2}>
                  <DialogTitle className="changePicTitle">
                     Edit Profile: <strong>{username}</strong>
                  </DialogTitle>
                  <DialogContent>
                     <div
                        style={{
                           marginTop: "30px",
                        }}
                     >
                        <div
                           // style={{
                           //    position: "relative",
                           //    marginLeft: "10px",
                           //    textAlign: "left",
                           //    marginTop: "20px",
                           // }}
                           className="dialogInfo"
                        >
                           <strong
                              style={{
                                 marginBottom: "10px",
                                 display: "inline-block",
                              }}
                           >
                              Name:
                           </strong>
                           <br />
                           <strong
                              style={{
                                 marginBottom: "10px",
                                 display: "inline-block",
                              }}
                           >
                              Email:
                           </strong>
                           <br />
                           <strong>Password:</strong>
                        </div>
                        <div className="dialogInput">
                           <input
                              type="text"
                              placeholder="Name"
                              name="name"
                              onChange={onChangeName}
                              style={{
                                 marginBottom: "8px",
                                 paddingRight: "60px",
                              }}
                           ></input>
                           <br />
                           <input
                              type="email"
                              placeholder="Email"
                              name="email"
                              onChange={onChangeEmail}
                              style={{
                                 marginBottom: "8px",
                                 paddingRight: "60px",
                              }}
                           ></input>
                           <br />
                           <input
                              type="password"
                              placeholder="Password"
                              name="password"
                              onChange={onChangePassword}
                              style={{ paddingRight: "60px" }}
                           ></input>
                        </div>
                     </div>
                  </DialogContent>
                  <DialogActions>
                     <Button
                        onClick={changedProfile}
                        style={{
                           cursor: "pointer",
                           marginRight: "20rem",
                        }}
                     >
                        Save
                     </Button>
                     <Button
                        onClick={handleClose2}
                        style={{ cursor: "pointer" }}
                     >
                        Cancel
                     </Button>
                  </DialogActions>
               </Dialog>
            </div>
         </div>
      </div>
   );
};

export default Profile;
