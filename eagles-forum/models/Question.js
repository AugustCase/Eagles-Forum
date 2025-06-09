const mongoose = require('mongoose');
const questionSchema = new mongoose.Schema({
  userId: String,
  category: String,
  questionText: String,
  createdAt: { type: Date, default: Date.now }
});
module.exports = mongoose.model('Question', questionSchema);
