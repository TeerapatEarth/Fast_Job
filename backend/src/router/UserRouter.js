const express = require("express");
const router = express.Router();

const UserController = require("../controller/UserController")
router.post('/register', UserController.regisUser)

module.exports = router