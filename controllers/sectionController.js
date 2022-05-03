const Section = require('../models/Section')

const createSection = (req, res) => {
  const { title, difficulty, course } = req.body
  Section.create({ title, difficulty, course }, (err, data) => {
    if (err) return res.status(400).send(err)
    res.status(201).json(data)
  })
}

const getSection = (req, res) => {
  const id = req.params.id
  if (id.match(/^[0-9a-fA-F]{24}$/)) {
    Section.findById(id, (err, data) => {
      if (err) return res.status(400).json(err)
      res.json(data)
    })
  } else res.status(404).send('No results found.')
}

const getSections = (req, res) => {
  Section.find({}, (err, data) => {
    if (err) return res.status(400).json(err)
    res.json(data)
  })
}

const updateSection = (req, res) => {
  const { title, difficulty, course } = req.body
  Section.findByIdAndUpdate(
    req.params.id,
    { title, difficulty, course },
    { new: true },
    (err, data) => {
      if (err) return res.status(400).send(err)
      res.status(201).json(data)
    }
  )
}

const deleteSection = async (req, res) => {
  const course = await Section.findById(req.params.id)
  if (course) {
    course.delete(err => {
      if (err) return res.sendStatus(400)
      return res.json('Section was deleted')
    })
  }
  res.sendStatus(404)
}

module.exports = {
  createSection,
  getSection,
  getSections,
  updateSection,
  deleteSection,
}
