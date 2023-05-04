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
   // app.use(function(res,req,next) => {

   // })
   //    router.post("/api/profile", userController.upload);
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
         const id = 2;

         var imgsrc =
            "http://localhost:8000/api/getUserPic/" + req.file.filename;
         var insertData = "UPDATE users SET `profilePic` = ?";
         db.query(insertData, [image], (err, result) => {
            console.log("inside query");
            if (err) {
               console.log("errrrrr");
               return res.json({ Message: "Error" });
            } else {
               console.log("passssssss");
               return res.json({ Status: "Success" });
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
   router.get("/api/getUserPic", userController.getUserPic);
   console.log("user route");
   app.use("/", router);
};
