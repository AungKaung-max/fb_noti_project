require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongodbConnection = require("./db/index");
const config = require("./config/config");
const postRoutes = require("./routes/postRoutes");

const app = express();
app.use(express.json());
app.use(cors());

mongodbConnection();

app.use("/api", postRoutes);

module.exports = app;
