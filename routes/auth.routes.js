const express = require("express");
const {
  registerController,
  loginController,
  logoutController,
} = require("../controllers/auth.controllers");

const authRouter = express.Router();

// login route
authRouter.post("/register", registerController);
authRouter.post("/login", loginController);
authRouter.post("/logout", logoutController);

module.exports = authRouter;
