const config = require("./src/config/config");
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongodbConnection = require("./src/db/index");
const postRoutes = require("./src/routes/postRoutes");
const userRoutes = require("./src/routes/userRoutes");

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

mongodbConnection();

app.use("/api", postRoutes);
app.use("/api", userRoutes);
app.get("/", (req, res) => {
  res.status(200).json({ data: "Welcome from api" });
});

const PORT = config.port || 4000;

app.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}`);
});
