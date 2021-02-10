const User = require('../models/User');
const { asyncHandler } = require('express-async-handler');

const protect = asyncHandler(async (req, res, next) => {});

module.exports = {
  protect,
};
