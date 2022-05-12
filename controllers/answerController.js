const Answer = require('../models/Answer')

const createAnswer = (req, res) => {
  const user = req.user.payload.id

  const { body, question } = req.body
  Answer.create({ body, user, question }, (err, data) => {
    if (err) return res.status(400).send(err)
    res.status(201).json(data)
  })
}

const getAnswer = (req, res) => {
  const id = req.params.id
  if (id.match(/^[0-9a-fA-F]{24}$/)) {
    Answer.findById(id, (err, data) => {
      if (err) return res.status(400).json(err)
      res.json(data)
    })
  } else res.status(404).send('No results found.')
}

const updateAnswer = (req, res) => {
  const { body, user, question } = req.body
  Answer.findByIdAndUpdate(
    req.params.id,
    { body, user, question },
    { new: true },
    (err, data) => {
      if (err) return res.status(400).send(err)
      res.status(201).json(data)
    }
  )
}

const deleteAnswer = async (req, res) => {
  const course = await Answer.findById(req.params.id)
  if (course) {
    course.delete(err => {
      if (err) return res.sendStatus(400)
      return res.json('Answer was deleted')
    })
  }
  res.sendStatus(404)
}

module.exports = { createAnswer, getAnswer, updateAnswer, deleteAnswer }
