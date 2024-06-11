const postServices = require("../services/postServices");

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
    const body = req.body;
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
    const body = req.body;
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

module.exports = {
  getPostsController,
  createPostsController,
  deletePostsController,
  updatePostsController,
  getPostsControllerId,
};
