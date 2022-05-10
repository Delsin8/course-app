require('dotenv').config({ path: '../.env' })
const User = require('../models/User')
const { faker } = require('@faker-js/faker')
const mongoose = require('mongoose')
const bcryptjs = require('bcryptjs')

mongoose.connect(process.env.DATABASE_URL)

const hashPassword = async password => {
  const salt = await bcryptjs.genSalt(10)
  const hashedPassword = await bcryptjs.hash(password, salt)
  return hashedPassword
}

const getUsers = async () => {
  const users = [
    new User({
      email: faker.internet.email(),
      password: await hashPassword('qwerty123'),
      // password: faker.internet.password(10),
      first_name: faker.name.firstName(),
      last_name: faker.name.lastName(),
      bio: faker.lorem.paragraph(Math.floor(Math.random() * 3)),
    }),
  ]

  return users
}
getUsers().then(res => {
  // console.log(res)
  let done = 0
  for (let i = 0; i < res.length; i++) {
    res[i].save(() => {
      done++
      console.log(done)
      if (done === res.length) {
        mongoose.disconnect()
        process.exit()
      }
    })
  }
})

// console.log(await getUsers())
