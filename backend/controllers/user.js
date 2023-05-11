const db = require("../config/connect.js");
const bcrypt = require("bcryptjs");

console.log("user controller");

module.exports.testinguser = (req, res) => {
   console.log("in testinguser function");
   res.send("hellooooo");
};

module.exports.getUserPic = (req, res) => {
   const q = "SELECT * from users WHERE username = ?";
   const id = 2;
   // const jsonData = pm.response.json().message
   // pm.visualizer.set(`
   // <body>
   // <img src="${jsonData}">
   // </body>`);

   db.query(q, [req.body.username], (err, data) => {
      console.log("check username...", req.body.username);
      console.log("next is data check", data);
      if (err) {
         return res.status(500).json(err);
      }
      if (!data.length) {
         return res.status(409).json("User not found!");
      }
      for (let i = 0; i < data.length; i++) {
         console.log("data check", data[i]);
         res.send({
            profilePic: data[i].profilePic,
         });
      }
   });
};

module.exports.changedProfile = (req, res) => {
   console.log("inin changed function");
   const q = "SELECT * FROM users WHERE username = ?";
   try {
      db.query(q, [req.body.username], (err, data) => {
         console.log("before check", data);
         if (err) {
            return res.status(500).json(err);
         }
         if (!data.length) {
            return res.status(409).json("User not found!");
         } else {
            const q2 =
               "UPDATE users SET email = ?, password = ?, name = ? WHERE username = ?";

            const salt = bcrypt.genSaltSync(10);
            const hashedPassword = bcrypt.hashSync(req.body.password, salt);

            const values = [
               req.body.email,
               req.body.name,
               hashedPassword,
               req.body.username,
            ];

            db.query(
               q2,
               [
                  req.body.email,
                  hashedPassword,
                  req.body.name,
                  req.body.username,
               ],
               (err, data) => {
                  console.log("InSIDE editting profile...", data);
                  if (err) {
                     return res.status(500).json(err);
                  }

                  // res.send({
                  //    username: req.body.username,
                  //    email: req.body.email,
                  //    password: req.body.password,
                  //    name: req.body.name,
                  // });
                  res.status(200).json(`${req.body.username} has been edited`);
               }
            );
         }
      });
   } catch (err) {
      res.status(404).json("API Error", err);
   }
};

// module.exports = upload
