const {
  getNotification,
  getMarkAsRead,
} = require("../controllers/notificationController");

const authenticateJWT = require("../middlewares/authenticateJWT");

const express = require("express");

const router = express.Router();
router.get("/notifications", authenticateJWT, getNotification);
router.put("/notifications/markAsRead", authenticateJWT, getMarkAsRead);

module.exports = router;
