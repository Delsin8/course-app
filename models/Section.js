const mongoose = require('mongoose')
const objectID = mongoose.Types.ObjectId

const SectionSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    difficulty: {
      type: String,
      enum: ['Beginner', 'Intermediate', 'Advanced', 'Expert', 'All levels'],
      required: true,
    },
    course: { type: objectID, ref: 'Course', required: true },
    created_at: { type: Date, default: Date.now() },
    updated_at: { type: Date, default: Date.now() },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
)

SectionSchema.virtual('lessons', {
  ref: 'Lesson',
  localField: '_id',
  foreignField: 'section',
})

const Section = mongoose.model('Section', SectionSchema)

module.exports = Section
