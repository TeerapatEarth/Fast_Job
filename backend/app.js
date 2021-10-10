require('dotenv').config();
require('./src/db/database').connect();

const express = require("express");
const app = express();

app.use(express.json())


const UserRouter = require("./src/router/UserRouter")
app.post("/register", UserRouter)

const PostRouter = require("./src/router/PostRouter")
app.post("/post/create", PostRouter)
app.get("/post", PostRouter)
app.get("/post/:id", PostRouter)

module.exports = app;