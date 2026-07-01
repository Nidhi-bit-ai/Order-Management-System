require("dotenv").config();

const app = require("./app");

const PORT = process.env.PORT || 5000;

app.listen(5000, () => {
  console.log("API Gateway running on port 5000");
});