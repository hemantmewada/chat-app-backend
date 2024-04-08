const express = require("express");
const {
  sendMessageController,
  getMessageController,
} = require("../controllers/message.controllers");
const { protectRoute } = require("../middlewares/auth.middlewares");

const messageRouter = express.Router();

messageRouter.post("/send/:id", protectRoute, sendMessageController); // :id is whom do you want to send the message
messageRouter.get("/:id", protectRoute, getMessageController); // :id is whose messages you want to retrieve

module.exports = messageRouter;
