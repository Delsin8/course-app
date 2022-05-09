const mongoose = require('mongoose')
const objectID = mongoose.Types.ObjectId

const ReviewSchema = new mongoose.Schema({
  body: { type: String, required: true, maxlength: 500 },
  user: { type: objectID, ref: 'User', required: true },
  course: { type: objectID, ref: 'Course', required: true },
  rating: { type: Number, enum: [1, 2, 3, 4, 5], required: true },
  created_at: { type: Date, default: Date.now() },
  updated_at: { type: Date, default: Date.now() },
})

const Review = mongoose.model('Review', ReviewSchema)

module.exports = Review
