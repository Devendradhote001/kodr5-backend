const express = require("express");
const createPostController = require("../controllers/post.controller");
const uploads = require("../config/multer");

const router = express.Router();

router.post("/", uploads.single("image"), createPostController);

module.exports = router;
