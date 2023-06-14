const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const authController = require("./controllers/auth");

const app = express();
// app.use(function (req, res, next) {
//    res.header("Access-Control-Allow-Origin", "http://localhost:8001"); // update to match the domain you will make the request from
//    res.header(
//       "Access-Control-Allow-Headers",
//       "x-access-token, Origin, Content-Type, Accept"
//    );
//    res.header("Access-Control-Allow-Credentials", "true");
//    next();
// });
const corsOptions = {
   credentials: true,
   origin: "http://localhost:8001",
   optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));
app.use(function (req, res, next) {
   res.header("Content-Type", "application/json;charset=UTF-8");
   res.header("Access-Control-Allow-Credentials", true);
   res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
   );
   next();
});
app.use(cookieParser());

// app.use(
//    cors({
//      credentials: true,
//      origin: process.env.FRONTEND_URL ?? "http://localhost:8000",
//      optionsSuccessStatus: 200,
//    })
//  );

// app.get("/api/outside", authController.send);

const authRouters = require("./routes/auth.route");
// const userRouters = require("./routes/users");
// const commentRouters = require("./routes/comments");
// const likeRouters = require("./routes/likes");
// const postRouters = require("./routes/posts");

//middlewares
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
   res.json({ message: "welcommmmmmmmeee." });
});

// app.use(authRouters);
// app.use("/api/comments", commentRouters);
// app.use("/api/posts", postRouters);
// app.use("/api/users", userRouters);
// app.use("/api/likes", likeRouters);

require("./routes/auth.route")(app);
require("./routes/user.route")(app);

app.listen(8000, () => {
   console.log("API working");
});
