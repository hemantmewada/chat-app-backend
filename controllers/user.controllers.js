const User = require("../models/user.model");

const getUsersController = async (req, res) => {
  try {
    const users = await User.find({
      //   _id: { $nin: { _id: [req.userInfo._id] } },
      _id: { $ne: req.userInfo._id },
    }).select("-password");
    if (users) {
      return res.status(200).send({
        status: true,
        message: "Users.",
        data: users,
      });
    } else {
      return res.status(200).send({
        status: true,
        message: "Users.",
        data: [],
      });
    }
  } catch (error) {
    return res.status(500).send({
      status: false,
      message: `Error in getUsersController api ${error}`,
    });
  }
};
module.exports = { getUsersController };
