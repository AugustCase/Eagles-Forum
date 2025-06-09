const mongoose = require('mongoose');
const answerSchema = new mongoose.Schema({
  userId: String,
  questionId: String,
  answerText: String,
  createdAt: { type: Date, default: Date.now }
});
module.exports = mongoose.model('Answer', answerSchema);