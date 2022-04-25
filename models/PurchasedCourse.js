const mongoose = require('mongoose')
const objectID = mongoose.Types.ObjectId

const PurchasedCourseSchema = new mongoose.Schema(
  {
    course: { type: objectID, ref: 'Course', required: true },
    user: { type: objectID, ref: 'User', required: true },
    created_at: { type: Date, default: Date.now() },
    updated_at: { type: Date, default: Date.now() },
  },
  { collection: 'purchasedCourse' }
)

const PurchasedCourse = mongoose.model('PurchasedCourse', PurchasedCourseSchema)

module.exports = PurchasedCourse
