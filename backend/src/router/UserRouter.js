const express = require("express");
const router = express.Router();
const uploadImage = require('../midleware/uploadImageProfile')

const UserController = require("../controller/UserController")
router.post('/register', uploadImage.single('myImage'), UserController.regisUser)
router.post('/login', UserController.login)
router.post('/logout', UserController.logout)
router.get('/session', UserController.getSession)
router.get('/user', UserController.getAllUser)
router.get('/user/:id', UserController.getOneUser)
router.put('/updateuser/:id',uploadImage.single('myImage'), UserController.updateUser)
router.delete('/deleteuser/:id', UserController.deleteUser)
router.put('/report/:id', UserController.report)
router.put('/ban/:id', UserController.banUser)
router.put('/unban/:id', UserController.unBanUser)
router.put('/seenotifypost/:id', UserController.seeNotiPost)

module.exports = router