const { Schema, model } = require('mongoose');

const userSchema = new Schema({
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
    unique: true,
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
  createdDate: {
    type: String,
    required: true,
    default: Date.now(),
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'user',
  },
  updatedDate: {
    type: String,
    required: true,
    default: Date.now(),
  },
  updatedBy: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'user',
  },
});

module.exports = model('User', userSchema);
