const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { Router } = require('express');
const { authMiddleware } = require('../middlewares')
const User = require('../models/User');
const Course = require('../models/Course');
const Wishlist = require('../models/Wishlist');
const router = Router()

const generateToken = (id, first_name) => {
    const payload = { id, first_name }
    return jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: 600 })
}

// sign up
router.post('/signup', async (req, res) => {
    const { email, password, first_name, last_name } = req.body
    // validation
    const validation_email = await User.findOne({ email })
    if (validation_email) return res.status(400).send('User with this email already exists.')
    // hash password
    const salt = await bcryptjs.genSalt(10)
    const hashPassword = await bcryptjs.hash(password, salt)

    // create a user
    const user = new User({ email, password: hashPassword, first_name, last_name })
    try {
        // create a wishlist and attach to the user
        const wishlist = new Wishlist({
            user: user._id
        })
        user.wishlist = wishlist
        user.save((err, data) => {
            if (err) return res.sendStatus(400)

            wishlist.save((error) => {
                if (error) return res.sendStatus(400)
            })
            return res.status(200).send(data)
        })

    } catch (err) {
        res.sendStatus(400).json(err)
    }
})

// sign in (login)
router.post('/signin', async (req, res) => {
    const { email, password } = req.body
    //validate input data
    const user = await User.findOne({ email })
    if (!user) return res.status(400).send('Credentials are wrong')

    const checkPassword = await bcryptjs.compare(password, user.password)
    if (!checkPassword) return res.status(400).send('Credentials are wrong')

    const token = generateToken(user._id, user.first_name)
    if (!res.cookie.token) {
        res.cookie('token', token, { maxAge: 10000, httpOnly: true })
        return res.send(res.cookie.token)
    }

    return res.status(200).send("You were logged in")
})

// update a user
router.put('/:id', authMiddleware, (req, res) => {
    const { first_name, last_name, profession } = req.body
    User.findByIdAndUpdate(req.params.id, { first_name, last_name, profession }, { new: true }, (err, data) => {
        if (err) return res.status(400).send(err)
        res.status(200).json(data)
    })
})

// search users
router.get('/', (req, res) => {
    User.find({}).populate('reviews').exec((err, data) => {
        if (err) return res.status(400).json(err)
        res.json(data)
    })
})

// delete a user account
router.put('/:id', (req, res) => {
    User.findByIdAndDelete(req.params.id, (err, doc, res) => {
        if (err) return res.status(400).send(err)
        res.status(204).json({ message: 'User was deleted' })
    })
})

// change password or email

// test
router.post('/123/:id', async (req, res) => {
    const id = req.params.id
    const course = await Course.findOne({})
    User.findById(id, (err, data) => {
        if (err) return res.sendStatus(400)
        data.course = course
        // console.log(data.populated('course'))
        res.json(data)
    })
})

module.exports = router