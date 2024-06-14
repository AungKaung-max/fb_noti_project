const {
  getPostsController,
  createPostsController,
  deletePostsController,
  updatePostsController,
  getPostsControllerId,
} = require("../controllers/postControllers");

const upload = require("../middlewares/uploadMiddleware");

const express = require("express");

const router = express.Router();

router.get("/posts", getPostsController);

router.get("/posts/:id", getPostsControllerId);

router.post("/posts", upload, createPostsController);

router.delete("/posts/:id", deletePostsController);

router.put("/posts/:id", upload, updatePostsController);

module.exports = router;
