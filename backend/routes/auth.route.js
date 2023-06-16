const router = require("express").Router();
const authController = require("../controllers/auth");
const authMiddleware = require("../middleware/authjwt");

module.exports = function (app) {
   router.post("/api/register", authController.register);
   router.post("/api/login", authController.login);
   router.post("/api/logout", authController.logout);
   router.get("/api/getcookie", authController.getCookie);
   router.get("/api/outside", authController.send);
   router.post("/api/getAuthorisedUser", authMiddleware.requireAuth);
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
