const { Router } = require('express');
const Course = require('../models/Course')

const router = Router()

// create a course
router.post('/', (req, res) => {
    const { title, description, price, authors, language } = req.body
    Course.create({ title, description, price, authors, language }, (err, data) => {
        if (err) return res.status(400).send(err)
        res.status(201).json(data)
    })
})

// update a course
router.put('/:id', (req, res) => {
    const { title, description, price, authors, language } = req.body
    Course.findByIdAndUpdate(req.params.id, { title, description, price, authors, language }, { new: true }, (err, data) => {
        if (err) return res.status(400).send(err)
        res.status(201).json(data)
    })
})

// get a single course
router.get('/:id', (req, res) => {
    const id = req.params.id
    if (id.match(/^[0-9a-fA-F]{24}$/)) {
        Course.findById(id, (err, data) => {
            if (err) return res.status(400).json(err)
            res.json(data)
        })
    }
    else res.status(404).send("No results found.")
})

// get all courses
router.get('/', (req, res) => {
    Course.find({}, (err, data) => {
        if (err) return res.status(400).json(err)
        res.json(data)
    })
})

// delete a course
router.delete('/:id', async (req, res) => {
    const course = await Course.findById(req.params.id)
    if (course) {
        course.delete((err) => {
            if (err) return res.sendStatus(400)
            return res.json("Course was deleted")
        })
    }
    res.sendStatus(404)
})

module.exports = router