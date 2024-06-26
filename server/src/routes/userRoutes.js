const {
  loginUsersController,
  createUsersController,
} = require("../controllers/userControllers");

const express = require("express");

const router = express.Router();

router.post("/users/login", loginUsersController);
router.post("/users/register", createUsersController);

module.exports = router;
