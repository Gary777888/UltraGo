import axios from "axios";
const API_URL = "http://localhost:8000/api/";

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
   return axios.post(API_URL + "login", {
      username,
      password,
   });
};

const logout = () => {};

const authService = {
   register,
   login,
   logout,
};

export default authService;
