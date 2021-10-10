const express = require("express");
const router = express.Router();

const PostController = require("../controller/PostController")
router.post('/post/create', PostController.createPost)
router.get('/post', PostController.getAllPost)
router.get('/post/:id', PostController.getOnePost)

module.exports = router