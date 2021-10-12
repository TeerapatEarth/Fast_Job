require("dotenv").config();
require("./src/db/database").connect();

const express = require("express");
const session = require("express-session");
const app = express();

app.use(express.json());
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
    cookie: {
      expires: 3600000,
    },
  })
);

const UserRouter = require("./src/router/UserRouter");
app.post("/register", UserRouter);
app.post("/login", UserRouter);
app.post("/logout", UserRouter);
app.get("/session", UserRouter);

const PostRouter = require("./src/router/PostRouter");
app.post("/post/create", PostRouter);
app.get("/post", PostRouter);
app.get("/post/:id", PostRouter);

module.exports = app;
