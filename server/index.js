const app = require("./app");
require("dotenv").config();
const config = require("./src/config/config");

const PORT = config.port || 4000;

app.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}`);
});
