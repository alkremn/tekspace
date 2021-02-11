const asyncHandler = require('express-async-handler');
const User = require('../models/User');
const { generateToken } = require('../utils/generateToken');

// @desc    POST Login User
// @route   /api/users/login
// @access  Public

exports.loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user && (await user.comparePassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      isAdmin: user.isAdmin,
      photoUrl: user.photoUrl,
      isSecond: user.isSecond,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error('Invalid email or password');
  }
});

// @desc    Logout user
// @route   /api/users/
// @access  Private
exports.logoutUser = asyncHandler(async (req, res) => {});

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
