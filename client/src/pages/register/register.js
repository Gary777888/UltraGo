import "./register.scss";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import authService from "../../services/auth";

const Register = () => {
   window.scrollTo(0, 0);
   const [username, setUsername] = useState("");
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const [name, setName] = useState("");
   const [message, setMessage] = useState("");
   const [successful, setSuccessful] = useState(false);
   const [passwordcheck, setPasswordcheck] = useState(false);
   const [emailcheck, setEmailcheck] = useState(false);

   const onChangeUsername = (e) => {
      const USERNAME = e.target.value;
      setUsername(USERNAME);
      console.log("username check", USERNAME, username);
   };

   const onChangeEmail = (e) => {
      const check = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
      const ValidationEmail = check.test(e.target.value);
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
      if (ValidationPassword === false) {
         setPasswordcheck(false);
         console.log("error password..", password, e.target.value);
      } else {
         setPasswordcheck(true);
         const PASSWORD = e.target.value;
         setPassword(PASSWORD);
         console.log("password check", PASSWORD, password);
      }
   };

   const onChangeName = (e) => {
      const NAME = e.target.value;
      setName(NAME);
      console.log("name check", NAME, name);
   };

   const handleRegister = (e) => {
      console.log("register working");
      e.preventDefault();
      if (passwordcheck === false) {
         setSuccessful(false);
         setMessage(
            "The password must be 6 - 10 characters and contains one alphabet, one capital letter, one number and one special character."
         );
      } else if (emailcheck === false) {
         setSuccessful(false);
         setMessage("The email is not in correct format");
      } else {
         authService
            .register(username, email, password, name)
            .then((res) => {
               console.log("herehe", res);
               setSuccessful(true);
               setMessage(res.data);
               setTimeout(function () {
                  window.location.reload();
               }, 2000);
            })
            .catch((error) => {
               console.log("error backend...", error);
               if (error.response.status === 404) {
                  setSuccessful(false);
                  setMessage("API Error");
                  console.log("failll error 1", error.response.data);
               } else if (error.response.status === 409) {
                  setSuccessful(false);
                  setMessage(error.response.data);
                  console.log("failll error 2", error.response.data);
               } else {
                  setSuccessful(false);
                  setMessage(error.config.message);
                  console.log("failll error 3", error);
               }
            });
      }

      // authService.register(username, email, password, name).then(
      //    (res) => {
      //       setSuccessful(true);
      //       setMessage(res.data);
      //       console.log("pass check respon", res);

      //       // setTimeout(function () {
      //       //    window.location.reload();
      //       // }, 1000);
      //    },
      //    (err) => {
      //       setSuccessful(false);
      //       setMessage(err.response.data);
      //       console.log("failll", err);
      //    }
      // );
   };

   return (
      <div className="register">
         <div className="card">
            <div className="left">
               <h1>UltraGo</h1>
               <p>Everything is out of reach until you reach it.</p>
               <span>Do you have an account?</span>
               <Link to="/login">
                  <button>Login</button>
               </Link>
            </div>
            <div className="right">
               <h1>Register</h1>
               <form onSubmit={handleRegister}>
                  <input
                     type="text"
                     placeholder="Username"
                     name="username"
                     required
                     onChange={onChangeUsername}
                  />
                  <input
                     type="email"
                     placeholder="Email"
                     name="email"
                     required
                     onChange={onChangeEmail}
                  />
                  <input
                     type="password"
                     placeholder="Password"
                     name="password"
                     required
                     onChange={onChangePassword}
                  />
                  <input
                     type="text"
                     placeholder="Name"
                     name="name"
                     required
                     onChange={onChangeName}
                  />
                  {/* {err && err} */}
                  <button>Register</button>
                  {message && (
                     <div className="message">
                        <div
                           className={
                              successful ? "alert-success" : "alert-fail"
                           }
                           role="alert"
                        >
                           {message}
                        </div>
                     </div>
                  )}
               </form>
            </div>
         </div>
      </div>
   );
};

export default Register;
