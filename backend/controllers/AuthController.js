const User = require('../models/User');
const asyncHandler = require('express-async-handler');
const { generateToken } = require('../utils/generateToken');

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user && (await user.comparePassword(password))) {
    console.log(user._id);
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

module.exports = {
  login,
};
