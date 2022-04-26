const mongoose = require('mongoose')
const objectID = mongoose.Types.ObjectId

const QuestionSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    body: { type: String, required: true },
    user: { type: objectID, ref: 'User', required: true },
    // course: { type: objectID, ref: 'Course', required: true },
    lesson: { type: objectID, ref: 'Lesson', required: true },
    created_at: { type: Date, default: Date.now() },
    updated_at: { type: Date, default: Date.now() },
  },
  { toJSON: { virtuals: true }, toObject: { virtuals: true } }
)

QuestionSchema.virtual('answers', {
  ref: 'Answer',
  localField: '_id',
  foreignField: 'question',
})

const Question = mongoose.model('Question', QuestionSchema)

module.exports = Question
