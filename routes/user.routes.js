const express = require("express");
const { getUsersController } = require("../controllers/user.controllers");
const { protectRoute } = require("../middlewares/auth.middlewares");

const userRouter = express.Router();

userRouter.get("/", protectRoute, getUsersController);

module.exports = userRouter;
