const asyncHandler = require('express-async-handler');
const Case = require('../models/Case');

exports.getCases = asyncHandler(async (req, res) => {
  try {
    const cases = await Case.find({}).populate(
      'createdBy assignedTo',
      'name photoUrl'
    );
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
    });
    await newCase.save();
    const populatedCase = await Case.findById(newCase._id).populate(
      'createdBy',
      'name photoUrl'
    );
    res.json(populatedCase);
  } catch (error) {
    res.status(500);
    throw new Error('error');
  }
});

exports.updateCase = asyncHandler(async (req, res) => {
  const { caseId, status, assignedTo } = req.body;
  try {
    await Case.findByIdAndUpdate(caseId, {
      status: status,
      assignedTo: assignedTo,
    });
    res.status(201).json({ message: 'Success' });
  } catch (error) {
    console.log(error);
    res.status(500);
    throw new Error(error);
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
