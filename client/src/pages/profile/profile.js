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
import { sync } from "fontawesome";

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
   const [confirmpassword, setConfirmPassword] = useState("");
   const [name, setName] = useState("");
   const [passwordcheck, setPasswordcheck] = useState(false);
   const [emailcheck, setEmailcheck] = useState(true);

   const [open3, setOpen3] = useState(false);
   const [matched, setMatched] = useState(false);

   const [message2, setMessage2] = useState("");

   const [emailEmpty, setEmailEmpty] = useState(true);
   const [passwordEmpty, setPasswordEmpty] = useState(true);

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

   const getUserProfile = (username) => {
      userService
         .getUser(username)
         .then((res) => {
            setCurrentUser(res.data);
            console.log("check getuser res...", res.data);
         })
         .catch((err) => {
            console.log("errroroorr", err);
         });
   };

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
      // alert("hoioioi");
   };

   const handleClose = () => {
      if (successfulChanged === true) {
         setOpen(false);
         window.location.reload();
      } else {
         setOpen(false);
      }
   };

   const changeFile = (e) => {
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
                  // toast.success(`Changed picture to ${fileName}`);
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
         toast.info("No changes");
         setOpen(false);
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
      setName(currentUser.name);
      setEmail(currentUser.email);
      // setPassword(currentUser.password);
   };

   const handleClose2 = () => {
      setOpen2(false);
   };

   const onChangeEmail = (e) => {
      const check = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
      const ValidationEmail = check.test(e.target.value);
      console.log("curretn email check", currentUser.email);
      setEmailEmpty(false);
      if (ValidationEmail === false) {
         setEmailcheck(false);
      } else {
         setEmailcheck(true);
         const EMAIL = e.target.value;
         setEmail(EMAIL);
         console.log("email check", EMAIL, email);
      }
   };

   const onChangePassword = (e) => {
      const check =
         /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,10}$/;
      const ValidationPassword = check.test(e.target.value);
      console.log("curretn password check", currentUser.password);
      const PASSWORD = e.target.value;
      setPassword(PASSWORD);

      if (PASSWORD !== confirmpassword) {
         setMatched(false);
      } else {
         if (ValidationPassword === false) {
            setPasswordcheck(false);
            console.log("error password..", password, e.target.value);
         } else {
            setPasswordcheck(true);
            console.log("password check", PASSWORD, password);
         }
      }
   };

   const onChangeConfirmPassword = (e) => {
      const check =
         /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,10}$/;
      const ValidationPassword = check.test(e.target.value);
      console.log("curretn password check", currentUser.password);
      const PASSWORD = e.target.value;

      if (PASSWORD !== password) {
         setMatched(false);
         console.log("password nototootot match", password, PASSWORD);
      } else {
         setMatched(true);
         console.log("matchhchhchchc", password, PASSWORD);
         if (ValidationPassword === false) {
            setPasswordcheck(false);
            console.log(
               "error confirm password..",
               confirmpassword,
               e.target.value
            );
         } else {
            setPasswordcheck(true);
            setConfirmPassword(PASSWORD);
         }
      }

      console.log("password check", PASSWORD, confirmpassword);
      // e.target.value = currentUser.password;
   };

   const onChangeName = (e) => {
      const NAME = e.target.value;
      setName(NAME);
      console.log("name check", NAME, name);
      // alert("chahahah");
   };

   const changedProfile = async (e) => {
      e.preventDefault();
      // setMessage("");
      console.log("check all...", email, name);
      if (emailcheck === false && email.length !== 0) {
         console.log("emaillllengthhhhhhhhh...", email.length);
         // setMessage("The email is not in correct format");
         // alert(message);
         toast.error("The email is not in correct format");
      } else {
         await userService
            .editProfile(email, name, username)
            .then((res) => {
               // console.log("backend check", res.data);
               // setMessage("User has been edited");
               // alert(message);
               toast.success(`${username} has been edited`);
               console.log(
                  "email and password check...",
                  currentUser.email,
                  currentUser.password,
                  email.length
               );

               setOpen2(false);
               setTimeout(function () {
                  window.location.reload();
               }, 3000);
            })
            .catch((error) => {
               console.log("error backend...", error);
               if (error.response.status === 404) {
                  // setMessage("API Error");
                  console.log("failll error 1", error.response.data);
                  // alert(message);
                  toast.error("API Error");
               } else if (error.response.status === 409) {
                  // setMessage("ERROR 409");
                  console.log("failll error 2", error.response.data);
                  // alert(message);
                  toast.error("ERROR 409");
               } else {
                  // setMessage("OTHER ERRORS");
                  console.log("failll error 3", error);
                  // alert(message);
                  toast.error("OTHER ERRORS");
               }
            });
      }
   };

   const handleOpen3 = () => {
      setOpen3(true);
   };

   const handleClose3 = () => {
      setOpen3(false);
   };

   const changedPassword = (e) => {
      e.preventDefault();
      console.log("check password", password, confirmpassword);

      if (matched === false) {
         console.log("matchhhh false", matched);
         // setMessage("Password does not match");
         toast.error("Password does not match");
      } else {
         if (passwordcheck === false) {
            // setMessage(
            //    "The password must be 6 - 10 characters and contains one captial letter, one alphabet, one number and one special character."
            // );
            // alert(message);
            toast.error(
               "The password must be 6 - 10 characters and contains one captial letter, one alphabet, one number and one special character."
            );
         } else {
            userService
               .changeUserPassword(confirmpassword, username)
               .then((res) => {
                  console.log("inside userService changeuserpassword");
                  // setMessage("Changed user password");
                  // alert(message)
                  toast.success("Changed user password");
                  setOpen3(false);
               })
               .catch((error) => {
                  console.log("error backend...", error);
                  if (error.response.status === 404) {
                     // setMessage("API Error");
                     console.log("failll error 1", error.response.data);
                     // alert(message);
                     toast.error("API Error");
                  } else if (error.response.status === 409) {
                     // setMessage(error.response.data);
                     // setMessage("ERROR 409");
                     console.log("failll error 2", error.response.data);
                     // alert(message);
                     toast.error("ERROR 409");
                  } else {
                     // setMessage(error.config.message);
                     // setMessage("OTHER ERRORS");
                     console.log("failll error 3", error);
                     // alert(message);
                     toast.error("OTHER ERRORS");
                  }
               });
         }
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
                        <div className="dialogInfo">
                           <strong>Name:</strong>
                           <br />
                           <br />
                           <strong>Email:</strong>
                           <br />
                        </div>
                        <div className="dialogInput">
                           <input
                              type="text"
                              placeholder={"Name"}
                              defaultValue={currentUser.name}
                              name="name"
                              // value={currentUser.name}
                              onChange={onChangeName}
                              style={{
                                 fontFamily: "Verdana",
                                 marginBottom: "19px",
                                 paddingRight: "80px",
                              }}
                           ></input>
                           <br />

                           <input
                              type="email"
                              placeholder={"Email"}
                              defaultValue={currentUser.email}
                              name="email"
                              onChange={onChangeEmail}
                              style={{
                                 fontFamily: "Verdana",
                                 marginBottom: "8px",
                                 paddingRight: "80px",
                              }}
                           ></input>

                           <br />
                        </div>
                     </div>
                  </DialogContent>
                  <DialogActions>
                     <Button
                        // disable={
                        //    emailEmpty ? (true) : (onClick={changedProfile})
                        // }
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
               <button className="passwordButton" onClick={handleOpen3}>
                  Change Password
               </button>
               <Dialog open={open3} onClose={handleClose3}>
                  <DialogTitle className="changePicTitle">
                     Change Password
                  </DialogTitle>
                  <DialogContent>
                     <div
                        style={{
                           marginTop: "20px",
                        }}
                     >
                        <div className="dialog3Info">
                           <strong>New Password: </strong>
                           <br />
                           <br />
                           <br />
                           <strong>Confirm Password: </strong>
                        </div>
                        <div className="dialog3Input">
                           <input
                              style={{
                                 // marginBottom: "17px",
                                 paddingRight: "60px",
                              }}
                              name="password"
                              onChange={onChangePassword}
                           ></input>
                           <br />
                           <br />
                           <br />
                           <input
                              style={{
                                 // marginBottom: "8px",
                                 paddingRight: "60px",
                              }}
                              name="confirmpassword"
                              onChange={onChangeConfirmPassword}
                           ></input>
                        </div>
                     </div>
                  </DialogContent>
                  <DialogActions>
                     <Button
                        // disable={
                        //    emailEmpty ? (true) : (onClick={changedProfile})
                        // }
                        onClick={changedPassword}
                        style={{
                           cursor: "pointer",
                           marginRight: "20rem",
                        }}
                     >
                        Save
                     </Button>
                     <Button
                        onClick={handleClose3}
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
