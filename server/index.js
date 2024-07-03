<<<<<<< HEAD
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const http = require("http");
const mongodbConnection = require("./src/db/index");
const postRoutes = require("./src/routes/postRoutes");
const userRoutes = require("./src/routes/userRoutes");
const config = require("./src/config/config");
const { initializeSocket } = require("./src/socket/socket");
=======
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
>>>>>>> fbc0fffddc13a9b293928087a7d064dbccdf1d1f

const PORT = config.port || 4000;

const app = express();
const server = http.createServer(app);
initializeSocket(server);
app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:5173", "http://127.0.0.1:5500"],
  })
);

app.use(express.urlencoded({ extended: true }));

mongodbConnection();

app.use("/api", postRoutes);
app.use("/api", userRoutes);

server.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}`);
});
