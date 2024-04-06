const express = require("express");
const dotenv = require("dotenv");
const colors = require("colors");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const authRouter = require("./routes/auth.routes");
const config = require("./config/config");
const mongoConn = require("./config/db");
const messageRouter = require("./routes/message.routes");
const userRouter = require("./routes/user.routes");
// dotenv configuration
dotenv.config();
const PORT = config.PORT || 3002;

// create a server
const app = express();

// middlewares
app.use(cors());
app.use(express.json());
app.use(cookieParser());

// home route
app.get("/", (req, res) => {
  return res.json({
    status: true,
    message: `This domains api is managed by @hemantmewada`,
  });
});

// other routes
app.use("/api/auth", authRouter);
app.use("/api/messages", messageRouter);
app.use("/api/users", userRouter);

mongoConn().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`.bgGreen);
  });
});
