const asyncHandler = require('express-async-handler');
const Solution = require('../models/Solution');

exports.getSolutions = asyncHandler(async (req, res) => {
  try {
    const solutions = await Solution.find({});
    res.json(solutions);
  } catch (error) {
    res.status(500);
    throw new Error('Internal Server Error');
  }
});

exports.createSolution = asyncHandler(async (req, res) => {
  const { title, description, categoryId, createdBy } = req.body;

  if (!title || !description || !categoryId || !createdBy) {
    res.status(400);
    throw new Error('Bad request');
  }
  try {
    const createdSolution = await Solution.create(req.body);
    res.json(createdSolution);
  } catch (error) {
    res.status(500);
    throw new Error('Internal Server Error');
  }
});
