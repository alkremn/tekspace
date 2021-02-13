const asyncHandler = require('express-async-handler');
const Message = require('../models/Message');

exports.getMessages = asyncHandler(async (req, res) => {
  try {
    const messages = await Message.find({});
    res.json(messages);
  } catch (error) {
    res.status(500);
    throw new Error('Internal server error');
  }
});
