const dotenv = require("dotenv");
dotenv.config();

const config = {
  PORT: String(process.env.PORT),
  MONGO_URL: String(process.env.MONGO_URL),
  JWT_SECRET: String(process.env.JWT_SECRET),
  FRONTEND_URI: String(process.env.FRONTEND_URI),
};
module.exports = config;
