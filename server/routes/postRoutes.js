const {
  getPostsController,
  createPostsController,
  deletePostsController,
  updatePostsController,
  getPostsControllerId,
  likePostsController,
} = require("../controllers/postControllers");

const upload = require("../middlewares/uploadMiddleware");
const authenticateJWT = require("../middlewares/authenticateJWT");

const express = require("express");

const router = express.Router();

router.get("/posts", getPostsController);

router.get("/posts/:id", getPostsControllerId);

router.post("/posts", authenticateJWT, upload, createPostsController);

router.put("/posts/:id/like", authenticateJWT, likePostsController);

router.delete("/posts/:id", authenticateJWT, deletePostsController);

router.put("/posts/:id", authenticateJWT, upload, updatePostsController);

module.exports = router;
