const db = require("./config/connect.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("./config/auth.config.js");

module.exports.register = (req, res) => {
   //    // //Check user if exists
   console.log("call register");
   const q = "SELECT * FROM users WHERE username = ?";
   try {
      db.query(q, [req.body.username], (err, data) => {
         if (err) {
            return res.status(500).json(err);
         }
         if (data.length) {
            return res.status(409).json("User already exists");
         }
         //Create a new user
         // const check =
         //    /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,10}$/;
         // const ValidationPassword = check.test(req.body.password);
         // if (ValidationPassword === false) {
         //    return "The password must be 6 - 10 characters and contains one alphabet, one captial letter, one number and one special character.";
         // }
         const salt = bcrypt.genSaltSync(10);
         const hashedPassword = bcrypt.hashSync(req.body.password, salt);
         const q =
            "INSERT INTO users (`username`, `email`, `password`, `name`) VALUE (?)";
         const values = [
            req.body.username,
            req.body.email,
            hashedPassword,
            req.body.name,
         ];
         db.query(q, [values], (err, data) => {
            if (err) {
               return res.status(500).json(err);
            }
            return res.status(200).json("User has been created.");
         });
      });
   } catch (err) {
      res.status(404).json("API Error", err);
   }
   console.log("end of reg");
};

module.exports.send = (req, res) => {
   console.log("before");
   res.send("helllllllllllll\nnnoononononono");
   console.log("working here");
};

module.exports.login = (req, res) => {
   console.log("login function");
   const q = "SELECT * FROM users WHERE username = ?";

   db.query(q, [req.body.username], (err, data) => {
      if (err) {
         return res.status(500).json(err);
      }
      if (!data.length) {
         return res.status(409).json("User not found!");
      }
      const checkPassword = bcrypt.compareSync(
         req.body.password,
         data[0].password
      );
      if (!checkPassword) {
         return res.status(400).json("Wrong Password or Username");
      }

      const token = jwt.sign(
         { id: data[0].id, username: req.body.username },
         config.secret,
         {
            expiresIn: 3600,
         }
      );

      const { password, ...others } = data[0];

      res.cookie("accessToken", token, {
         httpOnly: true,
      })
         .status(200)
         .send(
            {
               username: others.username,
               email: others.email,
               name: others.name,
               accessToken: token,
               message: `Welcome ${others.username}`,
            }
            // `Welcome ${req.body.username}`
         );
   });
};

module.exports.logout = (req, res) => {
   console.log("Logout function");
   res.clearCookie("accessToken", {
      secure: true,
      sameSite: "none",
   })
      .status(200)
      .json("Goodbye! User has loggout out");
};

module.exports.getCookie = (req, res) => {
   console.log("getcookie function");
   let cookies = {};

   const cookiesArray = req.headers.Cookie.split(";");

   cookiesArray.forEach((cookie) => {
      const [key, value] = cookie.trim().split("=");
      cookies[key] = value;
   });

   res.json(cookies);
};
