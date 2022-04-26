const mongoose = require('mongoose')
const objectID = mongoose.Types.ObjectId

const AnswerSchema = new mongoose.Schema({
  body: { type: String, required: true },
  user: { type: objectID, ref: 'User', required: true },
  // course: { type: objectID, ref: 'Course', required: true },
  question: { type: objectID, ref: 'Answer', required: true },
  created_at: { type: Date, default: Date.now() },
  updated_at: { type: Date, default: Date.now() },
})

const Answer = mongoose.model('Answer', AnswerSchema)

module.exports = Answer
