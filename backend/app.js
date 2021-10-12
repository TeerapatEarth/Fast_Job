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
app.use(UserRouter);

const PostRouter = require("./src/router/PostRouter");
app.use(PostRouter)

module.exports = app;
