const { Router } = require('express')
const {
  createLesson,
  getLesson,
  updateLesson,
  deleteLesson,
} = require('../controllers/lessonController')
const auth = require('../middlewares/auth.middleware')

const router = Router()

router.post('/', createLesson)
router.get('/:id', auth, getLesson)
router.put('/:id', updateLesson)
router.delete('/:id', deleteLesson)

module.exports = router
