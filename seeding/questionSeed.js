require('dotenv').config({ path: '../.env' })
const mongoose = require('mongoose')
const Question = require('../models/Question')
const Lesson = require('../models/Lesson')
const User = require('../models/User')
const { faker } = require('@faker-js/faker')
const { getRandomNumber, getRandomIndex } = require('../utils/getRandomNumber')

mongoose.connect(process.env.DATABASE_URL)

const fetchUsers = async () => {
  const users = await User.find({})
  return users
}

const fetchLessons = async () => {
  const lessons = await Lesson.find({})
  return lessons
}

fetchUsers().then(users => {
  fetchLessons().then(lessons => {
    const question = new Question({
      title: faker.lorem.words(getRandomNumber(3, 7)),
      body: faker.lorem.sentences(1, 6),
      user: users[getRandomIndex(users.length)],
      lesson: lessons[getRandomIndex(lessons.length)],
    })

    question.save(err => {
      console.log(err)
      mongoose.disconnect()
      process.exit()
    })
  })
})
