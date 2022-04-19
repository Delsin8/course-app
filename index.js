require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
const courseRoutes = require('./routes/course.routes')
const userRoutes = require('./routes/user.routes')
const reviewRoutes = require('./routes/review.routes')
const wishlistRoutes = require('./routes/wishlist.routes')
const cors = require('cors')

const app = express()
const port = process.env.PORT || 1000

app.use(express.json())
app.use(cookieParser())
app.use(cors())
// routes
app.use('/api/courses', courseRoutes)
app.use('/api/users', userRoutes)
app.use('/api/reviews', reviewRoutes)
app.use('/api/wishlists', wishlistRoutes)



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