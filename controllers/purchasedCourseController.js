const mongoose = require('mongoose')
const PurchasedCourse = require('../models/PurchasedCourse')

const createPurchasedCourse = async (req, res) => {
  try {
    const { course } = req.body
    const user = req.user.payload.id

    const candidate = await PurchasedCourse.findOne({ user, course })
    if (candidate)
      return res.json({ message: "You've already bought this course." })

    PurchasedCourse.create({ user, course }, (err, data) => {
      if (err) return res.status(400).send(err)
      res.status(201).json(data)
    })
  } catch (error) {
    res.status(400).json(error)
  }
}

const getPurchasedCourse = async (req, res) => {
  try {
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
  } catch (error) {
    res.status(400).json(error)
  }
}

const checkPurchase = async (req, res) => {
  try {
    const user = req.user.payload.id
    const course = req.params.id

    PurchasedCourse.findOne({
      user,
      course,
    })
      .populate({
        path: 'course',
        populate: {
          path: 'sections',
          populate: 'lessons',
        },
      })
      .exec((err, data) => {
        if (err) return res.status(400).json(err)
        return res.json(data)
      })
  } catch (error) {
    res.status(400).json({ message: 'Something went wrong' })
  }
}

const updatePurchasedCourse = (req, res) => {
  try {
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
  } catch (error) {
    res.status(400).json(error)
  }
}

const deletePurchasedCourse = (req, res) => {
  try {
    PurchasedCourse.findByIdAndDelete(req.params.id, err => {
      if (err) return res.status(400).send(err)
      res.status(204).json({ message: 'PurchasedCourse was deleted' })
    })
  } catch (error) {
    res.status(400).json(error)
  }
}

module.exports = {
  createPurchasedCourse,
  getPurchasedCourse,
  updatePurchasedCourse,
  deletePurchasedCourse,
  checkPurchase,
}
