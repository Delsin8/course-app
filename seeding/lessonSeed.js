require('dotenv').config({ path: '../.env' })
const mongoose = require('mongoose')
const Lesson = require('../models/Lesson')
const Section = require('../models/Section')
const { faker } = require('@faker-js/faker')
const { getRandomNumber, getRandomIndex } = require('../utils/getRandomNumber')

mongoose.connect(process.env.DATABASE_URL)

const fetchSections = async () => {
  const sections = await Section.find({})
  return sections
}

fetchSections().then(res => {
  const lesson = new Lesson({
    title: faker.lorem.words(getRandomNumber(3, 7)),
    body: faker.lorem.sentences(1, 6),
    duration: getRandomNumber(1, 600),
    section: res[getRandomIndex(res.length)],
  })

  lesson.save(err => {
    console.log(err)
    mongoose.disconnect()
    process.exit()
  })
})
