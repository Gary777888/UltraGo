import axios from "axios";
const API_URL = "http://localhost:8000/api/";

const upload = (formData) => {
   // formData.append("image", image);
   // formData.append("fileName", fileName);
   console.log("outside");
   return axios.post(API_URL + "profile", {
      body: formData,
   });
};

const userService = {
   upload,
};

export default userService;
