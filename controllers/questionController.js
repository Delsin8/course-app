const Question = require('../models/Question')

const createQuestion = (req, res) => {
  try {
    const user = req.user.payload.id
    const { title, body, lesson } = req.body

    Question.create({ title, body, user, lesson }, (err, data) => {
      if (err) return res.status(400).send(err)
      res.status(201).json(data)
    })
  } catch (error) {
    res.status(400).json(error)
  }
}

const getQuestion = (req, res) => {
  try {
    const id = req.params.id
    if (id.match(/^[0-9a-fA-F]{24}$/)) {
      Question.findById(id)
        .populate('answers')
        .exec((err, data) => {
          if (err) return res.status(400).json(err)
          res.json(data)
        })
    } else res.status(404).send('No results found.')
  } catch (error) {
    res.status(400).json(error)
  }
}

const getQuestions = (req, res) => {
  try {
    const { lessonID } = req.params

    if (lessonID.match(/^[0-9a-fA-F]{24}$/)) {
      Question.find({ lesson: lessonID })
        .populate('user')
        .exec((err, data) => {
          if (err) return res.status(400).json(err)
          res.json(data)
        })
    }
  } catch (error) {
    res.status(400).json(error)
  }
}

const updateQuestion = (req, res) => {
  try {
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
  } catch (error) {
    res.status(400).json(error)
  }
}

const deleteQuestion = async (req, res) => {
  try {
    const course = await Question.findById(req.params.id)
    if (course) {
      course.delete(err => {
        if (err) return res.sendStatus(400)
        return res.json('Question was deleted')
      })
    }
    res.sendStatus(404)
  } catch (error) {
    res.status(400).json(error)
  }
}

module.exports = {
  createQuestion,
  getQuestion,
  getQuestions,
  updateQuestion,
  deleteQuestion,
}
