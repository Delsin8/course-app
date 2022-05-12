const { Router } = require('express')
const {
  createQuestion,
  getQuestion,
  getQuestions,
  updateQuestion,
  deleteQuestion,
} = require('../controllers/questionController')
const authMiddleware = require('../middlewares/auth.middleware')

const router = Router()

router.post('/', authMiddleware, createQuestion)
router.get('/:id', getQuestion)
router.get('/', getQuestions)
router.put('/:id', updateQuestion)
router.delete('/:id', deleteQuestion)

module.exports = router
