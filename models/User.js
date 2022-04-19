const mongoose = require('mongoose')
const objectID = mongoose.Types.ObjectId

const UserSchema = new mongoose.Schema({
    email: { type: String, required: true },
    password: { type: String, required: true },
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    profession: { type: String },
    courses_owned: [{ type: objectID, ref: 'Course' }],
    courses_purchased: [{ type: objectID, ref: 'Course' }],
    balance: { type: Number, default: 0 },
    wishlist: { type: objectID, ref: 'Wishlist' },
    created_at: { type: Date, default: Date.now() },
    updated_at: { type: Date, default: Date.now() }
}, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
})

UserSchema.virtual('reviews', {
    ref: 'Review',
    localField: '_id',
    foreignField: 'user'
})


const User = mongoose.model('User', UserSchema)

module.exports = User