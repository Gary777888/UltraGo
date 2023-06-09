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
   return axios.post(API_URL + `getUserPic/${username}`, {});
};

const editProfile = async (email, name, username) => {
   console.log("edit profile....", username, email, name);
   return axios.put(API_URL + "updateProfile", {
      email,
      name,
      username,
   });
};

const getUser = (username) => {
   console.log("getUser function....", username);
   return axios.post(API_URL + `getUser/${username}`);
   // return axios.get(API_URL + "getUser/peter");
};

const changeUserPassword = (password, username) => {
   console.log("inside change password", password, username);
   return axios.put(API_URL + "updateUserPassword", {
      password,
      username,
   });
};

const userService = {
   upload,
   getUserPic,
   editProfile,
   getUser,
   changeUserPassword,
};

export default userService;
