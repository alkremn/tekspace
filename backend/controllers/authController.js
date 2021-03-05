const asyncHandler = require('express-async-handler');
const User = require('../models/User');
const { generateToken } = require('../utils/generateToken');
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// @desc    POST Login User
// @route   /api/auth/login
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

// @desc    Post Login user with Google account
// @route   /api/auth/google
// @access  Public
exports.loginWithGoogle = asyncHandler(async (req, res) => {
  const { token } = req.body;
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: process.env.GOOGLE_CLIENT_ID,
  });
  const { name, email, picture } = ticket.getPayload();

  const user = await User.findOne({ gmail: email });
  if (user) {
    if(!user.photoUrl){
      user.photoUrl = picture;
      await user.save();
    }
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
    throw new Error('User does not exist');
  }
});
