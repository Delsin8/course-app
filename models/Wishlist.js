const mongoose = require('mongoose')
const objectID = mongoose.Types.ObjectId

const WishlistSchema = new mongoose.Schema({
  user: { type: objectID, ref: 'User', required: true },
  courses: [{ type: objectID, ref: 'Course' }],
  created_at: { type: Date, default: Date.now() },
  updated_at: { type: Date, default: Date.now() },
})

const Wishlist = mongoose.model('Wishlist', WishlistSchema)

module.exports = Wishlist
