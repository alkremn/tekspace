const asyncHandler = require('express-async-handler');
const Category = require('../models/Category');
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

exports.updateSolution = asyncHandler(async (req, res) => {
  const solutionId = req.body._id;
  console.log(req.body._id);
  try {
    const udpatedSolution = await Solution.findByIdAndUpdate(
      solutionId,
      req.body,
      {
        new: true,
      }
    );
    if (!udpatedSolution) {
      res.status(500);
      throw new Error('Internal Server error');
    }
    res.json(udpatedSolution);
  } catch (error) {
    res.status(500);
    throw new Error(error);
  }
});

exports.removeSolution = asyncHandler(async (req, res) => {
  const solutionId = req.params.id;
  let response = {};
  try {
    const { categoryId } = await Solution.findById(solutionId);
    const otherSolutions = await Solution.find({ categoryId });
    if (otherSolutions.length === 1) {
      const category = await Category.findByIdAndDelete(categoryId);
      response.categoryId = category._id;
    }
    const solution = await Solution.findByIdAndDelete(solutionId);
    response.solutionId = solution._id;
    res.status(201).json(response);
  } catch (error) {
    res.status(500);
    throw new Error(error);
  }
});
