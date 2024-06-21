const app = require("./app");
require("dotenv").config();
const config = require("./config/config");

const PORT = config.port || 4000;

app.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}`);
});
