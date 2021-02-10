const { Schema, model } = require('mongoose');

const solutionSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    categoryId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'category',
    },
    images: {
      type: [String],
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'user',
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model('Solution', solutionSchema);
