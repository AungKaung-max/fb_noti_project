const postServices = require("../services/postServices");
const fs = require("fs");

const getPostsController = async (req, res) => {
  try {
    const posts = await postServices.getAllPosts();
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createPostsController = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { title, content } = req.body;
    const image = req.file;

    if (!image) {
      return res.status(400).json({ message: "Image is required" });
    }
    const body = {
      userId,
      title,
      content,
      image: {
        data: image.buffer.toString("base64"), // Save image as Base64 string
        contentType: image.mimetype,
      },
    };
    console.log(body);
    const post = await postServices.createPosts(body);
    return res.status(200).json(post);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const deletePostsController = async (req, res) => {
  try {
    const id = req.params.id;
    const post = await postServices.deletePosts(id);
    return res.status(200).json(post);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const updatePostsController = async (req, res) => {
  try {
    const id = req.params.id;
    const body = {
      title: req.body.title,
      content: req.body.content,
      image: {
        data: req.file.buffer.toString("base64"),
        contentType: req.file.mimetype,
      },
    };
    const post = await postServices.updatePosts(id, body);
    return res.status(200).json(post);
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

const getPostsControllerId = async (req, res) => {
  try {
    const id = req.params.id;
    const post = await postServices.getPostsById(id);
    return res.status(200).json(post);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const likePostsController = async (req, res) => {
  try {
    const userId = req.user.userId;
    const postId = req.params.id;
    const post = await postServices.likePosts(userId, postId);
    return res.status(200).json(post);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const dislikePostsController = async (req, res) => {
  try {
    const userId = req.user.userId;
    const postId = req.params.id;
    const post = await postServices.dislikePosts(userId, postId);
    return res.status(200).json(post);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getPostsController,
  createPostsController,
  deletePostsController,
  updatePostsController,
  getPostsControllerId,
  likePostsController,
  dislikePostsController,
};
