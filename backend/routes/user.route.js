const router = require("express").Router();
const multer = require("multer");
const db = require("../config/connect.js");
const path = require("path");
const express = require("express");
const app = express();

const userController = require("../controllers/user");

var storage = multer.diskStorage({
   destination: (req, file, callBack) => {
      callBack(null, "./public/images/"); // './public/images/' directory name where save the file
   },
   filename: (req, file, callBack) => {
      callBack(
         null,
         file.fieldname + "_" + Date.now() + path.extname(file.originalname)
      );
   },
});

var upload = multer({
   storage: storage,
});

module.exports = function (app) {
   router.post("/api/upload", upload.single("image"), (req, res) => {
      console.log(req.file);
      if (
         !req.file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)
      ) {
         console.log("Wrong file format");
         res.send({ msg: "Only image files (jpg, jpeg, png) are allowed!" });
      } else if (!req.file) {
         console.log("No file upload");
         res.send({ msg: "No file uploaded" });
      } else {
         console.log(req.file.filename);
         const image = req.file.filename;
         console.log("check data...", req);
         const id = 2;
         var imgsrc =
            "http://localhost:8000/api/getUserPic/" + req.file.filename;
         var insertData =
            "UPDATE users SET `profilePic` = ? WHERE username = ?";
         db.query(insertData, [image, req.body.username], (err, data) => {
            console.log("username checkkkk", req.body.username);
            if (err) {
               console.log("errrrrr");
               return res.json({ Message: "Error" });
            } else {
               console.log("passssssss");
               return res.json({
                  Status: "Success",
                  Image: req.file.filename,
                  username: req.body.username,
               });
            }
            // console.log("file uploaded");
         });
      }
   });

   app.use(express.static("public"));
   //    app.use(
   //       "/api/uploads",
   //       express.static(path.resolve(__dirname, "./uploads"))
   //    );
   router.get("/api/testinguser", userController.testinguser);
   router.post("/api/getUserPic", userController.getUserPic);
   console.log("user route");
   app.use("/", router);
};
