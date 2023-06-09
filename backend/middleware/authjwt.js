const jwt = require("jsonwebtoken");
const config = require("../config/auth.config");

const requireAuth = (req, res, next) => {
   const token = req.cookies.accessToken;

   // check json web token exists & is verified

   if (!token) {
      return res.status(466).send({
         message: "No token provided",
      });
      // res.redirect( 466,'/login');
   } else {
      jwt.verify(token, config.secret, (err, decodedToken) => {
         if (err) {
            return res.status(401).send({
               message: "Unauthorized!",
            });
         } else {
         }
      });
   }
};
