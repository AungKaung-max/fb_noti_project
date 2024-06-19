const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },

  // token: {
  //   type: String,
  //   required: true,
  //   default: "",
  // },
});

const userModel = mongoose.model("User", UserSchema);

module.exports = userModel;
