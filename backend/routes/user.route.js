const router = require("express").Router();
const userController = require("../controllers/user");

module.exports = function (app) {
   // app.use(function(res,req,next) => {

   // })
   router.post("/api/profile", userController.upload);
   console.log("user route");
};
