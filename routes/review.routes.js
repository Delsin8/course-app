const { Router } = require('express')
const {
  createReview,
  getReviews,
  updateReview,
  deleteReview,
} = require('../controllers/reviewController')
const auth = require('../middlewares/auth.middleware')

const router = Router()

router.post('/', auth, createReview)
router.get('/:courseID', getReviews)
router.put('/:id', updateReview)
router.delete('/:id', deleteReview)

module.exports = router
