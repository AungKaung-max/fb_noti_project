const { Server } = require("socket.io");
let io;
let userSocketMap = new Map();

const initializeSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: ["http://localhost:5173", "http://127.0.0.1:5500"],
    },
  });

  io.on("connection", (socket) => {
    console.log(`User connected: ${socket.id}`);

    socket.on("registerUser", (userId) => {
      if (userSocketMap.has(userId)) {
        userSocketMap.get(userId).push(socket.id);
      } else {
        userSocketMap.set(userId, [socket.id]);
      }

      console.log(`User registered: ${userId} with socket id: ${socket.id}`);
      console.log(
        "Current userSocketMap:",
        Array.from(userSocketMap.entries())
      );
    });

    socket.on("disconnect", () => {
      console.log(`User disconnected with socket id: ${socket.id}`);
      for (let [userId, socketIds] of userSocketMap.entries()) {
        const index = socketIds.indexOf(socket.id);
        console.log(index);
        if (index !== -1) {
          socketIds.splice(index, 1);
          if (socketIds.length === 0) {
            userSocketMap.delete(userId);
          } else {
            userSocketMap.set(userId, socketIds);
          }
          console.log(`Removed socket id: ${socket.id} for user: ${userId}`);
          break;
        }
      }
    });
  });

  return io;
};

const getSocket = () => {
  if (!io) {
    throw new Error("Socket.io not initialized");
  }
  return io;
};

const getUserSocketId = (userId) => {
  return userSocketMap.get(userId) || [];
};
module.exports = { initializeSocket, getSocket, getUserSocketId };
