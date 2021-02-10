const { Schema, model } = require('mongoose');

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    gmail: {
      type: String,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
    isSecond: {
      type: Boolean,
      required: true,
      default: false,
    },
    photoUrl: {
      type: String,
    },
    // createdBy: {
    //   type: Schema.Types.ObjectId,
    //   ref: 'user',
    // },
    updatedDate: {
      type: String,
      required: true,
      default: Date.now(),
    },
    // updatedBy: {
    //   type: Schema.Types.ObjectId,
    //   ref: 'user',
    // },
  },
  {
    timestamps: true,
  }
);

module.exports = model('User', userSchema);
