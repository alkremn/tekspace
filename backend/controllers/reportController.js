const asyncHandler = require('express-async-handler');
const Report = require('../models/Report');
exports.getReport = asyncHandler(async (req, res) => {
  try {
    const report = await Report.findOne({});
    res.json(report);
  } catch (err) {
    console.log(err);
  }
});

exports.createReport = asyncHandler(async (req, res) => {
  try {
    const report = new Report(req.body);
    await report.save();
    //res.json(report);
  } catch (err) {
    console.log(err);
  }
});
