const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  tags: {
    type: Array,
  },
});

module.exports = mongoose.model('note', noteSchema);
