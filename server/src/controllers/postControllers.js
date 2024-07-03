const postServices = require("../services/postServices");
const userServices = require("../services/userServices");
const notificationServices = require("../services/notificationServices");
const { getSocket, getUserSocketId } = require("../socket/socket");

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
    // console.log(body);
    const post = await postServices.createPosts(body);
    const user = await userServices.getUserName(userId);
    const postWithUsername = {
      ...post._doc,
      username: user.username,
    };
    const io = getSocket();
    const creatorSocketId = getUserSocketId(userId);
    if (!creatorSocketId) {
      console.error(`No socket ID found for user: ${userId}`);
    }
    io.sockets.sockets.forEach((socket) => {
      if (!creatorSocketId.includes(socket.id)) {
        socket.emit("newPost", postWithUsername);
      }
    });
    return res.status(200).json(postWithUsername);
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
    const { title, content, existingImage } = req.body;
    const image = req.file;

    let body = {
      title,
      content,
    };

    if (image) {
      body.image = {
        data: image.buffer.toString("base64"),
        contentType: image.mimetype,
      };
    } else if (existingImage) {
      body.image = existingImage;
    }

    console.log(body);
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
