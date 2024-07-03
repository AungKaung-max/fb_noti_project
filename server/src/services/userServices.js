const UserModel = require("../model/userModel");
const bcrypt = require("bcryptjs");
const config = require("../config/config");
const jwt = require("jsonwebtoken");

const login = async (data) => {
  const user = await UserModel.findOne({
    $and: [{ username: data.username }, { email: data.email }],
  });
  if (!user || !(await bcrypt.compare(data.password, user.password))) {
    throw new Error("Invalid username/email or password");
  }
  const payload = { userId: user._id };
  const token = jwt.sign(payload, config.jwtSecret, {
    expiresIn: "30days",
  });
  return {
    token,
    payload,
  };
};

const register = async (username, email, password) => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  console.log(hashedPassword);
  return await UserModel.create({ username, email, password: hashedPassword });
};

const getUserName = async (id) => {
  const username = await UserModel.findById(id);
  return username;
};

const getAllUsers = async () => {
  try {
    const users = await UserModel.find({}, "username");
    return users;
  } catch (error) {
    throw new Error("Error fetching users: " + error.message);
  }
};

module.exports = {
  login,
  register,
  getUserName,
  getAllUsers,
};
