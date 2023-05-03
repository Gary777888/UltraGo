const db = require("../config/connect.js");
const multer = require("multer");

console.log("user controller");
module.exports.upload = (req, res) => {
    console.log("inside");
   //! Use of Multer
   var storage = multer.diskStorage({
      destination: (req, file, callBack) => {
         callBack(null, "./public/images/"); // './public/images/' directory name where save the file
      },
      filename: (req, file, callBack) => {
         callBack(
            null,
            file.fieldname + "-" + Date.now() + path.extname(file.originalname)
         );
      },
   });

   var upload = multer({
      storage: storage,
   });

   upload.single('image') = (req, res, err) => {

        if (!req.file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
            res.send({ msg: "Only image files (jpg, jpeg, png) are allowed!" });
        } else {
            const image = req.file.FileName;
            const id = 1;

            const sqlInsert = "UPDATE users SET `profilePic` = ? WHERE id = ?";
            db.query(sqlInsert, [image, id], (err, result, data) => {
                if (err) {
                    console.log(err);
                    res.send({
                    msg: err,
                    });
                }
                if (result) {
                    res.send({
                    data: result,
                    msg: "Your image has been updated!",
                    });
                }
            });
        }
    }
    console.log("Called Upload function");
};
