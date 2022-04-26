const mongoose = require('mongoose')
const objectID = mongoose.Types.ObjectId

const LessonSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    duration: { type: Number, required: true },
    section: { type: objectID, ref: 'Section', required: true },
    created_at: { type: Date, default: Date.now() },
    updated_at: { type: Date, default: Date.now() },
  },
  { toJSON: { virtuals: true }, toObject: { virtuals: true } }
)

LessonSchema.virtual('questions', {
  ref: 'Question',
  localField: '_id',
  foreignField: 'lesson',
})

const Lesson = mongoose.model('Lesson', LessonSchema)

module.exports = Lesson
