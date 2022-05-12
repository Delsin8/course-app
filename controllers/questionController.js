const Question = require('../models/Question')

const createQuestion = (req, res) => {
  const user = req.user.payload.id
  const { title, body, lesson } = req.body

  Question.create({ title, body, user, lesson }, (err, data) => {
    if (err) return res.status(400).send(err)
    res.status(201).json(data)
  })
}

const getQuestion = (req, res) => {
  const id = req.params.id
  if (id.match(/^[0-9a-fA-F]{24}$/)) {
    Question.findById(id)
      .populate('answers')
      .exec((err, data) => {
        if (err) return res.status(400).json(err)
        res.json(data)
      })
  } else res.status(404).send('No results found.')
}

const getQuestions = (req, res) => {
  Question.find({}, (err, data) => {
    if (err) return res.status(400).json(err)
    res.json(data)
  })
}

const updateQuestion = (req, res) => {
  const { title, body, user, lesson } = req.body
  Question.findByIdAndUpdate(
    req.params.id,
    { title, body, user, lesson },
    { new: true },
    (err, data) => {
      if (err) return res.status(400).send(err)
      res.status(201).json(data)
    }
  )
}

const deleteQuestion = async (req, res) => {
  const course = await Question.findById(req.params.id)
  if (course) {
    course.delete(err => {
      if (err) return res.sendStatus(400)
      return res.json('Question was deleted')
    })
  }
  res.sendStatus(404)
}

module.exports = {
  createQuestion,
  getQuestion,
  getQuestions,
  updateQuestion,
  deleteQuestion,
}
