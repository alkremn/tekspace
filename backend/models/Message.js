const { Schema, model } = require('mongoose');

const messageSchema = new Schema({
  sender: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  message: {
    type: String,
    required: true,
  },
  timestamp: {
    type: String,
    required: true,
    default: Date.now(),
  },
});

module.exports = model('Message', messageSchema);
