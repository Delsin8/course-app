require('dotenv').config({ path: '../.env' })
const mongoose = require('mongoose')
const Review = require('../models/Review')
const Course = require('../models/Course')
const User = require('../models/User')
const { faker } = require('@faker-js/faker')
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
    const review = new Review({
      body: faker.lorem.sentences(getRandomNumber(1, 4)),
      rating: getRandomNumber(1, 6),
      user: users[getRandomIndex(users.length)],
      course: courses[getRandomIndex(courses.length)],
    })

    review.save(err => {
      console.log(err)
      mongoose.disconnect()
      process.exit()
    })
  })
})
