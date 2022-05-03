const { Router } = require('express')
const {
  createAnswer,
  getAnswer,
  updateAnswer,
  deleteAnswer,
} = require('../controllers/answerController')

const router = Router()

router.post('/', createAnswer)
router.get('/', getAnswer)
router.put('/:id', updateAnswer)
router.delete('/:id', deleteAnswer)

module.exports = router
