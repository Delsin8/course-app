const { Router } = require('express')
const Lesson = require('../models/Lesson')

const router = Router()

router.post('/', (req, res) => {
  const { title, description, duration, section } = req.body
  Lesson.create({ title, description, duration, section }, (err, data) => {
    if (err) return res.status(400).send(err)
    res.status(201).json(data)
  })
})

router.put('/:id', (req, res) => {
  const { title, description, duration, section } = req.body
  Lesson.findByIdAndUpdate(
    req.params.id,
    { title, description, duration, section },
    { new: true },
    (err, data) => {
      if (err) return res.status(400).send(err)
      res.status(201).json(data)
    }
  )
})

router.get('/:id', (req, res) => {
  const id = req.params.id
  if (id.match(/^[0-9a-fA-F]{24}$/)) {
    // with questions
    if (req.query.full === '1') {
      Lesson.findById(id)
        .populate([
          {
            path: 'questions',
            populate: [
              {
                path: 'answers',
                model: 'Answer',
                populate: 'user',
              },
              {
                path: 'user',
                model: 'User',
              },
            ],
          },
        ])
        .exec((err, data) => {
          if (err) return res.status(400).json(err)
          return res.json(data)
        })
    } else {
      Lesson.findById(id, (err, data) => {
        if (err) return res.status(400).json(err)
        res.json(data)
      })
    }
  } else res.status(404).send('No results found.')
})

router.get('/', (req, res) => {
  Lesson.find({}, (err, data) => {
    if (err) return res.status(400).json(err)
    res.json(data)
  })
})

router.delete('/:id', async (req, res) => {
  const course = await Lesson.findById(req.params.id)
  if (course) {
    course.delete(err => {
      if (err) return res.sendStatus(400)
      return res.json('Lesson was deleted')
    })
  }
  res.sendStatus(404)
})

module.exports = router
