require('dotenv').config({ path: '../.env' })
const mongoose = require('mongoose')
const Course = require('../models/Course')
const User = require('../models/User')
const { faker } = require('@faker-js/faker')
const { getRandomNumber, getRandomIndex } = require('../utils/getRandomNumber')

mongoose.connect(process.env.DATABASE_URL)

const languages = ['English', 'Spanish', 'Chinese', 'Polish', 'French']

const fetchUsers = async () => {
  const users = await User.find({})
  return users
}

const users = fetchUsers()

users.then(res => {
  const userAmount = getRandomNumber(1, 5)
  const authorsArr = res.splice(
    getRandomNumber(res.length - userAmount),
    userAmount
  )

  const course = new Course({
    title: faker.lorem.words(getRandomNumber(1, 5)),
    description: faker.lorem.paragraph(),
    authors: authorsArr,
    price: faker.commerce.price(3, 25, 2),
    language: languages[getRandomIndex(languages.length)],
  })

  course.save(err => {
    console.log(err)
    mongoose.disconnect()
    process.exit()
  })
})
