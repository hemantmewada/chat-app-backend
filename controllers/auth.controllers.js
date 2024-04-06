const {
  hashedPassword,
  generateJWT,
  comparePassword,
} = require("../helpers/helpers");
const User = require("../models/user.model");

const registerController = async (req, res) => {
  try {
    const { fullName, username, password, confirmPassword, gender } = req.body;
    if (password != confirmPassword) {
      return res.status(400).send({
        status: false,
        message: "Passwords didn't match.",
      });
    }
    const user = await User.findOne({ username });
    if (user) {
      return res.status(400).send({
        status: false,
        message: `Username already exists.`,
      });
    }
    req.body.password = await hashedPassword(password);
    req.body.profile = `https://avatar.iran.liara.run/public/${
      gender == "male" ? "boy" : "girl"
    }?username=${username}`;
    let savedUser = new User(req.body);
    savedUser = await savedUser.save();
    if (savedUser) {
      // generate jwt
      // const token = await generateJWT(savedUser);
      await generateJWT(savedUser, res);
      return res.status(201).json({
        status: true,
        message: `Your registration has been successful.`,
        // token,
        data: savedUser,
      });
    } else {
      return res.status(400).json({
        status: false,
        message: `Registration failed.`,
      });
    }
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: `Error in registerController api ${error}`,
      error,
    });
  }
};
const loginController = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    const isPasswordValid = await comparePassword(
      password,
      user?.password || ""
    );
    if (!user || !isPasswordValid) {
      return res.status(400).send({
        status: false,
        message: `Invalid username or password.`,
      });
    }
    await generateJWT(user, res);
    return res.status(200).json({
      status: true,
      message: `Login successful.`,
      data: user,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: `Error in loginController api ${error}`,
      error,
    });
  }
};
const logoutController = (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    return res.status(200).json({
      status: true,
      message: `Logout successful.`,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: `Error in logoutController api ${error}`,
      error,
    });
  }
};

module.exports = { registerController, loginController, logoutController };
