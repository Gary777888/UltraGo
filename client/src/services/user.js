import axios from "axios";
const API_URL = "http://localhost:8000/api/";

const upload = (formData) => {
   console.log("outside 1", formData.get("image"));
   console.log("outside 2", formData.get("fileName"));
   console.log("outside 3", formData.get("username"));
   const image = formData.get("image");
   const fileName = formData.get("fileName");
   const username = formData.get("username");
   console.log("FUCKK", image, fileName, username);
   // formData.append("image", image);
   // formData.append("fileName", fileName);

   // console.log("fkfkfk", image, fileName, username);
   // const formData = new FormData();
   // formData.append("image", image);
   // formData.append("fileName", fileName);
   // formData.append("username", username);
   return axios.post(
      API_URL + "upload",
      {
         formData,
      },
      { headers: { "Content-Type": "multipart/form-data" } }
   );
};

const getUserPic = (username) => {
   console.log("get pic", username);
   return axios.post(API_URL + "getUserPic", {
      username,
   });
};

const editProfile = (email, password, name, username) => {
   console.log("edit profile....", username, email, password, name);
   return axios.put(API_URL + "updateProfile", {
      email,
      password,
      name,
      username,
   });
};

const getUser = (username) => {
   console.log("getUser function....", username);
   return axios.get(API_URL + `getUser/${username}`);
};

const userService = {
   upload,
   getUserPic,
   editProfile,
   getUser,
};

export default userService;
