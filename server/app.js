require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongodbConnection = require("./db/index");
const config = require("./config/config");
const postRoutes = require("./routes/postRoutes");
const userRoutes = require("./routes/userRoutes");

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

mongodbConnection();

app.use("/api", postRoutes);
app.use("/api", userRoutes);

module.exports = app;
