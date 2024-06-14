const PostModel = require("../model/postModel");

const getAllPosts = async () => {
  return await PostModel.find().sort({ _id: -1 });
};

const createPosts = async (data) => {
  const posts = await PostModel.create(data);
  return await posts;
};

const deletePosts = async (id) => {
  const posts = await PostModel.findByIdAndDelete(id);
  return await posts;
};

const updatePosts = async (id, data) => {
  const posts = await PostModel.findByIdAndUpdate(id, data);
  return await posts;
};

const getPostsById = async (id) => {
  const posts = await PostModel.findById(id);
  return await posts;
};
module.exports = {
  getAllPosts,
  createPosts,
  deletePosts,
  updatePosts,
  getPostsById,
};
