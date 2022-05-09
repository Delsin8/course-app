require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
const courseRoutes = require('./routes/course.routes')
const userRoutes = require('./routes/user.routes')
const reviewRoutes = require('./routes/review.routes')
const wishlistRoutes = require('./routes/wishlist.routes')
const sectionRoutes = require('./routes/section.routes')
const lessonRoutes = require('./routes/lesson.routes')
const questionRoutes = require('./routes/question.routes')
const answerRoutes = require('./routes/answer.routes')
const purchasedCourseRoutes = require('./routes/purchasedCourse.routes')
const cors = require('cors')

const app = express()
const port = process.env.PORT || 5000

app.use(express.json())
app.use(cookieParser())
app.use(cors())
// routes
app.use('/api/users', userRoutes)
app.use('/api/courses', courseRoutes)
app.use('/api/sections', sectionRoutes)
app.use('/api/lessons', lessonRoutes)
app.use('/api/questions', questionRoutes)
app.use('/api/answers', answerRoutes)
app.use('/api/reviews', reviewRoutes)
app.use('/api/wishlists', wishlistRoutes)
app.use('/api/purchased-courses', purchasedCourseRoutes)

async function start() {
  try {
    await mongoose.connect(process.env.DATABASE_URL)
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`)
    })
  } catch (error) {
    console.log(error)
    process.exit(1)
  }
}
start()
