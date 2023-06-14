const jwt = require("jsonwebtoken");
const config = require("../config/auth.config");
const db = require("../config/connect");

const requireAuth = (req, res, next) => {
   const token = req.cookies.accessToken;
   const username = req.params.username;

   const q = "SELECT * FROM users WHERE username = ?";

   db.query(q, [username], (err, data) => {
      if (err) {
         return res.status(500).json(err);
      } else if (!data.length) {
         console.log("User not found...");
         return res.status(409).json("User not found!");
      } else {
         // check json web token exists & is verified
         if (!token) {
            console.log("No token provided...");
            return res.status(466).send({
               message: "No token provided",
            });
         } else {
            jwt.verify(token, config.secret, (error, decodedToken) => {
               error = username;
               if (error !== decodedToken.username) {
                  console.log(
                     "Unauthorised User",
                     username,
                     decodedToken.username,
                     error
                  );
                  res.status(477).send({ message: "Unauthorised User" });
               } else {
                  console.log("token is decoded", decodedToken);
                  next();
               }
            });
         }
      }
   });
};

// const checkUser = (req, res) => {

//    const token = req.cookies.accessToken;

//    if (!token) {

//    } else {

//    }

// }

const authJwt = {
   requireAuth: requireAuth,
};

module.exports = authJwt;
