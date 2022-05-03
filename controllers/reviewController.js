const Review = require('../models/Review')

const createReview = (req, res) => {
  const { body, user, course, rating } = req.body
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
