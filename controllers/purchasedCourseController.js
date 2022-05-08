const mongoose = require('mongoose')
const PurchasedCourse = require('../models/PurchasedCourse')

const createPurchasedCourse = async (req, res) => {
  const { course } = req.body
  const user = req.user.payload.id

  const candidate = await PurchasedCourse.findOne({ user, course })
  if (candidate)
    return res.json({ message: "You've already bought this course." })

  PurchasedCourse.create({ user, course }, (err, data) => {
    if (err) return res.status(400).send(err)
    res.status(201).json(data)
  })
}

const getPurchasedCourse = async (req, res) => {
  const user = req.user.payload.id

  const course = await PurchasedCourse.aggregate([
    {
      $match: { user: mongoose.Types.ObjectId(user) },
    },
    {
      $lookup: {
        from: 'courses',
        let: {
          courseID: '$course',
        },
        pipeline: [
          {
            $match: {
              $expr: {
                $eq: ['$_id', '$$courseID'],
              },
            },
          },
          {
            $lookup: {
              from: 'sections',
              pipeline: [
                {
                  $match: {
                    $expr: {
                      $eq: ['$course', '$$courseID'],
                    },
                  },
                },
                {
                  $lookup: {
                    from: 'lessons',
                    localField: '_id',
                    foreignField: 'section',
                    as: 'lessons',
                  },
                },
              ],
              as: 'sections',
            },
          },
        ],
        as: 'course',
      },
    },
    { $unwind: { path: '$course' } },
    {
      $replaceRoot: {
        newRoot: '$course',
      },
    },
  ])

  return res.json(course)

  // PurchasedCourse.find({ user })
  //   .populate('course')
  //   .select('course -_id')
  //   .exec((err, data) => {
  //     if (err) return res.status(400).json(err)
  //     res.json(data)
  //   })
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
