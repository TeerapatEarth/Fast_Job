const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");

var storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, "./src/static/imagePost"); // path to save file
  },
  filename: function (req, file, callback) {
    // set file name
    callback(
      null,
      `${file.originalname}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

const upload = multer({
  storage: storage,
});

const PostController = require("../controller/PostController");
router.post("/post/create", upload.single("myImage"), PostController.createPost);
router.get("/post", PostController.getAllPost);
router.get("/post/:id", PostController.getOnePost);
router.put("/post/update/:id", PostController.updatePost);
router.delete("/post/delete/:id", PostController.deletePost);
module.exports = router;
