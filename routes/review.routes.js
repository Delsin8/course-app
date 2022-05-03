const { Router } = require('express')
const {
  createReview,
  updateReview,
  deleteReview,
} = require('../controllers/reviewController')

const router = Router()

router.post('/', createReview)
router.put('/:id', updateReview)
router.delete('/:id', deleteReview)

module.exports = router
