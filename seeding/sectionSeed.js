require('dotenv').config({ path: '../.env' })
const mongoose = require('mongoose')
const Section = require('../models/Section')
const Course = require('../models/Course')
const { faker } = require('@faker-js/faker')
const { getRandomNumber, getRandomIndex } = require('../utils/getRandomNumber')

mongoose.connect(process.env.DATABASE_URL)

const difficulties = [
  'Beginner',
  'Intermediate',
  'Advanced',
  'Expert',
  'All levels',
]

const fetchCourses = async () => {
  const courses = await Course.find({})
  return courses
}

fetchCourses().then(res => {
  const section = new Section({
    title: faker.lorem.words(getRandomNumber(1, 4)),
    difficulty: difficulties[getRandomIndex(difficulties.length)],
    course: res[getRandomIndex(res.length)],
  })

  section.save(err => {
    console.log(err)
    mongoose.disconnect()
    process.exit()
  })
})
