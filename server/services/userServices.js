const UserModel = require("../model/userModel");
const bcrypt = require("bcryptjs");

const login = async () => {
  return await UserModel.find();
};

const register = async (username, email, password) => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  console.log(hashedPassword);
  return await UserModel.create({ username, email, password: hashedPassword });
};

module.exports = {
  login,
  register,
};
