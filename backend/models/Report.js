const { Schema, model } = require('mongoose');

const reportSchema = new Schema({
  agents: {
    type: [String],
  },
  yearTotalCalls: Number,
  weekTotalCalls: Number,
  callsPerWeek: [Number],
  casesPerWeek: [Number],
  weekUtilization: [Number],
  yearCallCount: {
    currentYear: [Number],
    max: [Number],
    avg: [Number],
  },
});

module.exports = model('Report', reportSchema);
