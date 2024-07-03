const NotificationModel = require("../model/notificationModel");

const createNotifications = async (data) => {
  const notification = NotificationModel(data);
  return await notification.create();
};

const getAllNotifications = async () => {
  return await NotificationModel.find({}).sort({ createdAt: -1 });
};

const markNotificationsAsRead = async (userId) => {
  return await NotificationModel.updateMany(
    { userId: userId, read: false },
    { $set: { read: true } }
  );

  const getAllUserIdsExcept = async (currentUserId) => {
    const users = await User.find({ _id: { $ne: currentUserId } }).select(
      "_id"
    );
    return users.map((user) => user._id);
  };
};

module.exports = {
  createNotifications,
  getAllNotifications,
  markNotificationsAsRead,
};
