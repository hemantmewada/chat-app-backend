const Conversation = require("../models/conversation.model");
const Message = require("../models/message.model");

const sendMessageController = async (req, res) => {
  try {
    const { id: receiverId } = req.params;
    const { message } = req.body;
    const senderId = req.userInfo._id;
    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    });

    if (!conversation) {
      conversation = await Conversation.create({
        participants: [senderId, receiverId],
      });
    }

    const newMessage = Message({
      senderId,
      receiverId,
      message,
    });
    if (newMessage) {
      conversation.messages.push(newMessage._id);
    }

    // socket.io functionility will goes here

    // await conversation.save();
    // await newMessage.save();

    // this will be running in parallel
    await Promise.all([conversation.save(), newMessage.save()]);

    return res.status(201).send({
      status: true,
      message: `message sent.`,
      newMessage,
    });
  } catch (error) {
    return res.status(500).send({
      status: false,
      message: `Error in sendMessageController api ${error}`,
      error,
    });
  }
};

const getMessageController = async (req, res) => {
  try {
    const { id: userToChatId } = req.params;
    const senderId = req.userInfo._id;

    const conversation = await Conversation.findOne({
      participants: { $all: [senderId, userToChatId] },
    }).populate("messages");
    if (conversation) {
      const messages = conversation.messages;
      return res.status(200).send({
        status: true,
        message: `Messages.`,
        data: messages,
      });
    } else {
      return res.status(200).send({
        status: true,
        message: `Messages.`,
        data: [],
      });
    }
  } catch (error) {
    return res.status(500).send({
      status: false,
      message: `Error in getMessageController api ${error}`,
      error,
    });
  }
};

module.exports = { sendMessageController, getMessageController };
