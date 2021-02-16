const asyncHandler = require('express-async-handler');
const Message = require('../models/Message');

exports.getMessages = asyncHandler(async (req, res) => {
  try {
    const messages = await Message.find()
      .populate('sender', 'name photoUrl')
      .exec();
    res.json(messages);
  } catch (error) {
    res.status(500);
    throw new Error(error);
  }
});
