const { Router } = require('express')
const {
  createReview,
  updateReview,
  deleteReview,
} = require('../controllers/reviewController')
const authMiddleware = require('../middlewares/auth.middleware')

const router = Router()

router.post('/', authMiddleware, createReview)
router.put('/:id', updateReview)
router.delete('/:id', deleteReview)

module.exports = router
