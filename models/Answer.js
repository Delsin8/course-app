const mongoose = require('mongoose')
const objectID = mongoose.Types.ObjectId

const AnswerSchema = new mongoose.Schema({
  body: { type: String, required: true, maxlength: 400 },
  user: { type: objectID, ref: 'User', required: true },
  question: { type: objectID, ref: 'Answer', required: true },
  created_at: { type: Date, default: Date.now() },
  updated_at: { type: Date, default: Date.now() },
})

const Answer = mongoose.model('Answer', AnswerSchema)

module.exports = Answer
