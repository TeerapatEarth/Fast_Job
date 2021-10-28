const multer = require("multer");
const path = require("path");

var storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, "./src/static/imageUser"); // path to save file
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

module.exports = upload