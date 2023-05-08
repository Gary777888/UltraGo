const db = require("../config/connect.js");
const multer = require("multer");

console.log("user controller");

// var storage = multer.diskStorage({
//     destination: (req, file, callBack) => {
//        callBack(null, "./public/images/"); // './public/images/' directory name where save the file
//     },
//     filename: (req, file, callBack) => {
//        callBack(
//           null,
//           file.fieldname + "-" + Date.now() + path.extname(file.originalname)
//        );
//     },
//  });

//  var upload = multer({
//     storage: storage,
//  });

//  upload.single('image') = (req, res, err) => {

//     if (!req.file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
//         res.send({ msg: "Only image files (jpg, jpeg, png) are allowed!" });
//     } else {
//         const image = req.file.filename;
//         const id = 1;

//         const sqlInsert = "UPDATE users SET `profilePic` = ? WHERE id = ?";
//         db.query(sqlInsert, [image, id], (err, result, data) => {
//             if (err) {
//                 console.log(err);
//                 res.send({
//                 msg: err,
//                 });
//             }
//             if (result) {
//                 res.send({
//                 data: result,
//                 msg: "Your image has been updated!",
//                 });
//             }
//         });
//     }
// }

module.exports.upload = (req, res) => {
    console.log("inside");
//    ! Use of Multer
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
            const image = req.file.filename;
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

module.exports.testinguser = (req, res) => {
   console.log("in testinguser function");
    res.send("hellooooo");
}

module.exports.getUserPic = (req, res) => {
    const q = "SELECT * from users";
    const id = 2;
    // const jsonData = pm.response.json().message
    // pm.visualizer.set(`
    // <body>
    // <img src="${jsonData}">
    // </body>`);

    db.query(q, (err, data) => {
        if (err) {
            return res.status(500).json(err);
         }

         if(data) {
            res.send({
                profilePic: data[0].profilePic,
            });
         }
    })
}

// module.exports = upload