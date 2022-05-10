require('dotenv').config({ path: '../.env' })
const mongoose = require('mongoose')
const Answer = require('../models/Answer')
const Question = require('../models/Question')
const User = require('../models/User')
const { faker } = require('@faker-js/faker')
const { getRandomNumber, getRandomIndex } = require('../utils/getRandomNumber')

mongoose.connect(process.env.DATABASE_URL)

const fetchUsers = async () => {
  const users = await User.find({})
  return users
}

const fetchQuestions = async () => {
  const questions = await Question.find({})
  return questions
}

fetchUsers().then(users => {
  fetchQuestions().then(questions => {
    const answer = new Answer({
      body: faker.lorem.sentences(1, 8),
      user: users[getRandomIndex(users.length)],
      question: questions[getRandomIndex(questions.length)],
    })

    answer.save(err => {
      console.log(err)
      mongoose.disconnect()
      process.exit()
    })
  })
})
