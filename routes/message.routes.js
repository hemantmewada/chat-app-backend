const express = require("express");
const {
  sendMessageController,
  getMessageController,
} = require("../controllers/message.controllers");
const { protectRoute } = require("../middlewares/auth.middlewares");

const messageRouter = express.Router();

messageRouter.post("/send/:id", protectRoute, sendMessageController);
messageRouter.get("/:id", protectRoute, getMessageController);

module.exports = messageRouter;
