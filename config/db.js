const mongoose = require("mongoose");
const config = require("./config");
const colors = require("colors");

const mongoConn = async () => {
  try {
    const conn = await mongoose.connect(config.MONGO_URL);
    console.log(`Mongodb connected ${conn.connection.host}`.bgGreen);
  } catch (error) {
    console.log(`Error while connecting the Mongodb ${error}`.bgRed);
  }
};
module.exports = mongoConn;
