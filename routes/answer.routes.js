const { Router } = require('express')
const {
  createAnswer,
  getAnswer,
  updateAnswer,
  deleteAnswer,
} = require('../controllers/answerController')
const authMiddleware = require('../middlewares/auth.middleware')

const router = Router()

router.post('/', authMiddleware, createAnswer)
router.get('/', getAnswer)
router.put('/:id', updateAnswer)
router.delete('/:id', deleteAnswer)

module.exports = router
