const PostModel = require("../model/postModel");

const getAllPosts = async () => {
  return await PostModel.find().sort({ _id: -1 });
};

const createPosts = async (data) => {
  const posts = await PostModel.create(data);

  return posts;
};

const deletePosts = async (id) => {
  const posts = await PostModel.findByIdAndDelete(id);
  return posts;
};

const updatePosts = async (id, data) => {
  const posts = await PostModel.findByIdAndUpdate(id, data);
  return posts;
};

const getPostsById = async (id) => {
  const posts = await PostModel.findById(id);
  return posts;
};

const likePosts = async (userId, postId) => {
  const post = await PostModel.findByIdAndUpdate(
    postId,
    { $push: { likers: userId } },
    { new: true }
  );
  return post;
};

const dislikePosts = async (userId, postId) => {
  const post = await PostModel.findByIdAndUpdate(
    postId,
    { $pull: { likers: userId } },
    { new: true }
  );
  return { post, likersCount: post.likers.length };
};

module.exports = {
  getAllPosts,
  createPosts,
  deletePosts,
  updatePosts,
  getPostsById,
  likePosts,
  dislikePosts,
};
