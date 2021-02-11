const asyncHandler = require('express-async-handler');
const User = require('../models/User');

// @desc    GET all users
// @route   /api/users/
// @access  Private

exports.getUsers = asyncHandler(async (req, res) => {
  try {
    const users = await User.find({}).select('-password');
    res.json(users);
  } catch (error) {
    res.status(500);
    throw new Error('Internal server error');
  }
});
