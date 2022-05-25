const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/User')
const Course = require('../models/Course')
const Wishlist = require('../models/Wishlist')

const generateToken = (id, first_name) => {
  const payload = { id, first_name }
  return jwt.sign({ payload }, process.env.SECRET_KEY, { expiresIn: '1d' })
}

const signup = async (req, res) => {
  const { email, password, first_name, last_name } = req.body
  // validation
  const validation_email = await User.findOne({ email })
  if (validation_email)
    return res.status(400).send('User with this email already exists.')
  // hash password
  const salt = await bcryptjs.genSalt(10)
  const hashPassword = await bcryptjs.hash(password, salt)

  // create a user
  const user = new User({
    email,
    password: hashPassword,
    first_name,
    last_name,
  })
  try {
    user.save((err, data) => {
      if (err) return res.status(400).json(err)
      const token = generateToken(user._id, user.first_name)
      return res.json({ token })
    })
  } catch (err) {
    res.status(400).json(err)
  }
}

const signin = async (req, res) => {
  const { email, password } = req.body

  const user = await User.findOne({ email })
  if (!user) return res.status(400).json({ message: 'Credentials are wrong' })

  const checkPassword = await bcryptjs.compare(password, user.password)
  if (!checkPassword) return res.status(400).send('Credentials are wrong')

  const token = generateToken(user._id, user.first_name)
  res.json({ token })
}

const getUser = (req, res) => {
  const user = req.user.payload.id
  const userExists = User.exists({ _id: user })
  if (userExists) return res.json({ valid: true })
  return res.json({ valid: false })
}

const getUsers = (req, res) => {
  User.find({})
    .populate('reviews')
    .populate('courses_owned')
    .populate('students')
    .exec((err, data) => {
      if (err) return res.status(400).json(err)
      res.json(data)
    })
}

const updateUser = (req, res) => {
  const { first_name, last_name, bio } = req.body
  const id = req.user.payload.id

  User.findByIdAndUpdate(
    id,
    { first_name, last_name, bio },
    { new: true },
    (err, data) => {
      if (err) return res.status(400).send(err)
      res.status(200).json(data)
    }
  )
}

const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
    user.remove()
    res.sendStatus(204)
  } catch (error) {
    res.status(400).json(error)
  }
}

module.exports = { signup, signin, getUser, getUsers, updateUser, deleteUser }
