const express = require("express");
const router = express.Router();

const UserController = require("../controller/UserController")
router.post('/register', UserController.regisUser)
router.post('/login', UserController.login)
router.post('/logout', UserController.logout)
router.get('/session', UserController.getSession)
router.get('/user', UserController.getAllUser)
router.get('/user/:id', UserController.getOneUser)
router.put('/updateuser/:id', UserController.updateUser)
router.delete('/deleteuser/:id', UserController.deleteUser)

module.exports = router