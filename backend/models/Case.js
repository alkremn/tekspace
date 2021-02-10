const { Schema, model } = require('mongoose');

const caseSchema = new Schema(
  {
    caseNumber: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    updatedDate: {
      type: String,
      required: true,
      default: Date.now(),
    },
    finishedDate: {
      type: String,
    },
    assignedTo: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    status: {
      type: String,
      enum: ['new', 'inProgress', 'completed'],
      default: 'new',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model('Case', caseSchema);
