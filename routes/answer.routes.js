const { Router } = require('express')
const {
  createAnswer,
  getAnswer,
  getAnswers,
  updateAnswer,
  deleteAnswer,
} = require('../controllers/answerController')
const auth = require('../middlewares/auth.middleware')

const router = Router()

router.post('/', auth, createAnswer)
router.get('/:id', getAnswer)
router.get('/question/:questionID', getAnswers)
router.put('/:id', updateAnswer)
router.delete('/:id', deleteAnswer)

module.exports = router
