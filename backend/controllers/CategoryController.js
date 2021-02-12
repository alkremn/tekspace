const asyncHandler = require('express-async-handler');
const Category = require('../models/Category');

// @desc    GET all categories
// @route   /api/categories/
// @access  Private

exports.getCategories = asyncHandler(async (req, res) => {
  try {
    const categories = await Category.find({});
    res.json(categories);
  } catch (error) {
    res.status(500);
    throw new Error('Internal server error');
  }
});

exports.createCategory = asyncHandler(async (req, res) => {
  if (!req.body.title) {
    res.status(400);
    throw new Error('Bad request');
  }
  const { title } = req.body;

  try {
    const result = await Category.create({
      title,
    });
    res.status(201).json(result);
  } catch (error) {
    res.status(500);
    throw new Error('Internal server error');
  }
});
