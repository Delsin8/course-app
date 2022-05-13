const Review = require('../models/Review')

const createReview = async (req, res) => {
  const { body, course, rating } = req.body
  const user = req.user.payload.id
  if (!user) return res.sendStatus(400)

  const reviewExists = await Review.exists({ user, course })

  if (reviewExists)
    return res.status(400).json({ message: 'You already reviewed this course' })

  Review.create({ body, user, course, rating }, (err, data) => {
    if (err) return res.status(400).send(err)
    res.status(201).json(data)
  })
}

// router.get('/', (req, res) => {
//     Review.find({}, (err, data) => {
//         if (err) return res.status(400).json(err)
//         res.json(data)
//     })
// })

const updateReview = (req, res) => {
  const { body, rating } = req.body

  Review.findByIdAndUpdate(
    req.params.id,
    { body, rating, is_edited: true },
    { new: true },
    (err, data) => {
      if (err) return res.status(400).send(err)
      res.status(200).json(data)
    }
  )
}

const deleteReview = (req, res) => {
  Review.findByIdAndDelete(req.params.id, err => {
    if (err) return res.status(400).send(err)
    res.status(204).json({ message: 'Review was deleted' })
  })
}

module.exports = { createReview, updateReview, deleteReview }
