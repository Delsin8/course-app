const Course = require('../models/Course')
const mongoose = require('mongoose')

const createCourse = (req, res) => {
  const { title, description, price, authors, language, thumbnail } = req.body
  Course.create(
    { title, description, price, authors, language, thumbnail },
    (err, data) => {
      if (err) return res.status(400).send(err)
      res.status(201).json(data)
    }
  )
}

const getCourse = async (req, res) => {
  const id = req.params.id
  // if (id.match(/^[0-9a-fA-F]{24}$/)) {
  //   Course.findById(id, (err, data) => {
  //     if (err) return res.status(400).json(err)
  //     res.json(data)
  //   }).populate('sections')
  // } else res.status(404).send('No results found.')

  if (req.query.content === '1') {
    Course.findById(id)
      .select('_id')
      .populate([
        {
          path: 'sections',
          populate: [
            {
              path: 'lessons',
              model: 'Lesson',
            },
          ],
        },
      ])
      .exec((err, data) => {
        if (err) return res.status(400).json(err)
        return res.json(data)
      })
  } else {
    const [course] = await Course.aggregate([
      {
        $match: { _id: mongoose.Types.ObjectId(id) },
      },
      {
        $lookup: {
          from: 'sections',
          let: {
            courseID: '$_id',
          },
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
            {
              $unwind: {
                path: '$lessons',
                preserveNullAndEmptyArrays: true,
              },
            },
            {
              $group: {
                _id: '$_id',
                lessonsAmount: { $count: {} },
                duration: { $sum: '$lessons.duration' },
                doc: { $first: '$$CURRENT' },
              },
            },

            {
              $replaceRoot: {
                newRoot: {
                  $mergeObjects: [
                    {
                      duration: '$duration',
                      lessonsAmount: '$lessonsAmount',
                    },
                    '$doc',
                  ],
                },
              },
            },
            { $unset: 'lessons' },
          ],
          as: 'sections',
        },
      },
      // authors
      // {
      //   $unwind: {
      //     path: '$authors',
      //     preserveNullAndEmptyArrays: true,
      //   },
      // },
      // {
      //   $lookup: {
      //     from: 'users',
      //     let: {
      //       authors: '$authors',
      //     },
      //     pipeline: [
      //       {
      //         $match: {
      //           $expr: {
      //             $in: ['$_id', '$$authors'],
      //           },
      //         },
      //       },
      //       {
      //         $lookup: {
      //           from: 'courses',
      //           pipeline: [
      //             // {
      //             //   $unwind: {
      //             //     path: '$authors',
      //             //   },
      //             // },
      //             {
      //               $match: {
      //                 $expr: {
      //                   authors: {
      //                     $in: ['authors', '$$authors'],
      //                     // $in: ['$_id', '$$authors'],
      //                   },
      //                 },
      //               },
      //             },
      //           ],
      //           as: 'test',
      //         },
      //       },
      //     ],
      //     as: 'authors',
      //   },
      // },
      // {
      //   $group: {
      //     _id: '$_id',
      //     lessons: { $count: {} },
      //     doc: { $first: '$$ROOT' },
      //   },
      // },
      // {
      //   $replaceRoot: {
      //     newRoot: {
      //       $mergeObjects: [
      //         {
      //           // duration: { $sum: '$sections.duration' },
      //           // lessons: { $sum: '$sections.lessons' },
      //           sections: '$sections',
      //         },
      //         '$doc',
      //       ],
      //     },
      //   },
      // },
    ])
    const courseWithAuthors = await Course.populate(course, [
      {
        path: 'authors',
        populate: [
          {
            path: 'students',
          },
          { path: 'courses_owned' },
        ],
      },
      {
        path: 'reviews',
        populate: {
          path: 'user',
        },
      },
    ])
    res.json(courseWithAuthors)
  }
}

const getCourses = async (req, res) => {
  // with reviews
  if (req.query.full === '1') {
    // try {
    const courses = await Course.aggregate([
      {
        $match: {},
      },
      {
        $lookup: {
          from: 'reviews',
          localField: '_id',
          foreignField: 'course',
          as: 'reviews',
        },
      },
      {
        $unwind: {
          path: '$reviews',
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $group: {
          _id: '$_id',
          avg_rating: { $avg: '$reviews.rating' },
          votes: { $count: {} },
          doc: { $first: '$$ROOT' },
        },
      },
      // lessons
      {
        $lookup: {
          from: 'sections',
          let: {
            courseID: '$_id',
          },
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
            {
              $unwind: {
                path: '$lessons',
                preserveNullAndEmptyArrays: true,
              },
            },
            {
              $match: {
                'lessons.duration': { $gt: 0 },
              },
            },
            {
              $group: {
                _id: '$_id',
                duration: { $sum: '$lessons.duration' },
                lessons: {
                  $count: {},
                },
                doc: { $first: '$$CURRENT' },
              },
            },
            {
              $replaceRoot: {
                newRoot: {
                  $mergeObjects: [
                    {
                      duration: '$duration',
                      lessons: '$lessons',
                    },
                  ],
                },
              },
            },
          ],
          as: 'sections',
        },
      },
      // number of students
      {
        $lookup: {
          from: 'purchasedCourse',
          localField: '_id',
          foreignField: 'course',
          let: {
            courseID: '$_id',
          },
          pipeline: [
            {
              $match: {
                $expr: {
                  $eq: ['$course', '$$courseID'],
                },
              },
            },
            {
              $group: {
                _id: '$course',
                students: { $count: {} },
              },
            },
            {
              $replaceRoot: {
                newRoot: {
                  $mergeObjects: {
                    students: '$students',
                  },
                },
              },
            },
          ],
          as: 'students',
        },
      },
      {
        $unwind: {
          path: '$students',
          preserveNullAndEmptyArrays: true,
        },
      },
      // final result
      {
        $replaceRoot: {
          newRoot: {
            $mergeObjects: [
              {
                avg_rating: '$avg_rating',
                votes: '$votes',
                duration: { $sum: '$sections.duration' },
                lessons: { $sum: '$sections.lessons' },
                students: '$students.students',
              },
              '$doc',
            ],
          },
        },
      },

      {
        $unset: 'reviews',
      },
    ])
    if (req.query.search) {
      const filtratedCourses = courses.filter(c => {
        const title = c.title.toLowerCase()
        if (title.includes(req.query.search.toLowerCase())) return true
        return false
      })
      return res.json(filtratedCourses)
    }
    res.json(courses)
    // } catch (error) {
    //   res.status(400).json(error)
    // }
  }
  // without reviews
  else {
    Course.find({}, (err, data) => {
      if (err) return res.status(400).json(err)
      res.json(data)
    })
  }
}

const updateCourse = (req, res) => {
  const { title, description, price, authors, language, thumbnail } = req.body
  Course.findByIdAndUpdate(
    req.params.id,
    { title, description, price, authors, language, thumbnail },
    { new: true },
    (err, data) => {
      if (err) return res.status(400).send(err)
      res.status(201).json(data)
    }
  )
}

const deleteCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id)
    course.remove()

    res.sendStatus(204)
  } catch (error) {
    res.status(400).send(error)
  }
}

module.exports = {
  createCourse,
  getCourse,
  getCourses,
  updateCourse,
  deleteCourse,
}
