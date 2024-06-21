const mongoose = require("mongoose");
const config = require("../config/config");

const connect = async () => {
  try {
    await mongoose.connect(config.mongoURI);
    if (!config.mongoURI) {
      console.error("MongoDB URI is missing. Please add it to your .env file.");
    }
    console.log("mongo db connected");
  } catch (error) {
    console.log(error.message);
  }
};
module.exports = connect;
