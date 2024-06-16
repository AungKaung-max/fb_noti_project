const userServices = require("../services/userServices");

const loginUsersController = async (req, res) => {
  try {
    const users = await userServices.login();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createUsersController = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const users = await userServices.register(username, email, password);
    return res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { loginUsersController, createUsersController };
