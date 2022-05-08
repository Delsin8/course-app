const mongoose = require('mongoose')
const objectID = mongoose.Types.ObjectId
const Wishlist = require('./Wishlist')
const Review = require('./Review')
const Question = require('./Question')

const UserSchema = new mongoose.Schema(
  {
    email: { type: String, required: true },
    password: { type: String, required: true },
    first_name: { type: String, required: true },
    last_name: { type: String },
    profession: { type: String },
    bio: { type: String },
    balance: { type: Number, default: 0 },
    wishlist: { type: objectID, ref: 'Wishlist' },
    created_at: { type: Date, default: Date.now() },
    updated_at: { type: Date, default: Date.now() },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
)

UserSchema.pre('save', async function (next) {
  const wishlist = await Wishlist.create({ user: this._id })
  this.wishlist = wishlist._id
  next()
})

UserSchema.pre('remove', async function (next) {
  await Wishlist.findByIdAndDelete(this.wishlist)
  next()
})

UserSchema.pre('remove', async function (next) {
  const reviews = await Review.find({ user: this._id })
  reviews.forEach(review => {
    review.remove()
  })

  next()
})

UserSchema.pre('remove', async function (next) {
  const questions = await Question.find({ user: this._id })
  questions.forEach(question => {
    question.remove()
  })

  next()
})

UserSchema.virtual('reviews', {
  ref: 'Review',
  localField: '_id',
  foreignField: 'user',
})

UserSchema.virtual('courses_owned', {
  ref: 'Course',
  localField: '_id',
  foreignField: 'authors',
  count: true,
})

UserSchema.virtual('students', {
  ref: 'PurchasedCourse',
  localField: '_id',
  foreignField: 'user',
  count: true,
})

// UserSchema.virtual('courses_purchased', {
//   ref: 'Review',
//   localField: '_id',
//   foreignField: 'user',
// })

const User = mongoose.model('User', UserSchema)

module.exports = User
