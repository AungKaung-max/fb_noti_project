const mongoose = require("mongoose");
const config = require("../config/config");

const connect = async () => {
  try {
    await mongoose.connect(config.mongoURI);
    console.log("mongo db connected");
  } catch (error) {
    console.log(error.message);
  }
};
module.exports = connect;
