const { Router } = require('express')
const {
  createCourse,
  getCourse,
  getCourses,
  updateCourse,
  deleteCourse,
} = require('../controllers/courseController')
const auth = require('../middlewares/auth.middleware')

const router = Router()

router.post('/', createCourse)
router.get('/:id', getCourse)
router.get('/', getCourses)
router.put('/:id', updateCourse)
router.delete('/:id', deleteCourse)

module.exports = router
