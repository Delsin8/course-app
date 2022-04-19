const mongoose = require('mongoose')
const objectID = mongoose.Types.ObjectId

const CourseSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    authors: [{ type: objectID, ref: 'User', required: true }],
    price: { type: Number, required: true },
    preview_video: { type: String, default: './videos/default_preview.smth' },
    // publishing_date: { type: Date, required: true },
    // publisher: { type: String, required: true },
    language: { type: String, required: true },
    created_at: { type: Date, default: Date.now() },
    updated_at: { type: Date, default: Date.now() }
})

const Course = mongoose.model('Course', CourseSchema)

module.exports = Course