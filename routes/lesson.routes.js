const { Router } = require('express')
const {
  createLesson,
  getLesson,
  updateLesson,
  deleteLesson,
} = require('../controllers/lessonController')

const router = Router()

router.post('/', createLesson)
router.get('/:id', getLesson)
router.put('/:id', updateLesson)
router.delete('/:id', deleteLesson)

module.exports = router
