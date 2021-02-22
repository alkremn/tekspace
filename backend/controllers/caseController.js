const asyncHandler = require('express-async-handler');
const Case = require('../models/Case');

exports.getCases = asyncHandler(async (req, res) => {
  try {
    const cases = await Case.find({});
    res.json(cases);
  } catch (error) {
    res.status(500);
    throw new Error('Internal Server Error');
  }
});

exports.createCase = asyncHandler(async (req, res) => {
  try {
    const newCase = new Case({
      ...req.body,
      createdBy: req.user._id,
    });
    await newCase.save();
    res.json(newCase);
  } catch (error) {
    res.status(500);
    throw new Error('error');
  }
});

exports.updateCase = asyncHandler(async (req, res) => {
  const { caseId, status } = req.body;
  try {
    await Case.findByIdAndUpdate(caseId, { status: status });
    res.status(201);
  } catch (error) {
    console.log(error);
    res.status(500);
    throw new Error('Unable to update case');
  }
});

exports.removeCase = asyncHandler(async (req, res) => {
  const caseId = req.params.id;
  try {
    const removedCase = await Case.findByIdAndDelete(caseId);
    res.status(201).json(removedCase);
  } catch (error) {
    res.status(500);
    throw new Error(error);
  }
});
