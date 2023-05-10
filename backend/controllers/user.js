const db = require("../config/connect.js");

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

// module.exports = upload
