const NotificationServices = require("../services/notificationServices");

const getNotification = async (req, res) => {
  try {
    const notifications = await NotificationServices.getAllNotifications();
    return res.status(200).json(notifications);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

const getMarkAsRead = async (req, res) => {
  try {
    const userId = req.user.userId;
    const notifications = await NotificationServices.markNotificationsAsRead(
      userId
    );
    return res.status(200).json(notifications);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

module.exports = { getNotification, getMarkAsRead };
