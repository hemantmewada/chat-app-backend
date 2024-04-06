const jsonwebtoken = require("jsonwebtoken");
const config = require("../config/config");
const User = require("../models/user.model");

const protectRoute = async (req, res, next) => {
  try {
    const token = await req.cookies.jwt;
    if (!token) {
      return res.status(401).send({
        status: false,
        message: "Unauthorized - No token were provided.",
      });
    }
    const decoded = await jsonwebtoken.verify(token, config.JWT_SECRET);

    if (!decoded) {
      return res.status(401).send({
        status: false,
        message: "Unauthorized - Invalid token.",
      });
    }
    const user = await User.findById(decoded.userId).select("-password");
    if (!user) {
      return res.status(404).send({
        status: false,
        message: "User not found.",
      });
    }
    req.userInfo = user;
    next();
  } catch (error) {
    return res.status(500).send({
      status: false,
      message: `Error in protectRoute middleware ${error}`,
      error,
    });
  }
};

module.exports = { protectRoute };
