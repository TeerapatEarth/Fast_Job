require('dotenv').config();
require('./src/db/database').connect();

const express = require("express");
const app = express();

app.use(express.json())


const UserRouter = require("./src/router/UserRouter")
app.post("/register", UserRouter)

module.exports = app;