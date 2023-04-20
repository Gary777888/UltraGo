const router = require("express").Router();
const authController = require("../controllers/auth");

module.exports = function (app) {
   app.use(function (req, res, next) {
      res.header(
         "Access-Control-Allow-Headers",
         "x-access-token, Origin, Content-Type, Accept"
      );
      next();
   });
   router.post("/api/register", authController.register);
   router.post("/api/login", authController.login);
   router.post("/api/logout", authController.logout);
   router.post("api/getcookie", authController.getCookie);
   // router.post("/api/register", (req, res) => {
   //    controller.register;
   // });
   // router.post("/login", controller.login);
   // router.post("/logout", controller.logout);
   router.get("/api/outside", authController.send);

   app.use("/", router);
};
// router.post("/api/register", authController.register);
// const controller = require("../controllers/auth");
// const verifySignUp = require("../middleware/verifySignUp");

// module.exports = function (app) {
//    app.use(function (req, res, next) {
//       res.header(
//          "Access-Control-Allow-Headers",
//          "x-access-token, Origin, Content-Type, Accept"
//       );
//       next();
//    });

//    app.post("/api/auth/signup", controller.login);
//    app.post("/api/auth/signin", controller.register);
// };
