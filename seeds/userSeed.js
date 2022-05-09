// const express = require('express')
// const mongoose = require('mongoose')

// const app = express()
// const port = process.env.PORT || 5000

// async function start() {
//   try {
//     await mongoose.connect(process.env.DATABASE_URL)
//     app.listen(port, () => {
//       console.log(`Server is running on port ${port}`)
//     })
//   } catch (error) {
//     console.log(error)
//     process.exit(1)
//   }
// }
// start()

const User = require('../models/User')
const { faker } = require('@faker-js/faker')

const users = new User([
  {
    email: faker.internet.email(),
    password: faker.internet.password(10),
    first_name: faker.name.firstName(),
    // last_name
    // bio
  },
])
