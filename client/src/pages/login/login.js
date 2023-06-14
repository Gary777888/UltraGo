import { Link, useNavigate } from "react-router-dom";
import "./login.scss";
import { useState } from "react";
import authService from "../../services/auth";

const Login = () => {
   window.scrollTo(0, 0);
   const [username, setUsername] = useState("");
   const [password, setPassword] = useState("");
   const [message, setMessage] = useState("");
   const [successful, setSuccessful] = useState(false);

   const navigate = useNavigate();

   const onChangeUsername = (e) => {
      const USERNAME = e.target.value;
      setUsername(USERNAME);
      console.log("username check", username);
   };

   const onChangePassword = (e) => {
      const PASSWORD = e.target.value;
      setPassword(PASSWORD);
      console.log("password check", password);
   };

   const handleLogin = (e) => {
      e.preventDefault();
      authService
         .login(username, password)
         .then((res) => {
            console.log("inside", res);
            setSuccessful(true);
            setMessage(res.message);
            console.log("check all data mess...", res);
            setTimeout(function () {
               navigate("/");
               window.location.reload();
            }, 1000);
         })
         .catch((error) => {
            if (
               error.response.status === 400 ||
               error.response.status === 409
            ) {
               console.log("fuckkk", error);
               setSuccessful(false);
               setMessage(error.response.data);
            } else {
               console.log("fucking joke");
               setSuccessful(false);
               setMessage("API Error");
            }
         });
   };

   return (
      <div className="login">
         <div className="card">
            <div className="left">
               <h1>UltraGo</h1>
               <p>Everyday is a chance to get better.</p>
               <span>Don't you have an account?</span>
               <Link to="/register">
                  <button>Register</button>
               </Link>
            </div>
            <div className="right">
               <h1>Login</h1>
               <form onSubmit={handleLogin}>
                  <input
                     type="text"
                     placeholder="Username"
                     name="username"
                     onChange={onChangeUsername}
                  />
                  <input
                     type="password"
                     placeholder="Password"
                     name="password"
                     onChange={onChangePassword}
                  />
                  {/* {err && err} */}
                  <button>Login</button>
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

export default Login;
