require("dotenv").config();
require("./src/db/database").connect();
const express = require("express");
const cors = require('cors')
const session = require("express-session");
const app = express();
app.use(cors({
  origin: 'http://localhost:19002',
  credentials: true
}))
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
app.use((req, res, next) => {
  console.log(req.path)
  next()
})

app.use((req, res, next) => {
  console.log(req.path)
  next()
})

const UserRouter = require("./src/router/UserRouter");
app.use(UserRouter);

const PostRouter = require("./src/router/PostRouter");
app.use(PostRouter);

const JobRouter = require("./src/router/JobRouter");
app.use(JobRouter);

module.exports = app;
