require('dotenv').config();
require('./db/database').connect();

const express = require("express");

const app = express();

app.use(express.json())

module.exports = app;