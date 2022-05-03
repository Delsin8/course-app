const PurchasedCourse = require('../models/PurchasedCourse')

const createPurchasedCourse = async (req, res) => {
  const { user, course } = req.body

  const candidate = await PurchasedCourse.findOne({ user, course })
  if (candidate)
    return res.json({ message: "You've already bought this course." })

  PurchasedCourse.create({ user, course }, (err, data) => {
    if (err) return res.status(400).send(err)
    res.status(201).json(data)
  })
}

const getPurchasedCourse = (req, res) => {
  PurchasedCourse.find({}, (err, data) => {
    if (err) return res.status(400).json(err)
    res.json(data)
  })
}

const updatePurchasedCourse = (req, res) => {
  const { user, course } = req.body

  PurchasedCourse.findByIdAndUpdate(
    req.params.id,
    { user, course },
    { new: true },
    (err, data) => {
      if (err) return res.status(400).send(err)
      res.status(200).json(data)
    }
  )
}

const deletePurchasedCourse = (req, res) => {
  PurchasedCourse.findByIdAndDelete(req.params.id, err => {
    if (err) return res.status(400).send(err)
    res.status(204).json({ message: 'PurchasedCourse was deleted' })
  })
}

module.exports = {
  createPurchasedCourse,
  getPurchasedCourse,
  updatePurchasedCourse,
  deletePurchasedCourse,
}
