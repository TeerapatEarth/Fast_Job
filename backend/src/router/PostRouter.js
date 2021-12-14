const express = require("express");
const router = express.Router();
const uploadImage = require('../midleware/uploadImage')

const PostController = require("../controller/PostController");

router.post("/post/create", uploadImage.single("myImage"), PostController.createPost);
router.get("/post", PostController.getAllPost);
router.get("/post/:id", PostController.getOnePost);
router.put("/post/update/:id",uploadImage.single("myImage"), PostController.updatePost);
router.delete("/post/delete/:id", PostController.deletePost);
router.get("/post/search/:search",PostController.searchPost);
router.put("/post/adduser/:id", PostController.addUser);
router.put("/post/cancleuser/:id", PostController.cancleUser);
router.put("/post/apply/:id", PostController.applyUser)
module.exports = router;
