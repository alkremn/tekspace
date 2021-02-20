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
    throw new Error('Unable to create case');
  }
});

exports.updateCase = asyncHandler(async (req, res) => {
  const caseId = req.body._id;
  console.log(caseId);
  try {
    const updatedCase = await Case.findByIdAndUpdate(caseId, req.body, {
      new: true,
    });
    res.json(updatedCase);
  } catch (error) {
    res.status(500);
    throw new Error('Unable to update case');
  }
});
