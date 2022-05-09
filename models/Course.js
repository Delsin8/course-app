const mongoose = require('mongoose')
const objectID = mongoose.Types.ObjectId
const Section = require('./Section')
const Review = require('./Review')

const CourseSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, minlength: 10, maxlength: 60 },
    description: {
      type: String,
      required: true,
      minlength: 20,
      maxlength: 400,
    },
    authors: [
      {
        type: objectID,
        ref: 'User',
        required: true,
        validate: a => Array.isArray(a) && a.length > 0,
      },
    ],
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

CourseSchema.pre('remove', async function (next) {
  const sections = await Section.find({ course: this._id })
  sections.forEach(section => {
    section.remove()
  })

  next()
})

CourseSchema.pre('remove', async function (next) {
  const reviews = await Review.find({ course: this._id })
  reviews.forEach(review => {
    review.remove()
  })

  next()
})

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
