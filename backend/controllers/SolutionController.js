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
  try {
    const newSolution = await Solution.create(req.body);
    res.status(201).json(newSolution);
  } catch (error) {
    res.status(500);
    throw new Error('Unable to create solution');
  }
});

exports.removeSolution = asyncHandler(async (req, res) => {});
