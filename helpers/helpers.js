const bcryptjs = require("bcryptjs");
const jsonwebtoken = require("jsonwebtoken");
const config = require("../config/config");

const hashedPassword = async (password) => {
  try {
    const hashedPassword = await bcryptjs.hash(password, 10);
    return hashedPassword;
  } catch (error) {
    console.log(`Error in hashedPassword function ${error}`);
  }
};
const comparePassword = async (password, hashedPassword) => {
  try {
    const isValid = await bcryptjs.compare(password, hashedPassword);
    return isValid;
  } catch (error) {
    console.log(`Error in comparePassword function ${error}`);
  }
};

const generateJWT = async (user, res) => {
  try {
    const jwt = await jsonwebtoken.sign(
      { userId: user._id },
      config.JWT_SECRET,
      { expiresIn: "30d" }
    );
    // return jwt;
    res.cookie("jwt", jwt, {
      maxAge: 30 * 24 * 60 * 60 * 1000, // miliseconds
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV != "development",
    });
  } catch (error) {
    console.log(`Error in generateJWT function ${error}`);
  }
};

module.exports = { hashedPassword, generateJWT, comparePassword };
