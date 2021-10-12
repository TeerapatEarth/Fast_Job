const express = require("express");
const router = express.Router();

const UserController = require("../controller/UserController")
router.post('/register', UserController.regisUser)
router.post('/login', UserController.login)
router.post('/logout', UserController.logout)
router.get('/session', UserController.getSession)

module.exports = router