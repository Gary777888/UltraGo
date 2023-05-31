const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const authController = require("./controllers/auth");

const app = express();
app.use(cookieParser());
const corsOptions = {
   credentials: true,
   origin: "http://localhost:8001",
   optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

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
