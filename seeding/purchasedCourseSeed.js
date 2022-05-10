require('dotenv').config({ path: '../.env' })
const mongoose = require('mongoose')
const PurchasedCourse = require('../models/PurchasedCourse')
const Course = require('../models/Course')
const User = require('../models/User')
const { getRandomNumber, getRandomIndex } = require('../utils/getRandomNumber')

mongoose.connect(process.env.DATABASE_URL)

const fetchUsers = async () => {
  const users = await User.find({})
  return users
}
const fetchCourses = async () => {
  const courses = await Course.find({})
  return courses
}

fetchUsers().then(users => {
  fetchCourses().then(courses => {
    const purchasedCourse = new PurchasedCourse({
      user: users[getRandomIndex(users.length)],
      course: courses[getRandomIndex(courses.length)],
    })

    purchasedCourse.save(err => {
      console.log(err)
      mongoose.disconnect()
      process.exit()
    })
  })
})
