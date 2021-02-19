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
    images: {
      type: [String],
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'user',
    },
    category: {
      _id: {
        type: String,
        required: true,
      },
      title: {
        type: String,
        required: true,
      },
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model('Solution', solutionSchema);
