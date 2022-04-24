const mongoose = require('mongoose')
const objectID = mongoose.Types.ObjectId

const CourseSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    authors: [{ type: objectID, ref: 'User', required: true }],
    price: { type: Number, required: true },
    preview_video: { type: String, default: './videos/default_preview.smth' },
    // publishing_date: { type: Date, required: true },
    // publisher: { type: String, required: true },

    // rating

    language: { type: String, required: true },
    created_at: { type: Date, default: Date.now() },
    updated_at: { type: Date, default: Date.now() },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
)

CourseSchema.virtual('sections', {
  ref: 'Section',
  localField: '_id',
  foreignField: 'course',
})

CourseSchema.virtual('reviews', {
  ref: 'Review',
  localField: '_id',
  foreignField: 'course',
})

const Course = mongoose.model('Course', CourseSchema)

module.exports = Course
