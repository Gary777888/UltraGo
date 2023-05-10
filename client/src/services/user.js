import axios from "axios";
const API_URL = "http://localhost:8000/api/";

const upload = (formData) => {
   // formData.append("image", image);
   // formData.append("fileName", fileName);
   console.log("outside", formData);
   return axios.post(API_URL + "upload", {
      formData,
   });
};

const getUserPic = (username) => {
   console.log("get pic", username);
   return axios.post(API_URL + "getUserPic", {
      username,
   });
};

const userService = {
   upload,
   getUserPic,
};

export default userService;
