const Lesson = require('../models/Lesson')
const Section = require('../models/Section')
const PurchasedCourse = require('../models/PurchasedCourse')

const createLesson = (req, res) => {
  try {
    const { title, description, duration, section } = req.body
    Lesson.create({ title, description, duration, section }, (err, data) => {
      if (err) return res.status(400).send(err)
      res.status(201).json(data)
    })
  } catch (error) {
    res.status(400).json(error)
  }
}

const getLesson = (req, res) => {
  try {
    const id = req.params.id
    if (id.match(/^[0-9a-fA-F]{24}$/)) {
      // const

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
            {
              path: 'section',
            },
          ])
          .exec(async (err, data) => {
            if (err) return res.status(400).json(err)

            const { section } = data
            const { course } = section
            const user = req.user.payload.id
            const isOwned = await PurchasedCourse.exists({ course, user })

            if (isOwned) {
              return res.json(data)
            }
            return res
              .status(401)
              .json({ message: "You don't own this course" })
          })
      } else {
        Lesson.findById(id, (err, data) => {
          if (err) return res.status(400).json(err)
          res.json(data)
        })
      }
    } else res.status(404).send('No results found.')
  } catch (error) {
    res.status(400).json(error)
  }
}

const updateLesson = (req, res) => {
  try {
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
  } catch (error) {}
}

const deleteLesson = async (req, res) => {
  try {
    const course = await Lesson.findById(req.params.id)
    if (course) {
      course.delete(err => {
        if (err) return res.sendStatus(400)
        return res.json('Lesson was deleted')
      })
    }
    res.sendStatus(404)
  } catch (error) {
    res.status(400).json(error)
  }
}

module.exports = { createLesson, getLesson, updateLesson, deleteLesson }
