const multer = require("multer");

const storage = multer.memoryStorage(); // Store files in memory (adjust as needed)
const upload = multer({ storage });
module.exports = upload.single("image");
