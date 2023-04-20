const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const app = express();
const corsOptions = {
   origin: "http://localhost:8001",
};
app.use(cors(corsOptions));
app.use(cookieParser());

const authRouters = require("./routes/auth");
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

require("./routes/auth")(app);

app.listen(8000, () => {
   console.log("API working");
});
