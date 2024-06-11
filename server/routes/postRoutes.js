const {
  getPostsController,
  createPostsController,
  deletePostsController,
  updatePostsController,
  getPostsControllerId,
} = require("../controllers/postControllers");

const express = require("express");

const router = express.Router();

router.get("/posts", getPostsController);

router.get("/posts/:id", getPostsControllerId);

router.post("/posts", createPostsController);

router.delete("/posts/:id", deletePostsController);

router.patch("/posts/:id", updatePostsController);

module.exports = router;
