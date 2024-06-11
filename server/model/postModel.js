const mongoose = require("mongoose");

const PostSchema = mongoose.Schema({
  // userId: { type: String, required: true },
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  // photo: {
  //   type: String,
  //   required: true,
  // },
  // likers: {
  //   type: [String],
  //   default: [],
  // },
});

const PostModel = mongoose.model("fb_post", PostSchema);

module.exports = PostModel;
