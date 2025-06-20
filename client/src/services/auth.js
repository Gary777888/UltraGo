import axios from "axios";
const API_URL = "http://localhost:8000/api/";

let axiosConfig = {
   withCredentials: "include",
};

const register = (username, email, password, name) => {
   console.log("check herere", username, email, password, name);
   return axios.post(API_URL + "register", {
      username,
      email,
      password,
      name,
   });
};

const login = (username, password) => {
   console.log("check here", username, password);
   return axios
      .post(
         API_URL + "login",
         {
            username,
            password,
            // axiosConfig,
         },
         axiosConfig
      )
      .then((response) => {
         console.log("resss", response);
         console.log("check res", response.data);
         if (response.data.accessToken) {
            localStorage.setItem("user", JSON.stringify(response.data));
         }
         return response.data;
      });
};

const getCurrentUser = () => {
   return JSON.parse(localStorage.getItem("user"));
};

const logout = () => {
   localStorage.removeItem("user");
   return axios.post(
      API_URL + "logout",
      {
         // axiosConfig,
      },
      axiosConfig
   );
   // window.location.reload();
};

const authService = {
   register,
   login,
   logout,
   getCurrentUser,
};

export default authService;
