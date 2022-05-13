const { Router } = require('express')
const {
  createAnswer,
  getAnswer,
  updateAnswer,
  deleteAnswer,
} = require('../controllers/answerController')
const auth = require('../middlewares/auth.middleware')

const router = Router()

router.post('/', auth, createAnswer)
router.get('/', getAnswer)
router.put('/:id', updateAnswer)
router.delete('/:id', deleteAnswer)

module.exports = router
