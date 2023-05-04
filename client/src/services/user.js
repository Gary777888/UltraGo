import axios from "axios";
const API_URL = "http://localhost:8000/api/";

const upload = (formData) => {
   // formData.append("image", image);
   // formData.append("fileName", fileName);
   console.log("outside");
   return axios.post(API_URL + "profile", {
      // body: formData,
   });
};

const getUserPic = () => {
   console.log("get pic");
   return axios.get(API_URL + "getUserPic");
};

const userService = {
   upload,
   getUserPic,
};

export default userService;
