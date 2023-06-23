const db = require("../config/connect.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");

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
   // console.log("cookies....", req.cookies);
   // res.json(req.cookies);
   console.log("working here");
};

module.exports.login = (req, res) => {
   console.log("login function");
   const q = "SELECT * FROM users WHERE username = ?";
   console.log("checkkkkkk", req);
   db.query(q, [req.body.username], (err, data) => {
      console.log("login data....", data);
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
         {
            id: data[0].id,
            username: req.body.username,
         },
         config.secret,
         {
            expiresIn: 3600 * 1000,
         }
      );

      const { password, ...others } = data[0];

      // console.log("check token...", token);

      res.cookie("accessToken", token, {
         httpOnly: false,
      });

      res.cookie("username", others.username);

      res.status(200).send(
         {
            username: others.username,
            email: others.email,
            name: others.name,
            profilePic: others.profilePic,
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
      // secure: true,
      // path: `http://localhost:8001/profile/${req.body.username}`,
      // sameSite: "none",
   });

   res.clearCookie("username");

   res.status(200).json("Goodbye! User has loggout out");
};

module.exports.getCookie = (req, res) => {
   console.log("getcookie function", req.cookies);
   // let cookies = {};

   // const cookiesArray = req.headers.Cookie.split(";");

   // cookiesArray.forEach((cookie) => {
   //    const [key, value] = cookie.trim().split("=");
   //    cookies[key] = value;
   // });
   // res.json(cookies);
   console.log("check cooki.....", req.cookies);
   if (!req.cookies.accessToken) {
      console.log("null...");
      return res.status(409).json("User not found");
   } else {
      console.log("not nulll.....");
      res.json(req.cookies);
   }
};
